# Authentication

- Developer provides a `POST` endpoint, to which we make a request to authenticate the user. This endpoint, upon successful authentication returns `{ id: 'ID_OF_AUTHENTICATED_ENTITY' }`. With this Id, we'll fetch the authenticated entity from the database, generate a JWT and return to the React JS frontend.

# Authorisation

- Developer provides methods used to authorise authenticated user.