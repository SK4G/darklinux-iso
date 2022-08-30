#!/bin/bash
set -e

echo "################################################################"
echo "####           installing fzf-bash-completion             ######"
echo "################################################################"
yay -S --noconfirm --needed fzf-tab-completion-git
echo "
source /usr/share/fzf-tab-completion/bash/fzf-bash-completion.sh
bind -x '\"\t\": fzf_bash_completion'" | sudo tee -a $HOME/.bashrc
source $HOME/.bashrc

echo "################################################################"
echo "####           fzf-tab-completion-git installed           ######"
echo "################################################################"
