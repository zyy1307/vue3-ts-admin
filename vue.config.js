const path = require('path');
//关于element-plus
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
  //publicPath:'./',
  configureWebpack: {
    //1、对象形式
    resolve: {
      // 别名配置
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  //2、函数形式
  //    (config) => {
  //这个config就是直接把webpack里的配置传过来，然后你可以手动修改
  //      config.resolve.alias = { '@': path.resolve(__dirname, 'src') };
  //    }
  //3、链式操作
  //chainWebpack:(config)=>{
  //config.resolve.alias.set("@",path.resolve(__dirname,'src')).set()//可以一直set下去
  //}
};
