<template>
    <div>

	    <!-- content -->
	    <div class='content text-left'>
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
		       		<div><q-input v-model="form_data.full_name" placeholder="Firstname | Middlename | Lastname" outlined ></q-input></div>
		       </div>

		     	<div class="field q-mt-md">
		       		<label>Email</label>
		       		<div><q-input v-model="form_data.email" placeholder="cryptolab@xxxxxxx.com" outlined></q-input></div>
		       </div>

		        <div class="field q-mt-md">
		       		<label>Password</label>
		       		<div><q-input v-model="form_data.password" type="password" placeholder="**********" outlined></q-input></div>
		       </div>

		        <div class="field q-mt-md">
		       		<label>Confirm Password</label>
		       		<div><q-input v-model="form_data.confirm_password" type="password" placeholder="**********" outlined></q-input></div>
		       </div>
                <q-toggle v-model="value" label="I accept the Terms and Conditions"/>
		       <div class="q-mt-lg"><q-btn type="submit" color="primary" size="18px" unelevated class="full-width">Create Account</q-btn></div>
	   		</q-form>
	    </div>
    </div>
</template>

<script>
import { postRegistrationUser } from '../references/url';
import country_code_list from "country-codes-list";
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
            country:''
        },
        options:[],
        value:false
    }),
    mounted()
    {
        this.options = country_code_list.all("all")
     
        // this.country = "Sadasd"
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
        },

    }
}
</script>
<style scoped>

</style>