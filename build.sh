#!/bin/sh

mkdir images

# cache clear
gatsby clean

# build
gatsby build

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