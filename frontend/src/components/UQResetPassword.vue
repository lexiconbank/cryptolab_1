<template>
    <div class="row forgot_password">
        <div class="custom_div col-12 text-h4">Reset Password</div>
        <div class="custom_div col-12"><q-input outlined v-model="form_data.password" label="Password" /></div>
        <div class="custom_div col-12"><q-input outlined v-model="form_data.password_1" label="Confirm Password" /></div>
        <div class="custom_div col-12"><q-btn outline rounded color="primary" label="Reset Password" @click="resetpassword()" /></div>
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
</style>