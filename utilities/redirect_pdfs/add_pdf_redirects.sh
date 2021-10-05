echo "Adding PDF redirects..."

touch new_website.json

awk "1;/RoutingRules/{exit}" ../../website.json >> new_website.json
cat pdf_redirects.json >> new_website.json
awk "p;/RoutingRules/{p=1}" ../../website.json >> new_website.json

echo "Finished appending PDF redirects."
