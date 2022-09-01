# 后端Node.js

## 目录结构

```javascript

-router
  - *.ts //express的router文件，主要统一暴露接口
-routerHandler
 - *.ts  //express-Router的接口处理函数
-validation
 - *.ts //对于某些接口需要验证参数有效性的函数
- config.ts //暴露一些服务的变量 如 token过期时间，服务端口
- main.ts  //主文件
- mysql.ts //暴露封装好的mysql
- swagger.ts //尝试使用swagger写接口文档
```
