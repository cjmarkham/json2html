JSON2HTML
===

### Running
`bin/run <input> [output]`

For example:

`bin/run input.json output.html`

If no output is given, the HTML is output to stdout

# Input
The input must be a JSON file

Example input:
```
[
  {
    "!DOCTYPE": {
      "kind": "NoClosable"
    }
  },
  {
    "head": {
      "children": [{
        "link": {
          "attributes": {
            "rel": "stylesheet",
            "href": "./styles.css"
          },
          "kind": "SelfClosable"
        }
      }, {
        "title": {
          "text": "My cool site"
        }
      }]
    }
  },
  {
    "body": {
      "children": [{
        "h1": {
          "text": "Welcome",
          "attributes": {
            "class": ["heading"]
          }
        }
      }, {
        "div": {
          "attributes": {
            "class": "container"
          },
          "children": [{
            "p": {
              "attributes": {
                "style": "color: red; background: white"
              },
              "text": "Hello World"
            }
          }]
        }
      }]
    }
  }
]
```

# Output
The path to a file

# Structure

Each element is specified as an object. The key is the element to render.

`{ "head": {} }`

Available keys and values are:

Key | Description | Optional | Default
----|-------------|----------|---------
`kind` | Defines how this element closes (`SelfClosable` `NoClosable` `Closable`) | `true` | `Closable`
`children` | An array of elements | `true` | 
`text` | The `innerText` of this element | `true` |

As well as the above, the `attributes` key can also be passed. This is an object list of HTMLElement attributes

`{ head: { attributes: { id: '1', class: ['c1', 'c2'] } }`
