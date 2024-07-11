import { Link } from "@remix-run/react";

function Logo() {
  return (
    <Link
      to="/"
      prefetch="intent"
      className="text-xl font-bold tracking-tight text-white"
    >
      Movie<span className="text-cyan-500">DB</span>
    </Link>
  );
}

export default Logo;
