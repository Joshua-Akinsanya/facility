Routes

###

* BACKENDURL/api/v1/facilities/

- GET BACKENDURL/api/v1/facilities/all
Authorization: Bearer AuthToken

Get all facilities

- GET BACKENDURL/api/v1/facilities/:id
Authorization: Bearer AuthToken

Get one facility

- POST BACKENDURL/api/v1/facilities/new
Authorization: Bearer AuthToken
Content-Type: application/json
{ JSON BODY }

Save new facility to database

- DELETE BACKENDURL/api/v1/facilities/:id
Authorization: Bearer AuthToken

Delete facility

- PATCH BACKENDURL/api/v1/facilities/
Authorization: Bearer AuthToken
Content-Type: application/json
{ JSON BODY }

Update Facility

###

* BACKENDURL/api/v1/users

- GET BACKENDURL/api/v1/users/all
Authorization: Bearer AuthToken

Get All users. Only accessible by Admins

- GET BACKENDURL/api/v1/users/:id
Authorization: Bearer AuthToken

Get one user with ID

- POST BACKENDURL/api/v1/users/new
Content-Type: application/json
{ JSON BODY }

Create new user

- POST BACKENDURL/api/v1/users/login
Content-Type: application/json
{ JSON BODY }

Send login details in body and receive token

- DELETE BACKENDURL/api/v1/users/:id
Authorization: Bearer AuthToken

Delete User with ID

- PATCH BACKENDURL/api/v1/users/:id
Authorization: Bearer AuthToken
Content-Type: application/json
{ JSON BODY }

Update user with ID