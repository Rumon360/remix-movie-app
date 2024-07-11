import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { useRevalidator } from "@remix-run/react";

function EditComment({ commentId }: { commentId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const revalidator = useRevalidator();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const response = await fetch("/edit-comment", {
      method: "PATCH",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Successfully Edited The Comment");
      revalidator.revalidate();
      setOpen(false);
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"default"}
            className="rounded py-2 text-xs"
            size={"sm"}
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
          </DialogHeader>
          <form id="edit-form" onSubmit={handleEdit}>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Edit
                </Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  className="rounded"
                  placeholder="Type your feedback here."
                  required
                />
                <input type="hidden" name="commentId" value={commentId} />
              </div>
            </div>
          </form>
          <DialogFooter className="sm:justify-start pt- flex items-center gap-2">
            <DialogClose asChild>
              <Button
                size="sm"
                type="button"
                variant="secondary"
                className="rounded"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              disabled={loading}
              type="submit"
              size="sm"
              form="edit-form"
              className="px-3 flex gap-2 items-center rounded"
            >
              {!loading ? (
                <>
                  <Edit className="h-3 w-3" />
                  Save
                </>
              ) : (
                "Loading.."
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditComment;
