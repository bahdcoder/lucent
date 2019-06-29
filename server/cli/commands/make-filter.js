const Fs = require('fs')
const Path = require('path')
const Consola = require('consola')
const ChangeCase = require('change-case')

const {
    createAndWriteToFile,
    getStubContent,
    filterExists,
    getFiltersPath
} = require('../helpers')

module.exports = fn => {
    const filterName = ChangeCase.pascalCase(fn)

    Fs.mkdirSync(Path.resolve(process.cwd(), 'Pangaso', 'Filters'), {
        recursive: true
    })

    if (filterExists(filterName)) {
        return Consola.error(`Filter ${filterName} already exists.`)
    }

    const stubContent = getStubContent('filter', {
        filterName
    })

    if (createAndWriteToFile(getFiltersPath(filterName), stubContent)) {
        Consola.success(`Filter ${filterName} created succesfully.`)
    }
}
