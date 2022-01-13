import {
  ElButton,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs
} from 'element-plus';
import { ElCheckbox } from 'element-plus/lib/components';
import { App } from 'vue'; //App类型内部写了所以你可以指定
//elemet-plus 按需引入
//可以再剪切放到一个文件，但是太麻烦了，除非后面注册特别多 再说
const eleCp = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElCheckbox,
  ElLink
];
export function register(app: App): void {
  //这个app直接在main里传过去就可以
  eleCp.forEach((ele) => {
    app.component(ele.name, ele);
  });
}
