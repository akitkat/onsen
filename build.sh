#!/bin/sh

# hotels.json
wget "${JSON_URL_HOTELS}" -O 'hotels.json'
mv -v hotels.json static/data/

# golfCourse.json
wget "${JSON_URL_GOLF_COURSE}" -O 'golfCourse.json'
mv -v golfCourse.json static/data/

# cache clear
gatsby clean

# build
gatsby build --no-colors --verbose

# amp
rm -rf public/amp
cp -r public amp
mv amp public
cd public/amp

# delete files exclude .html
find ./ -type f ! -name "*.html" -delete

# delete empty folders
find ./ -type d -empty -delete

# delete not support amp folders
ls -d */ | grep -P "^\d+\/$" | xargs rm -rfv

# delete other unuse files and folders
rm -rf tag/ offline-plugin-app-shell-fallback/ privacy-policy/ 404.html index.html

cd ../../

# convert html to amp
node ampify.js