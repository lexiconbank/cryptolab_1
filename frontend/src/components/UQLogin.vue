<template>
    <div>

	    <!-- content -->
	    <div class='content text-left'>
	    	<q-form @submit="findUser()">
		     	<div class="field">
		       		<label>Username</label>
		       		<div><q-input v-model="form_data.email" placeholder="Enter Email" outlined dense></q-input></div>
		       </div>

		        <div class="field q-mt-md">
		       		<label>Password</label>
		       		<div><q-input v-model="form_data.password" type="password" placeholder="Enter Password" outlined dense></q-input></div>
		       </div>
		       <div class="q-mt-lg"><q-btn type="submit" color="primary" unelevated class="full-width">Login</q-btn></div>
		       <div class="q-mt-sm"><q-btn type="button" v-close-popup color="primary" outline class="full-width">Cancel</q-btn></div>
	   		</q-form>
	    </div>
    </div>
</template>

<script>
import { postLoginUser } from '../references/url';

export default
{
    data:() =>(
    {
        form_data:
        {
            email: '',
            password: '',
            user_name: 'snake_snake',
            gender_options:'',
            is_empty: '',

        },
    }),
    mounted()
    {
        
    },

    methods:
    {
        async findUser() // camelCase
        {
            this.$q.loading.show();

            let login = await this.$_post(postLoginUser, this.form_data); //request

            if(login)
            {
                this.$q.dialog({ title: `Success Message`, message: "Login Successful" });
            }
            this.$q.loading.hide();
        }
    }
}
</script>