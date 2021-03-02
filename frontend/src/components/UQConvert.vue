<template>
    <div>
        <p class="title text-h5">CONVERT</p> 
        <p>Convert from:</p>
        <div class="convert_items row">
            <div class="col-3"><q-select class="custom_select" outlined v-model="select" :options="options" /></div>
            <div class="col-9"><q-input class="custom_btn" outlined v-model="text" label="0.00" /></div>
            <div class="col-12 balance" align="right">Balance: <b>0.00 USD</b></div>
        </div>
        
        <p>Convert to:</p>
        <div class="convert_items row">
            <div class="col-3"><q-select class="custom_select" outlined v-model="select" :options="options" /></div>
            <div class="col-9"><q-input class="custom_btn" outlined v-model="text" label="0.00" /></div>
            <div class="col-12 balance" align="right">Balance: <span><b>0.00 USD</b></span></div>
        </div>
        <div class="current_rate" align="center">
            <p>CURRENT RATE</p>
            <p class="text-light-blue-10"> 1 BTC ~ 1,701,974.34 PHP </p>
        </div>
        <div class="row info">
			<div class="col-3">
                <q-icon name="info" class="text-amber-14" style="font-size: 3rem;" />
            </div>
			<div class="col-9">
			Please keep in mind that the prices of digital currencies are violated. Prices may go up or down at any time.
			</div>
		</div>
        <div class="class_btn" align="center">
            <q-btn class="convert_btn" color="primary" label="Convert" />
        </div>
    </div>
</template>

<script>
export default
{
  data:() => (
  {
      select: "PHP",
      options: [ "PHP", "BTC" ]
    }),
}
</script>


<style lang="scss">
    .title{
        font-weight: bold;
    }
    .custom_select{
        width: 95%;
    }
    .custom_btn{
        width: 100%;
    }
    .balance{
        padding: 10px;
    }
    .current_rate{
        margin: 20px;
    }
    .info{
        background-color: $orange-11;
        font-weight: bold;
        width: 100%;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .class_btn{
        margin-top: 20px;
    }
    .convert_btn{
        width: 150px;
        border-radius: 10px;
    }
</style>