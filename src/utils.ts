import { promises as fs } from "node:fs";
import { join } from "node:path";
import { Glob } from "bun";

export function getSiteConfig() {
  const url = process.env["SITE_URL"];

  if (!url) {
    throw new Error(
      "SITE_URL environment variable is missing. Add it to the .env file",
    );
  }
  if (!url.endsWith("/")) {
    throw new Error("SITE_URL should finish with /");
  }

  const lang = process.env["SITE_LANGUAGE"];

  if (!lang) {
    throw new Error(
      "SITE_LANGUAGE environment variable is missing. Add it to the .env file",
    );
  }

  return {
    url,
    lang,
    buildDir: "dist",
    pagesDir: "src/pages",
    staticDir: "src/static",
  };
}

export async function createSiteMap(builtFilenames: string[]) {
  const siteConfig = getSiteConfig();

  console.log("Building sitemap");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${builtFilenames.map((filename) => `<url><loc>${siteConfig.url}${filename}</loc></url>`).join("\n  ")}
</urlset>`;

  try {
    await fs.writeFile(
      join(siteConfig.buildDir, "sitemap.xml"),
      sitemap,
      "utf8",
    );

    console.log("Successfully built sitemap");
  } catch (e) {
    console.error("Failed to build sitemap:");
    console.error(e);
  }
}

export async function buildPages() {
  const siteConfig = getSiteConfig();

  const paths = new Array<string>();
  for await (const path of new Glob("**/*.tsx").scan(siteConfig.pagesDir)) {
    paths.push(path);
  }
  const results = await Promise.allSettled(paths.map(buildPage));

  const successfulBuilds: string[] = [];
  const failedBuilds: string[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      successfulBuilds.push(result.value);
    } else {
      failedBuilds.push(paths[index]);
      console.error(`Failed to build ${paths[index]}:`);
      console.error(result.reason);
    }
  });

  return successfulBuilds;
}

async function buildPage(path: string) {
  const siteConfig = getSiteConfig();
  const file = join(siteConfig.pagesDir, path);

  console.log(`Building page for ${file}`);

  let html: string;
  try {
    const { default: Page } = await import(file);
    html = Page();
  } catch (e) {
    throw new Error(`Could not import ${file}`, { cause: e });
  }

  const toBuildUrl = path.replace(".tsx", ".html");
  const toBuildFile = join(siteConfig.buildDir, toBuildUrl);
  const targetDir = join(siteConfig.buildDir, toBuildUrl, "..");

  try {
    await fs.mkdir(targetDir, {
      recursive: true,
    });
    await fs.writeFile(toBuildFile, html, "utf8");

    console.log(`Successfully built ${file} to ${toBuildFile}`);
  } catch (e) {
    throw new Error(`Could not save ${toBuildUrl}`, { cause: e });
  }

  return toBuildUrl;
}

export async function copyStaticFiles() {
  const siteConfig = getSiteConfig();

  for await (const path of new Glob("**/*").scan(siteConfig.staticDir)) {
    const sourceFile = join(siteConfig.staticDir, path);
    const targetFile = join(siteConfig.buildDir, path);

    console.log(`Copying ${sourceFile} to ${targetFile}`);
    try {
      await fs.mkdir(join(siteConfig.buildDir, path, ".."), {
        recursive: true,
      });
      await fs.copyFile(sourceFile, targetFile);

      console.log(`Successfully copied ${sourceFile} to ${targetFile}`);
    } catch (e) {
      console.error("Failed to build sitemap:");
      console.error(e);
    }
  }
}
