import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserData } from "~/actions/get-user";
import CommentCard from "~/components/cards/comment-card";
import { authenticator } from "~/lib/auth.server";
import { UserDataType } from "~/types/user-data.types";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })) as UserDataType;

  const response = await getUserData(user.id);

  if (response.success) {
    const data = response.data;
    return json({ data, userId: user.id });
  } else {
    return redirect("/login");
  }
}

function Profile() {
  const { data, userId } = useLoaderData<typeof loader>();

  return (
    <div className="py-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to your profile, {data?.name}
      </h1>
      <div className="pt-10">
        <h2 className="scroll-m-20 border-b pb-6 text-3xl font-semibold tracking-tight first:mt-0">
          Your Comments:
        </h2>
        {data?.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} userId={userId} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
