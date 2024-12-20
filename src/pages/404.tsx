import { Html } from "@kitajs/html";
import Layout from "src/layout";

export default function NotFound() {
  return (
    <Layout title="Katastema">
      <div class="flex min-h-screen flex-col items-center justify-center gap-5 bg-dark font-mono">
        <h1 class="font-bold text-5xl text-pink">404</h1>

        <p class="z-10 max-w-xl text-center text-lg text-yellow">
          Relax, you're lost.
        </p>

        <a
          href="/"
          class="group relative mt-5 w-fit border-4 border-yellow border-r-0 p-2 pr-3 before:absolute before:top-0 before:right-0 before:h-full before:w-1 before:bg-yellow before:transition-all before:duration-200 before:content-['_'] hover:before:w-full focus:outline-none"
        >
          <span class="relative font-semibold text-yellow before:transition-all before:duration-200 group-hover:text-dark">
            Go back home
          </span>
        </a>
      </div>
    </Layout>
  );
}
