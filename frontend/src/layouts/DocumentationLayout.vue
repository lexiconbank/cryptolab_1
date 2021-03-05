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

          <q-drawer
        side="left"
        v-model="drawerRight"
        show-if-above
        bordered
        :width="200"
        :breakpoint="500"
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
          </div>
        </q-scroll-area>
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
