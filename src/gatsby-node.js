const crypto = require('crypto')
const pluralize = require('pluralize')
const Fridge = require('fridge')

const classCase = (string) =>
  string
    .split(/[-_]/g)
    .filter(v => !!v)
    .map(v => v[0].toUpperCase() + v.toLowerCase().slice(1))
    .join('')

exports.sourceNodes = async ({ boundActionCreators }, {token}) => {
  const {createNode} = boundActionCreators

  const fridge = new Fridge({token})

  const [site] = await fridge.get('sites', {expand: 'types'})

  createNode(Object.assign({
    parent: '__SOURCE__',
    children: [],
    internal: {
      type: 'Fridge',
      contentDigest: crypto
        .createHash('md5')
        .update(JSON.stringify(site))
        .digest('hex')
    }
  }, site))

  await Promise.all(site.types.map(async type => {
    const name = classCase(type.slug)

    createNode(Object.assign({
      parent: '__SOURCE__',
      children: [],
      internal: {
        type: `fridge${name}`,
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(type))
          .digest('hex')
      }
    }, type))

    if (!type.collection) return

    const content = await fridge.get(`content/${type.id}`)
    content.forEach(row =>
      createNode(Object.assign({
        parent: type.id,
        children: [],
        internal: {
          type: `Fridge${pluralize(name)}`,
          contentDigest: crypto
            .createHash('md5')
            .update(JSON.stringify(row))
            .digest('hex')
        }
      }, row))
    )
  }))

  return
}
