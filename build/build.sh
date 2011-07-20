
# Execute with sudo ./build.sh

scriptdir=`dirname $BASH_SOURCE`
cd $scriptdir

echo 'Create build/release folder'
mkdir release

echo 'Test ../script/*.js with JSLint'
java -jar lib/jslint4java-1.4.7.jar ../script/*.js
echo 'JSLint test complete'

echo 'Concatenate ../script/*.js files'
cat ../script/*.js \
> release/temp.js

echo 'Compress concatenated JavaScript file with YUI Compressor'
java -jar lib/yuicompressor-2.4.2.jar \
--type js \
--charset UTF-8 \
--preserve-semi \
-o release/jquery.videobackground.min.js release/temp.js

echo 'Remove temp concatenated JavaScript file'
rm release/temp.js

# echo 'Compress CSS file with YUI Compressor'
# java -jar lib/yuicompressor-2.4.2.jar \
# --type css \
# --charset UTF-8 \
# --preserve-semi \
# -o release/jquery.imageviewer.min.css ../themes/base/jquery.imageviewer.css

# echo 'Compress PNG files with ImageOptim'
# -a ImageOptim.app ../themes/images/*.png

# echo 'Copy PNG files for release'
# cp ../themes/base/images/*.png release/images 

echo 'Build complete'