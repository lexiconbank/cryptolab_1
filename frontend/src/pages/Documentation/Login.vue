<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Login Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-login></u-q-login>
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
import UQLogin from '../../components/UQLogin'

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
    components: { UQLogin },
    mounted()
    {
    },
    methods: { },
}
</script>