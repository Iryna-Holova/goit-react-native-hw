import { getDefaultConfig } from "expo/metro-config";

export default (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "svg"
  );
  config.resolver.sourceExts.push("svg", "js", "json", "ts", "tsx", "cjs");
  config.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer"
  );

  return config;
})();
