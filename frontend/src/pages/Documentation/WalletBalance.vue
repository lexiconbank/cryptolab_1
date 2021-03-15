<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Wallet Balance
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :content-style="contentStyle"
      :content-active-style="contentActiveStyle"
      style="height: 300px; width: 100%;"
      class="form-container"
    >
        <u-q-wallet-balance></u-q-wallet-balance>
    </q-scroll-area>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Wallet Balance`

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
        code:
        `<div class="component q-ma-lg">
            <div class="form-container">
                <u-q-wallet-balance></u-q-wallet-balance>
            </div>
        </div>`,

        contentStyle: {
            backgroundColor: 'rgba(0,0,0,0.02)',
            color: '#555'
        },

        contentActiveStyle: {
            backgroundColor: '#eee',
            color: 'black'
        },

        thumbStyle: {
            right: '2px',
            borderRadius: '5px',
            backgroundColor: '#027be3',
            width: '5px',
            opacity: 0.75
        }
        
    }
    
    ),
    
    components: { UQWalletBalance },
    mounted()
    {
    },
    methods: { },
}
</script>