import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData, useParams } from "@remix-run/react";
import { createComment } from "~/actions/create-comment";
import { getMovieComments } from "~/actions/get-comments";
import CommentCard from "~/components/cards/comment-card";
import AddCommentForm from "~/components/forms/add-comment-card";
import { authenticator } from "~/lib/auth.server";
import { UserDataType } from "~/types/user-data.types";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const user = (await authenticator.isAuthenticated(
    request,
    {}
  )) as UserDataType;
  const id = params.id as string;
  const data = await getMovieComments(id);
  if (data.success === false) {
    return redirect("/");
  }
  const userId = user ? user.id : null;
  const comments = data?.comments;
  return json({ comments, userId });
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "POST") {
    const user = (await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    })) as UserDataType;
    const formData = await request.formData();
    const response = await createComment(formData, user.id);
    if (response.success) {
      const data = response.data;
      return json({ data });
    }
  }
}

function MovieComments() {
  const { id } = useParams();
  const { comments, userId } = useLoaderData<typeof loader>();

  return (
    <div className="w-full rounded border">
      <h2 className="scroll-m-20 bg-muted px-6 py-3 font-semibold tracking-tight border-b text-xl">
        Your Feedback
      </h2>
      <div className="px-6 py-3 text-lg">
        <AddCommentForm movieId={id} />
      </div>
      <div className="mt-5">
        <h2 className="scroll-m-20 bg-muted px-6 py-3 font-semibold tracking-tight text-lg">
          Comments
        </h2>
        <div className="text-sm flex flex-col">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} userId={userId} />
            ))
          ) : (
            <p className="px-6 py-3">No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieComments;
