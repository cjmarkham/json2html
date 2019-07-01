"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
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
        for (const name in map) {
            this.renderElement(name, map[name]);
        }
        return this;
    }
    renderElement(name, element, depth = 0) {
        let opener = `<${name}`;
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
            opener = this.addElementAttributes(element, opener);
        }
        if (element.kind) {
            if (!(element.kind in ClosableKind)) {
                // An invalid "kind" was specified
                console.error(`"${element.kind}" is not a valid element.kind`);
                process.exit(1);
            }
        }
        if (element.kind === ClosableKind.SelfClosable) {
            this.output.push({ depth, element: `${opener} />` });
            return;
        }
        this.output.push({ depth, element: `${opener}>` });
        if (element.text) {
            this.output.push({ depth: depth + 1, element: element.text });
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
        this.output.push({ depth, element: `</${name}>` });
    }
    addElementAttributes(element, opener) {
        // TODO: Do we need a way to verify the attributes?
        for (const key in element.attributes) {
            const value = element.attributes[key];
            // Short hand attributes (such as required | disabled)
            if (util_1.isBoolean(value) && value === true) {
                opener += ` ${key}`;
            }
            else {
                opener += ` ${key}="${value}"`;
            }
        }
        return opener;
    }
    toArray() {
        return this.output;
    }
    toString() {
        return this.output.map(o => o.element).join('');
    }
    toPretty() {
        return this.output.map(o => {
            return `${'\t'.repeat(o.depth)}${o.element}`;
        }).join('\n');
    }
}
exports.default = JSON2HTML;
