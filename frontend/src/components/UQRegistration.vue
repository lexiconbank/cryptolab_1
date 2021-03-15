<template>
    <div>
	    <!-- content -->
	    <div class='content text-left' v-if="is_submitted == false">
	    	<q-form @submit="findUser()">
                <div class="field">
		       	<label>Country</label>
                    <q-select        
                            label="Select a country"
                            :options="options"
                            outlined
                            :rules="[val => !!val]"
                            v-model="form_data.country"
                            option-value="countryNameEn"
                            option-label="countryNameEn" 
                            behavior="menu">
                               <!-- <template v-slot:prepend>
                                    <img :src="'https://www.countryflags.io/' + form_data.country.code + '/flat/32.png'" v-if="form_data.country != '' || form_data.country != {}" />                     
                                </template> -->
                                <template v-slot:prepend>
                                <q-icon
                                    name="flag" color="grey-10"
                                />
                                </template>
                                <template v-slot:option="scope">
                                    <q-item
                                        v-bind="scope.itemProps"
                                        v-on="scope.itemEvents"
                                        >
                                        <q-item-section side>
                                            <img :src="'https://www.countryflags.io/' + scope.opt.countryCode + '/flat/32.png'" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label v-html="scope.opt.countryNameEn" />
                                        </q-item-section>
                                    </q-item>
                                </template>
                    </q-select>
		       </div>
		        <div class="field">
		       		<label>Full Name</label>
		       		<div>
                        <q-input v-model="form_data.full_name" placeholder="Firstname | Lastname"  :rules="[val => !!val]" outlined >
                        </q-input>
                    </div>
		        </div>

		     	<div class="field q-mt-md">
		       		<label>Email</label>
		       		<div>
                        <q-input 
                        type="email" 
                        v-model="form_data.email" 
                        :rules="[val => !!val]"
                        placeholder="cryptolab@xxxx.com" 
                        outlined
                        >
                        <template v-slot:prepend>
                              <q-icon
                                name="email" color="grey-10"
                              />
                            </template>
                        </q-input>
                    </div>
		       </div>

               <div class="field">
		       		<label>Username</label>
		       		<div>
                        <q-input v-model="form_data.username" placeholder="Username"  :rules="[val => !!val]" outlined >
                        </q-input>
                    </div>
		        </div>

		        <div class="field q-mt-md">
		       		<label>Password</label>
		       		<div>
                        <q-input v-model="form_data.password" 
                            :bg-color="!$q.dark.isActive? 'white':'grey-7'"  
                            :color="!$q.dark.isActive? 'blue-grey-14':'white'"
                            @input="password_validations" 
                            :rules="[
                            val => !!val || '* Field is required',
                            val => val.length >= 8 || 'Password must be 8 characters.',
                            val => /[a-z]/.test(val) && /\d/.test(val) && /[A-Z]/.test(val) || 'Must have Uppercase & Number',
                            ]"
                            :type="isPwd ? 'password' : 'text'" placeholder="**********" outlined >
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
                        <div :class="this.form_data.password.length < 8 ? 'q-pt-lg text-center' : 'text-center'" v-if="typed">
                            <div v-if="is_weak == true" class="lnu_container_weak">
                                <p class="font-monseratt q-py-xs">Weak</p>
                            </div>
                            <transition name="fade">
                                <div v-if="is_strong" class="lnu_container_strong">
                                    <p class="font-monseratt q-py-xs">Strong</p>
                                </div>
                            </transition>
                            <transition name="fade">
                                <div v-if="is_very_strong" class="lnu_container_very_strong">
                                    <p class="font-monseratt q-py-xs">Very Strong</p>
                                </div>
                            </transition>
                        </div>
                    </div>
		       </div>

		        <div class="field q-mt-md">
		       		<label>Confirm Password</label>
		       		<div>
                       <q-input v-model="form_data.confirm_password" :type="isConfirmPwd ? 'password' : 'text' " placeholder="**********" outlined>
                           <template v-slot:prepend>
                              <q-icon
                                name="lock" color="grey-10"
                              />
                            </template>
                           <template v-slot:append>
                              <q-icon
                                :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isConfirmPwd = !isConfirmPwd"
                              />
                            </template>
                        </q-input>
                    </div>
		       </div>
                <q-toggle v-model="form_data.value" label="I accept the Terms and Conditions"/>
		       <div class="q-mt-lg"><q-btn type="submit" color="primary" size="15px" unelevated class="full-width">Create Account</q-btn></div>
	   		</q-form>
	    </div>
    
        <div class="row main__div" v-if="is_submitted == true">
            <p class = "text-h5">Confirm Account Registration</p>
            <p class = "text-grey-7">Please check your email for your One-Time Passcode.</p>
            <q-input outlined v-model="form_data.otp" label="One Time Passcode" class= "full-width"/>
            <q-btn class="full-width" size="15px" color="primary" label="Submit" @click="confirm_email()" />
            <q-btn class="full-width" size="15px" label="Resend OTP" outline @click="resend_otp()" />
            <template>
                <div class="q-pa-md q-gutter-sm">
                    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
                    <q-card class="bg-primary text-white" style="width: 300px">
                        
                        <q-card-section>
                        <div class="text-h6"><i class="fas fa-check-square" aria-hidden="true"></i> Account has been verified</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                        You can now log in your account.
                        </q-card-section>

                        <q-card-actions align="right" class="bg-white text-primary">
                        <q-btn flat label="LOGIN" @click="$router.push({name: 'front_login'})" v-close-popup />
                        </q-card-actions>
                    </q-card>
                    </q-dialog>
                </div>
            </template>
        </div>
    </div>
    
