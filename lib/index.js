"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClosableKind;
(function (ClosableKind) {
    ClosableKind["Closable"] = "Closable";
    ClosableKind["SelfClosable"] = "SelfClosable";
    ClosableKind["NoClosable"] = "NoClosable";
})(ClosableKind || (ClosableKind = {}));
class JSON2HTML {
    constructor(json) {
        this.output = [];
        this.json = json;
    }
    run() {
        const map = JSON.parse(this.json);
        for (const el of map) {
            for (const name in el) {
                this.renderElement(name, el[name]);
            }
        }
        return this;
    }
    renderElement(name, element, depth = 0) {
        let opener = `${'\t'.repeat(depth)}<${name}`;
        if (element.attributes) {
            // Loop through and build all data attributes
            if (element.attributes.data && typeof element.attributes.data === 'object') {
                for (const key in element.attributes.data) {
                    opener += ` data-${key}="${element.attributes.data[key]}"`;
                }
                // So we don't add it again when we loop over attributes lower down
                delete element.attributes.data;
            }
            if (element.attributes.class) {
                const classes = element.attributes.class;
                if (Array.isArray(classes)) {
                    opener += ` class="${classes.join(' ')}"`;
                }
                else {
                    opener += ` class="${classes}"`;
                }
                // So we don't add it again when we loop over attributes lower down
                delete element.attributes.class;
            }
            for (const key in element.attributes) {
                const value = element.attributes[key];
                opener += ` ${key}="${value}"`;
            }
        }
        if (element.kind === ClosableKind.SelfClosable) {
            this.output.push(`${opener} />`);
            return;
        }
        this.output.push(`${opener}>`);
        if (element.text) {
            this.output.push(`${'\t'.repeat(depth + 1)}${element.text}`);
        }
        // render each element in this elements tree
        if (element.children && element.children.length > 0) {
            for (const el of element.children) {
                for (const name in el) {
                    this.renderElement(name, el[name], depth + 1);
                }
            }
        }
        // Don't close (such as !DOCTYPE)
        if (element.kind === ClosableKind.NoClosable) {
            return;
        }
        // close this element
        this.output.push(`${'\t'.repeat(depth)}</${name}>`);
    }
    toArray() {
        return this.output;
    }
    toString() {
        return this.output.join('').replace(/\t/g, '');
    }
    toPretty() {
        return this.output.join('\n');
    }
}
exports.default = JSON2HTML;
