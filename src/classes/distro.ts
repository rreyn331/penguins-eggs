/* eslint-disable no-console */
/**
 * penguins-eggs: Distro.ts
 *
 * author: Piero Proietti
 * mail: piero.proietti@gmail.com
 */

'use strict'
import fs from 'node:fs'
import shell from 'shelljs'
import yaml from 'js-yaml'
import { IRemix, IDistro } from '../interfaces'

/**
 * Classe
 */
class Distro implements IDistro {
  familyId: string
  distroId: string
  distroLike: string
  codenameId: string
  codenameLikeId: string
  releaseId: string
  releaseLike: string
  usrLibPath: string
  isolinuxPath: string
  syslinuxPath: string
  pxelinuxPath: string
  memdiskPath: string
  liveMediumPath: string
  squashfs: string
  homeUrl: string
  supportUrl: string
  bugReportUrl: string
  isCalamaresAvailable: boolean

  constructor(remix = {} as IRemix) {
    this.familyId = 'debian'
    this.distroId = ''
    this.distroLike = ''
    this.codenameId = ''
    this.codenameLikeId = ''
    this.releaseId = ''
    this.releaseLike = ''
    this.usrLibPath = '/usr/lib'
    this.isolinuxPath = ''
    this.syslinuxPath = ''
    this.pxelinuxPath = ''
    this.memdiskPath = ''
    this.liveMediumPath = `/run/live/medium/`
    this.squashfs = `live/filesystem.squashfs`
    this.homeUrl = ''
    this.supportUrl = ''
    this.bugReportUrl = ''
    this.isCalamaresAvailable = true

    const file = '/etc/os-release'
    let data: any
    if (fs.existsSync(file)) {
      data = fs.readFileSync(file, 'utf8')
    }

    // inizio
    enum info {
      HOME_URL,
      SUPPORT_URL,
      BUG_REPORT_URL
    }

    const os: Array<string> = []
    os[info.HOME_URL] = 'HOME_URL='
    os[info.SUPPORT_URL] = 'SUPPORT_URL='
    os[info.BUG_REPORT_URL] = 'BUG_REPORT_URL='
    for (const temp in data) {
      if (!data[temp].search(os[info.HOME_URL])) {
        this.homeUrl = data[temp].slice(os[info.HOME_URL].length).replace(/"/g, '')
      }

      if (!data[temp].search(os[info.SUPPORT_URL])) {
        this.supportUrl = data[temp].slice(os[info.SUPPORT_URL].length).replace(/"/g, '')
      }

      if (!data[temp].search(os[info.BUG_REPORT_URL])) {
        this.bugReportUrl = data[temp].slice(os[info.BUG_REPORT_URL].length).replace(/"/g, '')
      }
    }

    /**
     * lsb_release -cs per codename (version)
     * lsb_release -is per distribuzione
     * lsb_release -rs per release
     */
    this.codenameId = shell.exec('lsb_release -cs', { silent: true }).stdout.toString().trim()
    this.releaseId = shell.exec('lsb_release -rs', { silent: true }).stdout.toString().trim()
    this.distroId = shell.exec('lsb_release -is', { silent: true }).stdout.toString().trim()


    /**
     * releaseLike = releaseId
     */
    this.releaseLike = this.releaseId

    /**
     * Per casi equivoci conviene normalizzare codenameId
     *  -i, --id           show distributor ID
     *  -r, --release      show release number of this distribution
     *  -c, --codename     show code name of this distribution
     */
    if (this.distroId === 'Debian' && this.releaseId === 'unstable' && this.codenameId === 'sid') {
      this.codenameId = 'bookworm'
    } else if (this.distroId === 'Debian' && this.releaseId === 'testing/unstable') {
      this.codenameId = 'bookworm'
      this.releaseLike = 'unstable'
    }


    /**
     * Procedo analizzanto: codenameId
     */
    switch (this.codenameId) {
      case 'jessie': {
        // Debian 8 jessie
        this.distroLike = 'Debian'
        this.codenameLikeId = 'jessie'
        this.liveMediumPath = '/lib/live/mount/medium/'
        this.isCalamaresAvailable = false

        break
      }

      case 'stretch': {
        // Debian 9 stretch
        this.distroLike = 'Debian'
        this.codenameLikeId = 'stretch'
        this.liveMediumPath = '/lib/live/mount/medium/'
        this.isCalamaresAvailable = false

        break
      }

      case 'buster': {
        // Debian 10 buster
        this.distroLike = 'Debian'
        this.codenameLikeId = 'buster'

        break
      }

      case 'bullseye': {
        // Debian 11 bullseye
        this.distroLike = 'Debian'
        this.codenameLikeId = 'bullseye'

        break
      }

      case 'bookworm': {
        // Debian 12 bookworm 
        this.distroLike = 'Debian'
        this.codenameLikeId = 'bookworm'

        break
      }

      case 'beowulf': {
        // Devuab 3 beowulf 
        this.distroLike = 'Devuan'
        this.codenameLikeId = 'beowulf'

        break
      }

      case 'chimaera': {
        // Devuab 4 chimaera
        this.distroLike = 'Devuan'
        this.codenameLikeId = 'chimaera'

        break
      }

      case 'daedalus': {
        // Devuan 5 daedalus
        this.distroLike = 'Devuan'
        this.codenameLikeId = 'daedalus'

        break
      }

      /**
       * Ubuntu LTS + actual
       */

      case 'bionic': {
        // Ubuntu 18.04 bionic LTS eol aprile 2023
        this.distroLike = 'Ubuntu'
        this.codenameLikeId = 'bionic'
        this.liveMediumPath = '/lib/live/mount/medium/'

        break
      }

      case 'focal': {
        // Ubuntu 20.04 focal LTS
        this.distroLike = 'Ubuntu'
        this.codenameLikeId = 'focal'

        break
      }


      case 'jammy': {
        // Ubuntu 22.04 jammy LTS
        this.distroLike = 'Ubuntu'
        this.codenameLikeId = 'jammy'

        break
      }

      case 'kinetic': {
        // Ubuntu 22.10 kinetic
        this.distroLike = 'Ubuntu'
        this.codenameLikeId = 'kinetic'

        // quindi le derivate...

        break
      }

      /**
       * Arch Linux / RebornOS
       * calamares rebornOS: Reborn-OS/calamares-core-git
       */
      case 'n/a': {
        // ARCH rolling
        this.familyId = 'archlinux'
        this.distroLike = 'Arch'
        this.codenameId = 'rolling'
        this.codenameLikeId = 'rolling'
        this.liveMediumPath = '/run/archiso/copytoram/'
        this.squashfs = `/airootfs.sfs`
        //this.squashfs = `arch/x86_64/airootfs.sfs`

        break
      }

      case 'Qonos':
      case 'Ruah':
      case 'Sikaris': {
        // Manjaro Linux
        this.familyId = 'archlinux'
        this.distroLike = 'Arch'
        this.codenameLikeId = 'rolling'
        this.liveMediumPath = `/run/miso/bootmnt/`
        this.squashfs = `manjaro/x86_64/livefs.sfs`
        break
      }

      default: {
        /**
         * find in ./conf/derivaties
         */
        interface IDistros {
          id: string,
          distro: string,
          derivatives: string[]
        }

        let found = false
        const file = '/etc/penguins-eggs.d/derivatives.yaml'
        const content = fs.readFileSync(file, 'utf8')
        let distros = yaml.load(content) as IDistros[]
        for (let i = 0; i < distros.length; i++) {
          for (let n = 0; n < distros[i].derivatives.length; n++) {
            if (this.codenameId === distros[i].derivatives[n]) {
              found = true
              this.distroLike = distros[i].distro
              this.codenameLikeId = distros[i].id
              this.familyId = 'debian'
            }
          }
        }
        if (!found) {
          console.log(`This distro ${this.distroId}/${this.codenameId} is not yet recognized!`)
          console.log(``)
          console.log(`You can edit /usr/lib/penguins-eggs/derivaties.yaml to add it -`)
          console.log(`after that - run: sudo eggs dad -d to reconfigure.`)
          console.log(`If you can create your new iso, you can contribute to the project by suggesting your modification`)
          process.exit(0)
        }
      }
    }



    /**
     * setting paths: syslinux, isolinux, usrLib
     */
    switch (this.familyId) {
      case 'debian': {
        this.isolinuxPath = '/usr/lib/ISOLINUX/'
        this.syslinuxPath = '/usr/lib/syslinux/modules/bios/'
        this.pxelinuxPath = '/usr/lib/PXELINUX/'
        this.usrLibPath = '/usr/lib/x86_64-linux-gnu/'
        this.memdiskPath = '/usr/lib/syslinux/'
        if (process.arch === 'ia32') {
          this.usrLibPath = '/usr/lib/i386-linux-gnu/'
        }
        break
      }

      case 'fedora': {
        this.syslinuxPath = '/usr/share/syslinux/'
        this.isolinuxPath = this.syslinuxPath

        break
      }

      case 'archlinux': {
        this.syslinuxPath = '/usr/lib/syslinux/bios/'
        this.pxelinuxPath = this.syslinuxPath
        this.memdiskPath = this.syslinuxPath
        this.isolinuxPath = this.syslinuxPath

        break
      }

      case 'suse': {
        this.syslinuxPath = '/usr/share/syslinux/'
        this.isolinuxPath = this.syslinuxPath
        this.usrLibPath = '/usr/lib64/'

        break
      }
      // No default
    }

    /**
     * Special cases...
     */

    /**
     * MX LINUX
     * ln -s /run/live/medium/live/filesystem.squashfs /live/boot-dev/antiX/linuxfs
     */
    if (fs.existsSync('/etc/antix-version')) {
      this.distroId = 'MX'
    }
  }
}

export default Distro
