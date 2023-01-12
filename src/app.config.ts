export default defineAppConfig({
  lazyCodeLoading: "requiredComponents",
  pages: ["pages/index/index", "pages/modules/index", "pages/change-log/index"],
  subPackages: [
    {
      root: "pages/packages",
      name: "packages",
      pages: [
        "cell/index",
        "prompt/index",
        "ticker/index",
        "header/index",
        "nav-bar/index",
        "popup/index",
        "overlay/index"
      ]
    },
    { root: "pages/quick-start", name: "quick start", pages: ["index"] },
    { root: "pages/custom-style", name: "custom style", pages: ["index"] },
    { root: "pages/theme", name: "theme", pages: ["index"] }
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    color: "#454545",
    selectedColor: "#e65137",
    backgroundColor: "#FFFFFF",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/index/index",
        text: "指南"
      },
      {
        pagePath: "pages/modules/index",
        text: "组件"
      },
      {
        pagePath: "pages/change-log/index",
        text: "更新日志"
      }
    ]
  }
});
