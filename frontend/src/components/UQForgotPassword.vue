<template>
    <div class="row forgot_password">
        <div class="custom_div col-12 text-h4">Forgot your password?</div>
        <div class="custom_div col-12 caption">Fill in your email and we'll send you a link to reset your password</div>
        <div class="custom_div col-12"><q-input outlined v-model="text" label="Email Address" /></div>
        <div class="custom_div col-12"><q-btn outline rounded color="primary" label="Reset Password" /></div>
    </div>
</template>

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
    .forgot_password .caption{
        font-size: 20px;
        color: $grey-6;
    }
</style>