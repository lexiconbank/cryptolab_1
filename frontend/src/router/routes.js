const routes =
[
    {
        path: '/',
        component: () => import('layouts/FrontLayout.vue'),
        children:
        [
            // { name: 'front_dashboard', path: '', component: () => import('pages/Front/Dashboard.vue') },
            // { name: 'front_login', path: 'landing', component: () => import('pages/Front/Login.vue') },
        
        { name: 'front_landing', path: 'asd', component: () => import('pages/Front/Landing.vue') },	    
        { name: 'wallet_balance', path: 'wallet/balance', component: () => import('components/UQWalletBalance.vue') },
        { name: 'transaction_history', path: 'transanction_history', component: () => import('components/UQTransactionHistory.vue') },
        { name: 'reset_password', path: 'forgot_password/:key', component: () => import('components/UQResetPassword.vue') },
        ]
    },
    {
        path: '/documentation',
        component: () => import('layouts/DocumentationLayout.vue'),
        children:
        [
            { name: 'documentation_landing', path: '', component: () => import('pages/Documentation/Landing.vue') },
            { name: 'documentation_login', path: 'login', component: () => import('pages/Documentation/Login.vue') },
            { name: 'documentation_registration', path: 'registration', component: () => import('pages/Documentation/Registration.vue') },
            { name: 'documentation_guide', path: 'guide', component: () => import('pages/Guide/CodingStandards.vue') },
            { name: 'documentation_wallet', path: 'wallet', component: () => import('pages/Documentation/Wallet.vue') },
            { name: 'documentation_wallet_balance', path: 'wallet/balance', component: () => import('pages/Documentation/WalletBalance.vue') },
            { name: 'documentation_convert', path: 'convert', component: () => import('pages/Documentation/Convert.vue') },
            { name: 'documentation_forgot_passsword', path: 'forgot_password', component: () => import('pages/Documentation/ForgotPassword.vue') },
            { name: 'documentation_reset_passsword', path: 'reset_password/:key', component: () => import('pages/Documentation/ResetPassword.vue') },
        ]
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]


export default routes
