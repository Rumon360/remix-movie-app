import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function AddCommentForm({ movieId }: { movieId: string | undefined }) {
  const [feedback, setFeedback] = useState("");
  const navigation = useNavigation();
  const submit = useSubmit();
  const submitting = navigation.state === "submitting" ? true : false;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (feedback.trim().length > 0) {
      submit(event.currentTarget);
      setFeedback("");
    }
  };

  return (
    <Form
      method="POST"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="feedback">Feedback</Label>
        <Textarea
          id="feedback"
          name="feedback"
          className="rounded"
          placeholder="Type your feedback here."
          required
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>
      <input type="hidden" name="movie_id" value={movieId} />
      <Button disabled={submitting} className="rounded mt-4" type="submit">
        {submitting ? (
          <Loader2 className="animate-spin size-4" />
        ) : (
          "Add Comment"
        )}
      </Button>
    </Form>
  );
}

export default AddCommentForm;
