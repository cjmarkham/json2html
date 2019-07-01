import { expect } from 'chai'
import JSON2HTML from '../src/index'

describe('toArray()', () => {
  it('returns the correct array of elements', () => {
    const json = JSON.stringify(
      [{
        "name": "body",
        "elements": [{
          "name": "h1",
          "class": ["c1", "c2"],
          "id": "id1",
          "text": "Foobar",
          "elements": [{
            "name": "span",
            "text": "This is a span"
          }]
        }, {
          "name": "h2",
          "text": "Subheading",
          "id": "subheading",
          "data": {
            "something": "foo"
          }
        }]
      }]
    )
    const klass = new JSON2HTML(json)
    const array = klass.run().toArray()
    expect(array).to.deep.eq([
      '<body>',
      '<h1 class="c1 c2" id="id1">',
      'Foobar',
      '<span>',
      'This is a span',
      '</span>',
      '</h1>',
      '<h2 id="subheading" data-something="foo">',
      'Subheading',
      '</h2>',
      '</body>',
    ])
  })
})

describe('toString()', () => {
  it('returns the correct string of elements', () => {
    const json = JSON.stringify(
      [{
        "name": "body",
        "elements": [{
          "name": "h1",
          "class": ["c1", "c2"],
          "id": "id1",
          "text": "Foobar",
          "elements": [{
            "name": "span",
            "text": "This is a span"
          }]
        }, {
          "name": "h2",
          "text": "Subheading",
          "id": "subheading"
        }]
      }]
    )
    const klass = new JSON2HTML(json)
    const string = klass.run().toString()
    expect(string).to.eq('<body><h1 class="c1 c2" id="id1">Foobar<span>This is a span</span></h1><h2 id="subheading">Subheading</h2></body>')
  })
})
