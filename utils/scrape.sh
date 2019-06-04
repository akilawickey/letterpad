wget \
     --quiet \
     --recursive \
     --page-requisites \
     --html-extension \
     --convert-links \
     --restrict-file-names=windows \
     --domains localhost \
     --directory-prefix=static \
     --progress=bar \
     --no-parent \
         localhost:4040