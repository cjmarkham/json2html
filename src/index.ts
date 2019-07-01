enum ClosableKind {
  Closable = "Closable",
  SelfClosable = "SelfClosable",
  NoClosable = "NoClosable"
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
  output: string[] = []
  json: string

  constructor(json: string) {
    this.json = json
  }

  run(): JSON2HTML {
    const map = JSON.parse(this.json)
    for (const el of map) {
      for (const name in el) {
        this.renderElement(name, el[name])
      }
    }

    return this
  }

  private renderElement(name: string, element: HTMLElement, depth: number = 0): void {
    let opener = `${'\t'.repeat(depth)}<${name}`

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
        opener += ` ${key}="${value}"`
      }
    }


    if (element.kind === ClosableKind.SelfClosable) {
      this.output.push(`${opener} />`)
      return
    }

    this.output.push(`${opener}>`)

    if (element.text) {
      this.output.push(`${'\t'.repeat(depth + 1)}${element.text}`)
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
    this.output.push(`${'\t'.repeat(depth)}</${name}>`)
  }

  toArray(): string[] {
    return this.output
  }

  toString(): string {
    return this.output.join('').replace(/\t/g, '')
  }

  toPretty(): string {
    return this.output.join('\n')
  }
}
