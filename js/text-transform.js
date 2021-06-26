/* Text-Transform | v1.0.0 | By AgustinSRG */

function escapeHTML(html) {
    return ("" + html).replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

window.TextTransform = {
    el: null,
    inFormats: [],
    outFormats: [],
    /**
     * Waits until the document is ready to create the text transform
     * @param {function} callback 
     */
    ready: function (callback) {
        if (document.readyState === "complete") {
            callback();
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    },
    /**
     * Creates the text transform
     * @param {string | Element} element Root element where the text transform is mounted
     * @param {{name: string, parser: (string) => any}[]} inFormats 
     * @param {{name: string, formatter: (any) => string}[]} outFormats 
     */
     mount: function (element, inFormats, outFormats) {
        if (typeof element === "string") {
            this.el = document.querySelector(element);
        } else {
            this.el = element;
        }
        this.inFormats = inFormats;
        this.outFormats = outFormats;
        this.render();
    },
    render: function () {
        if (!this.el) return;

        var html = "";

        // FROM

        html += '<div class="tt-side tt-side-from">';

        {
            html += '<div class="tt-side-header">';

            {
                html += '<span>FROM:</span>';
                html += '<select class="tt-select tt-from">';

                if (this.inFormats.length > 0) {
                    this.inFormats.forEach(function (format, i) {
                        html += '<option value="' + escapeHTML(i) + '"' + (i == 0 ? ' selected' : '') + '>' + escapeHTML(format.name) + '</option>';
                    });
                } else {
                    html += '<option value="0">Default input format</option>';
                }

                html += '</select>';
            }

            html += '</div>';

            html += '<div class="tt-side-body">';

            {
                html += '<textarea class="tt-textarea tt-input"></textarea>';
            }

            html += '</div>';
        }

        html += '</div>';

        // TO

        html += '<div class="tt-side tt-side-to">';

        {
            html += '<div class="tt-side-header">';

            {
                html += '<span>TO:</span>';
                html += '<select class="tt-select tt-to">';

                if (this.outFormats.length > 0) {
                    this.outFormats.forEach(function (format, i) {
                        html += '<option value="' + escapeHTML(i) + '"' + (i == 0 ? ' selected' : '') + '>' + escapeHTML(format.name) + '</option>';
                    });
                } else {
                    html += '<option value="0">Default output format</option>';
                }

                html += '</select>';
            }

            html += '</div>';

            html += '<div class="tt-side-body">';

            {
                html += '<textarea class="tt-textarea tt-output" readonly></textarea>';
            }

            html += '</div>';
        }

        html += '</div>';

        // Set html
        this.el.innerHTML = html;
        this.el.classList.add("text-transform");
        
        // Add event listeners
        this.raf(this.addListeners.bind(this));
    },
    raf: function (callback) {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        if (requestAnimationFrame) {
            requestAnimationFrame(callback);
        } else {
            setTimeout(callback, 100);
        }
    },
    addListeners: function () {
        this.el.querySelector(".tt-input").addEventListener("input", this.update.bind(this));
        this.el.querySelector(".tt-from").addEventListener("change", this.update.bind(this));
        this.el.querySelector(".tt-to").addEventListener("change", this.update.bind(this));
        this.update();
    },
    updating: false,
    requiresUpdate: false,
    update: function () {
        if (this.updating) {
            this.requiresUpdate = true;
            return;
        }

        this.updating = true;

        this.el.querySelector(".tt-output").classList.remove("tt-error");
        var textInput = this.el.querySelector(".tt-input").value + "";

        this.updateInput(textInput);
    },
    endUpdate: function () {
        this.updating = false;
        if (this.requiresUpdate) {
            this.requiresUpdate = false;
            this.update();
        }
    },
    updateInput: function (textInput) {
        var intermediary;

        try {
            var fromFormatIndex = parseInt(this.el.querySelector(".tt-from").value, 10);
            if (this.inFormats[fromFormatIndex] && typeof this.inFormats[fromFormatIndex].parser === "function") {
                intermediary = this.inFormats[fromFormatIndex].parser(textInput);
            } else {
                intermediary = textInput;
            }
        } catch (ex) {
            this.endUpdate();
            this.el.querySelector(".tt-output").value = "Error [Input] => " + ex.message;
            this.el.querySelector(".tt-output").classList.add("tt-error");
            return;
        }

        if (window.Promise && intermediary instanceof Promise) {
            intermediary.then(this.updateOutput.bind(this)).catch(function (ex) {
                this.endUpdate();
                this.el.querySelector(".tt-output").value = "Error [Input] => " + ex.message;
                this.el.querySelector(".tt-output").classList.add("tt-error");
            }.bind(this));
        } else {
            this.updateOutput(intermediary);
        }
    },
    updateOutput: function (intermediary) {
        var final;

        try {
            var toFormatIndex = parseInt(this.el.querySelector(".tt-to").value, 10);
            if (this.outFormats[toFormatIndex] && typeof this.outFormats[toFormatIndex].formatter === "function") {
                final = this.outFormats[toFormatIndex].formatter(intermediary);
            } else {
                final = intermediary;
            }
        } catch (ex) {
            this.endUpdate();
            this.el.querySelector(".tt-output").value = "Error [Output] => " + ex.message;
            this.el.querySelector(".tt-output").classList.add("tt-error");
            return;
        }

        if (window.Promise && final instanceof Promise) {
            final.then(this.updateFinish.bind(this)).catch(function (ex) {
                this.endUpdate();
                this.el.querySelector(".tt-output").value = "Error [Output] => " + ex.message;
                this.el.querySelector(".tt-output").classList.add("tt-error");
            }.bind(this));
        } else {
            this.updateFinish(final);
        }
    },
    updateFinish: function (final) {
        this.el.querySelector(".tt-output").value = (final + "");
        this.endUpdate();
    }
};

