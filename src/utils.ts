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
