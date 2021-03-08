<template>
    <div>

	    <!-- content -->
	    <div class='content text-left'>
	    	<q-form @submit="findUser()">
		     	<div class="field">
		       		<div  class="field q-mt-md">
                        <label>Email address</label>
                        <q-input v-model="form_data.email" placeholder="cryptolab@xxxxx.com or cryptolab" :rules="validateEmailField" outlined>
                            <template v-slot:prepend>
                                <q-icon name="email" color="grey-10" />
                            </template>
                        </q-input>
                    </div>
		       </div>

		        <div class="field q-mt-md">
		       		<div>
                        <label>Password</label>
                        <q-input v-model="form_data.password" :type="isPwd ? 'password' : 'text' " placeholder="************" :rules="validatePasswordField"  outlined>
                            <template v-slot:prepend>
                              <q-icon
                                name="lock" color="grey-10"
                              />
                            </template>
                            <template v-slot:append>
                              <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                              />
                            </template>
                        </q-input>
                    </div>
		       </div>

		       <div class="q-mt-xl"><q-btn type="submit" color="primary" size="18px" class="full-width">Login</q-btn></div>

	   		</q-form>
	    </div>
    </div>
</template>

<script>
import { postAdminLogin, postLoginUser } from '../references/url';
import Swal from "sweetalert2";

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
        isPwd:true,

    }),
    mounted()
    {
        
    },
    computed:{
         validateEmailField ()
        {
            var email_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return [
                val => !!val || 'Email Or Username is required',

            ];
        },
        validatePasswordField ()
        {
            return [
                val => !!val || `Password is required`,
            ];
        }
    }
    ,
    methods:
    {
        async findUser() // camelCase
        {
            this.$q.loading.show();

            let login = await this.$_post(postAdminLogin, this.form_data); //request

            if(login)
            {
                this.$q.dialog({ title: `Success Message`, message: "Login Successful" });
               
            } else{
                const Toast = Swal.mixin({
                margin: 20,
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })
                Toast.fire({
                icon: 'error',
                title: 'Invalid Password!'
                })
            
            }
            this.$q.loading.hide();
        }
    }
}
</script>
<style scoped>
.custom__forgot{
    text-decoration:underline;cursor:pointer;
    font-size:15px;

}
.custom__forgot:hover{
    color:#1976D2;
}

</style>