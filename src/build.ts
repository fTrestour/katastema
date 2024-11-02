import { buildPages, copyStaticFiles, createSiteMap } from "./utils";

buildPages().then(createSiteMap);
copyStaticFiles();
