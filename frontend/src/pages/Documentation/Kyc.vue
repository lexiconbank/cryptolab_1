<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
KYC
===

</q-markdown>


<!-- /markdown -->


<div class="component q-ma-lg">
        <u-q-kyc></u-q-kyc>
</div>


</div>
</template>

<script>
import UQKyc from '../../components/UQKyc'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
                    <div class="form-container">
                        <u-q-kyc></u-q-kyc>
                    </div>
                </div>`
    }),
    components: { UQKyc },
    mounted()
    {
    },
    methods: { },
}
</script>