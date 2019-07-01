// TODO: Are we going to have one massive element interface here?
interface HTMLElement {
  name: string
  class?: string[] | string
  id?: string
  text?: string
  data?: DataAttributes
  rel?: string
  href?: string
  elements?: HTMLElement[]
  closes?: boolean | string
}

// TODO: Unneeded?
interface DataAttributes {
  [prop: string]: string
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
      this.renderElement(el)
    }

    return this
  }

  private renderElement(element: HTMLElement, depth: number = 0): void {
    let opener = `${'\t'.repeat(depth)}<${element.name}`

    if (element.class) {
      if (Array.isArray(element.class)) {
        opener += ` class="${element.class.join(' ')}"`
      } else {
        opener += ` class="${element.class}"`
      }
    }

    if (element.id) {
      opener += ` id="${element.id}"`
    }

    // Loop through and build all data attributes
    if (element.data) {
      for (const key of Object.keys(element.data)) {
        opener += ` data-${key}="${element.data[key]}"`
      }
    }

    // TODO: Figure out how to actually add all the attributes
    // rather than doing if statements everywhere
    if (element.rel) {
      opener += ` rel="${element.rel}"`
    }
    if (element.href) {
      opener += ` href="${element.href}"`
    }

    if (element.hasOwnProperty('closes')) {
      if (element.closes === 'self') {
        this.output.push(`${opener} />`)
        return
      }
    }

    this.output.push(`${opener}>`)

    if (element.text) {
      this.output.push(`${'\t'.repeat(depth + 1)}${element.text}`)
    }

    // render each element in this elements tree
    if (element.elements && element.elements.length > 0) {
      for (const el of element.elements) {
        this.renderElement(el, depth + 1)
      }
    }

    // Don't close (such as !DOCTYPE)
    if (element.hasOwnProperty('closes')) {
      if (element.closes === false) {
        return
      }
    }

    // close this element
    this.output.push(`${'\t'.repeat(depth)}</${element.name}>`)
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
