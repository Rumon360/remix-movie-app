import {
  Form,
  json,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { registerUser } from "~/actions/auth";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { authenticator } from "~/lib/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "POST") {
    const formData = await request.formData();
    const response = await registerUser(formData);
    return json({ success: response.success, message: response.message });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}

function Signup() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submitting = navigation.state === "submitting" ? true : false;

  useEffect(() => {
    if (data && data?.message) {
      if (data?.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    }
  }, [data, navigate]);

  return (
    <div className="h-full w-full absolute flex justify-center items-center">
      <Form method="POST">
        <Card className="mx-auto max-w-sm rounded">
          <CardHeader>
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>
              Enter your email and name below to register to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="name"
                  placeholder="John Doe"
                  className="rounded"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  className="rounded"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  className="rounded"
                  required
                />
              </div>
              <Button
                disabled={submitting}
                type="submit"
                className="w-full rounded"
              >
                {submitting ? (
                  <Loader2 className="animate-spin size-4" />
                ) : (
                  "Signup"
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}

export default Signup;
