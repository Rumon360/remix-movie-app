import { Link } from "@remix-run/react";
import { buttonVariants } from "../ui/button";
import Logo from "../ui/logo";
import { UserDataType } from "~/types/user-data.types";
import UserAvatar from "../user-avatar";

type Props = {
  userData?: UserDataType;
};

function Header({ userData }: Props) {
  return (
    <header className="w-full border-b sticky top-0 bg-background z-50">
      <div className="w-full relative h-20 flex justify-between items-center max-w-screen-xl px-4 mx-auto">
        <Logo />
        {!userData ? (
          <div className="flex items-center gap-2">
            <Link
              to={"/login"}
              style={{ borderRadius: "6px" }}
              className={buttonVariants({
                className: "text-sm",
                variant: "secondary",
                size: "sm",
              })}
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              style={{ borderRadius: "6px" }}
              className={buttonVariants({
                className: "text-sm",
                size: "sm",
              })}
            >
              Signup
            </Link>
          </div>
        ) : (
          <UserAvatar userData={userData} />
        )}
      </div>
    </header>
  );
}

export default Header;
