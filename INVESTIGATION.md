# CSS Investigation Report

This report documents an investigation into how computed CSS styles in a browser (Chrome DevTools) relate to the original Sass source code in this project.

## Investigation Target
- **Element**: `<div class="card">`
- **Context**: A container element with rounded corners, a border, and a shadow, styled using Sass variables, mixins, and functions.

## Property Analysis

### 1. `padding`
- **Computed Value**: `20px`
- **Styles Panel**: `.card { padding: 20px; }`
- **Generated CSS**: `index-[hash].css`, line 1 (minified).
- **Source Map Trace**: Traces back to `src/style.scss`, line 21: `padding: $padding;`.

### 2. `border-radius`
- **Computed Value**: `12px`
- **Styles Panel**: `border-radius: 12px;` (along with `-webkit-`, `-moz-`, `-ms-` prefixes).
- **Generated CSS**: `index-[hash].css`, line 1.
- **Source Map Trace**: Traces back to `src/style.scss`, line 22: `@include border-radius(12px);`.

### 3. `border-color`
- **Computed Value**: `rgb(33, 125, 187)` (Note: Chrome may show decimal points in some views, e.g., `rgb(33.138, 125.188, 186.862)`).
- **Styles Panel**: `border: 2px solid rgb(33.138, 125.188, 186.862);`
- **Generated CSS**: `index-[hash].css`, line 1.
- **Source Map Trace**: Traces back to `src/style.scss`, line 23: `border: 2px solid darken($primary-color, 10%);`.

### 4. `box-shadow`
- **Computed Value**: `rgba(0, 0, 0, 0.15) 0px 4px 10px 0px`
- **Styles Panel**: `box-shadow: 0 4px 10px #00000026;` (hex with alpha).
- **Generated CSS**: `index-[hash].css`, line 1.
- **Source Map Trace**: Traces back to `src/style.scss`, line 24: `box-shadow: 0 4px 10px rgba(0,0,0,0.15);`.

### 5. `margin-top`
- **Computed Value**: `20px`
- **Styles Panel**: `margin-top: 20px;`
- **Generated CSS**: `index-[hash].css`, line 1.
- **Source Map Trace**: Traces back to `src/style.scss`, line 25: `margin-top: 20px;`.

---

## Ambiguity and Mapping Breakdowns

### 1. Variable Abstraction (Indirection)
While the source map correctly identifies the line where a property is used (`padding: $padding;`), it does not automatically jump to the **definition** of that variable (e.g., `$padding: 20px;` at the top of the file). In the Styles panel, you see the resolved value (`20px`), losing the semantic intent of using a shared variable. Tracing the value to its absolute origin requires a second manual step of searching the source file for the variable definition.

### 2. Mixin "One-to-Many" Mapping
The `@include border-radius(12px);` directive expands into four distinct CSS properties in the generated file (including vendor prefixes). In DevTools, clicking the source link for *any* of these four properties leads to the exact same line in the SCSS file (the `@include` line). This becomes ambiguous when trying to debug why a specific prefix was generated; the developer must look at the mixin definition separately, as the source map doesn't visually represent the "expansion" logic of the preprocessor.

### 3. Compiled Mathematical Transformations
Sass functions like `darken($primary-color, 10%)` are computed at build time. The browser only sees the final `rgb()` result. Although the source map points to the line containing the function call, there is no way in DevTools to see the "intermediate" state (what `$primary-color` was) or to adjust the `10%` value and see the result re-calculated live. The mapping "breaks down" as a live debugging tool for the logic itself, serving only as a static reference to where the logic resides.
