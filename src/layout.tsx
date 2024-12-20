import { Html, type PropsWithChildren } from "@kitajs/html";
import { getSiteConfig } from "./utils";

export default function Layout(
  props: PropsWithChildren<{ title: string; lang?: string }>,
) {
  const { lang } = getSiteConfig();
  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang={props.lang ?? lang}>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title safe>{props.title}</title>
          <link href="/styles.css" rel="stylesheet" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </head>
        <body>{props.children}</body>
      </html>
    </>
  );
}
