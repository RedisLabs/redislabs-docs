echo "Generating internal links for offline docs PDF generation..."

echo "Generating internal links for rs docs html"
sed 's^href="../rs/^href="#rs/^g' ../../public/pdf-gen-rs-docs/index.html > tmp_index.html
mv tmp_index.html ../../public/pdf-gen-rs-docs/index.html

echo "Generating internal links for rc docs html"
sed 's^href="../rc/^href="#rc/^g' ../../public/pdf-gen-rc-docs/index.html > tmp_index.html
mv tmp_index.html ../../public/pdf-gen-rc-docs/index.html

echo "Generating internal links for ri docs html"
sed 's^href="../ri/^href="#ri/^g' ../../public/pdf-gen-ri-docs/index.html > tmp_index.html
mv tmp_index.html ../../public/pdf-gen-ri-docs/index.html

echo "Generating internal links for modules docs html"
sed 's^href="../modules/^href="#modules/^g' ../../public/pdf-gen-modules-docs/index.html > tmp_index.html
mv tmp_index.html ../../public/pdf-gen-modules-docs/index.html

echo "Generating internal links for platforms docs html"
sed 's^href="../platforms/^href="#platforms/^g' ../../public/pdf-gen-platforms-docs/index.html > tmp_index.html
mv tmp_index.html ../../public/pdf-gen-platforms-docs/index.html

echo "Finished generating internal links for offline docs PDF generation."
