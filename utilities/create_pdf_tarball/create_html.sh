echo "Preparing html for offline docs PDF generation..."

echo "Preparing rc docs html"
mkdir ../../layouts/pdf-gen-rc-docs
cat ./list_template_recursive.html | sed 's/parent_filepath/"rc\/_index.md"/g' > ../../layouts/pdf-gen-rc-docs/list.html
mkdir ../../content/pdf-gen-rc-docs
touch ../../content/pdf-gen-rc-docs/_index.md

echo "Preparing rs docs html"
mkdir ../../layouts/pdf-gen-rs-docs
cat ./list_template_recursive.html | sed 's/parent_filepath/"rs\/_index.md"/g' > ../../layouts/pdf-gen-rs-docs/list.html
mkdir ../../content/pdf-gen-rs-docs
touch ../../content/pdf-gen-rs-docs/_index.md

echo "Preparing ri docs html"
mkdir ../../layouts/pdf-gen-ri-docs
cat ./list_template_recursive.html | sed 's/parent_filepath/"ri\/_index.md"/g' > ../../layouts/pdf-gen-ri-docs/list.html
mkdir ../../content/pdf-gen-ri-docs
touch ../../content/pdf-gen-ri-docs/_index.md

echo "Preparing modules docs html"
mkdir ../../layouts/pdf-gen-modules-docs
cat ./list_template_recursive.html | sed 's/parent_filepath/"modules\/_index.md"/g' > ../../layouts/pdf-gen-modules-docs/list.html
mkdir ../../content/pdf-gen-modules-docs
touch ../../content/pdf-gen-modules-docs/_index.md

echo "Preparing platforms docs html"
mkdir ../../layouts/pdf-gen-platforms-docs
cat ./list_template_recursive.html | sed 's/parent_filepath/"platforms\/_index.md"/g' > ../../layouts/pdf-gen-platforms-docs/list.html
mkdir ../../content/pdf-gen-platforms-docs
touch ../../content/pdf-gen-platforms-docs/_index.md

echo "Finished preparing html for offline docs PDF generation."
