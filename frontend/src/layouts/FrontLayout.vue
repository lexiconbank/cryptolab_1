<template>
    <q-layout class="main q-px-xl" view="hHh Lpr lFf">
        <q-header class="text-h5 bg-white text-black">
            <div class="q-px-xl q-pt-md">
              
            </div>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
<script>
import EssentialLink    from 'components/EssentialLink.vue'
import navigation       from '../references/nav'

export default
{
    name: 'FrontLayout',
    components: {
        EssentialLink
    },
	data: () =>
	({
		package_data: { version: '0.0.0' },
		leftDrawerOpen: false,
		navigation: [],
        tab: '',
        route_name: 'front_dashboard'
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
