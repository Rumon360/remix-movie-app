import Logo from "../ui/logo";

function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-zinc-600 sm:justify-start">
            <Logo />
          </div>
          <p className="mt-4 text-center text-sm text-zinc-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
