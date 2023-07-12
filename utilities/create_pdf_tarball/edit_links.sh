echo "Generating internal links for offline docs PDF generation..."

echo "Generating internal links for rs docs html"
sed 's^href="../rs/^href="#rs/^g' ../../public/pdf-gen-rs-docs/index.html > tmp_index.html
sed 's^/">^">^g' tmp_index.html | sed 's^/" >^">^g' > ../../public/pdf-gen-rs-docs/index.html

echo "Generating internal links for rc docs html"
sed 's^href="../rc/^href="#rc/^g' ../../public/pdf-gen-rc-docs/index.html > tmp_index.html
sed 's^/">^">^g' tmp_index.html | sed 's^/" >^">^g' > ../../public/pdf-gen-rc-docs/index.html

echo "Generating internal links for ri docs html"
sed 's^href="../ri/^href="#ri/^g' ../../public/pdf-gen-ri-docs/index.html > tmp_index.html
sed 's^/">^">^g' tmp_index.html | sed 's^/" >^">^g' > ../../public/pdf-gen-ri-docs/index.html

echo "Generating internal links for stack (modules) docs html"
sed 's^href="../stack/^href="#stack/^g' ../../public/pdf-gen-stack-docs/index.html > tmp_index.html
sed 's^/">^">^g' tmp_index.html | sed 's^/" >^">^g' > ../../public/pdf-gen-stack-docs/index.html

echo "Generating internal links for kubernetes docs html"
sed 's^href="../kubernetes/^href="#kubernetes/^g' ../../public/pdf-gen-kubernetes-docs/index.html > tmp_index.html
sed 's^/">^">^g' tmp_index.html | sed 's^/" >^">^g' > ../../public/pdf-gen-kubernetes-docs/index.html

echo "Finished generating internal links for offline docs PDF generation."
