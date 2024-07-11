import {
  ActionFunction,
  ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { deleteComment } from "~/actions/delete-comment";
import { authenticator } from "~/lib/auth.server";
import { UserDataType } from "~/types/user-data.types";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  if (request.method === "DELETE") {
    const user = (await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    })) as UserDataType;
    const formData = await request.formData();
    const commentId = formData.get("commentId") as string;
    // const movieId = formData.get("movieId") as string;
    const response = await deleteComment(commentId, user.id);
    if (response.success) {
      return json({ success: true });
    } else {
      return json({ success: false, error: "Failed to delete the comment" });
    }
  }
};

export const loader = async () => {
  return redirect("/");
};
