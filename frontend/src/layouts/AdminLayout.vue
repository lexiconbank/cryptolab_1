<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-toolbar-title>
                    <span class="gt-xs">Cryptolab Admin-Side</span> 
                </q-toolbar-title>
                <div > <span class="text-uppercase text-bold"> {{admin_name}} </span> | <span> {{role}}</span></div>
                <q-btn  class="q-ma-xs" unelevated @click="signOut" color="primary" icon="logout" />
            </q-toolbar>
        </q-header>

           <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
			
            <div class="q-pa-xl bg-white"> <q-img src="icons/main_logo.png" style="width:100%;margin-left:-20px;" /> </div>
			<q-list class="nav-list" v-for="(nav,key) of navigation" :key="key" >
				<template >
					<q-item class="nav" v-if="!nav.hasOwnProperty('sub')" @click="$router.push({ name: nav.route })" clickable v-ripple :active="$route.name == nav.route">
						<q-item-section avatar>
							<q-icon :name="nav.icon" />
						</q-item-section>
						<q-item-section>{{ nav.label }}</q-item-section>
					</q-item>
					<q-expansion-item group="sidenav" v-if="nav.hasOwnProperty('sub')" expand-separator class="nav" :icon="nav.icon" :label="nav.label">
						<q-card class="nav-sub ">
							<div v-for="(sub,key) in nav.sub" :key="key" class="nav-item" :class="$route.name == sub.route ? 'active' : ''" @click="$router.push({ name: sub.route })">{{ sub.label }}</div>
						</q-card>
					</q-expansion-item>
				</template>
			</q-list>
            
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
<script>
import EssentialLink    from 'components/EssentialLink.vue'
import Layout           from './DocumentationLayout.scss'
import navigation       from '../references/navAdmin'

export default
{
    name: 'DocumentationLayout',
    components: {
        EssentialLink
    },
	data: () =>
	({
		package_data: { version: '0.0.0' },
		leftDrawerOpen: false,
		navigation: [],
        admin_name: "Michael Merin",
        role: "Administrator",
	}),
    mounted()
    {
        this.navigation = navigation;
    },
    methods:
    {
        signOut(){
            alert("sign-out backend codes here!");
        }
    },
}
</script>
