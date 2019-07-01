interface OutputFormat {
    depth: number;
    element: string;
}
export default class JSON2HTML {
    output: OutputFormat[];
    json: string;
    constructor(json: string);
    run(): JSON2HTML;
    private renderElement;
    private addElementAttributes;
    toArray(): object[];
    toString(): string;
    toPretty(): string;
}
export {};
