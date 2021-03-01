

<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Wallet Balance
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-wallet-balance></u-q-wallet-balance>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Wallet Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQWalletBalance from '../../components/UQWalletBalance'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-balance></u-q-balance>
    </div>
</div>`
    }),
    components: { UQWalletBalance },
    mounted()
    {
    },
    methods: { },
}
</script>