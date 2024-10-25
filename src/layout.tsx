import { Html, type PropsWithChildren } from "@kitajs/html";

export default function Layout(
  props: PropsWithChildren<{ title: string; lang: string }>,
) {
  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang={props.lang}>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title safe>{props.title}</title>
          <link href="/styles.css" rel="stylesheet" />
        </head>
        <body>{props.children}</body>
      </html>
    </>
  );
}
