<template>
  <div class="q-pa-md">
        <q-form
        enctype="multipart/form-data"
        >   
        <q-list>
            <q-item>
                <q-item-selection>
                    <q-input
                        outlined
                        label="First Name *"
                    />
                    <q-btn label="Upload Image" @click="onUpload()" color="primary"/>
                </q-item-selection>
            </q-item>
        </q-list>
            
            
        </q-form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>