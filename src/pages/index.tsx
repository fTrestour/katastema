import { Html } from "@kitajs/html";
import Layout from "src/layout";

export default function Home() {
  return (
    <Layout title="Welcome to My Website" lang="en">
      <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 class="text-4xl font-bold">Welcome to My Website</h1>
      </div>
    </Layout>
  );
}
