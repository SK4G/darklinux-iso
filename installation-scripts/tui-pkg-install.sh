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
echo "####              installing TUI utilities               ######"
echo "################################################################"
sudo pacman -S xplr --noconfirm --needed    #terminal explorer
yay -S --noconfirm --needed fuzzy-pkg-finder   #pamac terminal client
#yay -S --noconfirm --needed fzf-open    #search and open. edit default openers $HOME/.config/fzf-open/lopen.sh
#yay -S --noconfirm --faint-git          #file exploer
yay -S --noconfirm --needed lsparu      #pamac terminal client
sudo sed -i 's/default_colors()/burnt_colors()/g' /usr/bin/lsparu   #change lsparu default colors to light theme
sudo sed -i 's/default_colors/light_colors/g' /usr/bin/lsparu

echo "################################################################"
echo "####          installing ytfzf and dependencies           ######"
echo "################################################################"
sudo pacman -S mpv --noconfirm --needed         #ytfzf video player
sudo pacman -S kitty --noconfirm --needed       #ytfzf thumbnailer
yay -S --noconfirm --needed ytfzf               #youtube fzf player
sudo sed -i 's/thumbnail_viewer:=ueberzug/thumbnail_viewer:=kitty/g' /usr/local/bin/ytfzf

echo "################################################################"
echo "####           installing fzf-bash-completion             ######"
echo "################################################################"
yay -S --noconfirm --needed fzf-tab-completion
echo "
source /usr/share/fzf-tab-completion/bash/fzf-bash-completion.sh
bind -x '\"\t\": fzf_bash_completion'" | sudo tee -a $HOME/.bashrc
source $HOME/.bashrc

echo "################################################################"
echo "####               TUI utilities installed                ######"
echo "################################################################"
