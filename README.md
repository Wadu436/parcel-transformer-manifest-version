# parcel-transformer-manifest-version

Sets the WebExtension `manifest.json` version at build time to the version in `package.json`

## Installation

Install from NPM with your favorite package manager:

e.g.

`yarn add --dev parcel-transformer-manifest-version`

or

`npm install parcel-transformer-manifest-version --save-dev`

## Usage

Add the transformer to your `.parcelrc` file.
For example:

```
{
  "transformers": {
    "*.json": ["parcel-transformer-manifest-version", "..."]
  }
}
```

For more info, see https://parceljs.org/features/plugins/#.parcelrc
