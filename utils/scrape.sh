wget \
     --recursive \
     --no-clobber \
     --page-requisites \
     --html-extension \
     --convert-links \
     --restrict-file-names=windows \
     --domains static \
     -P ../static
     --no-parent \
         localhost:4040/