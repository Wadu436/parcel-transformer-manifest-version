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
    let source = await asset.getCode();

    const parsed = JSON.parse(source);
    parsed.version = config.version;
    asset.setCode(JSON.stringify(parsed));

    return [asset];
  },
});
