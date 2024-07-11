import { ActionFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/lib/auth.server";

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

export const loader = async () => {
  return redirect("/");
};
