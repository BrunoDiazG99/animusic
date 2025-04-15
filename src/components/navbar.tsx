import { ModeToggle } from "./mode-toggle";

export function NavBar() {
  return (
    <header
      className="sticky top-0 py-4 px-1 w-full 
      flex flex-row justify-center content-center text-center items-center
      bg-gradient-to-b from-emerald-500 to-emerald-300
      dark:bg-gradient-to-b dark:from-cyan-500 dark:to-cyan-300"
    >
      <nav className="flex flex-1 flex-row mr-auto ml-1">
        <p
          className="prose prose-slate md:prose-lg lg:prose-xl dark:prose-invert 
          font-bold"
        >
          <a
            className="no-underline"
            target="_blank"
            href="https://haruchon.github.io"
          >{`by Haruchon`}</a>
        </p>
      </nav>
      <nav className="pl-0 block ml-auto mr-1">
        <ul className="flex flex-row justify-between items-center mb-0 pl-0 gap-5">
          <li className="nav-list">
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
