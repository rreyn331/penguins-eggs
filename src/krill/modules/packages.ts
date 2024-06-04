/**
 * ./src/krill/modules/packages.ts
 * penguins-eggs v.10.0.0 / ecmascript 2020
 * author: Piero Proietti
 * email: piero.proietti@gmail.com
 * license: MIT
 * https://stackoverflow.com/questions/23876782/how-do-i-split-a-typescript-class-into-multiple-files
 */

import yaml from 'js-yaml'
import fs from 'node:fs'

import Pacman from '../../classes/pacman.js'
import Utils from '../../classes/utils.js'
import { IPackages } from '../../interfaces/i-packages.js'
import { exec } from '../../lib/utils.js'
import Sequence from '../sequence.js'

/**
 *
 * @param this
 */
export default async function packages(this: Sequence): Promise<void> {
  const echoYes = Utils.setEcho(true)

  console.log("siamo in packages")

  let modulePath = '/etc/penguins-eggs.d/krill/'
  if (Pacman.packageIsInstalled('calamares')) {
    modulePath = '/etc/calamares/'
  }

  const config_file = `${modulePath}modules/packages.conf`
  let remove: string[] = []
  let install: string[] = []
  console.log(config_file)
  await Utils.pressKeyToExit()

  if (fs.existsSync(config_file)) {
    const packages = yaml.load(fs.readFileSync(config_file, 'utf8')) as IPackages
    console.log("packages.conf")
    console.log(packages)

    remove = packages.operations.try_remove.packages
    console.log("packages try remove")
    console.log(remove)
    install = packages.operations.try_install.packages
    console.log("packages try install")
    console.log(install)
    await Utils.pressKeyToExit()

    if (packages.backend === 'apt') {
      // Debian/Devuan/Ubuntu
      if (remove.length > 0) {
        let cmd = `chroot ${this.installTarget} apt-get purge -y `
        for (const elem of remove) {
          cmd += elem + ' '
        }
        await exec(`${cmd} ${this.toNull}`, this.echo)
        await exec(`chroot ${this.installTarget} apt-get autoremove -y ${this.toNull}`, this.echo)
      }

      if (install.length > 0) {
        let cmd = `chroot ${this.installTarget} apt-get install -y `
        for (const elem of install) {
          cmd += elem + ' '
        }

        await exec(`chroot ${this.installTarget} apt-get update ${this.toNull}`, this.echo)
        await exec(`${cmd} ${this.toNull}`, this.echo)
      }

    } else if (packages.backend === 'pacman') {

      // arch/manjaro
      if (remove.length > 0) {
        let cmd = `chroot ${this.installTarget} pacman -R\n`
        for (const elem of remove) {
          cmd += elem + ' '
        }

        await exec(`${cmd} ${echoYes}`, this.echo)
      }

      if (install.length > 0) {
        for (const elem of install) {
          await exec(`chroot ${this.installTarget} pacman -S ${elem}`, echoYes)
        }
      }
    }
  }
}
