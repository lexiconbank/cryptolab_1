<template>
    <div>
	    <div class="row" style="height:100vh">
            <!-- content -->
            <div class='custom__left content col-3 text-left'>
                <u-q-registration-otp class="q-px-xl"></u-q-registration-otp>
            </div>
            <div class="custom__right col-9">
            </div>
        </div>
    </div>
</template>

<script>
import UQRegistrationOtp from '../../components/UQRegistrationOtp'
export default
{
    
components:{
        UQRegistrationOtp,
    }
}
</script>
<style scoped>
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
.custom__left{

    margin-top:100px;
}
</style>