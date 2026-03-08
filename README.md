# Transformed CSS Demo (Vite + Sass)

This is a small frontend project demonstrating a bundler-based setup where CSS is transformed from source files into a final bundle with source maps enabled.

## Setup and Run Instructions

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start development server:**
    ```bash
    npm run dev
    ```
    This will start a local server (usually at http://localhost:5173). In development mode, CSS source maps are enabled via Vite's `css.devSourcemap` configuration.

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will generate the production assets in the `dist/` directory.

## CSS Transformation Explanation

In this project, CSS is authored using **Sass (SCSS)** in `src/style.scss`. 
Vite (the bundler) performs several transformations:

1.  **SCSS Compilation:** The Sass preprocessor converts the SCSS syntax (variables, mixins, nesting) into standard CSS.
2.  **Collection:** Vite identifies the CSS import in `src/main.js` (`import './style.scss'`) and collects it.
3.  **Optimization:** During the production build, the CSS is minified and bundled into a single file (e.g., `dist/assets/index-[hash].css`).
4.  **Source Map Generation:** Because `build.sourcemap` is set to `true` in `vite.config.js`, Vite generates source maps. For small CSS files, Vite often inlines the source map directly into the generated CSS file or handles it via the JS bundle in development. In production, it ensures that the browser can map the final CSS back to the original `.scss` source file.

## Where to Find Generated CSS and Source Maps

After running `npm run build`, you can find the output in the `dist/` folder.

For a detailed analysis of how the browser's DevTools map these generated files back to the SCSS source, see [INVESTIGATION.md](./INVESTIGATION.md).

*   **Generated CSS:** Look in `dist/assets/index-[hash].css`.
*   **Source Maps:**
    *   The JavaScript source map is in `dist/assets/index-[hash].js.map`.
    *   The CSS source map may be appended as a Data URI at the end of the `.css` file or generated as a separate `.css.map` file depending on the exact version and configuration of the bundler.
    *   In this setup, you can verify source mapping by opening the project in a browser's Developer Tools; you will see the styles attributed to `style.scss` rather than the generated `.css` file.
