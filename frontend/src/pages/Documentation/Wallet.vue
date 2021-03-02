

<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Wallet Drawer
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-wallet-drawer></u-q-wallet-drawer>
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
import UQWalletDrawer from '../../components/UQWalletDrawer'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-wallet></u-q-wallet>
    </div>
</div>`
    }),
    components: { UQWalletDrawer },
    mounted()
    {
    },
    methods: { },
}
</script>