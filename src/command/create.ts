import { input, select } from '@inquirer/prompts';
import { clone } from '../utils/clone';

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
      downloadUrl: 'git@gitee.com:sohucw/admin-pro.git',
      description: 'Vue3技术栈开发模板',
      branch: 'dev6'
    }],
    ["Vite4-Vue3", {
      name: "admin-template",
      downloadUrl: 'git@gitee.com:sohucw/admin-pro.git',
      description: 'Vue3技术栈开发模板',
      branch: 'dev12'
    }]
  ]
)

export async function create(projectName?: string) {
  // 初始化模板

  console.log(`create ${projectName}`)
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