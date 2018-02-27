<div align="center">
  <img src="https://fridgecms.com/static/Fridge-dark.svg" width="32" />
  <h1>gatsby-source-fridge</h1>
  Official source plugin for adding <a href="https://fridgecms.com" target="_blank">Fridge</a> content to <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>.
</div>

## Installation

```
$ npm install --save gatsby-source-fridge
```

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-fridge',
      options: {
        token: 'FRIDGE_API_TOKEN'
      }
    }
  ]
}
```

## Examples

* [Basic Blog](https://github.com/fridge-cms/examples/tree/master/gatsby-basic-blog)

## Querying Content

```graphql
allFridgePages {
  edges {
    node {
      name
      slug
      content
      images {
        url
      }
    }
  }
}
```

```graphql
fridgeSettings {
  logo {
    url
  }
  copyright
}
```
