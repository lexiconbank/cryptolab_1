<template>
    <q-layout class="custom__layout" view="hHh lpR fff">
        <q-header class="text-white bg-white nav__main">
            <q-toolbar>
                <q-toolbar-title> 
                    
                     <ul class="custom__nav">
                        <li class="selft-center image-container">
                           <a @click="$router.push({name: 'admin'})" style="cursor: pointer">
                                <q-img src="icons/main_logo.png"  style="width:200px" id="logo"/>
                            </a>
                        </li>
                    </ul>
                    
                </q-toolbar-title>
            </q-toolbar>
            
        </q-header>
        <q-page-container >
           <router-view/>
       </q-page-container>
   
              
   
    </q-layout>
</template>
<script>


export default
{
    data() {
        return {
      
    }
    }
}
</script>

<style scoped>

.nav__main{
    border-bottom: 1px solid #cfcfcf; 
    box-shadow: 0px 0px 10px 1px #cfcfcf; 
    padding:0px 30px;
    position:fixed;
}
</style>