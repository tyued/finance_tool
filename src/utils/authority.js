export default [
    {
        id: 'reserve',
        pid: '',
        status: 1,
        type: 1,
        name: 'Merchant Reserve',
        desc: '',
        routers: '/reserve',
        icon: 'fund',
    },

    {
        id: 'backend',
        pid: '',
        status: 1,
        type: 1,
        name: 'Citcon Manage',
        desc: '',
        // routers: '/',
        icon: 'desktop',
    },
    {
        id: 'backend.merchant',
        pid: 'backend',
        status: 1,
        type: 1,
        name: 'Merchant Manager',
        desc: '',
        routers: '/admin/merchant',
        icon: 'shop',
    },
    {
        id: 'backend.account',
        pid: 'backend',
        status: 1,
        type: 1,
        name: 'Account Manager',
        desc: '',
        routers: '/admin/account',
        icon: 'user',
    }
];
