<template>
    <div class="main__div">
        <div class="row">
            <div class="col-11"><p class="text-h5 text-bold title" align="center">Send Bitcoin</p></div>
            <div class="col-1"><q-btn flat round icon="close" v-close-popup /></div> 
        </div>

        <span> Source wallet: </span>
        <q-icon name="fas fa-wallet"/>
        <span class="text-bold"> BTC </span>
        <div class="div__input">
            <p class="text-bold">Amount</p>
            <q-input
                placeholder="0"
                dense
                type="number"
                step="any"
                color="primary"
                class="full-width"
                v-model.number="form_data.amount"
                style="width: 450px"
                outlined
                :rules="[(val) => val <= 1 || 'Insufficient Balance',
                        (val) => val > 0 || 'Invalid amount']"/>
                <p class="text-bold">To</p>
                <q-input
                placeholder="Wallet Address"
                dense
                color="primary"
                class="full-width"
                v-model.number="form_data.address"
                outlined
                :rules="[val => !!val || 'Wallet address is required']" />
            <q-btn class="full-width" size="15px" color="primary" label="SEND" @click="send()" />
        </div>
    </div>

</template>

<script>
    // import { postWalletSend }   from '../references/url';

    export default
    {
        data:() =>
        ({   
            address : '',
            form_data : {
                amount  : '',
                address : ''
            },
        }),

        mounted()
        { 
        },

        methods:
        {
            async send(){
                let wallet_send = await this.$_post(postWalletSend, this.form_data);
                console.log(wallet_send, 'here');
            }
        }
    }
</script>
    
<style css="scss">
    .title{
        padding-top: 15px;
    }
    .main__div{
        width : 420px;
        padding: 10px;
    }
    .div__input{
        padding-top: 20px
    }

    input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
 
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>