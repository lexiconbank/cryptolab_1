<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Convert
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-convert></u-q-convert>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Convert`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQConvert from '../../components/UQConvert'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-convert></u-q-convert>
    </div>
</div>`
    }),
    components: { UQConvert },
    mounted()
    {
    },
    methods: { },
}
</script>