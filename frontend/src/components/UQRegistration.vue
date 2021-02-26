<template>
    <div>

	    <!-- content -->
	    <div class='content text-left'>
	    	<q-form @submit="findUser()">
		     	<div class="field">
		       		<label>Full Name</label>
		       		<div><q-input v-model="form_data.full_name" placeholder="Enter Email" outlined dense></q-input></div>
		       </div>

		     	<div class="field q-mt-md">
		       		<label>Email</label>
		       		<div><q-input v-model="form_data.email" placeholder="Enter Email" outlined dense></q-input></div>
		       </div>

		        <div class="field q-mt-md">
		       		<label>Password</label>
		       		<div><q-input v-model="form_data.password" type="password" placeholder="Enter Password" outlined dense></q-input></div>
		       </div>

		        <div class="field q-mt-md">
		       		<label>Confirm Password</label>
		       		<div><q-input v-model="form_data.confirm_password" type="password" placeholder="Enter Password" outlined dense></q-input></div>
		       </div>
		       <div class="q-mt-lg"><q-btn type="submit" color="primary" unelevated class="full-width">Create Account</q-btn></div>
	   		</q-form>
	    </div>
    </div>
</template>

<script>
import { postRegistrationUser } from '../references/url';

export default
{
    data:() =>(
    {
        form_data:
        {
            full_name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    }),
    mounted()
    {
        
    },
    methods:
    {
        async findUser()
        {
            this.$q.loading.show();
            let register = this.$_post(postRegistrationUser, this.form_data);
            if(register)
            {
                this.$q.dialog({ title: `Success Message`, message: "Successfully Registered" });
            }
            this.$q.loading.hide();
        }
    }
}
</script>