JSON2HTML
===

### Running
`bin/run <input> [output]`
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

# Options

| Name       | Optional? | Description                                   | Default    |
|------------|-----------|-----------------------------------------------|------------|
| kind       | `true`    | One of `Closable` `NoClosable` `SelfClosable` | `Closable` |
| children   | `true`    | An array of `ElementDefinition`               |            |
| attributes | `true`    | A list of HTML attributes                     |            |
| text       | `true`    | The `innerText`                               |            |
