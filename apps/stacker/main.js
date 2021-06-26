/* Base encoder */

TextTransform.ready(function () {
    TextTransform.mount(
        ".text-transform",
        [
            {
                name: "Input (Item list)",
                parser: null,
            },
        ],
        [
            {
                name: "Output (Stacked item list)",
                formatter: function (arg) {
                   var lines = arg.split("\n");

                   return lines.map(function (line) {
                       if ((/^[^\-]+\-(\s)*[0-9]+(\s)*$/i).test(line)) {
                           var material = line.split("-")[0].trim();
                           var amount = parseInt(line.split("-")[1].trim(), 10);
                           var shulkers = Math.floor(amount / (27 * 64));
                           var rest = amount % (27 * 64);
                           var stacks = Math.floor(rest / 64);
                           if (rest % 64 > 0) {
                               stacks++;
                           }
                           return material + ' - ' + amount + " blocks => " + (shulkers > 0 ? (shulkers + ' SHULKERS') : '') + ((shulkers > 0 && stacks > 0) ? ' & ': '') + (stacks > 0 ? (stacks + ' STACKS') : '');
                       } else {
                           return line;
                       }
                   }).join('\n');
                }
            },
        ],
    );
});
