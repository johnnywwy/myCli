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
      estimate: 8000 // 展示预估时间
    })
    console.log('')
  } catch (error) {

  }
}