# FreeBSD test
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
