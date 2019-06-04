#!/bin/bash
./utils/scrape.sh

pr() {
    git checkout -b $1
    git add .
    git commit -m "[Letterpad] - generated commit"
    git push -u origin "$1"
    hub pull-request -h "$1" -F -
}

pr "new-changes-$(date +%F)" <<MSG