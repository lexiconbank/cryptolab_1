<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Client Masterlist
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
         <u-q-clients-masterlist></u-q-clients-masterlist>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Client Masterlist`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQClientsMasterlist from '../../components/UQClientsMasterlist'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-clients-masterlist></u-q-clients-masterlist>
    </div>
</div>`
    }),
    components: { UQClientsMasterlist},
    mounted()
    {
    },
    methods: { },
}
</script>