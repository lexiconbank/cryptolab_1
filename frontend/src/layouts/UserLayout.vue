<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-white text-black" >            
            <q-toolbar>
                <q-toolbar-title class="custom__logo" align="left" style="margin-left :20px;">         
                    <q-img  src="icons/main_logo.png" id="logo"/>    
                </q-toolbar-title> 
                <q-toolbar-title align="center">  
                    <ul class="custom__nav">    
                        <li class="self-center custom__li" style="margin-left :15px;" >
                            <img src=" https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png" width="40px" height="auto">  
                            <a style="margin-left :10px;"> BTC</a>
                        </li>
                        <li class="self-center custom__li" style="margin-left :15px;">
                           <img src=" https://tse4.mm.bing.net/th?id=OIP.9ZCocQVloQfL9hQzSz-NwgHaHa&pid=Api&P=0&w=300&h=300" width="40px" height="auto">  
                            <a style="margin-left :10px;">EHP</a>
                        </li>
                        <li class="self-center custom__li" style="margin-left :15px;">
                           <img src="https://tse3.mm.bing.net/th?id=OIP.JFVk-kftTOQAa8nUsnPZ0AAAAA&pid=Api&P=0&w=300&h=300" width="40px" height="auto">  
                            <a style="margin-left :10px;">BCH</a>
                        </li>
                        <li class="self-center custom__li" style="margin-left :15px;">
                             <img src="https://tse4.mm.bing.net/th?id=OIP.BctgoU0IQI3Gjh1Zqohj6QAAAA&pid=Api&P=0&w=300&h=300" width="40px" height="auto">  
                            <a style="margin-left :10px;">XRP</a>
                        </li>
                        <li class="self-center custom__li" style="margin-left :15px;">     
                            <img src="https://tse4.mm.bing.net/th?id=OIP.rKBfz4ncKYROpovDqSxW3gHaHa&pid=Api&P=0&w=300&h=300" width="40px" height="auto"> <a style="margin-left :10px;">XRP</a>
                        </li></ul>
                    </q-toolbar-title>
            <q-select
                :options="country_options"

                :rules="[val => !!val]"
                v-model="country"
                option-value="countryNameEn"
                option-label="countryNameEn"
                behavior="menu"
            >
                <template v-slot:prepend>
                    <img :src="'https://www.countryflags.io/' + country.countryCode + '/flat/32.png'" />
                </template>
                <template v-slot:option="scope">
                    <q-item
                        v-bind="scope.itemProps"
                        v-on="scope.itemEvents"
                        >
                        <q-item-section side>
                            <img :src="'https://www.countryflags.io/' + scope.opt.countryCode + '/flat/32.png'" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label v-html="scope.opt.countryNameEn" />
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>

                    <q-btn round  style="margin-left :20px;" > <img src="https://tse2.mm.bing.net/th?id=OIP.eCrcK2BiqwBGE1naWwK3UwHaHa&pid=Api&P=0&w=300&h=300" width="40px" height="auto"/>
                    </q-btn>
                    <q-btn color="secondary" label="LOG OUT" style="margin-left :20px; margin-right:50px;"/>
                    <q-btn dense flat  class="custom__humburger" round icon="menu" @click="right = !right"  />
            </q-toolbar>
            <q-tabs align="justify">
                <q-route-tab to="/wallet"  style=" font-size:20px">wallet</q-route-tab>
                <q-route-tab to="/convert"   style="margin-left :20px;  font-size:20px">CONVERT</q-route-tab>
                <q-route-tab to="/transaction_history" style="margin-left :20px; font-size:20px">TRANSACTION HISTORY</q-route-tab>
                <q-route-tab to="/invite_friends" style="margin-left :20px; font-size:20px">INVITE FRIENDS</q-route-tab>
            </q-tabs>
        </q-header>     
        <q-drawer side="right" v-model="right" >
            <q-toolbar>
                <div class="column full-width">
                     <q-toolbar-title align="right">                           
                        <a>CRYPTOLAB</a>
                        <q-separator color="black" style="margin-top:20px;margin-bottom:20px;" />
                        <q-list bordered>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <img src=" https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png" width="40px" height="auto">  
                                </q-item-section>
                                <q-item-section>BTC</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <img src=" https://tse4.mm.bing.net/th?id=OIP.9ZCocQVloQfL9hQzSz-NwgHaHa&pid=Api&P=0&w=300&h=300" width="40px" height="auto">  
                                </q-item-section>
                                <q-item-section>ETH</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <img src="https://tse3.mm.bing.net/th?id=OIP.JFVk-kftTOQAa8nUsnPZ0AAAAA&pid=Api&P=0&w=300&h=300" width="40px" height="auto"> 
                                </q-item-section>
                                <q-item-section>BCH</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <img src="https://tse4.mm.bing.net/th?id=OIP.BctgoU0IQI3Gjh1Zqohj6QAAAA&pid=Api&P=0&w=300&h=300" width="40px" height="auto"> 
                                </q-item-section>
                                <q-item-section>XRP</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <img src="https://tse4.mm.bing.net/th?id=OIP.rKBfz4ncKYROpovDqSxW3gHaHa&pid=Api&P=0&w=300&h=300" width="40px" height="auto"> 
                                    
                                </q-item-section>
                                <q-item-section>XRP</q-item-section>
                            </q-item>      
                        </q-list>    
                    </q-toolbar-title>
                </div>
            </q-toolbar>
        </q-drawer>
        
        <!-- <q-page-container align="center">
           <router-view/>
           <q-toolbar-title align="center" style="margin-top:20px; font-size:20px">  
               
                    <ul class="custom__nav">        <q-toolbar-title align="right">    
                        <li class="self-center custom__li" style="margin-left :15px;" >
                            <img src=" https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/1200px-BTC_Logo.svg.png" width="80px" height="auto">  
                            <a style="margin-left :10px;"> BTC</a><br><a style="margin-left :10px;"> BTC</a>
                        </li></q-toolbar-title>    <q-toolbar-title align="right">    
                        <li class="self-center custom__li" style="margin-left :15px;">
                           <img src=" https://tse4.mm.bing.net/th?id=OIP.9ZCocQVloQfL9hQzSz-NwgHaHa&pid=Api&P=0&w=300&h=300" width="40px" height="auto">  
                            <a style="margin-left :10px;">EHP</a>
                        </li></q-toolbar-title>    <q-toolbar-title align="right">    
                        <li class="self-center custom__li" style="margin-left :15px;">
                           <img src="https://tse3.mm.bing.net/th?id=OIP.JFVk-kftTOQAa8nUsnPZ0AAAAA&pid=Api&P=0&w=300&h=300" width="40px" height="auto">  
                            <a style="margin-left :10px;">BCH</a>
                        </li></q-toolbar-title>    <q-toolbar-title align="right">    </q-toolbar-title>
                        </ul>


