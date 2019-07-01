export default class JSON2HTML {
    output: string[];
    json: string;
    constructor(json: string);
    run(): JSON2HTML;
    private renderElement;
    toArray(): string[];
    toString(): string;
    toPretty(): string;
}
