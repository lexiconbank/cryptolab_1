<template>
    <div class="wallet_balance">
        <p class="title text-h6" >WALLET BALANCE</p>
        <div class="row wallet_header">
            <div class="col-2">COIN/TOKEN</div>
            <div class="col-2">YOUR ADDRESS</div>
            <div class="col-2">BALANCE</div>
            <div class="col-2">USD</div>
            <div class="col-2">PHP</div>
            <div class="col-2">ACTION</div>
        </div>
        <div class="col-12">
            <div class="row wallet_table">
                <div class="col-2">UNIQ</div>
                <div class="col-2">0x409583973973495303</div>
                <div class="col-2">0.163942739</div>
                <div class="col-2">326.86</div>
                <div class="col-2">16,237.21</div>
                <div class="col-2">
                    <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="DEPOSIT" /> &nbsp;
                    <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="WITHDRAW" />
                </div>
            </div>
            <div class="row wallet_table">
                <div class="col-2">BTC</div>
                <div class="col-2">0x409583973973495303</div>
                <div class="col-2">0.163942739</div>
                <div class="col-2">326.86</div>
                <div class="col-2">16,237.21</div>
                <div class="col-2">
                    <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="DEPOSIT" /> &nbsp;
                    <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="WITHDRAW" />
                </div>
            </div>
            <div class="row wallet_table">
                <div class="col-2">ETH</div>
                <div class="col-2">0x409583973973495303</div>
                <div class="col-2">0.163942739</div>
                <div class="col-2">326.86</div>
                <div class="col-2">16,237.21</div>
                <div class="col-2">
                    <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="DEPOSIT" /> &nbsp;
                    <q-btn color="white" outline class="col-6 custom_btn" text-color="primary" label="WITHDRAW" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .title{
        font-weight: bold;
    }
    .wallet_header{
        padding: 10px;
        font-weight: bold;
    }
    .wallet_table{
        padding: 10px 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 2px solid #f4f4f4
    }
</style>