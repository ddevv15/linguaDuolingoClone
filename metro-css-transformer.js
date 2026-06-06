/**
 * Custom Metro transformer that wraps react-native-css's transformer.
 *
 * Skips CSS files from node_modules on native platforms — those are web-only
 * stylesheets (e.g. @expo/log-box overlays) that cannot be compiled as
 * React Native styles and would crash lightningcss 1.32.0 with a
 * deserialization error on var(--x, env(y)) patterns.
 */
const path = require("path");
const { unstable_transformerPath } = require("@expo/metro-config");

// Require by absolute path to bypass the package exports map restriction
const rnCssTransformer = require(
  path.resolve(__dirname, "node_modules/react-native-css/dist/commonjs/metro/metro-transformer.js")
);
const { getNativeInjectionCode } = require(
  path.resolve(__dirname, "node_modules/react-native-css/dist/commonjs/metro/injection-code.js")
);

const worker = require(unstable_transformerPath);

async function transform(config, projectRoot, filePath, data, options) {
  const isCss = options.type !== "asset" && /\.(s?css|sass)$/.test(filePath);
  const isNodeModule = filePath.includes("/node_modules/");

  if (isCss && isNodeModule && options.platform !== "web") {
    // Return an empty stylesheet for node_modules CSS on native.
    // These files (e.g. @expo/log-box/Overlay.module.css) are web-only overlays.
    const emptyData = getNativeInjectionCode([], []);
    const result = await worker.transform(
      config,
      projectRoot,
      `${filePath}.js`,
      emptyData,
      options
    );
    result.output[0].data.css = { skipCache: true, code: "" };
    return result;
  }

  return rnCssTransformer.transform(config, projectRoot, filePath, data, options);
}

module.exports = { transform };
