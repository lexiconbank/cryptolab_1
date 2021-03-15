<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Admin Dashboard
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-dashboard></u-q-admin-dashboard>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Admin Dashboard`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQAdminDashboard from '../../components/UQAdminDashboard'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-dashboard></u-q-admin-dashboard>
    </div>
</div>`
    }),
    components: { UQAdminDashboard },
    mounted()
    {
    },
    methods: { },
}
</script>