<q-markdown >
All Account
===

</q-markdown>


<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-info></u-q-info>
    </div>
</div>

                    </q-toolbar-title>
                    
        <q-drawer v-model="rightDrawerOpen" show-if-above bordered content-class="bg-grey-1" side="right">
			<div class="nav-title" style="margin-top:20px; font-size:20px">BTC WALLET</div>
			<q-list class="nav-list" v-for="(nav,key) of navigation" :key="key" >
				<template >
				
				</template>
			</q-list>
        </q-drawer>
       </q-page-container>   -->
    </q-layout>
</template>
<script>
import countryCodeLst from 'country-codes-list'
// import UQDashboardMain from '../../components/UQDashboardMain.vue'

export default {
  data () {
    return {
        country_options: [],
        
        country: '',
        right: false,
        options:[],

// 	package_data: { version: '0.0.0' },
// 		leftDrawerOpen: false,
// 		navigation: [],

//         code: `<div class="component q-ma-lg">
//     <div class="form-container">
//         <u-q-info></u-q-info>
//     </div>
// </div>`
    }
  },
//    components: { UQDashboardMain },
  mounted(){
  this.country_options = countryCodeLst.all("all");
    //  this.navigation = navigation;
  },
  methods:{
        flags(){
                 console.log(this.country_options)
       }
  }

}

</script>

<style scoped>
#logo{
height:auto;
max-width:50%;
}
.custom__humburger{
    display:none;
}
.custom__nav{
    display:flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    padding:0;
    margin:0;
}
@media (max-width:1000px){
    .custom__humburger{
        display:block;
    }
}
@media (max-width:1000px) {
    .custom__li{
        display:none;
        }

}
</style>