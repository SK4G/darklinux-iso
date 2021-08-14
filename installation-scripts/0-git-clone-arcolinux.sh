#!/bin/bash
#set -e

echo
echo "################################################################## "
tput setaf 2
echo
echo "Deleting old ArcoLinux-iso folder if one exists"
echo
tput sgr0
echo "################################################################## "
echo
rm -rf $HOME/arcolinuxl-iso/

echo
echo "################################################################## "
tput setaf 2
echo
echo "Git clone the latest ArcoLinux-iso from github into the home folder"
echo
tput sgr0
echo "################################################################## "
echo
cd $HOME
git clone https://github.com/arcolinux/arcolinuxl-iso.git
git clone https://github.com/arcolinux/arcolinuxs-iso.git

cd $HOME/arcolinuxl-iso/archiso/
echo $'\n\n[darklinux-repo]\nSigLevel = Optional TrustedOnly\nServer  = https://sk4g.github.io/$repo/x86_64' | sudo tee -a pacman.conf

cd $HOME/arcolinuxl-iso/archiso/airootfs/etc/
echo $'\n\n[darklinux-repo]\nSigLevel = Optional TrustedOnly\nServer  = https://sk4g.github.io/$repo/x86_64' | sudo tee -a pacman.conf

#change sddm login and theme
sed -i 's/arcolinux-sugar-candy/arcolinux-slice/g' $HOME/arcolinuxl-iso/archiso/airootfs/etc/sddm.conf
sed -i 's/xfce/awesome/g' $HOME/arcolinuxl-iso/archiso/airootfs/etc/sddm.conf

sed -i 's/ArcoLinuxL/Darklinux/g' $HOME/arcolinuxl-iso/archiso/airootfs/etc/hostname


echo
echo "################################################################## "
tput setaf 2
echo 
echo "changing iso label and default login session to awesome desktop"
echo 
tput sgr0
echo "################################################################## "
echo

sed -i 's/arcolinuxl/darklinux/g' $HOME/arcolinuxl-iso/installation-scripts/30-build-the-iso-the-first-time.sh
sed -i 's/ArcoLinuxL/Darklinux/g' $HOME/arcolinuxl-iso/installation-scripts/30-build-the-iso-the-first-time.sh
sed -i 's/xfce/awesome/g' $HOME/arcolinuxl-iso/installation-scripts/30-build-the-iso-the-first-time.sh

sed -i 's/arcolinuxl/darklinux/g' $HOME/arcolinuxl-iso/installation-scripts/40-build-the-iso-local-again.sh
sed -i 's/ArcoLinuxL/Darklinux/g' $HOME/arcolinuxl-iso/installation-scripts/40-build-the-iso-local-again.sh
sed -i 's/xfce/awesome/g' $HOME/arcolinuxl-iso/installation-scripts/40-build-the-iso-local-again.sh

#change iso label
sed -i 's/arcolinuxl/darklinux/g' $HOME//arcolinuxl-iso/archiso/profiledef.sh
sed -i 's/ArcoLinux/DarkLinux/g' $HOME//arcolinuxl-iso/archiso/profiledef.sh


mv $HOME/arcolinuxs-iso/archiso/packages.x86_64 $HOME/arcolinuxl-iso/archiso/arcoS-packages.x86_64
mv $HOME/darklinux-iso/archiso//packages.x86_64 $HOME/arcolinuxl-iso/archiso/darklinux-packages.x86_64
