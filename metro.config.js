const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const nativewindConfig = withNativewind(config, { input: "./global.css" });

// Override the transformerPath so node_modules CSS files are skipped on native.
// lightningcss 1.32.0 crashes on var(--x, env(y)) patterns found in packages
// like @expo/log-box — those are web-only stylesheets that native doesn't need.
nativewindConfig.transformerPath = require.resolve("./metro-css-transformer");

module.exports = nativewindConfig;
