#!/usr/bin/env node

const Consola = require('consola')
const program = require('commander')
const ChangeCase = require('change-case')
const {
    createAndWriteToFile,
    getStubContent,
    resourceExists,
    getResourcePath
} = require('./helpers')

program.version('0.1.0').description('Pangaso CLI')

program
    .command('make:resource <resource-name>')
    .description('Make a new pangaso resource')
    .action(rn => {
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
    })

program.parse(process.argv)
