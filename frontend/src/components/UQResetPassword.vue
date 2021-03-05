<template>
    <div class="row forgot_password">
        <div class="custom_div col-12 text-h4">Reset Password</div>
        <div class="custom_div col-12">
            <q-input outlined v-model="form_data.password" label="Password" :type="isPwd ? 'password' : 'text'" :rules="[val => !!val]">
            <template v-slot:append>
                <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                />
            </template>
      </q-input>
        </div>
        <div class="custom_div col-12">
            <q-input outlined v-model="form_data.confirm_password" :type="c_isPwd ? 'password' : 'text'" label="Confirm Password" :rules="[val => !!val]">
                <template v-slot:append>
                    <q-icon
                        :name="c_isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="c_isPwd = !c_isPwd"
                    />
                </template>
            </q-input>
        </div>
        <div class="custom_div col-12"><q-btn outline rounded color="primary" label="Reset Password" @click="resetpassword()" /></div>
    </div>
</template>

<script>
    import { getValidateLinkKey, postResetPassword } from '../references/url';
        
    export default
    {
        data: () =>
        ({
            isPwd   : true,
            c_isPwd : true,
            form_data:
            {
                password: '',
                confirm_password: '',
            },
        }),
        
        beforeMount()
        {
            this.validateLinkKey();
        },

        methods:
        {
            async validateLinkKey()
            {
                let key = this.$route.params.key;
                console.log('key', key);

                let reset_obj = await this.$_get(`${getValidateLinkKey}/${key}`);
                console.log('reset_obj', reset_obj);

                // if (reset_obj.data.status == 'error') {
                //     this.$router.push('/');
                // }
            },
            async resetpassword()
            {
                let key = this.$route.params.key;
                let link = `${postResetPassword}/${key}`;
                let forgot_link_obj = await this.$_post(link, this.form_data);
                if (forgot_link_obj) {
                    this.$router.push({name: 'front_reset_pass_success'});
                }
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