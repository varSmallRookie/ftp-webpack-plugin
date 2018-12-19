var ftp = require('ftp'),
    ftp = new ftp(),
    fs = require('fs');

class weexFtp {
    constructor(config) {
        this.config = Object.assign({}, {
            remotePath: '/'
        }, config);
    }
    apply(compiler) {
        var self = this;
        compiler.plugin('done', function(compilation,callback) {
            // console.log('done');
        });
        compiler.plugin("emit", function(compilation, callback) {
            ftp.on('ready',function(){ // ftp服务器连接成功
                let assetsArr = Object.keys(compilation.assets); // 打包后的文件夹 
                assetsArr.map(function(item, index) { // 遍历打包后的文件夹
                    var dir = item.substr(0, item.lastIndexOf('/')); // 提取文件夹
                    if (dir) { // 如果是文件夹
                        ftp.mkdir(self.config.remotePath + dir, true, function(err) {
                        // 创建文件夹，此操作将覆盖所有该文件夹下的所有文件，true表示递归创建
                            if (err) throw err;
                            // console.log('mkdir done');
                            //文件夹创建完成后开始上传文件
                            put(item, index === assetsArr.length - 1);
                        });
                        return;
                    }
                    // 如果不是文件夹，则直接上传文件 
                    put(item, index === assetsArr.length - 1);
                });
                function put(path, isLast) { // ftp上传文件操作
                    var assetsPath = compilation.options.output.path; // 得到打包后的文件夹的本地绝对路径
                    // 填入本地的绝对路径和ftp服务器的工作文件夹
                    ftp.put(`${assetsPath}/${path}`, self.config.remotePath + path, function(err) {
                        if (err) throw err;
                        console.log(self.config.remotePath + path + '-----------upload done');
                        if (isLast) { // 最后一个文件上传完成，则断开ftp连接，并继续webpack的下个生命周期
                            ftp.end();
                            callback();
                        }
                    });
                }
            });
            ftp.connect(self.config); // 连接ftp服务器
        });
    }
}
module.exports = weexFtp;