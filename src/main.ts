import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { setupStore } from './store';

//global for 一些给全局注册的事
import { register } from './global';
import { registerProperties } from './global/properties';
//引用css初始化
import 'normalize.css';
import '@/assets/css/index.css';

export const app = createApp(App);
register(app);
//app.use(register)也可以-use本身就是执行函数再返回app
app.use(store);
setupStore(); //要放在router前，注册好路由才能跳转
app.use(router);
registerProperties(app);
app.mount('#app');
