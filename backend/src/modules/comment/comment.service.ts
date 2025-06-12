import { Injectable } from '@nestjs/common';
import { CommentCreateRequest } from './request/create-comment.request';
import { CommentUpdateRequest } from './request/update-comment.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDeleteRequest } from './request/delete-comment.request';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(commentCreateRequest: CommentCreateRequest) {
    const { userId, postId, comment, parentId } = commentCreateRequest;

    if (!userId) throw new Error('userId is required');
    if (!postId) throw new Error('postId is required');
    if (!comment || comment.trim() === '')
      throw new Error('comment is required');

    const postExists = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postExists) throw new Error('Post not found');

    if (parentId) {
      const parentExists = await this.prisma.comment.findUnique({
        where: { id: parentId },
      });
      if (!parentExists) throw new Error('Parent comment not found');
    }

    const data = await this.prisma.comment.create({
      data: {
        comment,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatar: true,
          },
        },
        replies: true,
        feelings: true,
      },
    });

    return { success: true, message: 'Comment created', data };
  }

  findAll() {
    return `This action returns all comment`;
  }

  async findOne(id: number) {
    const data = await this.prisma.comment.findMany({
      where: { postId: id },
      select: {
        id: true,
        comment: true,
        user: {
          select: {
            id: true,
            fullName: true,
            avatar: true,
          },
        },
        postId: true,
      },
    });
    return data;
  }

  async update(
    commentUpdateRequest: CommentUpdateRequest,
  ): Promise<{ success: boolean; message: string; data?: any }> {
    const { id, userId, comment } = commentUpdateRequest;

    const existingComment = await this.prisma.comment.findFirst({
      where: { id },
    });

    if (!existingComment) {
      return {
        success: false,
        message: 'Comment not found',
      };
    }

    if (existingComment.userId !== userId) {
      return {
        success: false,
        message: 'You do not have permission to update this comment',
      };
    }

    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: { comment },
    });

    return {
      success: true,
      message: 'Comment updated successfully',
      data: updatedComment,
    };
  }

  async delete(commentDeleteRequest: CommentDeleteRequest) {
    const data = await this.prisma.comment.findFirst({
      where: { id: commentDeleteRequest.id },
    });
    if (!data) {
      return {
        success: false,
        message: 'Comment not found',
      };
    }
    if (data.userId === commentDeleteRequest.userId) {
      const data = await this.prisma.comment.delete({
        where: {
          id: commentDeleteRequest.id,
        },
      });
      if (data) {
        return {
          success: true,
          message: 'Comment deleted successfully',
          data,
        };
      } else {
        return {
          success: false,
          message: 'You do not have permission to delete this comment',
        };
      }
    }
  }
}
