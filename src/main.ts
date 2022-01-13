import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import yyRequest from './service';

//global for 一些给全局注册的事
import { register } from './global';
//引用css初始化
import 'normalize.css';
import '@/assets/css/index.css';

export const app = createApp(App);
register(app);
//app.use(register)也可以-use本身就是执行函数再返回app
app.use(store).use(router).mount('#app');
yyRequest.request({ url: '/home/multidata', method: 'GET' });
