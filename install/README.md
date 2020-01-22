# 安装说明

基础环境需要安装 nodejs + mongodb + nginx + redis, 然后下载文件解压, 修改配置文件, 启动即可;

## 1. 安装 mongodb

直接安装 mongodb, 然后新建个数据库命名为 qinvideo 或者其他啥的,最好新建个单独的用户来管理该数据库;

宝塔面板安装的没有单独的用户与密码, appnode 软件商店没有 mongodb, 自行搜索教程安装即可, 推荐还是使用宝塔吧;

如果不需要使用数据库工具链接的话, 可以直接禁止外部访问该端口;

## 2. 安装 redis

宝塔跟 appnode 在软件商店都有 redis, 直接安装即可, 密码啥的看情况设置;

## 3. 安装 nodejs

以下的输入都是在终端输入

- 宝塔一键安装 node， appnode 在软件管家搜索 nodejs 即可;
- 安装完之后输入`node -v`, 如果看版本信息代表安装成功;
- 输入`npm -v`, 一般来说上面的 OK 了, 这步也会有版本信息, 主要是确认下;
- 下载 [程序压缩包](https://github.com/Qinmei/qinVideo/archive/2.0.zip) 到服务器, 然后找个文件夹解压;
- 进入解压后的目录, 也就是里面有 package.json 这一层的目录, 输入`npm install`, 等待安装完成;
- 打开并编辑`config/config.default.js`, 我们需要修改里面带有标注的几项:

```js
    redis: {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: '', // 如果没有设置密码就不用管, 改了密码直接填写进去就行
            db: 0,
        },
    },
    mongoose: {
        client: {
            url: 'mongodb://qinvideo:Op6bg0PzQnVuTSjGuK0TkHJyUtGkTtQK@localhost:27017/qinvideo',
            //  数据库连接地址, 格式是'mongodb://账号:密码@地址:端口/数据库'
            options: {},
        },
    },
    salt: 'qinmei', // 密码盐值, 需要修改为一个随机的字符串, 如果想要从1.0导入用户数据进来, 就填写一样的
    tokenSecret: 'qinmei', // 登录密钥, 这个同上
    expired: 3600, // redis缓存有效期,单位秒, 一些接口会有缓存数据, 默认是1个小时, 根据自己的实际情况而定, 网站更新不频繁就填长点
```

- 填写 OK 之后, 确认 mongodb 跟 redis 都启动了, 然后输入`npm run dev`, 看到能够成功启动没有报错就表示没啥问题了, 继续下面的安装;

## 3. 安装 nginx

以下只是参考, 如果有其他的需求自行配置即可

- 安装 nginx;
- 然后创建 web 端静态网站, 网站的程序目录需要指向上面文件目录 的 public 文件夹;
- 在网站的配置文件里面加上以下的代码, 注意不要冲突了,注意第二行的重定向地址需要改成自己的移动端, 然后重启 nginx 即可;

```apacheconf
    if ($http_user_agent ~* (mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)) {
        rewrite  ^(.*) $scheme://m.demo.qinvideo.org permanent;
    }

    location / {
        proxy_pass        http://localhost:3000/;
        proxy_redirect    off;
        proxy_set_header  Host $host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    client_max_body_size  20M;

    location /api/ {
        proxy_pass        http://localhost:7001/api/;
        proxy_redirect    off;
        proxy_set_header  Host $host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /animate {
        try_files  $uri $uri/ /animate/index.html?$args;
    }

    location /comic {
        try_files  $uri $uri/ /comic/index.html?$args;
    }

    location /post {
        try_files  $uri $uri/ /post/index.html?$args;
    }

    location /search {
        try_files  $uri $uri/ /search/index.html?$args;
    }

    location /user {
        try_files  $uri $uri/ /user/index.html;
    }

    location /backend {
        try_files  $uri $uri/ /backend/index.html?$args;
    }
```

- 然后创建 移动端 静态网站, 网站的程序目录需要指向上面后台文件目录 的 public 文件夹;
- 在网站的配置文件里面加上以下的代码, 注意不要冲突了, 注意第三行的重定向地址需要改成自己的 web 端, 然后重启 nginx 即可;

```apacheconf
   location / {
        if ($http_user_agent !~* (mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)) {
            rewrite  ^(.*) $scheme://demo.qinvideo.org permanent;
        }
        index      /mobile/index.html;
        try_files  $uri $uri/ /mobile/index.html?$args;
    }

    location /api/ {
        proxy_pass        http://localhost:7001/api/;
        proxy_redirect    off;
        proxy_set_header  Host $host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    }
```

## 4. 运行

- 首先我们需要启动服务端渲染的部分, 进入后台文件的`/public/web`, 输入`npm install`, 安装完成之后, 输入`npm run build`, 然后输入`npm start`启动, 注意窗口不能关, 想要后台自动运行可以安装 PM2,命令可参考:`pm2 start npm --name "next" -- start`, 或者简单的就使用 screen 开启窗口
- 进入后台文件的根目录, 输入`npm run tsc`, 等待构建完成后, 再输入`npm start`启动即可, egg.js 自带进程维护, 不用使用 pm2

## 5. 路径

如果是按照上面的配置安装, 具体的路径如下:

**管理面板**: web 端域名/backend<br/>
**web 端首页**: web 端域名<br/>
**视频首页**: web 端域名/animate<br/>
**漫画**: web 端域名/comic<br/>
**文章**: web 端域名/post<br/>
**搜索**: web 端域名/search<br/>
**用户中心**: web 端域名/user<br/>
**移动端**:移动端域名<br/>

由于做了相互跳转, 所以移动端无法访问 web 端的内容, 根据实际情况可以自行调整, 每个页面都访问下确认 OK 即可;

另外需要先在后台修改设置, 保存的时候会生成配置文件到所有的模块下

## 6. 额外

next 可以直接生成静态文件而不用常驻开启进程, 如果感觉首页都是固定的不需要动态改变, 参考可以参考下面的配置, 生成静态 html 当作首页, 这样不用开启进程, 访问速度也更快;

- 修改`next.config.js`里面的`assetPrefix: "/web"`改为`assetPrefix: "/"`;
- 输入`npm run build`;
- 输入`npm run export`, 需要先开启后台, 否则会打包出错;
- 将生成的`out`文件夹的内容放到 public 的根目录, 然后删除端口 3000 的反向代理, 配置伪静态即可;
