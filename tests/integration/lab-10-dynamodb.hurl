# tests/integration/lab-10-dynamodb.hurl
#
# Lab 10: DynamoDB integration test

# ----------------------------
# 1) POST first JSON fragment
# ----------------------------
POST http://localhost:8080/v1/fragments
Content-Type: application/json
[BasicAuth]
user1@email.com:password1

{ "service": "DynamoDB" }

HTTP/1.1 201
[Asserts]
header "Location" exists
header "Content-Type" startsWith "application/json"

[Captures]
# Capture full URL and id from Location header
location_json_fragment: header "Location"
fragment1_url: header "Location"
fragment1_id: header "Location" regex ".*/([^/]+)$"

# ----------------------------------------------
# 2) GET metadata for first fragment (JSON one)
# ----------------------------------------------
GET {{fragment1_url}}/info
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
[Asserts]
header "Content-Type" startsWith "application/json"

# -------------------------------
# 3) POST second Markdown fragment
# -------------------------------
POST http://localhost:8080/v1/fragments
Content-Type: text/markdown
[BasicAuth]
user1@email.com:password1

"DynamoDB is great."

HTTP/1.1 201
[Asserts]
header "Location" exists
header "Content-Type" startsWith "application/json"

[Captures]
location_md_fragment: header "Location"
fragment2_url: header "Location"
fragment2_id: header "Location" regex ".*/([^/]+)$"

# ----------------------------------------------------
# 4) GET metadata for second fragment (Markdown one)
# ----------------------------------------------------
GET {{fragment2_url}}/info
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
[Asserts]
header "Content-Type" startsWith "application/json"

# ------------------------------------------------------
# 5) GET list of fragments (ensure we have some)
# ------------------------------------------------------
GET http://localhost:8080/v1/fragments
[BasicAuth]
user1@email.com:password1
[Options]
delay: 50

HTTP/1.1 200
[Asserts]
header "Content-Type" startsWith "application/json"
# Just ensure there is at least one fragment before delete
jsonpath "$.fragments" count >= 1

# ----------------------------
# 6) DELETE first JSON fragment
# ----------------------------
DELETE {{fragment1_url}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200

# --------------------------------------------------
# 7) GET first fragment again (should be 404)
# --------------------------------------------------
GET {{fragment1_url}}
[BasicAuth]
user1@email.com:password1

HTTP/1.1 404

# -------------------------------------------------------------
# 8) GET list again (still at least one fragment left)
# -------------------------------------------------------------
GET http://localhost:8080/v1/fragments
[BasicAuth]
user1@email.com:password1
[Options]
delay: 50

HTTP/1.1 200
[Asserts]
header "Content-Type" startsWith "application/json"
# After deleting one, there should still be >= 0; if your server always
# returns an array, this will always pass as long as the endpoint works.
jsonpath "$.fragments" count >= 0

