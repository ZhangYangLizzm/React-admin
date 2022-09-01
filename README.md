# React-admin

## 启动

### 前端项目安装依赖

```  JavaScript
yarn 
```

### 后端Node.js安装依赖

```  JavaScript
//保证当前目录为***/nodejs
//如果已在nodejs目录下，使用
yarn 
//否则
cd nodejs
yarn
```

### 启动服务

``` JavaScript
yarn node:dev  //启动nodejs服务
yarn dev //启动react项目
```

### router配置

***参照router配置进入指定页***

``` TypeScript
  const element = useRoutes([
    {
      path: '/login',
      element: <Login />,
      //登录页
    },
    { path: '/user-register', element: <UserRegister /> },
    //注册页
    {
      path: '/',
      element: localStorage.getItem('Authorization') ? (
        <NewsSandBox />
      ) : (
        <Navigate to="/login" replace={true} />
      ),
      //如果没有token则回到登录页，在请求接口中如果发现token过期也会跳转到登录页
      children: [
        { path: '/home', element: <Home /> },  //待完成
        { path: '/personal-userInfo', element: <PersonalUserInfo /> }, //个人信息
        { path: '/user-manage', element: <UserList /> }, // 用户列表，待完成
        { path: '/role-manage', element: <RoleList /> },//角色列表，待完成
        { path: '/right-manage', element: <RightList /> },//权限列表，doing
        { path: '*', element: <NoPermission /> },//没有权限的页面，待完成
       
      ],
    },
  ])
```
