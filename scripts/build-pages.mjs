import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && args[0] !== "--custom-domain")) {
  throw new Error("Usage: npm run build:pages [-- --custom-domain]");
}

const require = createRequire(import.meta.url);
const build = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  stdio: "inherit",
  env: { ...process.env, PORTFOLIO_STATIC_EXPORT: args.length ? "domain" : "pages" }
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

// Branch-based Pages hosting must serve Next's _next directory verbatim.
writeFileSync("out/.nojekyll", "");
