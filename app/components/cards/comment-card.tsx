import { CommentWithStringDates } from "~/types/comments.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRevalidator } from "@remix-run/react";
import EditComment from "../edit-comment";

type Props = {
  comment: CommentWithStringDates;
  userId: string | null;
};

function CommentCard({ comment, userId }: Props) {
  const revalidator = useRevalidator();
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await fetch("/delete-comment", {
      method: "DELETE",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Successfully Deleted The Comment");
      revalidator.revalidate();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="">
      <CardHeader className="bg-primary-foreground py-3 rounded-b">
        <CardTitle className="text-sm font-semibold">
          {comment.user?.name}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {comment.user?.email}
        </CardDescription>
        <p className="text-xs text-muted-foreground">
          Created at: {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent className="py-6">
        <p className="text-lg">{comment.message}</p>
      </CardContent>
      {userId && comment.userId === userId && (
        <CardFooter className="bg-primary-foreground flex items-center gap-3 py-3">
          <form onSubmit={handleDelete}>
            <input type="hidden" value={comment.id} name="commentId" />
            <input type="hidden" value={comment.movieId} name="movieId" />
            <Button
              variant={"destructive"}
              className="rounded py-2 text-xs"
              size={"sm"}
            >
              Delete
            </Button>
          </form>
          <EditComment commentId={comment.id} />
          {/* <form onSubmit={handleEdit}>
            <input type="hidden" value={comment.id} name="commentId" />
            <input type="hidden" value={comment.movieId} name="movieId" />
            <Button
              variant={"default"}
              className="rounded py-2 text-xs"
              size={"sm"}
            >
              Edit
            </Button>
          </form> */}
        </CardFooter>
      )}
    </Card>
  );
}

export default CommentCard;
