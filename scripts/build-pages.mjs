import { spawnSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && !["--custom-domain", "--project-path"].includes(args[0]))) {
  throw new Error("Usage: npm run build:pages [-- --custom-domain | --project-path]");
}
const projectPath = args[0] === "--project-path";

const require = createRequire(import.meta.url);
const build = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  stdio: "inherit",
  env: { ...process.env, PORTFOLIO_STATIC_EXPORT: projectPath ? "pages" : "domain" }
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

// Branch-based Pages hosting must serve Next's _next directory verbatim.
writeFileSync("out/.nojekyll", "");
if (projectPath) {
  rmSync("out/CNAME", { force: true });
} else {
  writeFileSync("out/CNAME", "max.simakoff.com\n");
}
