module.exports =
[
    {
        key: 'documentation_landing',
        label: 'Introduction',
        icon: 'fa fa-question',
        route: 'documentation_landing',
    },
    {
        key: 'landing',
        label: 'Landing Page',
        icon: 'fa fa-home',
        sub:
        [
            { label: 'Login', route: 'documentation_login' },
            { label: 'Registration', route: 'documentation_registration' },
            { label: 'Registration OTP', route: 'documentation_otp' },
            { label: 'Web3', route: 'documentation_web3' },
        ]
    },
    {
        key: 'documentation',
        label: 'Documentation',
        icon: 'fa fa-home',
        sub:
        [
            { label: 'Kyc', route: 'documentation_kyc' },
            { label: 'Multer', route: 'documentation_multer' },
            { label: 'Kyc Backend', route: 'documentation_kycbackend' },
            // { label: 'Registration', route: 'documentation_registration_admin' },
            { label: 'Admin User Tables', route: 'documentation_admin_user_table' },

            { label: 'Dashboard', route: 'documentation_admin_dashboard' },
            { label: 'Clients Masterlist', route: 'documentation_clientsmasterlist' },
            { label: 'Wallet', route: 'documentation_admin_wallet' },
            { label: 'Wallet Drawer', route: 'documentation_admin_wallet_drawer' },
           
        ]
    },
    {
        key: 'member',
        label: 'Member',
        icon: 'fa fa-home',
        sub:
        [
            
        ]
    },
    {
        key: 'admin',
        label: 'Admin',
        icon: 'fa fa-home',
        sub:
        [
            
        ]
    },
    {
        key: 'coding_standards',
        label: 'Coding Standards',
        icon: 'fa fa-question',
        route: 'documentation_guide',
    },
]