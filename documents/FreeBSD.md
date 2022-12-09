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
It seem to NOT work!!!

```
#############################################################
# /var is a directory need to be presente, and rw
# -----------------------------------------------------------
# create mountpoint lower
mkdir /home/eggs/ovarium/.overlay/lowerdir/var -p
# first: mount /var rw in /home/eggs/ovarium/.overlay/lowerdir/var
mount --bind --make-slave /var /home/eggs/ovarium/.overlay/lowerdir/var
# now remount it ro
mount -o remount,bind,ro /home/eggs/ovarium/.overlay/lowerdir/var

# second: create mountpoint upper, work and /home/eggs/ovarium/filesystem.squashfs and mount var
mkdir /home/eggs/ovarium/.overlay/upperdir/var -p
mkdir /home/eggs/ovarium/.overlay/workdir/var -p
mkdir /home/eggs/ovarium/filesystem.squashfs/var -p

# thirth: mount /var rw in /home/eggs/ovarium/filesystem.squashfs
mount -t overlay overlay -o lowerdir=/home/eggs/ovarium/.overlay/lowerdir/var,upperdir=/home/eggs/ovarium/.overlay/upperdir/var,workdir=/home/eggs/ovarium/.overlay/workdir/var /home/eggs/ovarium/filesystem.squashfs/var
```

Cercando la sintassi
```
#############################################################
# /var is a directory need to be presente, and rw
# -----------------------------------------------------------
# create mountpoint lower
mkdir -p /home/eggs/ovarium/.union/lowerdir/var 
# first: mount /var rw in /home/eggs/ovarium/.union/lowerdir/var
mount --bind --make-slave /var /home/eggs/ovarium/.union/lowerdir/var
# now remount it ro
mount -o remount,bind,ro /home/eggs/ovarium/.union/var

# second: create mountpoint upper, work and /home/eggs/ovarium/filesystem.squashfs and mount var
mkdir -p /home/eggs/ovarium/.union/upperdir/var 
mkdir  -p /home/eggs/ovarium/filesystem.squashfs/var

# thirth: mount /var rw in /home/eggs/ovarium/filesystem.squashfs
mount -t union union -o lowerdir=/home/eggs/ovarium/.union/lowerdir/var,upperdir=/home/eggs/ovarium/.union/upperdir/var /home/eggs/ovarium/filesystem.squashfs/var
```

@ openssh-portable
```
sudo pkg install openssh-portable
```

from host:

```
ssh -Y artisan@192.168.1.15
```


# keyboard italian
```setxkbmap it```
