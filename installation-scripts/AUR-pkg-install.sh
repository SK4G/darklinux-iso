#!/bin/bash
set -e
##################################################################################################################
# Website	:	https://www.arcolinuxforum.com
##################################################################################################################
#
#   DO NOT JUST RUN THIS. EXAMINE AND JUDGE. RUN AT YOUR OWN RISK.
#
##################################################################################################################

# software from AUR (Arch User Repositories)
# https://aur.archlinux.org/packages/

#giving tmp folder extra gb in order not to run out of disk space while installing software
#only if you run into issues with that
#sudo mount -o remount,size=5G,noatime /tmp

echo "################################################################"
echo "####               installing AUR Packages                ######"
echo "################################################################"
yay -S --noconfirm --needed brother-hll2315dw


echo "################################################################"
echo "####                AUR Packages installed                ######"
echo "################################################################"
