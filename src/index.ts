import { isBoolean } from 'util';

enum ClosableKind {
  Closable = "Closable",
  SelfClosable = "SelfClosable",
  NoClosable = "NoClosable"
}

interface OutputFormat {
  depth: number
  element: string
}

interface Attributes {
  [prop: string]: string | Attributes
}

interface ElementDefinition {
  [prop: string]: HTMLElement
}

interface HTMLElement {
  kind: ClosableKind
  attributes?: Attributes
  children?: ElementDefinition[]
  closes?: string | boolean
  text?: string
}

export default class JSON2HTML {
  output: OutputFormat[] = []
  json: string

  constructor(json: string) {
    this.json = json
  }

  run(): JSON2HTML {
    const map = JSON.parse(this.json)
    for (const name in map) {
      this.renderElement(name, map[name])
    }

    return this
  }

  private renderElement(name: string, element: HTMLElement, depth: number = 0): void {
    let opener = `<${name}`

    if (element.attributes) {
      // Loop through and build all data attributes
      if (element.attributes.data && typeof element.attributes.data === 'object') {
        for (const key in element.attributes.data) {
          opener += ` data-${key}="${element.attributes.data[key]}"`
        }

        // So we don't add it again when we loop over attributes lower down
        delete element.attributes.data
      }

      if (element.attributes.class) {
        const classes = element.attributes.class
        if (Array.isArray(classes)) {
          opener += ` class="${classes.join(' ')}"`
        } else {
          opener += ` class="${classes}"`
        }

        // So we don't add it again when we loop over attributes lower down
        delete element.attributes.class
      }

      for (const key in element.attributes) {
        const value = element.attributes[key]
        // Short hand attributes (such as required | disabled)
        if (isBoolean(value) && value === true) {
          opener += ` ${key}`
        } else {
          opener += ` ${key}="${value}"`
        }
      }
    }

    if (element.kind === ClosableKind.SelfClosable) {
      this.output.push({ depth, element: `${opener} />` } as OutputFormat)
      return
    }

    this.output.push({ depth, element: `${opener}>` } as OutputFormat)

    if (element.text) {
      this.output.push({ depth: depth + 1, element: element.text } as OutputFormat)
    }

    // render each element in this elements tree
    if (element.children && element.children.length > 0) {
      for (const el of element.children) {
        for (const name in el) {
          this.renderElement(name, el[name], depth + 1)
        }
      }
    }

    // Don't close (such as !DOCTYPE)
    if (element.kind === ClosableKind.NoClosable) {
      return
    }

    // close this element
    this.output.push({ depth, element: `</${name}>` } as OutputFormat)
  }

  toArray(): object[] {
    return this.output
  }

  toString(): string {
    return this.output.map(o => o.element).join('')
  }

  toPretty(): string {
    return this.output.map(o => {
      return `${'\t'.repeat(o.depth)}${o.element}`
    }).join('\n')
  }
}
