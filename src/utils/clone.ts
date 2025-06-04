import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator';
import chalk from "chalk";

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item => chalk.blue(item))
  }
});

export const clone = async (url: string, projectName: string, options: string[]) => {
  const git = simpleGit(gitOptions)
  try {
    // 开始下载代码并展示预估时间进度条
    await logger(git.clone(url, projectName, options), '代码下载中: ', {
      estimate: 10 // 展示预估时间
    })
    console.log()
    console.log(chalk.blueBright(`===================================`))
    console.log(chalk.blueBright(`====== 欢迎使用 my-cli 脚手架 ======`))
    console.log(chalk.blueBright(`===================================`))
    console.log()


    console.info(`项目创建成功 ${chalk.blueBright(projectName)}`)
    console.info(`执行以下命令启动项目：`)
    console.info(`cd ${chalk.blueBright(projectName)}`)
    console.info(`${chalk.yellow('pnpm')} install`)
    console.info(`${chalk.yellow('pnpm')} run dev`)
  } catch (error) {
    console.error("下载失败")
    console.error(String(error))
  }
}