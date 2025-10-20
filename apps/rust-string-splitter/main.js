/* Base encoder */

TextTransform.ready(function () {
    TextTransform.mount(
        ".text-transform",
        [
            {
                name: "Input (String)",
                parser: null,
            },
        ],
        [
            {
                name: "Output (Multi-line)",
                formatter: function (arg) {
                    var chunks = [];

                    while (arg.length > 64) {
                        chunks.push(arg.substring(0, 64));
                        arg = arg.substring(64);
                    }

                    if (arg) {
                        chunks.push(arg);
                    }

                    return "[\n" + chunks.map(c => "    " + JSON.stringify(c)).join(',\n') + "\n].concat()";
                }
            },
        ],
    );
});
