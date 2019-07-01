import { expect } from 'chai'
import JSON2HTML from '../src/index'
import json from './input'

describe('toArray()', () => {
  it('returns the correct array of elements', () => {
    const klass = new JSON2HTML(json)
    const array = klass.run().toArray()
    expect(array).to.deep.eq([
      { depth: 0, element: '<!DOCTYPE html>' },
      { depth: 0, element: '<head data-foo="bar">' },
      { depth: 1, element: '<link rel="stylesheet" href="./styles.css" />' },
      { depth: 1, element: '<title>' },
      { depth: 2, element: 'My cool site' },
      { depth: 1, element: '</title>' },
      { depth: 0, element: '</head>' },
      { depth: 0, element: '<body>' },
      { depth: 1, element: '<input type="text" disabled />' },
      { depth: 1, element: '<h1 class="heading" id="id1">' },
      { depth: 2, element: 'Welcome' },
      { depth: 1, element: '</h1>' },
      { depth: 1, element: '<div class="container">' },
      { depth: 2, element: '<p style="color: red; background: white">' },
      { depth: 3, element: 'Hello World' },
      { depth: 2, element: '</p>' },
      { depth: 1, element: '</div>' },
      { depth: 0, element: '</body>' },
    ])
  })
})

describe('toString()', () => {
  it('returns the correct string of elements', () => {
    const klass = new JSON2HTML(json)
    const string = klass.run().toString()
    expect(string).to.eq(
      '<!DOCTYPE html><head data-foo="bar"><link rel="stylesheet" href="./styles.css" /><title>My cool site</title></head><body><input type="text" disabled /><h1 class="heading" id="id1">Welcome</h1><div class="container"><p style="color: red; background: white">Hello World</p></div></body>'
    )
  })
})

describe('toPretty()', () => {
  it('returns the correct string of elements', () => {
    const klass = new JSON2HTML(json)
    const string = klass.run().toPretty().replace(/\t/g, '  ')
    expect(string).to.eq(
`<!DOCTYPE html>
<head data-foo="bar">
  <link rel="stylesheet" href="./styles.css" />
  <title>
    My cool site
  </title>
</head>
<body>
  <input type="text" disabled />
  <h1 class="heading" id="id1">
    Welcome
  </h1>
  <div class="container">
    <p style="color: red; background: white">
      Hello World
    </p>
  </div>
</body>`
    )
  })
})
