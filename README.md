# Text Transform

Library to build simple text transform tools you can run in your browser.

# Usage

Import the style:

```html
<link rel="stylesheet" href="https://agustinsrg.github.io/Text-Transform/style/text-transform.min.css">
```

Import the script:

```html
<script type="text/javascript" src="https://agustinsrg.github.io/Text-Transform/js/text-transform.min.js"></script>
```

Define the transform algorithm:

```js
TextTransform.ready(function () {
    // First argument: Element or selector to mount into
    // Second argument: Array of inpur parsers. 
    // They parse the input text to intermediary unified format for formatters
    // Set a parser to null if the input does not need any parsing
    // Third argument: Array of formatters, 
    // they take the intermediary unified format
    // and return the outout text
    TextTransform.mount(
        ".text-transform",
        [
            {
                name: "Input String",
                parser: null,
            }
        ],
        [
            {
                name: "Uppercase",
                formatter: function (arg) {
                    return arg.toUpperCase()
                },
            },
            {
                name: "Lowercase",
                formatter: function (arg) {
                    return arg.toLowerCase()
                },
            }
        ],
    );
});
```

Parsers and formatters functions can return a `Promise` if you require async functionality.

# Examples

- [Basic example](https://agustinsrg.github.io/Text-Transform/example.html)
- [Example of base encoder](https://agustinsrg.github.io/Text-Transform/apps/base-encoder/)

# Build from source code

Install dependencies:

```sh
npm install
```

Build minified files:

```sh
npm run build
```
