//ep国际化
import { App } from 'vue'; //App类型内部写了所以你可以指定
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import PageContent from '@/components/page-content';
import PageSearch from '@/components/page-search';
import PageModal from '@/components/page-modal';
export function register(app: App): void {
  app.use(ElementPlus, {
    locale: zhCn
  });
  app.component('PageContent', PageContent);
  app.component('PageSearch', PageSearch);
  app.component('PageModal', PageModal);
}
//使用了插件好像不需要注册，所以我直接关掉这个文件了
//import {
//  ElButton,
//  ElForm,
//  ElFormItem,
//  ElIcon,
//  ElInput,
//  ElLink,
//  ElMenu,
//  ElMenuItem,
//  ElMenuItemGroup,
//  ElRadio,
//  ElSubMenu,
//  ElTabPane,
//  ElTabs
//} from 'element-plus';
//import {
//  ElAside,
//  ElCheckbox,
//  ElContainer,
//  ElHeader,
//  ElMain
//} from 'element-plus/lib/components';
//import { App } from 'vue'; //App类型内部写了所以你可以指定
//elemet-plus 按需引入
//可以再剪切放到一个文件，但是太麻烦了，除非后面注册特别多 再说
//const eleCp = [
//  ElButton,
//  ElForm,
//  ElFormItem,
//  ElInput,
//  ElRadio,
//  ElTabs,
//  ElTabPane,
//  ElIcon,
//  ElCheckbox,
//  ElLink,
//  ElContainer,
//  ElMain,
//  ElHeader,
//  ElAside,
//  ElMenu,
//  ElMenuItem,
//  ElSubMenu,
//  ElMenuItemGroup
//];
//export function register(app: App): void {
//  //这个app直接在main里传过去就可以
//  eleCp.forEach((ele) => {
//    app.component(ele.name, ele);
//  });
//}
