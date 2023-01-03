# Simple React Template

A template app for react based Figma plugins.

## Configuration
Some important configuration settings to be aware of which enable a react plugin to be compiled.

- `manifest.json`
    - output location needs to be set `dist/ui.html`
- `webpack.config.js`
    - entry location needs to be set `ui: './src/ui.tsx'`
    - ui related module loaders need to be set
        - `ts-loader` for `.tsx` files
        - `style-loader` to inline `css` into the DOM
        - `css-loader` to resolve `.css` imports
    - inject bundled modules into an `html` file
        - `HtmlWebpackPlugin` to generate a shell html file with a script file injected into the body
        - `InlineChunkHtmlPlugin` inline the bundle output into the html script tag
- `src/ui.html`
    - a template `html` file is provided with a main dom node to hook into
- `src/ui.tsx`
    - react code is rendered into the template main dom node
- `tsconfig.json`
    - `lib` includes `DOM` types
    - `jsx` includes `react-jsx` types