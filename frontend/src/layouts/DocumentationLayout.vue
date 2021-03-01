<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-toolbar-title>
                    Uniq Builder Documentation
                </q-toolbar-title>

                <div><b>v1.0</b></div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
			<div class="nav-title">Navigation</div>
			<q-list class="nav-list" v-for="(nav,key) of navigation" :key="key" >
				<template >
					<q-item class="nav" v-if="!nav.hasOwnProperty('sub')" @click="$router.push({ name: nav.route })" clickable v-ripple :active="$route.name == nav.route">
						<q-item-section avatar>
							<q-icon :name="nav.icon" />
						</q-item-section>
						<q-item-section>{{ nav.label }}</q-item-section>
					</q-item>
					<q-expansion-item group="sidenav" v-if="nav.hasOwnProperty('sub')" expand-separator class="nav" :icon="nav.icon" :label="nav.label">
						<q-card class="nav-sub">
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
import navigation       from '../references/nav'

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
	}),
    mounted()
    {
        this.navigation = navigation;
    },
    methods:
    {
    },
}
</script>
