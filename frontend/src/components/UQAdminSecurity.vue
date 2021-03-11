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
                        <q-input v-model="form_data.password" :type="isPwd ? 'password' : 'text' " placeholder="************" :rules="validatePasswordField" 
                         outlined>
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
		        <div class="field q-mt-md">
		       		<div>
                        <label>Confirm Password</label>
                        <q-input v-model="form_data.new_password" :type="isPwd ? 'password' : 'text' " placeholder="************" :rules="validatePasswordField"  outlined>
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
              
		       <div class="q-mt-xl"><q-btn type="submit" color="primary" size="15px" class="full-width" id="myBtn">Change Password</q-btn> </div>
<!-- <div id="myModal" class="modal">


</div> -->
	   		</q-form>
	    </div>
        
    </div>
</template>


<script>
import { postadminsecurity } from '../references/url';
import { postfindemail } from '../references/url';

// import Swal from "sweetalert2";

export default
{
    data:() =>(
    {
        form_data:
        {
            email: '',
            password: '',
           
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
                var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
            return [
                val => !!val || `Password is required`,
                val => val.length >= 8 || 'Password must be 8 characters.',      
                val => /[a-z]/.test(val) && /\d/.test(val) && /[A-Z]/.test(val) || 'Must have Uppercase & Number',
                 val =>/[!@#\$%\^\&*\{};:)\<>,?'"|\[\]\\(+=._-]/.test(val)   || 'Must have special character',
            ];
        }
    }
    ,
    methods:
    {

        async findUser()
        {
                // var btn = document.getElementById("myBtn");
                // var btn = document.getElementById("myBtn");
            var pass=this.form_data.password;
            var newpass =this.form_data.new_password;
            //var emails =this.form_data.email;
            let findemailed =  await this.$_post(postfindemail, this.form_data);
 
                if(findemailed.data.status == 'success' || findemailed.data.status == '200' ){
                    let informations = await this.$_post(postadminsecurity, this.form_data);
                   
                        if(pass == newpass){
                            // btn.onclick = function() {
                            // modal.style.display = "Success";
                            // },span.onclick = function() {
                            // modal.style.display = "none";
                            // }

                          this.$q.dialog({ title: `Success Message`, message: "Successfully changed" });
                        }
                            else{
                             this.$q.dialog({ title: `error Message`, message: "Password not Match" });
                            };
                     }
                 else{
                            
                        this.$q.dialog({ title: `Error Message`, message: "Invalid Email" });
        }
        }}
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