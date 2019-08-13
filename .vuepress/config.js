module.exports = {
  plugins: {},
  title: "Qinvideo",
  description: "一款基于nodejs的动漫CMS系统",
  head: [["link", { rel: "icon", href: `/logo.svg` }]],
  themeConfig: {
    repo: "qinvz/qinvideo",
    editLinks: true,
    sidebar: "auto",
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
    nav: [
      {
        text: "文档",
        link: "/docs/"
      },
      {
        text: "视频",
        link: "/video/"
      },
      {
        text: "演示",
        link: "http://demo.qinvideo.org/qinmei"
      }
    ]
  }
};
