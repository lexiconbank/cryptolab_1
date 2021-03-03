<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Forgot Password
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-reset-password></u-q-reset-password>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Forgot Password`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQResetPassword from '../../components/UQResetPassword'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-reset-password></u-q-reset-password>
    </div>
</div>`
    }),
    components: { UQResetPassword },
    mounted()
    {
    },
    methods: { },
}
</script>