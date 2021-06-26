/* Base encoder */

TextTransform.ready(function () {
    TextTransform.mount(
        ".text-transform",
        [
            {
                name: "UTF-8",
                parser: null,
            },
            {
                name: "Hexadecimal",
                parser: function (hex) {
                    if (hex.indexOf("0x") === 0) {
                        hex = hex.substr(2);
                    }
                    hex = hex.replace(/[^a-f0-9]/gi, '');
                    var rval = '';
                    var i = 0;
                    if (hex.length & 1 == 1) {
                        // odd number of characters, convert first character alone
                        i = 1;
                        rval += String.fromCharCode(parseInt(hex[0], 16));
                    }
                    // convert 2 characters (1 byte) at a time
                    for (; i < hex.length; i += 2) {
                        rval += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                    }
                    return rval;
                },
            },
            {
                name: "Base 64",
                parser: function (arg) {
                    try {
                        return atob(arg);
                    } catch (ex) {
                        throw new Error("Invalid Base 64");
                    }
                },
            }
        ],
        [
            {
                name: "UTF-8",
                formatter: null,
            },
            {
                name: "Hexadecimal",
                formatter: function (arg) {
                    var rval = '';
                    for (var i = 0; i < arg.length; ++i) {
                        var b = arg.charCodeAt(i);
                        if (b < 16) {
                            rval += '0';
                        }
                        rval += b.toString(16);
                    }
                    return rval;
                }
            },
            {
                name: "Base 64",
                formatter: function (arg) {
                    return btoa(arg);
                },
            },
        ],
    );
});
