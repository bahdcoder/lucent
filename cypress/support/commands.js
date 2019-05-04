const faker = require('faker')
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const getFakeData = () => ({
    contacts: getFakeContact(),
    organisations: getFakeOrg()
})

// -- Add a command to find elements using data-testid -- //
Cypress.Commands.add('getById', id => cy.get(`[data-testid=${id}]`))

// -- Add a command to clear collection on the server -- //
Cypress.Commands.add('clearResource', collection =>
    cy.request('DELETE', `/api/resources/${collection}/clear`)
)

// -- Add a command to seed collection data on the server -- //
Cypress.Commands.add('seedResource', (collection, data) => {
    const body = data || getFakeData()[collection]

    return cy.request('POST', `/api/resources/${collection}/`, body)
})

// -- Add a command to generate fake organisation -- //
global.getFakeOrg = data => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: {
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        postalCode: faker.address.zipCode()
    }
})

// -- Add a command to generate fake contact data -- //
global.getFakeContact = data => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: {
        city: faker.address.city(),
        state: faker.address.state(),
        postalCode: faker.address.zipCode()
    }
})
