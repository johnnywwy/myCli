import { Command } from 'commander'
import { version } from '../package.json'

import { create } from './command/create'

// 这里我们用 dawei 当作我的指令名称
// 命令行中使用 dawei xxx 即可触发
const program = new Command('dawei');

program
  // 调用 version 的参数可以自定义
  .version(version, '-v --version')

program
  .command('update')
  .description('更新 dawei 至最新版本')
  .action(async () => {
    console.log('update command')
  });

program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (name) => {
    create(name)
    // if (name) console.log(`create ${name}`)
    // else console.log(`create command`)
  });

program.parse()
