/**
 * This script makes it slightly easier to release new versions of your
 * theme. If you are not using Github Releases with your theme, or
 * you are not interested in automating the process, you can safely ignore
 * this script.
 *
 * Usage:
 *   `pnpm version patch`
 *   `OBSIDIAN_MIN_APP_VERSION=1.6.0 pnpm version minor`
 *
 * This script will automatically add a new entry to the versions.json file for
 * the current version of your theme.
 */

import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.env.npm_package_version;
const requestedMinAppVersion = process.env.OBSIDIAN_MIN_APP_VERSION?.trim();

if (!targetVersion) {
	throw new Error("Missing npm_package_version while running version script.");
}

// Keep current minAppVersion unless an explicit value is provided.
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const nextMinAppVersion = requestedMinAppVersion || manifest.minAppVersion;

manifest.version = targetVersion;
manifest.minAppVersion = nextMinAppVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// versions.json maps theme version -> min supported Obsidian version.
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = nextMinAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
