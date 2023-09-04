#!/usr/bin/env bash

################################
function press_a_key_to_continue {
   read -rp "Press enter to continue"
}

function is_arch {
    RELEASE=$(lsb_release -is)
    if ${RELEASE}==

}

function main {

    clear
    echo "This script add aur chaotic repository"
    press_a_key_to_continue
    pacman-key --recv-key 3056513887B78AEB --keyserver keyserver.ubuntu.com
    pacman-key --lsign-key 3056513887B78AEB
    pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-keyring.pkg.tar.zst' 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-mirrorlist.pkg.tar.zst'
    echo "[chaotic-aur]" >> /etc/pacman.conf
    echo "Include = /etc/pacman.d/chaotic-mirrorlist" >> /etc/pacman.conf
}

main
