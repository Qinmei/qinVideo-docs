# 介绍

## 系统简介

一套基于 nodejs + mongodb 的前后端分离 CMS 管理系统, 主要包括番剧, 漫画, 文章三大类,
同时带有评论, 用户, 商品, 弹幕等功能

<img :src="$withBase('/logo.svg')" alt="foo" width="120">

### 依赖

- **nodejs**: 8.0 以上版本
- **mongodb**: 4.0 以上版本
- **nginx**: 随意了

### 版本

目前的版本为 **4.0**, 之前的版本均基于 Wordpress 开发而来,是一个全新的版本, 所以可能存在一些 BUG;

### 使用交流

对于 BUG 一类的问题, 请在 github 上面提 issue, 如果看到会及时处理
使用上的问题请加 QQ 群:**1007111688**, 不保证一定解答, 仅仅提供一个交流的地方

### 功能

目前的三大模块分别是番剧, 漫画, 文章, 商品系统采用的是激活码形式;

### 番剧

- 目前支持直链,解析,m3u8, 直链可设置密钥与过期时间结合 nginx secure link 使用,解析则支持正则匹配

- 数据统计功能, 可以大概的看出历史趋势
- 弹幕功能, 内部自带弹幕接口, 使用的是 dlilayer 的数据格式, 可无缝使用 dlilayer
- 支持多季多集, 分类, 评论以及等级限定

### 漫画

- 暂只支持本地图片, 需要手动上传图片到指定文件夹目录内, 然后根据路径自动遍历所有图片
- 数据统计功能, 可以大概的看出历史趋势
- 目前只支持多话, 分类, 评论以及等级限定, 不支持多季

### 文章

- 使用的是 markdown 可视化编辑器
- 数据统计功能, 可以大概的看出历史趋势
- 支持分类,评论以及等级限定

### 商品

- 套餐售卖的是用户的等级以及过期时间
- 激活码可生成不同价格的, 用户使用激活码即可增加账户余额
- 用户购买套餐会扣除账户余额, 然后提升等级, 积分以及有效期
- 结合三大类的等级限定以及套餐便可实现简单的会员系统, 后续再看需不需要优化

## 安装说明

使用 pm2 启动, 需要自行安装 nodejs + mongodb + nginx,更新的话需要下载文件然后重启数据库,图片等请备份 img 文件夹;

### 1. 安装 mongodb

直接安装 mongodb, 然后新建个数据库命名为 qinvideo 或者其他啥的,最好新建个单独的用户来管理该数据库;

宝塔面板安装的没有单独的用户与密码, 所以为了安全起见密码设的复杂一点;
如果不需要使用数据库工具链接的话, 可以直接禁止外部访问该端口;

### 2. 安装 nodejs

宝塔一键安装 node， appnode 在软件管家搜索 nodejs 即可，安装完之后 node -v 看看版本信息，没有提示的话可能安装有问题;

下载 zip 压缩包到服务器， 然后找个文件夹解压即可;

在文件目录里使用 npm install 命令， 安装依赖;

修改根目录里面的 config.js 文件， mongodb 的 uri 填写你自己的数据库地址，格式为'mongodb://账号:密码@地址:端口/数据库'，salt 是用户密码的盐值， 填写个别人不知道的就行， tokenSecret 是验证的加密码， 也填写个唯一的,**在没有配置好之前不要运行**

### 3. 安装 nginx

安装 nginx, 然后创建静态网站,网站的程序目录填写上面的 nodejs 的 public 文件夹;

给与 public 与 uploads 文件夹 777 权限 然后将用户组分配给 WWW。

在网站的配置文件里面加上以下的代码, 然后重启 nginx 即可;

```apacheconf
client_max_body_size 20M;
location /api/ {
    proxy_pass      http://localhost:9000/;
    proxy_redirect  off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

location /qinmei {
    alias      /home/qinvideo-node/public;
    index      /backend/index.html;
    try_files  $uri $uri/ /backend/index.html?$args;
}

location /web {
    alias      /home/qinvideo-node/public;
    index      /pc/index.html;
    try_files  $uri $uri/ /pc/index.html?$args;
}

location /m {
    alias      /home/qinvideo-node/public;
    index      /h5/index.html;
    try_files  $uri $uri/ /h5/index.html?$args;
}

location =/ {
    if ($http_user_agent ~* (mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)) }
        rewrite  ^(.*) $scheme://$host/m/ permanent;
    }

    if ($http_user_agent !~* (mobile|nokia|iphone|ipad|android|samsung|htc|blackberry))}
      rewrite  ^(.*) $scheme://$host/web/ permanent;
    }
}
```

### 4. 运行

在 node 的根目录运行 node app.js 即可测试链接情况， 后台运行的话可以使用 PM2 进行进程守护;

网址/qinmei 则是后台管理面板的地址， /web 则是 PC 端的前端地址， /m 则是移动端的前端地址;
