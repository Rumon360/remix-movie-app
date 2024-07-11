import { CommentWithStringDates } from "./comments.types";

export type UserDataType = {
  id: string;
  name: string;
  email: string;
  comments: CommentWithStringDates;
};
