# FreeBSD eggs

* sudo pkg install editor/vscode
* sudo ln -s /usr/local/bin/vscode /usr/local/bin/code
* sudo pkg install www/node
* sudo npm -i pnpm -g

Added:

```
sudo pkg install bash curl git rsync squashfs-tools sudo coreutils xorriso
```

not found:
* cryptsetup not found (not nocessary)
* lvm2 not found (not necessary)
* parted not found (altenative?)
* pxelinux not found (not necessary)
* isolinux not found (not necessary)
* syslinux-common not found (not necessary)

not found we need alternative:
* dosfstools not found (just to have mkfs.vfat for UEFI)
* sshfs not found (alternative?)


# mount binded
Here /var is used as sample, we need: boot, etc, usr and var

```
sudo mkdir -p /home/eggs/ovarium/.overlay/lowerdir/var

sudo mkdir -p /home/eggs/ovarium/.overlay/upperdir/var

sudo mkdir -p /home/eggs/ovarium/.overlay/workdir/var

sudo mkdir -p /home/eggs/ovarium/filesystem.squashfs/var

sudo mount -t nullfs /var /home/eggs/ovarium/.overlay/lowerdir/var
```

# mount overlay

```
sudo mount -t overlay overlay -o \
lowerdir=/home/eggs/ovarium/.overlay/lowerdir/var,\
upperdir=/home/eggs/ovarium/.overlay/upperdir/var,\
workdir=/home/eggs/ovarium/.overlay/workdir/var \
/home/eggs/ovarium/filestem.squashfs/var
```

# keyboard italian
```setxkbmap it```



