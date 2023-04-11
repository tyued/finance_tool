module.exports = [
    {
      path: '/',
      component: '../layouts/index',    //component 相对于 src/pages 目录
      routes: [
        { path: '/', redirect: '/reserve' },
        { path: '/reserve', component: 'reserve/', exact: true },

        { path: '/admin/account', component: 'admin/account/', exact: true },
        { path: '/admin/merchant', component: 'admin/merchant/', exact: true },
        { path: '/*', component: '404', exact: true },
      ]
    }
  ];