#!/usr/bin/env node

const program = require('commander')
const makeFilterCommand = require('./commands/make-filter')
const makeResourceCommand = require('./commands/make-resource')

program.version('0.1.0').description('Lucent Admin CLI')

program

    /**
     *
     * Define the command for making a resource
     */
    .command('make:resource <resource-name>')
    .description('Make a new lucent resource')
    .action(makeResourceCommand)

program
    /**
     *
     * Define command for making a filter
     *
     */
    .command('make:filter <filter-name>')
    .description('Make a new lucent filter')
    .action(makeFilterCommand)

program.parse(process.argv)
