<template>
     <div class="row" style="height:100vh">
        <div class="custom__left col-12 col-md-3">
            <div class="row">
                  <div class="col-12" align="center">
                      <q-img src="icons/main_logo.png" @click="$router.push({ name: 'front_login' })" style="cursor:pointer" width="250px" id="logo"/>
                </div>
            </div>
            <div style="display:none" class="custom__row row" align="center">
                <div class="col-5"><h5 class="active text-weight-bold">LOGIN</h5></div>
                <div class="col-2"><span></span></div>
                <div class="col-5"><h5 class="notActive" @click="$router.push({ name: 'front_registration' })">SIGN UP</h5></div>
            </div>
            <u-q-reset-password class="q-px-xl"></u-q-reset-password>
        </div>       
        <div class="custom__right col-9">
        </div>
    </div>
</template>
<script>

import UQResetPassword from '../../components/UQResetPassword'
export default {

    components:{
        UQResetPassword,
    }
}
</script>
<style scoped>
h5{
    cursor:pointer;
}
.active{
    color: #1976D2;;
}
.active::after{
    content:"";
    display:block;
    width:50%;
    height:2px;
    background:#1976D2;;

}
span{
    display:block;
    background:black;
    height:50%;
    width:2px;
    margin-top:20px;
    
}
.custom__left{

    margin-top:100px;
}
.custom__right{
    padding:10px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image:url("../../../public/icons/65978.png");
    background-position: center;
    background-size: cover;
}
.notActive::after{
    content:"";
    display:block;
    width:50%;
    height:3px;
    background:#0275d8;
    transform:scale(0,1);
    transition:transform 300ms ease-out;
}
.notActive:hover::after{
    transform:scale(1,1);
}

@media (max-width:1000px){
.custom__right{
    display:none;
}
}
</style>

