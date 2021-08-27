echo "Converting html to PDFs..."

mkdir ../../static/pdfs
mkdir ../../static/pdfs/archive
mkdir ../../static/pdfs/archive/tmp
tarball_name=redis-docs-$(date +'%Y-%m-%dT%H%M%S')
mkdir ../../static/pdfs/archive/tmp/$tarball_name

location=localhost:1313
if [ -z "$LOCATION" ]
then
    location=localhost:1313
else
    location=docs.redis.com/$LOCATION
fi

wkhtmltopdf http://$location/pdf-gen-rc-docs/ ../../static/pdfs/archive/tmp/$tarball_name/rc-docs.pdf
wkhtmltopdf http://$location/pdf-gen-rs-docs/ ../../static/pdfs/archive/tmp/$tarball_name/rs-docs.pdf
wkhtmltopdf http://$location/pdf-gen-ri-docs/ ../../static/pdfs/archive/tmp/$tarball_name/ri-docs.pdf
wkhtmltopdf http://$location/pdf-gen-modules-docs/ ../../static/pdfs/archive/tmp/$tarball_name/modules-docs.pdf
wkhtmltopdf http://$location/pdf-gen-platforms-docs/ ../../static/pdfs/archive/tmp/$tarball_name/platforms-docs.pdf

echo "Finished converting html to PDFs."

echo "Creating PDFs tarball..."
tar -czvf ../../static/pdfs/archive/$tarball_name.tar.gz -C ../../static/pdfs/archive/tmp/ $tarball_name 
echo "Finished creating PDFs tarball."
