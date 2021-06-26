// Example

TextTransform.ready(function () {
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
