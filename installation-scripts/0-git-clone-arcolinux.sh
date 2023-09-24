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
# git clone https://github.com/arcolinux/arcolinuxs-iso.git

cd $HOME/arcolinuxl-iso/archiso/
echo $'\n\n[darklinux-repo]\nSigLevel = Optional TrustedOnly\nServer  = https://sk4g.github.io/$repo/x86_64' | sudo tee -a pacman.conf

cd $HOME/arcolinuxl-iso/archiso/airootfs/etc/
echo $'\n\n[darklinux-repo]\nSigLevel = Optional TrustedOnly\nServer  = https://sk4g.github.io/$repo/x86_64' | sudo tee -a pacman.conf

#change sddm login and theme
#sed -i 's/arcolinux-simplicity/arcolinux-slice/g' $HOME/arcolinuxl-iso/archiso/airootfs/etc/sddm.conf.d/kde_settings.conf
sed -i 's/xfce/awesome/g' $HOME/arcolinuxl-iso/archiso/airootfs/etc/sddm.conf.d/kde_settings.conf

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

sed -i $'40 i copyFolder="/mnt/TEAM-1TB/ISO-images/"' $HOME/arcolinuxl-iso/installation-scripts/30-build-the-iso-the-first-time.sh
sed -i $'40 i copyFolder="/mnt/TEAM-1TB/ISO-images/"' $HOME/arcolinuxl-iso/installation-scripts/40-build-the-iso-local-again.sh
sed -i -e '$a cp -v darklinux-$arcolinuxVersion-x86_64.iso-x86_64.iso $copyFolder' $HOME/arcolinuxl-iso/installation-scripts/30-build-the-iso-the-first-time.sh
sed -i -e '$a cp -v darklinux-$arcolinuxVersion-x86_64.iso-x86_64.iso $copyFolder' $HOME/arcolinuxl-iso/installation-scripts/40-build-the-iso-local-again.sh

#change iso label
sed -i 's/arcolinuxl/darklinux/g' $HOME/arcolinuxl-iso/archiso/profiledef.sh
sed -i 's/ArcoLinux/DarkLinux/g' $HOME/arcolinuxl-iso/archiso/profiledef.sh


basedir=/mnt/SeagateNFS
# cp $HOME/arcolinuxs-iso/archiso/packages.x86_64 $HOME/arcolinuxl-iso/archiso/arcoS-packages.x86_64
mv $HOME/arcolinuxl-iso/archiso/packages.x86_64 $HOME/arcolinuxl-iso/archiso/packages.x86_64-original
cp $basedir/darklinux-iso/archiso/packages.x86_64 $HOME/arcolinuxl-iso/archiso/packages.x86_64

#cp bashrc-personal
sed -i '175 i rsync -av /mnt/SeagateNFS/darklinux-iso/archiso/airootfs/etc/skel/.bashrc-personal $buildFolder/archiso/airootfs/etc/skel/.bashrc-personal\n' $HOME/arcolinuxl-iso/installation-scripts/30-build-the-iso-the-first-time.sh
sed -i '175 i rsync -av /mnt/SeagateNFS/darklinux-iso/archiso/airootfs/etc/skel/.bashrc-personal $buildFolder/archiso/airootfs/etc/skel/.bashrc-personal\n' $HOME/arcolinuxl-iso/installation-scripts/40-build-the-iso-local-again.sh
