#ftp-webpack-plugin
前言：**土豪用CDN，穷逼只能ftp啦，近一年都在搞weex开发，页面的渲染依赖webpack打包后的bundlejs文件，不想每次都手动上传，整了一个简单的webpack自动上传打包后文件的插件，适用所有webpack项目，关于linux搭建ftp，google一堆，就不赘述了**

##安装说明
###1、安装依赖
```
    npm install ftp-webpack-plugin --save-dev
    or
    yarn add ftp-webpack-plugin -d
```


###2、配置wepack.config文件
```
    // 示例为weex项目的webpack的prod环境配置，这样做是为了只在发布生成环境时才去打包上传
    const ftpWebpackPlugin = require('ftp-webpack-plugin');
    const weexConfig = webpackMerge(commonConfig[1], {
        ... //其他配置
        plugins: [
            new weexFtp({
              host: '',  // ftp服务器地址， 默认localhost
              port: '', // ftp端口，默认21
              user: '', // 登录ftp用户名 默认'anonymous'
              password: '', //登录ftp密码 默认 'anonymous@'
              remotePath: '' // ftp工作目录，默认'/'，
              //最好指定一个空文件夹，目前版本不能判断文件夹是否存在，因此会直接将local目录全部sync到指定文件夹
            })
        ]
    })
```

###3、Change Log

####v1.0.0
•实现文件同步到ftp服务器
•暂时还不能实现查询文件夹是否存在



