<template>
    <q-layout class="custom__layout" view="hHh lpR fff">
        <q-header class="text-white bg-white nav__main">
            <q-toolbar>
                <q-toolbar-title> 
                    
                     <ul class="custom__nav">
                        <li class="selft-center image-container">
                           <a @click="$router.push({name: 'front_landing'})" style="cursor: pointer">
                                <q-img src="icons/main_logo.png"  id="logo"/>
                            </a>
                        </li>
                        <li class="self-center custom__li"  >
                        <a>Blockchain</a>
                        </li>
                        <li class="self-center custom__li" >
                        <a>Industries</a>
                        </li>
                        <li class="self-center custom__li" >
                        <a>Services</a>
                        </li>
                        <li class="self-center custom__li" >
                        <a>Projects</a>
                        </li>
                        <li class="self-center custom__li" >
                        <a>Partners</a>
                        </li>
                        <li class="self-center custom__li" >
                            <q-btn flat
                            label="Buy BTC"
                            size="12px"
                            style="color: #0275d8;border:1px solid #0275d8;border-radius:10px;"
                            />
                        </li>
                         <li class="self-center custom__li" >
                             <q-btn color="white" size="12px" flat style="width:120px;background:#0275d8;border:#0275d8 1px solid;border-radius:10px;" label="Wallet" />

                        </li>
                        <q-btn side="right"  class="q-mx-sm humburger-btn" dense flat round color="black" icon="menu" @click="drawerLeft = !drawerLeft" id="burger-btn" />
                    </ul>
                    
                </q-toolbar-title>
            </q-toolbar>
            
        </q-header>
        <q-page-container >
           <router-view/>
       </q-page-container>
   

        <q-footer class="shadow-up-5 custom__footer bg-grey-10"> 
          
             <div class="row" align="center">
                <div class="col-12 col-md-3 costum__col"><h5 class="custom__p text-weight-bolder">GET THE LATEST CRYPTO NEWS</h5></div>
                <div class="col-12 col-md-6 costum__col"><q-input style="background:white;border-radius:10px;" outlined label="Email address" /></div>
                <div class="col-12 col-md-1 costum__col"> <q-btn color="primary" class="custom__btn" size="20px" label="SUBSCRIBE" /></div>
            </div>
            <div class="row" style="margin-top:50px;" align="center">
                 <div class="col-12 col-md-3">
                        <a @click="$router.push({name: 'front_landing'})" style="cursor: pointer">
                            <q-img src="icons/main_logo.png"  width="250px" id="logo"/>
                        </a>
                 </div>
                 <div class="col-12 col-md-3">
                        <h6 class="custom__h6">Services</h6>
                        <ul class="custom__footer__ul">
                        <li ><a>Blockchain Development</a></li>
                        <li ><a>Custom Software</a></li>
                        <li ><a>Mobile App</a></li>
                        <li ><a>Data Science</a></li>
                        <li ><a>Artificial Intelligence</a></li>
                        <li ><a>Machine Learning</a></li>
                        <li ><a>Internet-of-things</a></li>
                        <li ><a>Robotics Software</a></li>
                        <li ><a>Consultancy</a></li>
                        </ul>
                 </div>
                    <div class="col-12 col-md-3">
                        <h6 class="custom__h6">Company</h6>
                        <ul class="custom__footer__ul">
                        <li ><a>About</a></li>
                        <li ><a>Partners</a></li>
                        <li ><a>Projects</a></li>
                        <li ><a>Industries</a></li>
                        <li ><a>Event</a></li>
                        <li ><a>Careers</a></li>
                        <li ><a>Blogs</a></li>
                        <li ><a>Contacts</a></li>
                        <li ><a>Supports</a></li>
                        </ul>
                 </div>
                    <div class="col-12 col-md-3">
                        <h6 class="custom__h6">Follow</h6>
                        <ul class="custom__footer__ul">
                        <li ><a>News</a></li>
                        <li ><a>Facebook</a></li>
                        <li ><a>Linkedin</a></li>
                        <li ><a>Telegram</a></li>
                        <li ><a>Twitter</a></li>
                        <li ><a>Youtube</a></li>
                        <li ><a>Affiliate Program</a></li>
                
                        </ul>
                    </div>

            </div>
            <q-separator color="white" style="margin-top:50px;margin-bottom:10px;" />
            <div class="row">
                <div class="col-12 col-md-6">
                     <h6 class="text-weight-medium">Copryright&#169; 2021 Baristocrat. All right reserved</h6>
                </div>
                <div class="col-12 col-md-6">
                    <ul class="custom__footer__second">
                        <li><a>Term of use</a></li>
                        <li><span></span></li>
                        <li><a>Privacy Legal</a></li>
                        <li><span></span></li>
                        <li><a>Disclaimer</a></li>
                        <li><span></span></li>
                        <li><a>But Bitcoin</a></li>
                        <li><span></span></li>
                        <li><a>Wallet</a></li>

                    </ul>
                </div>
            </div>


        </q-footer>  
    </q-layout>
