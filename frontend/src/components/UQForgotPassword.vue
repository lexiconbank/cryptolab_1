<template>
        <div>
        <div class="row forgot_password">
            <div class="custom_div col-12 text-h4">Forgot your password?</div>
            <div class="custom_div col-12 caption"><p>Fill in your email and we'll send you a link to reset your password</p></div>
            <div class="custom_div col-12" style="margin-bottom:20px"><q-input outlined v-model="form_data.email" label="Email Address" :rules="[val => !!val]"/></div>
            <div class="custom_div col-12"><q-btn class="full-width" size="15px" color="primary" label="Reset Password" @click="sendForgotPasswordLink()" /></div>
            <div class="custom_div col-12"><q-btn outline class="full-width" color="primary" size="15px" label="LOGIN" @click="$router.push({ name: 'front_login' })"  /></div>
        </div>

    <template>
        <div class="q-pa-md q-gutter-sm">
            <q-dialog v-model="success_prompt" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-primary text-white" style="width: 300px">
                <q-card-section>
                <div class="text-h6">Email Sent</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    Please check your email to reset your password.
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-primary">
                <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>
        </div>
    </template>
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
            },
            success_prompt: false,
        }),
        
        methods:
        {
            async sendForgotPasswordLink()
            {
                this.$q.loading.show();
                
                let forgot_link_obj = await this.$_post(postForgotPassword, this.form_data);

                if (forgot_link_obj.data.status != 'not matched') {
                    // this.$router.push({name: 'front_email_sent'});
                    // this.$q.dialog({ title: `Success`, message: forgot_link_obj.data.message});               
                    this.$q.loading.hide();
                    this.success_prompt = true;
                }else{
                    this.$q.loading.hide();
                    this.$q.dialog({ title: `Invalid Email`, message: forgot_link_obj.data.message});
                }

                // this.$store.commit('user/getForgotPasswordEmail', this.form_data.email);

                
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
        padding: 5px;
    }
    .forgot_password .caption{
        font-size: 20px;
        color: $grey-6;
    }
</style>