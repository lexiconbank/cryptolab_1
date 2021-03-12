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
      <u-q-adminusertable></u-q-adminusertable>
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
import UQAdminusertable from '../../components/UQAdminusertable'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-adminusertable></u-q-adminusertable>
    </div>
</div>`
    }),
    components: { UQAdminusertable },
    mounted()
    {
    },
    methods: { },
}
</script>
<style scoped>

</style>