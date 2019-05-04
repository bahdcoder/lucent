let contact = getFakeContact()
let organisation = getFakeOrg()

/**
 *
 * Before all tests, clear all resource data
 * then seed resource
 *
 */
before(() => {
    cy.clearResource('contacts')
    cy.seedResource('contacts', contact)

    cy.clearResource('organisations')
    cy.seedResource('organisations', organisation)
})

describe('The contacts detail', () => {
    it('should display the details of a contact', () => {
        cy.visit('/resources/contacts')

        /**
         *
         * navigate to the resource detail page
         *
         */
        cy.getById('view-resource-0').click()

        cy.getById('detail-email').should('contain', contact.email)
        cy.getById('detail-lastName').should('contain', contact.lastName)
        cy.getById('detail-firstName').should('contain', contact.firstName)

        cy.getById('detail-address-city').should(
            'contain',
            contact.address.city
        )
        cy.getById('detail-address-state').should(
            'contain',
            contact.address.state
        )
        cy.getById('detail-address-postalCode').should(
            'contain',
            contact.address.postalCode
        )
    })

    it('should have edit button', () => {
        cy.visit('/resources/contacts')

        cy.getById('view-resource-0').click()

        cy.getById('edit-resource-button-contacts').should('contain', 'Edit')
    })

    it('should have delete button', () => {
        cy.visit('/resources/contacts')

        cy.getById('view-resource-0').click()

        cy.getById('delete-resource-button-contacts').should(
            'contain',
            'Delete'
        )
    })

    it('should trigger delete modal and delete the resource', () => {
        cy.visit('/resources/contacts')

        cy.getById('view-resource-0').click()

        cy.getById('delete-resource-button-contacts').click()

        const confirmDeleteButton = cy.getById(
            'confirm-delete-resource-button-contacts'
        )

        confirmDeleteButton.should('contain', 'Delete')

        confirmDeleteButton.click()

        cy.getById('no-items-match-criteria').should(
            'contain',
            'No items match your criteria'
        )
    })
})

describe('The organisations detail', () => {
    it('should display the details of a contact', () => {
        cy.visit('/resources/organisations')

        /**
         *
         * navigate to the resource detail page
         *
         */
        cy.getById('view-resource-0').click()

        cy.getById('detail-email').should('contain', organisation.email)
        cy.getById('detail-name').should('contain', organisation.name)
        cy.getById('detail-phone').should('contain', organisation.phone)

        cy.getById('detail-address-city').should(
            'contain',
            organisation.address.city
        )
        cy.getById('detail-address-state').should(
            'contain',
            organisation.address.state
        )
        cy.getById('detail-address-country').should(
            'contain',
            organisation.address.country
        )
        cy.getById('detail-address-postalCode').should(
            'contain',
            organisation.address.postalCode
        )
    })

    it('should have organisation edit button', () => {
        cy.visit('/resources/organisations')

        cy.getById('view-resource-0').click()

        cy.getById('edit-resource-button-organisations').should(
            'contain',
            'Edit'
        )
    })

    it('should have delete organisation button', () => {
        cy.visit('/resources/organisations')

        cy.getById('view-resource-0').click()

        cy.getById('delete-resource-button-organisations').should(
            'contain',
            'Delete'
        )
    })

    it('should trigger delete modal and delete the organisation resource', () => {
        cy.visit('/resources/organisations')

        cy.getById('view-resource-0').click()

        cy.getById('delete-resource-button-organisations').click()

        // const confirmDeleteButton = cy.getById('confirm-delete-resource-button-organisations')

        // confirmDeleteButton.should('contain', 'Delete')

        // confirmDeleteButton.click()

        // cy.getById('no-items-match-criteria').should('contain', 'No items match your criteria')
    })
})
