// front
exports.postLoginUser 	        = 'front/login'
exports.postLoginAdmin 	        = 'front/admin/login'
exports.postRegistrationUser    = 'front/registration'
exports.postForgotPassword      = 'front/forgotpassword'
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