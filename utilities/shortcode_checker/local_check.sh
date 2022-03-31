# Run this script locally to check for broken shortcodes in the content files

# Built-in shortcodes provided by Hugo
shortcodes="figure\|gist\|highlight\|instagram\|param\|ref\|relref\|tweet\|vimeo\|youtube"
# Content categories to search
categories="modules ri rc rs kubernetes"
broken_shortcodes=""

# Collect custom shortcode names
for file in $(ls ../../layouts/shortcodes); do
    shortcodes+="\|"
    shortcodes+=$(echo $file | sed 's/.html//g')
done

echo "Generating static HTML for shortcode verification..."

# Create temporary static HTML
cd ../../
hugo -d utilities/shortcode_checker/tmp_files
cd ./utilities/shortcode_checker/tmp_files

echo
echo "Searching for possible broken shortcodes..."

# Search for broken shortcodes in the static HTML
for dir in $categories; do
    broken_shortcodes+=$(grep -r $shortcodes ./$dir | grep "{{\|}}" | grep "<p>\|</p>")
done

# Locate broken shortcodes in the original Markdown files
cd ../../../content
for sc in $broken_shortcodes; do
    if echo $sc | grep -q "index.html"
    then
        # Extract filepath and potentially broken shortcode
        filepath=$(echo $sc | cut -d ":" -f1 | sed "s#/index.html##g" | sed "s#\./##g")
        text=$(echo $sc | cut -d ":" -f2 | sed "s/<p>//g" | sed "s#</p>##g" | sed "s/&ldquo;/\"/g" | sed "s/&rdquo;/\"/g")
        text_escaped=$(echo $text | sed "s/\[/\\\[/g" | sed "s/\]/\\\]/g")

        echo
        echo $filepath

        # Get line numbers of possible broken shortcodes
        echo "Check lines: "
        if [ -d "$filepath" ]
        then
            grep -n "${text_escaped}" $filepath/_index.md | cut -d ":" -f1
        else
            grep -n "${text_escaped}" $filepath.md | cut -d ":" -f1
        fi

        echo "Look for: "
        echo $text
    else
        echo $sc | sed "s/<p>//g" | sed "s#</p>##g" | sed "s/&ldquo;/\"/g" | sed "s/&rdquo;/\"/g"
    fi
done

# Clean up temporary static HTML
cd ../utilities/shortcode_checker
rm -r tmp_files

