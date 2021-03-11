<template>
    <div class="row main__div">
        <p class = "text-h5">Confirm Account Registration</p>
        <p class = "text-grey-7">Please check your email for your One-Time Passcode.</p>
        <q-input outlined v-model="form_data.otp" label="One Time Passcode" class= "full-width"/>
        <q-btn class="full-width" size="15px" color="primary" label="Submit" @click="confirm_email()" />
        <q-btn class="full-width" size="15px" label="Resend OTP" outline @click="confirm_email()" />
        <template>
            <div class="q-pa-md q-gutter-sm">
                <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
                <q-card class="bg-primary text-white" style="width: 300px">
                    
                    <q-card-section>
                    <div class="text-h6"><i class="fas fa-check-square" aria-hidden="true"></i> Email has been verified</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                    You can now log in your account.
                    </q-card-section>

                    <q-card-actions align="right" class="bg-white text-primary">
                    <q-btn flat label="LOGIN" @click="" v-close-popup />
                    </q-card-actions>
                </q-card>
                </q-dialog>
            </div>
        </template>
    </div>
</template>

<script>
import { postConfirmRegistration } from '../references/url';
export default
{
    data:() =>(
    {
        form_data : {
            otp : '',
        },
        persistent : true,
    }),

    mounted()
    {
    },

    methods:
    {
        async confirm_email(){
            let register = await this.$_post(postConfirmRegistration, this.form_data);
            console.log(register, 'register');
            if(register.data.status == "success")
            {
                this.persistent = true;
            }
        }

    }
}
</script>

<style lang="scss">
    .main__div{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-top: 20px;
    }
    .full-width{
        color: $primary;
        margin: 5px;
    }
</style>

