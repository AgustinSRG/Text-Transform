/* Base encoder */

TextTransform.ready(function () {
    TextTransform.mount(
        ".text-transform",
        [
            {
                name: "Input (Webpack assets list)",
                parser: null,
            },
        ],
        [
            {
                name: "Output (Stacked item list)",
                formatter: function (arg) {
                    var lines = arg.split("\n");

                    var totalSize = 0;
                    var totalSizeZip = 0;

                    lines.forEach(function (line) {
                        line = line.replace(/\s\s(\s)+/g, ";");
                        var spl = line.split(";");
                        console.log(line);
                        var s = Number((spl[1] + "").split(" ")[0]);

                        if (!isNaN(s)) {
                            totalSize += s;
                        }

                        var sz = Number((spl[2] + "").split(" ")[0]);

                        if (!isNaN(sz)) {
                            totalSizeZip += sz;
                        }
                    });

                    return "Total size: " + totalSize + "KiB" + "\n" + "Total size (Gzip): " + totalSizeZip + "KiB";
                }
            },
        ],
    );
});
