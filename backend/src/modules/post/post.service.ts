import { Injectable } from '@nestjs/common';
import { PostCreateRequest } from './request/create-post.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostUpdateRequest } from './request/update-post.request copy';
import { PostDeleteRequest } from './request/remove-post.request';
import { PostDeleteResponse } from './response/post-delete.response';
import { PostCommentRequest } from './request/comment-post.request';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async create(postCreateRequest: PostCreateRequest) {
    const { title, content, userId } = postCreateRequest;
    const generatedSlug = this.generateSlug(title);
    const data = await this.prisma.post.create({
      data: {
        title,
        content,
        slug: `${generatedSlug}-${this.generateRandomString()}`,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Registered successfully',
      data,
    };
  }

  async findAll() {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        user: {
          select: {
            id: true,
            fullName: true,
            avatar: true,
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
  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: { id: id },
    });
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

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  generateRandomString(length = 24) {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result.toLocaleLowerCase();
  }
}
