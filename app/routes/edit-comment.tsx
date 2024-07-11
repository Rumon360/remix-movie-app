import {
  ActionFunction,
  ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";

import { editComment } from "~/actions/edit-comment";
import { authenticator } from "~/lib/auth.server";
import { UserDataType } from "~/types/user-data.types";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  if (request.method === "PATCH") {
    const user = (await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    })) as UserDataType;
    const formData = await request.formData();
    const commentId = formData.get("commentId") as string;
    const feedback = formData.get("feedback") as string;
    const response = await editComment(feedback, commentId, user.id);
    if (response.success) {
      return json({ success: true });
    } else {
      return json({ success: false, error: "Failed to Edit the comment" });
    }
  }
};

export const loader = async () => {
  return redirect("/");
};
