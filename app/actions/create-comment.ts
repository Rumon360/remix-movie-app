import { db } from "~/lib/db.server";

export const createComment = async (formData: FormData, userId: string) => {
  try {
    const newComment = await db.comment.create({
      data: {
        message: formData.get("feedback") as string,
        movieId: formData.get("movie_id") as string,
        userId: userId as string,
      },
    });
    return { success: true, data: newComment };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false };
  }
};
