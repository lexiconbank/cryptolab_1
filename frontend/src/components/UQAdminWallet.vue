<template>
    <div class="wallet_main">
        <div class="wallet_name text-grey-8" >BTC Wallet</div>
        <div><span class="text-h5 text-weight-medium">254.64000012</span> BTC</div>
        <div class="text-grey-7">100,87871.15 PHP</div>

        <div class="row wallet_btn">
            <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="Receive" @click="is_show_receive_modal = true" />
            <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="Send" @click="is_show_send_modal = true"/>
        </div>

        <div class="wallet_all">
            <p class="text-h6 text-left q-pl-md">All Wallet</p>
            <q-separator></q-separator>
            <div>
                <div class="row wallet_all_select text-h6">
                    <div class="col-6" align="left">UNIQ</div>
                    <div class="col-6" align="right">254.64000012</div>
                </div>
                <div class="row wallet_all_select text-h6">
                    <div class="col-6" align="left">BRT</div>
                    <div class="col-6" align="right">254.64000012</div>
                </div>
                <div class="row wallet_all_select text-h6">
                    <div class="col-6" align="left">BTC</div>
                    <div class="col-6" align="right">254.64000012</div>
                </div>
                <div class="row wallet_all_select text-h6">
                    <div class="col-6" align="left">ETH</div>
                    <div class="col-6" align="right">254.64000012</div>
                </div>
            </div>
        </div>

         <!-- Send Dialog -->
        <q-dialog v-model="is_show_send_modal" persistent>
            <q-card style="width: 450px; border-radius: 20px">
                <!-- UQClientSend Component -->
                <q-card-section class="q-pt-none">
                    <u-q-admin-send>
                    </u-q-admin-send>
                </q-card-section>
            </q-card>
        </q-dialog>

         <!-- Send Dialog -->
        <q-dialog v-model="is_show_receive_modal" persistent>
            <q-card style="width: 450px; border-radius: 20px">
                <!-- UQClientReceive Component -->
                <q-card-section class="q-pt-none">
                    <u-q-client-receive :address="wallet">
                    </u-q-client-receive>
                </q-card-section>
            </q-card>
        </q-dialog>
    
    </div>
</template>

<script>
import {postGetUser}      from '../references/url'; 
import UQAdminSend     from './UQAdminSend';
import UQClientReceive  from './UQClientReceive';
   
export default
{
    components: 
    { 
        UQAdminSend, UQClientReceive
    },

    data:() =>
    ({   
        wallet : '',
        form_data : {
            _id : '60481014081a1b0c106708a4',
            amount : ''
        },
        is_show_send_modal : false,
        is_show_receive_modal : false,

    }),

    async mounted()
    { 
       await this.authenticate_user();
    },

    methods:
    {
       async authenticate_user()
	    {
            console.log('here', this.form_data.address);
            let user = await this.$_post(postGetUser, this.form_data);
            console.log('user', user);

            this.wallet = user.data.wallet;
			// let auth = await this.$_isUserAuthenticated();
			// if(auth.data.status == 'authenticated')
			// {
			// 	this.user = auth.data.user;
			// }
			// else
			// {
			// 	this.$router.push({ name: 'front_login'})
			// }
	    },
    }
}
</script>

<style lang="scss">
    .wallet_main div {
        padding: 5px;
    }
    .wallet_main {
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    .wallet_main .wallet_name{
        font-size: 20px;
        font-weight: normal;
        margin: 0px 0 20px 0;
    }
    .wallet_main .wallet_btn .custom_btn{
        border-radius: 10px;
        size: 100px;
        width: 125px;
        margin: 10px;
    }
    .wallet_main .wallet_all{
        margin-top: 20px; 
        font-weight: normal;
        width: 75%;
        text-align: center;
    }
    .wallet_all_select{
        padding: 10px;
        font-weight: normal;
        cursor: pointer;
        color: $grey-8;
    }
    .wallet_all_select:hover{
        background-color: #f7f7f7;
        color: $light-blue-10;
    }
</style>