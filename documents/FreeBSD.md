# FreeBSD eggs

* sudo pkg install editor/vscode
* sudo ln -s /usr/local/bin/vscode /usr/local/bin/code
* sudo pkg install www/node
* sudo npm -i pnpm -g

Added:
* bash OK
* cryptsetup not found (mpt nocessary)
* curl OK
* dosfstools not found (just to have mkfs.vfat for UEFI)
* isolinux not found (not necessary)
* git OK
* lvm2 not found (not necessary)
* parted not found (altenative?)
* pxelinux not found (not necessary)
* rsync OK
* sshfs not found (alternative?)
* squashfs-tools OK
* syslinux-common not found (not necessary)
* sudo OK
* coreutils OK
* xorriso OK

# mount binded

```sudo mount -t nullfs /home/ /mnt```

# keyboard italian
```setxkbmap it```



