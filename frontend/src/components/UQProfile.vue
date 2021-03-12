<template>
    <div class="main__div row">   
        <div class="col-12 text-h4 title">My Account</div>   
        <div class="col-12">     
            <div class="custom_div row">
                <div class="col-3" ><img src="https://i.imgur.com/XplLIk9.png" width="120px" class="custom_avatar"></div>
                <div class="col-9 right_div">
                    <div class="row">
                        <div class="col-12 text-h5 user_name">Carla Joy</div>
                        <div class="col-12 text-primary text-weight-medium change_pass">Change Profile Photo</div>
                    </div>
                </div>
            </div>
            <div class="custom_div row">
                <div class="col-3">Full Name</div>
                <div class="col-9">
                    <q-input outlined v-model="form_data.full_name" label="First Name | Last Name" :rules="[val => !!val]"/>
                </div>
                <div class="col-3">Email</div>
                <div class="col-9">
                    <q-input outlined v-model="form_data.email" label="cryptolab@xxxx.xxx" :rules="[val => !!val]"/>
                </div>
                <div class="col-3">Phone</div>
                <div class="col-9">
                    <q-input outlined v-model="form_data.contact_no" label="(+63) 09123456789" :rules="[val => !!val]"/>
                </div>
                <div class="col-3">Country</div>
                <div class="col-9">
                    <q-input outlined v-model="form_data.country" label="Country " :rules="[val => !!val]"/>
                </div>
                <div class="col-12" align="center"><q-btn class="custom_button" size="15px" color="primary" label="UPDATE" @click=""/></div>
                
                <div class="col-12 text-h4 title">Change Password</div>   
                
                <div class="col-3">Old Password</div>
                <div class="col-9">
                    <q-input outlined v-model="form_data.old_password" label="******" :rules="[val => !!val]"/>
                </div>
                <div class="col-3">New Password</div>
                <div class="col-9">
                    <q-input outlined v-model="form_data.new_password" label="******" :rules="[val => !!val]"/>
                </div>
                <div class="col-3">Confirm New Password</div>
                <div class="col-9">
                    <q-input outlined v-model="form_data.confirm_password" label="******" :rules="[val => !!val]"/>
                </div>
                 <div class="col-12" align="center"><q-btn class="custom_button" size="15px" color="primary" label="UPDATE" @click=""/></div>   
            </div>
        </div>
    </div>
</template>

<script>
    export default
    {
        data: () =>
        ({
            form_data:
            {
                full_name: '',
                email: '',
                contact_no: '',
                country: '',
                old_password: '',
                new_password: '',
                confirm_password: '',

            },
        }),

    }

</script>

<style lang="scss">
    .title{
        padding-bottom: 20px; 
    }
    .custom_div{
        display: flex;
        align-items: center;
    }
    .custom_button{
        border-radius: 5px;
        width: 200px;
    }
    .change_pass{
        cursor: pointer;
    }

</style>