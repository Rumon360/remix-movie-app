import { Comment } from "@prisma/client";

type JsonifyObject<T> = {
  [K in keyof T]: K extends "createdAt" | "updatedAt" ? string : T[K];
};

type CommentWithUser = Comment & {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export type CommentWithStringDates = JsonifyObject<CommentWithUser>;
