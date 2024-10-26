# Katastema

> When the emotions which disturb the soul are removed, those which produce pleasure enter into it to take their place.

This is a static site builder using Bun, Tailwind CSS, and @kitajs/html.
It focuses on simplicity, while providing a modern component-driven development experience.

## File Structure

The repository is organized as follows:

- `src/build.ts`: This is the file that builds your website. You shouldn't need to modify it.
- `src/pages/`: This directory hosts the site pages. Each `.tsx` file in this directory represents a page, and the default export of each file will be the page content.
- `dist`: Your site is built there.
- `src/styles.css`: This is the source Tailwind CSS file where you can add and customize your styles.
- `src/layout.tsx`: This file contains the base structure to render all your pages. It includes the meta header and other common elements shared across all pages.

## Github Actions

This project uses GitHub Actions to:
- Test the build is not broken when pushing on any branch.
- Create a release containing the built website in an archive file - both `.tar.gz` and `zip` - when pushing on `main`
- Pull updates from the template repository into your project. To do that : "Actions" > "Template update" > "Run workflow". To have it work properly, you should update workflow permissions beforehand in "Settings" > "Actions" > "General", like so:
![Needed permissions](./assets/permissions.png)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.1.33 or later)

### Installation

Install dependencies:

```bash
bun install
```

### Development

To start the development server, which watches for changes in your TypeScript and CSS files, run:

```bash
bun dev
```



## Todo

- [ ] Imports validation?
- [ ] Sitemap
- [ ] robots.txt
- [ ] analytics?
- [ ] CI that makes a report on the built site diff?
- [ ] Improve error handling for the build, make error messages foolproof
- [ ] Add a Github action for [auto-update](https://0xdc.me/blog/github-templates-and-repository-sync/)?
- [ ] Handle 404
- [ ] Improve default Home
