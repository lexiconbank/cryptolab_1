<template>
    <div class="row custom_div ">
        <div class="col-12 text-h4 text-weight-bold">Success!</div>
        <div class="col-12 text-h5 text-grey-7">Your account password has been successfully changed.</div>
        <div class="col-12 text-h7 text-grey-7 caption">Please login to Cryptolab with your new password</div>
        <div class="col-12"><q-btn outline class="full-width" color="primary" size="15px" label="LOGIN" @click="$router.push({ name: 'front_login' })"  /></div>
    </div>
</template>


<style lang="scss">
    .custom_div{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding-top: 40px;
    }
    .custom_div div{
        padding: 10px;
    }
    .custom_div .caption{
        padding-top: 30px;
    }
</style>