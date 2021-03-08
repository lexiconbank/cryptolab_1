<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Admin Login Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-login></u-q-admin-login>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Admin Login Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQAdminLogin from '../../components/UQAdminLogin'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-login></u-q-login>
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