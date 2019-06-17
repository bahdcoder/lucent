# Authentication

- Developer provides a `POST` endpoint, to which we make a request to authenticate the user. This endpoint, upon successful authentication returns `{ id: 'ID_OF_AUTHENTICATED_ENTITY' }`. With this Id, we'll fetch the authenticated entity from the database, generate a JWT and return to the React JS frontend.

# Authorisation

- Developer provides methods used to authorise authenticated user.
- This is gonna be tricky. What if information has to be fetched from another collection ? Should this method be async ?

# Relationships

- HasOne - With this, the resource has a field that contains the primary key to the related resource
- HasMany - With this, the resource has a field that contains an array of primary keys to the related resource

- HasOneEmbedded - This is simply an embedded object in the resource
- HasManyEmbedded - This is an array of embedded objects in the resource
