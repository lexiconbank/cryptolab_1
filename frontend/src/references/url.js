// front
exports.postLoginUser 	        = 'front/login'
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

exports.postLoginAdmin 	        = 'front/admin/login'
// exports.postLoginWallet 	    = 'front/admin/wallet'

//rei

exports.postListUsers            = '/api/admin/usersmasterlist';
exports.postfetchUserKyc        = 'member/kyc/user/fetch';
exports.fetchPostfilteredClients= 'admin/fetch/clients';


//wallet
exports.postWalletSend           = 'wallet/send'


