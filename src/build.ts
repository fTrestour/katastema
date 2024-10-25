import { promises as fs } from "node:fs";
import { join } from "node:path";
import { Glob } from "bun";

async function renderPages() {
  const glob = new Glob("**/*.tsx");

  const pages = "src/pages";
  for await (const path of glob.scan(pages)) {
    const file = join(pages, path);

    const { default: Page } = await import(file);
    const html = Page();

    const outputFilePath = join("dist", path.replace(".tsx", ".html"));
    await fs.mkdir(join(outputFilePath, ".."), { recursive: true });
    await fs.writeFile(outputFilePath, html, "utf8");
  }
}

renderPages().catch(console.error);
