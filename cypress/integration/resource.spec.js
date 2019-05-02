describe('The View resource page', () => {
    it('should display the contact page title', () => {
        cy.visit('/')

        cy.getById('contacts').click()
        cy.getById('resource-title-contacts')
        cy.url().should('contain', 'resources/contacts')
    })

    it('should display the organisation page title', () => {
        cy.visit('/')

        cy.getById('organisations').click()
        cy.getById('resource-title-organisations')
        cy.url().should('contain', 'resources/organisations')
    })
})
