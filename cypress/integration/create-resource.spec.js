/**
 * 
 * These tests are for the create resource page
 * 
 * Before all tests, clear the organisations
 * and contacts collections
 * 
 */
before(() => {
    cy.clearResource('contacts')
    cy.clearResource('organisations')
})

describe('The Create resource page', () => {
    it('should display the create contact page', () => {
        cy.visit('/')

        cy.getById('contacts').click()
        cy.getById('create-resource-contacts').click()
        cy.url().should('contain', 'resources/contacts/new')
    })

    it('should display the create organisation page', () => {
        cy.visit('/')

        cy.getById('organisations').click()
        cy.getById('create-resource-organisations').click()
        cy.url().should('contain', 'resources/organisations/new')
    })

    it('should display validation errors on create contacts form', () => {
        cy.visit('/resources/contacts/new')

        cy.getById('create-resource-button-contacts').click()

        cy.getById('field-firstName-error').should('contain', 'The firstName is required.')
        cy.getById('field-lastName-error').should('contain', 'The lastName is required.')
        cy.getById('field-email-error').should('contain', 'The email is required.')
        cy.getById('field-phone-error').should('contain', 'The phone is required.')

        cy.getById('field-address-city-error').should('contain', 'The city is required.')
        cy.getById('field-address-state-error').should('contain', 'The state is required.')
        cy.getById('field-address-postalCode-error').should('contain', 'The postalCode is required.')
    })

    it('should display validation errors on create organisations form', () => {
        cy.visit('/resources/organisations/new')

        cy.getById('create-resource-button-organisations').click()

        cy.getById('field-name-error').should('contain', 'The name is required.')
        cy.getById('field-email-error').should('contain', 'The email is required.')
        cy.getById('field-phone-error').should('contain', 'The phone is required.')

        cy.getById('field-address-city-error').should('contain', 'The city is required.')
        cy.getById('field-address-state-error').should('contain', 'The state is required.')
        cy.getById('field-address-country-error').should('contain', 'The country is required.')
        cy.getById('field-address-postalCode-error').should('contain', 'The postalCode is required.')
    })

    it('should populate the create contact form and create a new one', () => {
        cy.visit('/resources/contacts/new')

        const contact = getFakeContact()

        // populate fields
        cy.getById('field-firstName').type(contact.firstName)
        cy.getById('field-lastName').type(contact.lastName)

        cy.getById('field-email').type(contact.email)
        cy.getById('field-phone').type(contact.phone)

        // populate nested fields
        cy.getById('field-address-city').type(contact.address.city)
        cy.getById('field-address-state').type(contact.address.state)
        cy.getById('field-address-postalCode').type(contact.address.postalCode)
        cy.getById('create-resource-button-contacts').click()
    })

    it('should populate the create organisations form and create a new one', () => {
        cy.visit('/resources/organisations/new')

        const org = getFakeOrg()

        // populate fields
        cy.getById('field-name').type(org.name)
        cy.getById('field-email').type(org.email)
        cy.getById('field-phone').type(org.phone)

        // populate nested fields
        cy.getById('field-address-city').type(org.address.city)
        cy.getById('field-address-state').type(org.address.state)
        cy.getById('field-address-postalCode').type(org.address.postalCode)
        cy.getById('field-address-country').select('Cameroon')

        cy.getById('create-resource-button-organisations').click()
    })
})
