<template>
    <div class="main__div">
        <div class="row">
            <div class="col-11"><p class="text-h5 text-bold title" align="left">{{ wallet.currency_name }}</p></div>
            <div class="col-1"><q-btn flat round icon="close" v-close-popup /></div> 
        </div>
        <div>
            <div class="row">
                <div class="col-12 text-center">
                   <!-- QR Code -->
                   <img
                   :src="`https://chart.googleapis.com/chart?cht=qr&chl=${wallet.public_key}&chs=250x250`"
                   alt="wallet address"
                   />
                </div>
                <div class="col-11">
                    <div class="row">
                        <div class="col-12 text-grey-9">BTC Wallet Address</div>
                    </div>
                    <div class="row">
                        <div class="col-12">{{ wallet.public_key }}</div>
                    </div>
                </div> 
                <div class="col-1"><q-btn flat round icon="fas fa-copy" color="primary" @click="copy" /></div> 
            </div> 
        </div>
     <!-- Tool Tip -->
        <div v-if="is_copy_clipboard">
          <q-tooltip v-model="is_copy_clipboard">
            {{ wallet.currency_abbreviation }} Wallet Address Copied!
          </q-tooltip>
        </div>
    </div>
</template>


<script>
    import { copyToClipboard } from "quasar";
    export default
    {
        props: ["wallet"],

        data:() =>
        ({   
            is_copy_clipboard: false,
        }),

        mounted()
        { 
            console.log('address', this.wallet.public_key);
        },

        methods:
        {
            async copy() {
                copyToClipboard(this.wallet.public_key).then(() => {
                    this.is_copy_clipboard = true;
                
                setTimeout(() => {
                    this.is_copy_clipboard = false;
                }, 2000);
                });
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
</style>