import { db } from "~/lib/db.server";

export const deleteComment = async (id: string, userId: string) => {
  try {
    await db.comment.delete({ where: { id: id, userId: userId } });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
