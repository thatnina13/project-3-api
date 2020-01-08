API="http://localhost:4741"
URL_PATH="/party"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "party": {
      "date": "'"${DATE}"'",
      "details": "'"${DETAILS}"'",
      "title": "'"${TITLE}"'"
    }
  }'

echo
