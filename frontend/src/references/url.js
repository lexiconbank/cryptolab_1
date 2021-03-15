// front
exports.postLoginUser 	        = 'front/login'
exports.postRegistrationUser    = 'front/registration'
exports.postForgotPassword      = 'front/forgotpassword'
exports.postwallet              = 'front/wallet'
exports.postdashboardmain        = 'front/dashboardmain'
exports.postadminsecurity        = 'front/adminsecurity'
exports.postfindemail           = 'front/findemail'
    
// admin 
exports.postAddUser             = 'admin/users/add'
exports.postAddEdit             = 'admin/users/edit'
exports.postKyc                 = 'front/kyc'
// exports.getFile                 = 'front/file'
exports.getKycData              = 'front/kycdata' 
exports.postApproved              = 'front/kycapproved' 
exports.postRejected              = 'front/kycrejected' 
exports.get_user                = 'front/user'




exports.postResetPassword       = 'front/forgotpassword'
exports.getValidateLinkKey      = 'front/forgotpassword'
exports.postConfirmRegistration = 'front/confirmregistration'
exports.postResendOneTimePasscode = 'front/resendregistrationotp'
exports.postGetUser             = 'users/all'


exports.fetch = 'front/fetch'


// admin
exports.postListUsers           = 'admin/users/list';
exports.postAddUser             = 'admin/users/add';
exports.postAddEdit             = 'admin/users/edit';

exports.postLoginAdmin 	        = 'front/admin/login'
// exports.postLoginWallet 	    = 'front/admin/wallet'

//rei

exports.postListUsers            = '/api/admin/usersmasterlist';
exports.postfetchUserKyc        = 'member/kyc/user/fetch';
exports.fetchPostfilteredClients= 'admin/fetch/clients';


//wallet
exports.postWalletSend          = 'wallet/send'
exports.postClientReceiving     = 'wallet/receiving'

// admin user
exports.insert = 'admin/users/insert'
exports.update = 'admin/users/update'
exports.deleteThis = 'admin/users/deleteThis'
exports.fetch = 'admin/users/fetch'

exports.roleFetch = 'admin/users/roleFetch'