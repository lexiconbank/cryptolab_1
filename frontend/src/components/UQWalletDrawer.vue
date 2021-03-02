<template>
    <div class="wallet_main">
        <div class="wallet_name text-grey-8" >BTC Wallet</div>
        <div><span class="text-h5 text-weight-medium">254.64000012</span> BTC</div>
        <div class="text-grey-7">100,87871.15 PHP</div>

        <div class="row wallet_btn">
                <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="Receive" />
                <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="Send" />
        </div>

        <div class="wallet_all">
            <p class=" text-h6">All Wallet</p>
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
    </div>
</template>

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
        margin: 0px 0 20px;
    }
    .wallet_btn{
        margin-top: 10px;
    }
    .wallet_main .wallet_btn .custom_btn{
        border-radius: 10px;
        size: 100px;
        width: 125px;
        margin: 10px;
    }
    .wallet_main .wallet_all{
        margin-top: 40px; 
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