<template>
    
    <div class="custom__row row">
        <div class="custom__left col-12 col-md-4">
            <div class="row " >
                <h3 class="custom__h3 text-weight-bold ">CREATE YOUR WALLET</h3>
            </div>
            <div class="row">
                <h3 class="custom__h3_2 text-weight-bold ">TO GET STARTED</h3>
            </div>
            <div class="row">
                <q-btn color="primary" class="custom__btn " size="16px" label="GET STARTED" />
            </div>
            <div align="center" class="q-mt-xl ">
                 <q-btn color="primary" outline class="custom__btn__login q-mr-md"  label="LOGIN"  @click="$router.push({ name: 'front_login' })"></q-btn>
                <q-btn color="secondary" class="custom__btn__signup" label="SIGN UP" @click="$router.push({ name: 'front_registration' })"></q-btn>
             </div>
        </div>
        <div class="custom__right col-12 col-md-8">
           <!-- for image -->
        </div>
        <div class="row">
            
        </div>
    </div>
    
</template>

<script>

export default {
    
}
</script>
<style scoped>
.custom__btn__login,.custom__btn__signup{
    width:200px;
    border-radius:10px;
    font-size:20px;
}
.custom__row{
    height:calc(100vh);
}
.custom__btn{
    width:200px;
    height:50px;
    border-radius:20px;
}
.custom__left{

    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.custom__right{
    padding:10px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image:url("../../../public/icons/phone6.png");
    background-position: center;
    background-size: cover;

    
}
.custom__h3{
    color:rgb(72, 72, 72);
    margin-bottom: 0px;

    font-size:36px;
}.custom__h3_2{
        color:rgb(72, 72, 72);
    margin-top:0;
     font-size:36px;
}
@media (max-width:1000px) {
    .custom__right{
        display:none;
    }
    .custom__left{}
}
</style>