</template>

<script>
import { postRegistrationUser, postConfirmRegistration, postResendOneTimePasscode } from '../references/url';
import country_code_list from "country-codes-list";
import Swal from "sweetalert2";
export default
{
    data:() =>(
    {
        
        form_data:
        {
            full_name: '',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            country:'',
            value: false,
            otp: '',
        },
        options:[],
        value:false,
        isPwd: true,
        isConfirmPwd:true,
        typed: false,
        contains_lovercase: false,
        contains_number: false,
        contains_uppercase: false,
        is_weak: false,
        is_strong: false,
        is_very_strong: false,
        is_submitted: false,
        persistent: false,
        
    }
    ),
    mounted()
    {
        this.options = country_code_list.all("all");
    },
    methods:
    {
        async findUser()
        {
            // this.$q.loading.show();
            this.form_data.country = this.form_data.country.countryNameEn
            let register = await this.$_post(postRegistrationUser, this.form_data);
            console.log("register status: ", register.data)
            if(register.data.status == "error")
            {
                 this.$q.notify({
                    message: '<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>' + register.data.message + '</div>',
                    position: 'top',
                    color: 'white',
                    html: true
                });
            }
            else if(register.data.status == "success")
            {
                // this.$router.push({name: 'front_success_registration'});
                this.is_submitted = true;
            }
            else
            {
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
            // this.$q.loading.hide();
        },

        password_validations() {
            this.form_data.confirm_password = "";
            this.typed = true;
            this.contains_lovercase = /[a-z]/.test(this.form_data.password);
            this.contains_number = /\d/.test(this.form_data.password);
            this.contains_uppercase = /[A-Z]/.test(this.form_data.password);

            if
            (
                this.form_data.password.length >= 8
                && this.contains_lovercase == true 
                && this.contains_number == true
                && this.contains_uppercase == true
            )
            {
                this.is_very_strong = true;
                this.is_strong = false;
                this.is_weak = false;
            }

            else if
            (
                this.form_data.password.length >= 8
                && this.contains_lovercase == true 
                && this.contains_number == true
            ) 
            {
                this.is_strong = true;
                this.is_very_strong = false;
                this.is_weak = false;
            }

            else if(this.form_data.password.length > 0)
            {
                this.is_weak = true;
                this.is_strong = false;
                this.is_very_strong = false;
            }
        },
        async confirm_email(){
            let register = await this.$_post(postConfirmRegistration, this.form_data);
            if(register.data.status == "success")
            {
                this.persistent = true;
            }
        },

        async resend_otp(){
            let resend = await this.$_post(postResendOneTimePasscode, this.form_data);
            console.log(resend.data)
            if(resend.data.status == "success")
            {
             this.$q.notify({
                    message: '<div style="color: green; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>' + 'OTP has been sent to your email' + '</div>',
                    position: 'top',
                    color: 'white',
                    html: true
                });
            }
        }

    }
}
</script>
<style scoped>

.q-radio__inner
{
    color: white !important;
}

.text-login-here{
    color: #1f3c88
}

.lnu_container_weak p
{
    font-size: 12px;
    background: #FF4757;
    color: white;
}
.lnu_container_strong p
{
    font-size: 12px;
    background: #FFA500;
    color: white;
}
.lnu_container_very_strong p
{
    font-size: 12px;
    background: #23AD5C;
    color: white;
}
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