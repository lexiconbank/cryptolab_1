<template>
    <div class="main__div">
        <div class="row">
            <div class="col-11"><p class="text-h5 text-bold title" align="left">Bitcoin</p></div>
            <div class="col-1"><q-btn flat round icon="close" v-close-popup /></div> 
        </div>
        <div>
            <div class="row">
                <div class="col-11">
                    <div class="row">
                        <div class="col-12 text-grey-9">BTC Wallet Address</div>
                    </div>
                    <div class="row">
                        <div class="col-12">tb1qfe5ny2r7rl4eccdxmcwlxzsct92cv8jcjclqvk</div>
                    </div>
                </div> 
                <div class="col-1"><q-btn flat round icon="fas fa-copy" color="primary" @click="" /></div> 
            </div> 
        </div>
        
    </div>
</template>


<script>

    export default
    {
        props: ["wallet"],

        data:() =>
        ({   
        }),

        mounted()
        { 
            console.log('address', this.wallet);
        },

        methods:
        {
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