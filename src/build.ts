import { buildPages, copyStaticFiles, createSiteMap, getEnv } from "./utils";

async function render() {
  const { siteUrl } = getEnv();
  const builtFilenames = await buildPages();
  await copyStaticFiles();
  await createSiteMap(builtFilenames, siteUrl);
}

render().catch(console.error);
