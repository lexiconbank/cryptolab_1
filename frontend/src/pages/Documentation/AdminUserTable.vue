<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Admin User Table
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-admin-user-table></u-q-admin-user-table>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Login Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQAdminUserTable from '../../components/UQAdminUserTable'
export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-user-table></u-q-admin-user-table>
    </div>
</div>`
    }),
    components: { UQAdminUserTable },
    mounted()
    {
    },
    methods: { },
}
</script>
<style scoped>

</style>