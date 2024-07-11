import { db } from "~/lib/db.server";

export const editComment = async (
  feedback: string,
  commentId: string,
  userId: string
) => {
  try {
    await db.comment.update({
      where: { id: commentId, userId: userId },
      data: { message: feedback },
    });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
