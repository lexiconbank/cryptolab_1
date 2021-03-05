<template>
    <div>

	    <!-- content -->
	    <div class='content text-left'>
	    	<q-form class="row" > 
                <div class="col-12 custom__image__container">
                      <q-img src="icons/main_logo.png" width="250px" id="logo"/>
                      <h5 style="margin:0;padding:0;" class="text-weight-bold">Confirm Account Registration</h5>
                      <p style="margin:0;padding:0;">Please check your email for your One-Time Passcode.</p>
                </div>
		     	<div class="field col-12">
		       		<div  class="field q-mt-md">
                        <label>Email address: </label>
                        <q-input outlined> 
                            <template v-slot:prepend>
                                <q-icon name="email" color="grey-10" />
                            </template>
                        </q-input>
                    </div>
		       </div>
		       <div class="col-12 q-mt-xl">
                    <q-btn type="submit" color="primary" size="18px" label="SUBMIT" class="full-width">
                    </q-btn>
                </div>
              
                <div class="col-12 q-mt-md">

                     <q-btn outline style="color: #1976D2;" size="18px" class="full-width" label="RESEND OTP" />
                </div>
	   		</q-form>
	    </div>
    </div>
</template>

<script>
import { postLoginUser } from '../references/url';
import Swal from "sweetalert2";

export default
{
  
}
</script>
<style scoped>
.custom__image__container{
    display:flex;
    flex-direction: column;
    align-items: center;
}
</style>