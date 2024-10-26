import { promises as fs } from "node:fs";
import { join } from "node:path";
import { Glob } from "bun";
import { getEnv } from "./utils";

async function renderPages() {
  const { siteUrl } = getEnv();

  const glob = new Glob("**/*.tsx");

  const builtFilenames = new Array<string>();
  const pages = "src/pages";
  for await (const path of glob.scan(pages)) {
    const file = join(pages, path);

    const { default: Page } = await import(file);
    const html = Page();

    const builtFilename = path.replace(".tsx", ".html");

    builtFilenames.push(builtFilename);

    await fs.mkdir(join("dist", builtFilename, ".."), { recursive: true });
    await fs.writeFile(join("dist", builtFilename), html, "utf8");
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${builtFilenames.map((filename) => `<url><loc>${siteUrl}${filename}</loc></url>`).join("\n  ")}
</urlset>`;

  await fs.writeFile(join("dist", "sitemap.xml"), sitemap, "utf8");
}

renderPages().catch(console.error);
