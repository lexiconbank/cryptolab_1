<template>
    <div class="row forgot_password">
        <div class="custom_div col-12 text-h5 text-weight-bolder active" align="center">Reset Password</div>
        <div class="custom_div col-12"><q-input outlined v-model="form_data.password" label="Password" /></div>
        <div class="custom_div col-12"><q-input outlined v-model="form_data.password_1" label="Confirm Password" /></div>
        <div class="custom_div col-12"><q-btn  class="full-width q-mt-xl" size="20px" color="primary" label="RESET PASSWORD" @click="resetpassword()" /></div>
    </div>
</template>

<script>
    import { postResetPassword } from '../references/url';
        
    export default
    {
        data: () =>
        ({
            form_data:
            {
                email: '',
            }
        }),
        
        methods:
        {
            async resetpassword()
            {
            }
    }
    }

</script>

<style lang="scss">
    .forgot_password{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .forgot_password .custom_div{
        padding: 10px;
    }
    .active{
    color: #1976D2;
    margin-bottom:50px;
    margin-top:30px;
}
.active::after{
    content:"";
    display:block;
    width:50%;
    height:2px;
    background:#1976D2;;

}
</style>