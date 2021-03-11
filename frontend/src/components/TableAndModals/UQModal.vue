<template>
  <div>
      <q-dialog v-model="is_show" :persistent="$props.modal_data.is_persistent" transition-show="scale" transition-hide="scale">
        <q-card :style="'max-width: none;' + $props.modal_data.style">
            <q-bar class="bg-primary">
           
            <q-card-section>
                <div class="text-h6 font-rubik-titles">{{$props.modal_data.title}}</div>
            </q-card-section>

            <q-space />

            <q-btn dense flat icon="close" round v-close-popup class="spin__css">
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
            </q-bar>

            <q-card-section>
                <slot name="body" :data="$props.modal_data.data" />
            </q-card-section>
            <q-card-section>
                <slot name="footer" :data="$props.modal_data.data" />
            </q-card-section>
        </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
    name: 'UQModal',
    props: {
        // modal_data requires you these properties : title, data
        modal_data: { type: Object  , default: () => {return {}} } 
        
    },
    data: () => ({
        is_show: false,
        style: ''
    }),
    mounted()
    {
    },
    methods: {
        show()
        {
            this.is_show = true;
        },
        hide()
        {
            this.is_show = false;
        }
    }

}
</script>

<style>
    *{
        scroll-behavior: unset !important;
    }
</style>
<style scoped>
    div.q-card > .q-card__section.q-card__section--vert:nth-of-type(1)
    {
        padding: 30px !important;
    }

    div.q-card [role=toolbar]
    {
        color: white;
        background: #9A67AC;
    }

    div.q-card [role=toolbar] .q-card__section.q-card__section--vert
    {
        padding: 30px !important;
    }
    /* .spin__css
    {
         transition-duration: 0.8s;
    transition-property: transform;
    }
    .spin__css:hover {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    } */
</style>