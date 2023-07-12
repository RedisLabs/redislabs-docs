echo "Converting html to PDFs..."

mkdir ../../public/pdfs

location=localhost:1313
if [ -z "$LOCATION" ]
then
    location=localhost:1313
else
    location=docs.redis.com/$LOCATION
fi

for file in $(find ../../content/rs -name '*.md'); do
    html_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')
    pdf_name=$(echo $file | sed 's#../../content/##g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    echo "Generating $pdf_name.pdf"
    wkhtmltopdf https://$location/$html_name/ ../../public/pdfs/$pdf_name.pdf
done

for file in $(find ../../content/rc -name '*.md'); do
    html_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')
    pdf_name=$(echo $file | sed 's#../../content/##g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    echo "Generating $pdf_name.pdf"
    wkhtmltopdf https://$location/$html_name/ ../../public/pdfs/$pdf_name.pdf
done

for file in $(find ../../content/ri -name '*.md'); do
    html_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')
    pdf_name=$(echo $file | sed 's#../../content/##g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    echo "Generating $pdf_name.pdf"
    wkhtmltopdf https://$location/$html_name/ ../../public/pdfs/$pdf_name.pdf
done

for file in $(find ../../content/stack -name '*.md'); do
    html_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')
    pdf_name=$(echo $file | sed 's#../../content/##g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    echo "Generating $pdf_name.pdf"
    wkhtmltopdf https://$location/$html_name/ ../../public/pdfs/$pdf_name.pdf
done

for file in $(find ../../content/kubernetes -name '*.md'); do
    html_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')
    pdf_name=$(echo $file | sed 's#../../content/##g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    echo "Generating $pdf_name.pdf"
    wkhtmltopdf https://$location/$html_name/ ../../public/pdfs/$pdf_name.pdf
done

echo "Finished converting html to PDFs."
