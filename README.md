# Simple HTML Template

A template app for html based Figma plugins.

## Configuration
Some important configuration settings to be aware of which enable a html plugin to be compiled.

- `manifest.json`
    - output location needs to be set `dist/ui.html`
- `webpack.config.js`
    - entry location needs to be set `ui: './src/ui.tsx'`
    - ui related module loaders need to be set
        - `html-loader` for `html` files
        - `ts-loader` for `.ts` files
        - `style-loader` to inline `css` into the DOM
        - `css-loader` to resolve `.css` imports
    - inject bundled modules into an `html` file
        - `HtmlWebpackPlugin` to generate a shell html file with a script file injected into the body
        - `InlineChunkHtmlPlugin` inline the bundle output into the html script tag
- `tsconfig.json`
    - `lib` includes `DOM` types
    - `jsx` includes `react-jsx` types