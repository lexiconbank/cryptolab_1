<template>
    <div class="row">
        <div align="center" class="bg-grey-1 q-pa-xl custom__col shadow-9 col-10 col-md-4">
            <q-img src="icons/main_logo.png" @click="$router.push({ name: 'front_login' })"  id="logo"/>
            <u-q-admin-login></u-q-admin-login>
        </div>
    </div>
</template>
<script>
import UQAdminLogin from '../../components/UQAdminLogin'
export default {
    components:{
        UQAdminLogin
    }
}
</script>

<style scoped>
.custom__form__container {
    width:100%;

}
#logo{
    cursor:pointer;
    width:250px;
}
.custom__col{
    border-radius:10px;

}
.row{
    height:100vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image:url("../../../public/icons/BG.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
@media (max-width:360px) {
    #logo{
        width:150px;
    }
    .custom__col{
        padding:20px;
    }
}
</style>
