export default JSON.stringify({
  "!DOCTYPE html": {
    "kind": "NoClosable"
  },
  "head": {
    "attributes": {
      "data": {
        "foo": "bar"
      }
    },
    "children": [
      {
        "link": {
          "attributes": {
            "rel": "stylesheet",
            "href": "./styles.css"
          },
          "kind": "SelfClosable"
        }
      },
      {
        "title": {
          "text": "My cool site"
        }
      }
    ]
  },
  "body": {
    "children": [
      {
        "input": {
          "attributes": {
            "type": "text",
            "disabled": true
          },
          "kind": "SelfClosable"
        }
      },
      {
        "h1": {
          "text": "Welcome",
          "attributes": {
            "class": [
              "heading"
            ],
            "id": "id1"
          }
        }
      },
      {
        "div": {
          "attributes": {
            "class": "container"
          },
          "children": [
            {
              "p": {
                "attributes": {
                  "style": "color: red; background: white"
                },
                "text": "Hello World"
              }
            }
          ]
        }
      }
    ]
  }
})
