const userConfig = useLocalStorage('config', {
  model: 'gpt-3.5-turbo',
  api_url: 'https://api.openai.com',
  token: '',
  snippet: [
    {
      content: "我是web前端开发工程师, 根据以下内容, 为我生成三条工作日报: ${1}",
      desc: "写日报"
    },
    {
      content: "请将 Options 风格的 Vue 组件转换为 Composition 风格: ${1}",
      desc: "转换 Vue 组件"
    },
    {
      content: "将以下 markdown 文件内容翻译为英文, 注意保留 markdown 语法和代码格式: ${1}",
      desc: "翻译 markdown 文档"
    }
  ]
})

export default userConfig