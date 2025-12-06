# lab-9-s3.hurl
# Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments
Content-Type: text/plain
[BasicAuth]
user1@email.com:password1

"Hello S3!"

HTTP/1.1 201
[Captures]
url: header "Location"

# GET the fragment we just created
GET {{url}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
[Asserts]
header "Content-Type" startsWith "text/plain"
header "Content-Length" == "11"
body == "\"Hello S3!\""


# DELETE the fragment
DELETE {{url}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200

# Try to GET the fragment again
GET {{url}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 404
