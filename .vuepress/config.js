module.exports = {
  plugins: [
    "@vuepress/back-to-top",
    "@vuepress/pwa",
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-88256229-2" // UA-00000000-0
      }
    ]
  ],
  title: "Qinvideo",
  dest: "dist",
  description: "一款基于nodejs的动漫CMS系统",
  head: [["link", { rel: "icon", href: `/logo.svg` }]],
  themeConfig: {
    repo: "qinvz/qinvideo",
    editLinks: true,
    sidebar: ["/docs/", "/install/", "/section/", "/video/"],
    sidebarDepth: 2,
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
    nav: [
      {
        text: "文档",
        link: "/docs/"
      },
      {
        text: "视频教程",
        link: "/video/"
      },
      {
        text: "前端演示",
        link: "http://demo.qinvideo.org"
      },
      {
        text: "后台演示",
        link: "http://demo.qinvideo.org/backend"
      }
    ],
    sidebar: {
      "/docs/": ["", "install", "section"],
      "/video/": ["", "source"]
    }
  }
};
