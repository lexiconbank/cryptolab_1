<template>
  <div>
      <q-dialog v-model="is_show" transition-show="scale" transition-hide="scale">
        <q-card>
            <q-bar class="bg-primary">
                <q-card-section>
                    <div class="q-px-xs text-h6 text-white">{{$props.modal_data.title}}</div>
                </q-card-section>
                <q-space />
                <q-btn dense flat icon="close" color="white" round v-close-popup class="spin__css">
                    <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>
                <q-page>
                    <div class="q-ma-xl" style="min-width:300px">
                        <slot name="body" :data="$props.modal_data.data" />
                    </div>
                </q-page>
                <!-- <q-card-section> -->
                    <!-- <slot name="footer" :data="$props.modal_data.data" />
                </q-card-section> --> 
        </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
    name: 'UQModal',
    props: {
        modal_data: { type: Object  , default: () => {return {}} } 
    },
    data: () => ({
        is_show: false,
        // style: ''
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
<style >
</style>