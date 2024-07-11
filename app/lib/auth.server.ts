import { createCookieSessionStorage } from "@remix-run/node";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { login } from "~/actions/auth";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [process.env.AUTH_SECRET!], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production" ? true : false, // enable this in prod only,
    maxAge: 20 * 60,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export const authenticator = new Authenticator<unknown>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const data = { email, password };
    const response = await login(data);

    if (!response.success) {
      throw new AuthorizationError();
    }

    return response.user;
  }),

  "user-pass"
);
