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
mkdir build/crooked/
cp -R crx/ build/crooked/crx/
rm -rf build/crooked/crx/apps/nytimes/
rm -rf build/crooked/crx/apps/crooked/assets/
cp build/crooked/crx/manifests/crooked.json build/crooked/crx/manifest.json
perl -0 -p -i -e 's/    "version": "[0-9\.]+"/    "version": "@ARGV"/' build/crooked/crx/manifest.json $version
rm -rf build/crooked/crx/manifests/
cd build/crooked/crx/
zip -q -r crooked-v$version.zip .
cd ../../../
mv build/crooked/crx/crooked-v$version.zip versions/
rm -rf build/crooked/


## 
## nytimes
## 
## 
mkdir build/nytimes/
cp -R crx/ build/nytimes/crx/
rm -rf build/nytimes/crx/apps/crooked/
rm -rf build/nytimes/crx/apps/nytimes/assets/
cp build/nytimes/crx/manifests/nytimes.json build/nytimes/crx/manifest.json
perl -0 -p -i -e 's/    "version": "[0-9\.]+"/    "version": "@ARGV"/' build/nytimes/crx/manifest.json $version
rm -rf build/nytimes/crx/manifests/
cd build/nytimes/crx/
zip -q -r nytimes-v$version.zip .
cd ../../../
mv build/nytimes/crx/nytimes-v$version.zip versions/
rm -rf build/nytimes/


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
