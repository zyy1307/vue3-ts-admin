//不同环境变量下的配置
let BASE_URL: string;
const TIME_OUT = 10000;

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '';
} else {
  BASE_URL = '';
}
export { BASE_URL, TIME_OUT };
