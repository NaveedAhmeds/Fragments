# Test unsupported Content-Type returns 415
POST http://localhost:8080/v1/fragments
Content-Type: application/unsupported
[BasicAuth]
user1@email.com:password1

`Unsupported data`

HTTP/1.1 415
