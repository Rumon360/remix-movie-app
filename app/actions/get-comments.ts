import { db } from "~/lib/db.server";

export const getMovieComments = async (id: string) => {
  try {
    const data = await db.comment.findMany({
      where: { movieId: id },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return {
      success: true,
      comments: data,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
