echo "Generating internal links for offline docs PDF generation..."

echo "Generating internal links for rs docs html"

sed 's^href="../rs/getting-started/getting-started-docker/^href="#Getting%20Started%20with%20Redis%20Enterprise%20Software%20using%20Docker^g' ../../public/pdf-gen-rs-docs/index.html > tmp_index.html
mv tmp_index.html ../../public/pdf-gen-rs-docs/index.html

echo "Finished generating internal links for offline docs PDF generation."
