# Test Content-Type with charset works
POST http://localhost:8080/v1/fragments
Content-Type: text/plain; charset=utf-8
[BasicAuth]
user1@email.com:password1

`Fragment with charset`

HTTP/1.1 201

[Asserts]
header "Location" isString
