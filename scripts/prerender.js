// Build-time prerenderer (SSG) for the Speak in Urdu Vite/React SPA.
//
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
// For every real route, it renders the page to an HTML string with
// react-dom/server and writes it as a standalone static file — so crawlers,
// social-share bots, and anyone loading the URL directly get real content,
// a unique <title>, and a unique meta description in the raw HTML, not just
// after JS runs. The client bundle then hydrates that markup for
// interactivity, same as any other prerendered SPA.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
let template = await readFile(path.join(distDir, "index.html"), "utf-8");

// site.css isn't a Vite-hashed asset (always the same URL), so it's cached
// short-term in .htaccess to avoid serving stale CSS after a deploy. Instead
// version it here with a content hash — safe to cache for a year, because
// the URL itself changes whenever the CSS actually changes.
const cssContent = await readFile(path.join(distDir, "site.css"), "utf-8");
const cssHash = createHash("md5").update(cssContent).digest("hex").slice(0, 8);
template = template.replace('href="/site.css"', `href="/site.css?v=${cssHash}"`);

const { render, getAllRoutePaths } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function setMetaByAttr(html, attr, key, content) {
  const re = new RegExp(`(<meta[^>]*${attr}="${key}"[^>]*content=")[^"]*(")`, "i");
  if (re.test(html)) return html.replace(re, `$1${esc(content)}$2`);
  return html.replace("</head>", `    <meta ${attr}="${key}" content="${esc(content)}" />\n  </head>`);
}

function buildHtml({ html, seo, canonical, routeName }) {
  let out = template;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`);
  out = setMetaByAttr(out, "name", "description", seo.desc);
  out = setMetaByAttr(out, "property", "og:title", seo.title);
  out = setMetaByAttr(out, "property", "og:description", seo.desc);
  out = setMetaByAttr(out, "property", "og:url", canonical);
  out = setMetaByAttr(out, "property", "og:type", routeName === "post" ? "article" : "website");
  out = setMetaByAttr(out, "name", "twitter:title", seo.title);
  out = setMetaByAttr(out, "name", "twitter:description", seo.desc);
  out = out.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${esc(canonical)}" />`
  );
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": seo.ld });
  out = out.replace(
    "</head>",
    `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`
  );
  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  return out;
}

const routes = getAllRoutePaths();
let count = 0;
for (const routePath of routes) {
  const { html, seo, canonical } = render(routePath);
  const routeName = routePath === "/" ? "home" : routePath.split("/")[1];
  const fullHtml = buildHtml({ html, seo, canonical, routeName });

  const outPath =
    routePath === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, routePath.replace(/^\//, ""), "index.html");

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, fullHtml, "utf-8");
  count++;
}

console.log(`Prerendered ${count} route(s) into dist/`);
