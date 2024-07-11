import { db } from "~/lib/db.server";

export const getUserData = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        name: true,
        comments: {
          select: {
            id: true,
            user: { select: { id: true, name: true, email: true } },
            userId: true,
            message: true,
            movieId: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
};
