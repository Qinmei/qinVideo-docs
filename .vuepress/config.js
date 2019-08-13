module.exports = {
  plugins: {},
  base: "/qinvideo-docs/",
  dest: "docs",
  title: "Qinvideo",
  description: "一款基于nodejs的动漫CMS系统",
  head: [["link", { rel: "icon", href: `/logo.svg` }]],
  themeConfig: {
    repo: "qinvz/qinvideo",
    editLinks: true,
    sidebar: ["/page/", "/section/"],
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
    nav: [
      {
        text: "文档",
        link: "/page/"
      },
      {
        text: "前端演示",
        link: "http://demo.qinvideo.org"
      },
      {
        text: "后台演示",
        link: "http://demo.qinvideo.org/qinmei"
      }
    ]
  }
};
