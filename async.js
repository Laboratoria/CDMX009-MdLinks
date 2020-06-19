const { readFile, getLinks, validate, statsLinksValidated } = require('./index.js')


async function validateLinks (file){
  let links = await readFile(file)
  let obtainLinks = await getLinks (links)
  let validateAllLinks = await validate (obtainLinks)
  return validateAllLinks
}

async function statsLinks (file){
  let links = await readFile(file)
  let obtainLinks = await getLinks (links)
  let stats = await statsLinksValidated (obtainLinks)
  return stats
}

async function validateAndStats (file){
  console.log('Validate y estadísticos')
}


  module.exports = {
    validateLinks,
    statsLinks,
    validateAndStats
  }