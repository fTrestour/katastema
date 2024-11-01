import { Glob } from "bun";
import { promises as fs } from "node:fs";
import { join } from "node:path";

export function getEnv() {
  const siteUrl = process.env["SITE_URL"];

  if (!siteUrl) {
    throw new Error("SITE_URL environment variable is missing");
  }
  if (!siteUrl.endsWith("/")) {
    throw new Error("SITE_URL should finish with /");
  }

  const siteLang = process.env["SITE_LANGUAGE"];

  return {
    siteUrl,
    siteLang,
  };
}

export async function createSiteMap(builtFilenames: string[], siteUrl: string) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${builtFilenames.map((filename) => `<url><loc>${siteUrl}${filename}</loc></url>`).join("\n  ")}
</urlset>`;

  await fs.writeFile(join("dist", "sitemap.xml"), sitemap, "utf8");
}

export async function buildPages() {
  const glob = new Glob("**/*.tsx");
  const pages = "src/pages";

  const builtFilenames = new Array<string>();
  for await (const path of glob.scan("src/pages")) {
    const file = join(pages, path);

    const { default: Page } = await import(file);
    const html = Page();

    const builtFilename = path.replace(".tsx", ".html");

    builtFilenames.push(builtFilename);

    await fs.mkdir(join("dist", builtFilename, ".."), { recursive: true });
    await fs.writeFile(join("dist", builtFilename), html, "utf8");
  }
  return builtFilenames;
}

export async function copyStaticFiles() {
  const glob = new Glob("**/*");
  for await (const path of glob.scan("src/static")) {
    await fs.mkdir(join("dist", path, ".."), { recursive: true });
    await fs.copyFile(join("src/static", path), join("dist", path));
  }
}
