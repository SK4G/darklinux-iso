#!/bin/bash
#set -e

echo
echo "################################################################## "
tput setaf 2
echo 
echo "Copying the darklinux packages.x86_64"
echo 
tput sgr0
echo "################################################################## "
echo

# rm -f $HOME/arcolinuxl-iso/archiso/packages.x86_64
# cp -rf $HOME/darklinux-iso/archiso/packages.x86_64 $HOME/arcolinuxl-iso/archiso/
rsync -r -t -v --progress -s $HOME/darklinux-iso/archiso/packages.x86_64 $HOME/arcolinuxl-iso/archiso/packages.x86_64

echo
echo "################################################################## "
tput setaf 2
echo 
echo "changing directory to build folder. running script 40 to build iso"
echo 
tput sgr0
echo "################################################################## "
echo

cd $HOME/arcolinuxl-iso/installation-scripts/
# chmod +x *.sh
# chmod +x 30-build-the-iso-the-first-time.sh
# chmod +x 40-build-the-iso-local-again.sh
# sh 30-build-the-iso-the-first-time.sh
sh 40-build-the-iso-local-again.sh