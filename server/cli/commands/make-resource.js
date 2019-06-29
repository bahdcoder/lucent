const Consola = require('consola')
const ChangeCase = require('change-case')

const {
    createAndWriteToFile,
    getStubContent,
    resourceExists,
    getResourcePath
} = require('../helpers')

module.exports = rn => {
    const resourceName = ChangeCase.pascalCase(rn)

    if (resourceExists(resourceName)) {
        return Consola.error(`Resource ${resourceName} already exists.`)
    }

    const stubContent = getStubContent('resource', {
        resourceName
    })

    if (createAndWriteToFile(getResourcePath(resourceName), stubContent)) {
        Consola.success(`Resource ${resourceName} created succesfully.`)
    }
}