</template>
<script>


export default
{
    data() {
        return {
        drawerLeft: false,
    }
    }
}
</script>
<style scoped>

*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
.custom__layout{
    position:relative;
}

/* CUSTOMIZATION FOR HEADER ANDN AV BAR */

/*HUMBURGER BUTTON*/
.humburger-btn{
    display:none;
}
#logo{
    width:150px
}
.custom__nav{
    display:flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    padding:0;
    margin:0;
}
.custom__nav li{
    margin:0 20px;
    font-size:16px;
}
.custom__nav li:nth-child(8){
    margin-right:30px;
    margin-left:-3px;
}
.custom__nav li a {
    cursor:pointer;
    color:black;
    font-family:Arial, Helvetica, sans-serif;
    color:grey; 
}
.custom__nav li a::after{
    content:"";
    display:block;
    width:100%;
    height:3px;
    background:#0275d8;
    transform:scale(0,1);
    transition:transform 300ms ease-out;

}
.custom__nav li a:hover::after{
    transform:scale(1,1);
}
.custom__nav li a:hover{
    color:black;
}
.custom__nav li:nth-child(1) a::after,
.custom__nav li:nth-child(7) a::after,
.custom__nav li:nth-child(8) a::after{
all:unset;

}
.custom__nav .image-container{
    flex:1;
    margin:0;
}

.nav__main{
    border-bottom: 1px solid #cfcfcf; 
    box-shadow: 0px 0px 10px 1px #cfcfcf; 
    padding:0px 30px;
    position:fixed;
}
/* CUSTOMIZATION FOR HEADER AND NAV BAR */


/*CUSTOMIZATION FOR FOOTER */
.custom__footer{
    display:flex;
    flex-direction:column;
   position: absolute;
  bottom: 0;
 padding:30px 120px;
}
.custom__btn{
    margin-left:20px;
    width:300px
}
.custom__p{
    margin-top:10px;
    font-size:18px;
}
.custom__footer__ul{
    list-style:none;
    display:flex;
    flex-direction: column;
    align-items:flex-start;
    margin-top:20px;
    font-size:16px;
}
.custom__h6{
    text-align: start;
}
.custom__footer__second{
    list-style: none;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    
}
.custom__footer__second li a {
    margin-left:20px;
    font-size:16px;
  
}
.custom__footer__second li span{
    display:block;
    height:100%;
    width:1px;
    background:white;
       margin-left:20px;
    
  
}
/*CUSTOMIZATION FOR FOOTER */


/*FOR MOBILE VIEW CUSTOMIZATION */
@media (max-width:1000px) {
    .custom__li{
        display:none;
    }
    .humburger-btn{
        display:block;  
    }
   .nav__main{
       padding-left:10px !important;
    }      
    #logo{
        width:200px !important;
    }
    .costum__col{
        margin-top:10px;
    }
    .custom__btn{
        margin-left:0px;
        width:100%;
    }
    .custom__footer__ul h6{
        align-items: center;
        justify-content: center;
    }
    .custom__footer__ul{
        display:none;
    }
    .custom__h6{
        text-align: center;
        margin-top:10px;
        padding:10px 0px;
    }
    .custom__h6:hover{
        text-align: center;
        margin-top:10px;
        background:white;
        color:black;
    }
}

@media (max-width:600px) and (min-width:300px) {
    .custom__p{
        margin-top:0px;
        font-size:16px;
    }
    .custom__footer{
        padding:20px;
    }
}
/*FOR MOBILE VIEW */


</style>

