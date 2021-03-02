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
        <u-q-forgot-password></u-q-forgot-password>
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
import UQForgotPassword from '../../components/UQForgotPassword'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-forgot-password></u-q-forgot-password>
    </div>
</div>`
    }),
    components: { UQForgotPassword },
    mounted()
    {
    },
    methods: { },
}
</script>