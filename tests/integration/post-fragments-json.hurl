# Test JSON fragment POST and GET
POST http://localhost:8080/v1/fragments
Content-Type: application/json
[BasicAuth]
user1@email.com:password1

{"test": "data"}

HTTP/1.1 201

[Asserts]
header "Location" isString
