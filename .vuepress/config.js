module.exports = {
  plugins: {},
  title: "Qinvideo",
  dest: "dist",
  description: "一款基于nodejs的动漫CMS系统",
  head: [["link", { rel: "icon", href: `/logo.svg` }]],
  themeConfig: {
    repo: "qinvz/qinvideo",
    editLinks: true,
    sidebar: ["/docs/", "/section/", "/price/", "/video/"],
    sidebarDepth: 2,
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
    nav: [
      {
        text: "文档",
        link: "/docs/"
      },
      {
        text: "前端演示",
        link: "http://demo.qinvideo.org"
      },
      {
        text: "后台演示",
        link: "http://demo.qinvideo.org/qinmei"
      },
      {
        text: "APP演示",
        link: "https://qinvideo.org/videos/qinvideo.apk"
      },
    ]
  }
};
