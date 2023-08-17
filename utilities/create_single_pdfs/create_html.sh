echo "Preparing html for standalone PDF generation..."

for file in $(find ../../content/rs -name '*.md'); do
    new_dir_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    mkdir $(echo $new_dir_name | sed 's#^#../../layouts/#g')

    filepath_sub=$(echo $file | sed 's#../../content/##g')
    cat ./list_template_single.html | sed "s#filepath#\"$filepath_sub\"#g" > ../../layouts/$new_dir_name/list.html

    mkdir $(echo $new_dir_name | sed 's#^#../../content/#g')
    touch ../../content/$new_dir_name/_index.md
done

for file in $(find ../../content/rc -name '*.md'); do
    new_dir_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    mkdir $(echo $new_dir_name | sed 's#^#../../layouts/#g')

    filepath_sub=$(echo $file | sed 's#../../content/##g')
    cat ./list_template_single.html | sed "s#filepath#\"$filepath_sub\"#g" > ../../layouts/$new_dir_name/list.html

    mkdir $(echo $new_dir_name | sed 's#^#../../content/#g')
    touch ../../content/$new_dir_name/_index.md
done

for file in $(find ../../content/ri -name '*.md'); do
    new_dir_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    mkdir $(echo $new_dir_name | sed 's#^#../../layouts/#g')

    filepath_sub=$(echo $file | sed 's#../../content/##g')
    cat ./list_template_single.html | sed "s#filepath#\"$filepath_sub\"#g" > ../../layouts/$new_dir_name/list.html

    mkdir $(echo $new_dir_name | sed 's#^#../../content/#g')
    touch ../../content/$new_dir_name/_index.md
done

for file in $(find ../../content/modules -name '*.md'); do
    new_dir_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    mkdir $(echo $new_dir_name | sed 's#^#../../layouts/#g')

    filepath_sub=$(echo $file | sed 's#../../content/##g')
    cat ./list_template_single.html | sed "s#filepath#\"$filepath_sub\"#g" > ../../layouts/$new_dir_name/list.html

    mkdir $(echo $new_dir_name | sed 's#^#../../content/#g')
    touch ../../content/$new_dir_name/_index.md
done

for file in $(find ../../content/kubernetes -name '*.md'); do
    new_dir_name=$(echo $file | sed 's#../../content/#pdf-gen-#g' | sed 's#/_index##g' | sed 's#/#-#g' | sed 's#.md##g')

    mkdir $(echo $new_dir_name | sed 's#^#../../layouts/#g')

    filepath_sub=$(echo $file | sed 's#../../content/##g')
    cat ./list_template_single.html | sed "s#filepath#\"$filepath_sub\"#g" > ../../layouts/$new_dir_name/list.html

    mkdir $(echo $new_dir_name | sed 's#^#../../content/#g')
    touch ../../content/$new_dir_name/_index.md
done

echo "Finished preparing html for standalone PDF generation."
