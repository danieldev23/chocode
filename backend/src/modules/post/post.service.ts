import { Injectable, NotFoundException } from '@nestjs/common';
import { PostCreateRequest } from './request/create-post.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostUpdateRequest } from './request/update-post.request copy';
import { PostDeleteRequest } from './request/remove-post.request';
import { PostDeleteResponse } from './response/post-delete.response';
import { PostCommentRequest } from './request/comment-post.request';
import { generateSlug } from 'src/utils/gen-slug.utils';
import { PostCreateResponseDto } from './response/post-create.response';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async create(postCreateRequest: PostCreateRequest, userId: number) {
    const { title, content, topic, level, image, category } = postCreateRequest;

    if (!category || category.length === 0) {
      return {
        success: false,
        message: 'Category is required',
      };
    }

    const categoryName = category[0];
    let existingCategory = await this.prisma.category.findFirst({
      where: {
        title: categoryName,
      },
    });

    if (!existingCategory) {
      existingCategory = await this.prisma.category.create({
        data: {
          title: categoryName,
          slug: generateSlug(categoryName),
          icon: 'default-icon',
        },
      });
    }

    const generatedSlug = generateSlug(title);
    const data = await this.prisma.post.create({
      data: {
        title,
        content,
        slug: generatedSlug,
        user: {
          connect: {
            id: userId,
          },
        },
        topic,
        level,
        image,
        category: {
          connect: {
            id: existingCategory.id,
          },
        },
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            fullName: true,
            avatar: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Post created successfully',
      data,
    };
  }

  async findAll(limit = 10, skip = 0) {
    return this.prisma.post.findMany({
      // take: limit,
      // skip,
      select: {
        id: true,
        title: true,
        content: true,

        topic: true,
        slug: true,
        level: true,
        image: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
        category: true,
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true,
          },
        },
        comments: {
          select: {
            id: true,
            comment: true,
          },
        },
      },
    });
  }

  async commentPost(postCommentRequest: PostCommentRequest) {
    return this.prisma.comment.create({
      data: {
        postId: postCommentRequest.postId,
        userId: postCommentRequest.userId,
        comment: postCommentRequest.comment,
      },
    });
  }

  async getPostDetail(slug: string): Promise<any> {
    const post = await this.prisma.post.findFirst({
      where: { slug },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true,
          },
        },
        category: true,
        comments: {
          where: { parentId: null },
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            comment: true,
            createdAt: true,
            parentId: true,
            user: {
              select: {
                id: true,
                fullName: true,
                username: true,
                avatar: true,
              },
            },
            feelings: {
              select: {
                id: true,
                type: true,
              },
            },
            replies: {
              select: {
                id: true,
                comment: true,
                createdAt: true,
                parentId: true,
                user: {
                  select: {
                    id: true,
                    fullName: true,
                    username: true,
                    avatar: true,
                  },
                },
                feelings: {
                  select: {
                    id: true,
                    type: true,
                  },
                },
                replies: {
                  select: {
                    id: true,
                    comment: true,
                    createdAt: true,
                    parentId: true,
                    user: {
                      select: {
                        id: true,
                        fullName: true,
                        username: true,
                        avatar: true,
                      },
                    },
                    feelings: {
                      select: {
                        id: true,
                        type: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }

    // Hàm đệ quy xử lý bình luận con
    const mapComment = (comment: any): any => ({
      id: comment.id,
      comment: comment.comment,
      createdAt: comment.createdAt,
      user: {
        id: comment.user.id,
        fullName: comment.user.fullName,
        username: comment.user.username,
        avatar: comment.user.avatar,
      },
      feelings: comment.feelings.map((f: any) => ({
        id: f.id,
        type: f.type,
      })),
      replies: comment.replies?.map(mapComment) || [],
    });

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      userId: post.userId,
      topic: post.topic,
      level: post.level,
      image: post.image,
      categoryId: post.categoryId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      category: {
        id: post.category.id,
        title: post.category.title,
        slug: post.category.slug,
        icon: post.category.icon,
      },
      user: {
        id: post.user.id,
        fullName: post.user.fullName,
        avatar: post.user.avatar,
        username: post.user.username,
      },
      comments: post.comments.map(mapComment),
    };
  }

  async findWithCategory(category: string) {
    const post = await this.prisma.post.findMany({
      where: {
        category: {
          title: {
            equals: category,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            avatar: true,
          },
        },
        category: true,
      },
    });

    if (!post || post.length === 0) {
      throw new NotFoundException(`Post with category "${category}" not found`);
    }

    return post;
  }

  async update(
    PostUpdateRequest: PostUpdateRequest,
  ): Promise<{ success: boolean; message: string; data?: any }> {
    const { id, title, content, userId } = PostUpdateRequest;

    const post = await this.prisma.post.findFirst({
      where: { id },
    });

    if (!post) {
      return {
        success: false,
        message: 'Post not found',
        data: [],
      };
    }

    const permissionUpdate = post.userId === userId;
    if (!permissionUpdate) {
      return {
        success: false,
        message: 'You do not have permission to update this post',
      };
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return {
      success: true,
      message: 'Updated post successfully',
      data: updatedPost,
    };
  }

  async remove(
    PostDeleteRequest: PostDeleteRequest,
  ): Promise<PostDeleteResponse> {
    const { id, userId } = PostDeleteRequest;
    const data = await this.prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    const permissionsDelete = data.userId === userId;
    if (permissionsDelete) {
      const del = await this.prisma.post.delete({
        where: { id: id },
      });
      return del
        ? {
            success: true,
            message: 'Delete post successfully',
          }
        : {
            success: false,
            message: 'Post not found',
          };
    }
    return {
      success: false,
      message: 'You do not have permission to delete this post',
    };
  }

  async countPost() {
    return this.prisma.post.count();
  }
}
