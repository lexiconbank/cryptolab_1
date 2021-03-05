const routes =
[
    {
        path: '/',
        component: () => import('layouts/FrontLayout.vue'),
        children:
        [
            // { name: 'front_dashboard', path: '', component: () => import('pages/Front/Dashboard.vue') },
            // { name: 'front_login', path: 'landing', component: () => import('pages/Front/Login.vue') },
        
        { name: 'front_landing', path: '/', component: () => import('pages/Front/Landing.vue') },	    
        { name: 'front_login', path: '/login', component: () => import('src/pages/Front/Login.vue') },	    
        { name: 'front_registration', path: '/registration', component: () => import('src/pages/Front/Registration.vue') },	
        { name: 'wallet_balance', path: 'wallet/balance', component: () => import('components/UQWalletBalance.vue') },
        { name: 'transaction_history', path: 'transanction_history', component: () => import('components/UQTransactionHistory.vue') },
        { name: 'reset_password', path: 'forgot_password/:key', component: () => import('components/UQResetPassword.vue') },
        { name: 'registration_otp', path: 'registration/otp', component: () => import('src/pages/Front/RegistrationOtp.vue') },
        { name: 'front_resetpassword', path: 'login/reset_password/:key', component: () => import('src/pages/Front/ResetPassword.vue') },
        { name: 'front_forgotpassword', path: 'login/forgot_password', component: () => import('src/pages/Front/ForgotPassword.vue') },
        { name: 'front_success_password', path: 'success/reset_password', component: () => import('src/pages/Front/SuccessResetPassword.vue') },
        { name: 'profile', path: '/profile', component: () => import('components/UQProfile.vue') },
        ]
    },
    
    {
        path: '/dashboard',
        component: () => import('layouts/UserLayout.vue'),
        children:
        [
          //   { name: 'dashboard_wallet', path: 'wallet', component: () => import('pages/Documentation/Wallet.vue') },	  
        //   { name: 'front_registration', path: '/registration', component: () => import('src/pages/Front/Registration.vue') },	
        ]
    },
    {
        path: '/dashboardMain',
        component: () => import('layouts/DashboardLayout.vue'),
        children:
        [
           //  { name: 'dashboard_wallet', path: 'wallet', component: () => import('pages/Documentation/Wallet.vue') },	  
           { name: 'front_dashboardmain', path: 'dashboardmain', component: () => import('pages/Front/DashboardMain.vue') }, 
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
            { name: 'documentation_otp', path: 'registration_otp', component: () => import('pages/Documentation/RegistrationOtp.vue') },
            { name: 'documentation_profile', path: 'profile', component: () => import('pages/Documentation/Profile.vue') },
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
