<template>
    <div class="row forgot_password">
        <div class="custom_div col-12 text-h4">Forgot your password?</div>
        <div class="custom_div col-12 caption">Fill in your email and we'll send you a link to reset your password</div>
        <div class="custom_div col-12"><q-input outlined v-model="form_data.email" label="Email Address" /></div>
        <div class="custom_div col-12"><q-btn outline rounded color="primary" label="Reset Password" @click="sendForgotPasswordLink()" /></div>
    </div>
</template>
<!-- -->

<script>
    import { postForgotPassword } from '../references/url';
        
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
            async sendForgotPasswordLink()
            {
                // this.$q.loading.show();
                
                console.log('email: ', this.form_data.email);

                let forgot_link_obj = await this.$_post(postForgotPassword, this.form_data);

                console.log('test', forgot_link_obj);

                if (forgot_link_obj.data.status != 'not matched') {
                    // this.$router.push({name: 'front_email_sent'});
                    this.$q.dialog({ title: `Success`, message: forgot_link_obj.data.message});
                }else{
                    this.$q.dialog({ title: `Invalid Email`, message: forgot_link_obj.data.message});
                }

                // this.$store.commit('user/getForgotPasswordEmail', this.form_data.email);

                // this.$q.loading.hide();
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
    .forgot_password .caption{
        font-size: 20px;
        color: $grey-6;
    }
</style>