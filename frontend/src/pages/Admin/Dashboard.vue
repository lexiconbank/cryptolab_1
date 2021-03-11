<template>
    <div><u-q-admin-dashboard></u-q-admin-dashboard></div>
</template>

<script>
import UQAdminDashboard from '../../components/UQAdminDashboard'

export default
{
    data:() =>
    ({
        code:
        `<div class="component q-ma-lg">
            <div class="form-container">
                <u-q-admin-dashboard></u-q-admin-dashboard>
            </div>
        </div>`
    }),
    components: { UQAdminDashboard },
    mounted()
    {
    },
    methods: {},
}
</script>