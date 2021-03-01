<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Registration Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-registration></u-q-registration>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Registration Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQRegistration from '../../components/UQRegistration'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-registration></u-q-registration>
    </div>
</div>`
    }),
    components: { UQRegistration },
    mounted()
    {
    },
    methods: { },
}
</script>