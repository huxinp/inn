import Taro from "@tarojs/taro";

export const sysInfo = Taro.getSystemInfoSync();

export const menuBtnInfo = Taro.getMenuButtonBoundingClientRect();

export const callbackIsHalfScreen = () => {
  // 最好onShow的时候执行：
  // 判断当前是不是半屏类原生 半窗口 （半屏类原生（直播商品等场景））
  // 注意半屏类原生 半窗口 跳转 - 会跳到 全屏类原生
  // statusBarHeight 状态栏高度为0 且 窗口高度windowHeight 小于屏幕高度screenHeight 120像素
  if (
    Number(sysInfo.statusBarHeight) === 0 &&
    (Number(sysInfo.screenHeight) - Number(sysInfo.windowHeight) > 120 ||
      Number(sysInfo.windowHeight) < 500)
  ) {
    // 半窗口浏览
    return true;
  }
  return false;
};

export default function getCustomNavigationRect() {
  if (!menuBtnInfo) return { height: 84 };
  // console.log('执行系统信息', sysInfo)
  // console.log('执行右上角胶囊按钮', menuButtonInfo)

  const screenHeight: number | undefined = sysInfo.screenHeight;
  const screenWidth: number | undefined = sysInfo.screenWidth;
  const statusBarHeight: number | undefined = sysInfo.statusBarHeight;
  const paddingSize = Number(screenWidth) - menuBtnInfo.right;

  let top = menuBtnInfo.top;

  let height = top + menuBtnInfo.height + 4;

  if (Number(statusBarHeight) === 0) {
    top = 6;
    height = top * 2 + menuBtnInfo.height;
  }

  return {
    navigationBarHeight:
      (top - Number(statusBarHeight)) * 2 + menuBtnInfo.height,
    height: height,
    top: statusBarHeight,
    menuButtonWidth: menuBtnInfo.width,
    sceneHeight: screenHeight,
    sceneWidth: screenWidth,
    paddingSize,
    isHalfScreen: callbackIsHalfScreen()
  };
}
