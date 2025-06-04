import { input, select } from '@inquirer/prompts';
import { clone } from '../utils/clone';
import fs from 'fs-extra';
import path from 'path';

export interface TemplateInfo {
  name: string //名称
  downloadUrl: string //下载地址
  description: string //描述
  branch: string //分支
}

// 这里保存了我写好了咱们的之前开发的模板
export const templates: Map<string, TemplateInfo> = new Map(
  [
    ["Vite4-Vue3-Typescript-template", {
      name: "admin-template",
      downloadUrl: 'https://gitee.com/sohucw/admin-pro.git',
      description: 'Vue3技术栈开发模板',
      branch: 'dev6'
    }],
    ["Vite4-Vue3", {
      name: "admin-template",
      downloadUrl: 'https://gitee.com/sohucw/admin-pro.git',
      description: 'Vue3技术栈开发模板',
      branch: 'dev12'
    }]
  ]
)

export const isOverwrite = async (fileName: string) => {
  console.warn(`${fileName} 文件已存在 !`)
  return select({
    message: '是否覆盖原文件: ',
    choices: [
      { name: '覆盖', value: true },
      { name: '取消', value: false }
    ]
  });
}

export async function create(projectName?: string) {

  // 文件名称未传入需要输入
  if (!projectName) projectName = await input({ message: '请输入项目名称' });

  // 如果文件已存在需要让用户判断是否覆盖原文件
  // 如果文件已存在需要让用户判断是否覆盖原文件
  const filePath = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName)
    if (run) {
      await fs.remove(filePath)
    } else {
      return // 不覆盖直接结束
    }
  }

  const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
    const [key, value] = item
    return {
      name: key,
      value: key,
      description: value.description
    }
  })
  if (!projectName) {
    projectName = await input({ message: '请输入项目名称' });
  }

  const templateName = await select({
    message: '请选择项目模板',
    choices: templateList
  })

  const info = templates.get(templateName)

  if (info) {
    clone(info.downloadUrl, projectName, ['-b', info.branch])
  }
  console.log(info)
  console.log('projectName', `${projectName}`)

}