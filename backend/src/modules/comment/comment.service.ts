import { Injectable } from '@nestjs/common';
import { CommentCreateRequest } from './request/create-comment.request';
import { CommentUpdateRequest } from './request/update-comment.request';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    commentCreateRequest: CommentCreateRequest,
  ): Promise<{ success: boolean; message: string; data?: any }> {
    const data = await this.prisma.comment.create({
      data: commentCreateRequest,
    });
    return data
      ? {
          success: true,
          message: 'Comment created successfully',
          data,
        }
      : {
          success: false,
          message: 'Comment creation failed',
          data: [],
        };
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

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
