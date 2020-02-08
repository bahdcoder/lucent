const Axios = require('axios')
const faker = require('faker')

// -- Add a command to generate fake organisation -- //
const getFakeOrg = data => ({
    name: faker.company.companyName(),
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
const getFakeContact = data => ({
    age: faker.random.number(),
    email: faker.internet.email(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    firstName: faker.name.firstName(),
    bio: faker.lorem.paragraph(),
    password: faker.lorem.word(),
    address: {
        city: faker.address.city(),
        state: faker.address.state(),
        postalCode: faker.address.zipCode()
    }
})

const items = Array.from({ length: 100 })

for (let index = 0; index < items.length; index++) {
    Axios.post(
        `http://localhost:3004/api/resources/organisations`,
        getFakeOrg()
    ).catch(({ response }) => console.log(response.data.resourceErrors))
}

for (let index = 0; index < items.length; index++) {
    Axios.post(
        `http://localhost:3004/api/resources/contacts`,
        getFakeContact()
    ).catch(({ response }) => console.log(response.data.resourceErrors))
}

// Axios.delete('http://localhost:3004/api/resources/contacts/clear')
// Axios.delete('http://localhost:3004/api/resources/organisations/clear')
