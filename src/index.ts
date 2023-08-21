import { Transformer } from "@parcel/plugin";

export default new Transformer({
  async loadConfig({ config }) {
    const loadedConfig = await config.getConfig<{ version: string }>(
      ["package.json"],
      { parse: true }
    );

    if (!loadedConfig) {
      throw new Error("Could not find package.json");
    }

    let { contents } = loadedConfig;
    return contents;
  },
  async transform({ asset, config }) {
    let filePath = await asset.filePath;
    if (!filePath.endsWith("manifest.json")) {
      return [asset];
    }

    let source = await asset.getCode();
    const parsed = JSON.parse(source);

    if (parsed.manifest_version == undefined) {
      return [asset];
    }

    // Supports yarn's prerelease numbering (e.g. 3.2.1-4)
    parsed.version = config.version.split('-')[0];
    asset.setCode(JSON.stringify(parsed));
    return [asset];
  },
});
