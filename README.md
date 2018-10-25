# pm2_monitor

# 主依赖包
* Koa Web应用框架
* koa-bodyparser 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。

## 安装前准备
* node - version >= 8.12
* npm （安装 node 的时候会同时装的）
* git
* npm i
* npm i pm2 -g 安装PM2
* pm2 install pm2-logrotate 安装日志管理器

## 环境设置

* 开发 development
* 测试 test

## 运行
* npm run start 正式环境
* npm run test 测试环境
* npm run dev 开发环境
* npm run logrotate 开启日志管理自动清理功能
