## 
## build.sh
## 
## Usage:
## 
##     ./scripts/build.sh 2.0.1


## 
## Variables
## 
## 
if [ $# -ne 1 ]
then
echo "Sample usage: ./scripts/`basename $0` 2.0.1"
exit 0
fi
version=$1


## 
## Overhead
## 
## 
rm -rf build/
mkdir build/


## 
## crooked
## 
## 
shortName="crooked"
mkdir build/$shortName/
cp -R crx/ build/$shortName/crx/
rm -rf build/$shortName/crx/apps/kerning/
rm -rf build/$shortName/crx/apps/nytimes/
rm -rf build/$shortName/crx/apps/$shortName/assets/
rm -rf build/$shortName/crx/apps/$shortName/images/placeholders/
rm -rf build/$shortName/crx/apps/$shortName/images/podcasts/
rm -rf build/$shortName/crx/apps/$shortName/images/sponsors/
cp build/$shortName/crx/manifests/$shortName.json build/$shortName/crx/manifest.json
perl -0 -p -i -e 's/    "version": "[0-9\.]+"/    "version": "@ARGV"/' build/$shortName/crx/manifest.json $version
rm -rf build/$shortName/crx/manifests/
cd build/$shortName/crx/
zip -q -r $shortName-v$version.zip .
cd ../../../
mv build/$shortName/crx/$shortName-v$version.zip versions/
rm -rf build/$shortName/


## 
## kerning (cultures)
## 
## 
shortName="kerning"
mkdir build/$shortName/
cp -R crx/ build/$shortName/crx/
rm -rf build/$shortName/crx/apps/crooked/
rm -rf build/$shortName/crx/apps/nytimes/
rm -rf build/$shortName/crx/apps/$shortName/assets/
rm -rf build/$shortName/crx/apps/$shortName/images/placeholders/
rm -rf build/$shortName/crx/apps/$shortName/images/podcasts/
rm -rf build/$shortName/crx/apps/$shortName/images/sponsors/
cp build/$shortName/crx/manifests/$shortName.json build/$shortName/crx/manifest.json
perl -0 -p -i -e 's/    "version": "[0-9\.]+"/    "version": "@ARGV"/' build/$shortName/crx/manifest.json $version
rm -rf build/$shortName/crx/manifests/
cd build/$shortName/crx/
zip -q -r $shortName-v$version.zip .
cd ../../../
mv build/$shortName/crx/$shortName-v$version.zip versions/
rm -rf build/$shortName/


## 
## nytimes
## 
## 
shortName="nytimes"
mkdir build/$shortName/
cp -R crx/ build/$shortName/crx/
rm -rf build/$shortName/crx/apps/crooked/
rm -rf build/$shortName/crx/apps/kerning/
rm -rf build/$shortName/crx/apps/$shortName/assets/
rm -rf build/$shortName/crx/apps/$shortName/images/placeholders/
rm -rf build/$shortName/crx/apps/$shortName/images/podcasts/
rm -rf build/$shortName/crx/apps/$shortName/images/sponsors/
cp build/$shortName/crx/manifests/$shortName.json build/$shortName/crx/manifest.json
perl -0 -p -i -e 's/    "version": "[0-9\.]+"/    "version": "@ARGV"/' build/$shortName/crx/manifest.json $version
rm -rf build/$shortName/crx/manifests/
cd build/$shortName/crx/
zip -q -r $shortName-v$version.zip .
cd ../../../
mv build/$shortName/crx/$shortName-v$version.zip versions/
rm -rf build/$shortName/


## 
## Overhead
## 
## 
rm -rf build/


## 
## Done
## 
## 
echo "Complete"
exit 0
