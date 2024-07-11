import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import Header from "./components/sections/header";
import Footer from "./components/sections/footer";
import { Toaster } from "sonner";
import { authenticator } from "./lib/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { UserDataType } from "./types/user-data.types";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await authenticator.isAuthenticated(
    request,
    {}
  )) as UserDataType;

  return json({ user: user || null });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useLoaderData<typeof loader>() ?? { user: null };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="relative flex flex-col min-h-svh w-full h-full">
          <Header userData={user} />
          <div className="w-full max-w-screen-xl px-4 mx-auto flex-1 relative">
            {children}
          </div>
          <Footer />
        </main>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
