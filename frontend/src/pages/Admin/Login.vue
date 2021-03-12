<template>
        <div>
            <div class="q-mt-xl full-width" >
                <div class=" q-pa-md" style="max-width:400px;margin:auto">
                <u-q-admin-login></u-q-admin-login>
                </div>
            </div>
        </div>
</template>

<script>
import UQAdminLogin from '../../components/UQAdminLogin'

export default
{
    data:() =>
    ({
        code: 
        `<div class="component q-ma-lg">
            <div class="form-container">
                <u-q-admin-login></u-q-admin-login>
            </div>
        </div>`
    }),
    components: { UQAdminLogin },
    mounted()
    {
    },
    methods: { },
}
</script>