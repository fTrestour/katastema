import { Html } from "@kitajs/html";
import Layout from "src/layout";

export default function Home() {
  return (
    <Layout title="Welcome to My Website">
      <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 class="font-bold text-4xl">Welcome to My Website</h1>
      </div>
    </Layout>
  );
}
