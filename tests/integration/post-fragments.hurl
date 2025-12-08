# Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments
Content-Type: text/plain
[BasicAuth]
user1@email.com:password1

`This is a fragment!`

HTTP/1.1 201

[Asserts]
# Just check that Location header exists
header "Location" isString
