<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Kyc Backend
===

</q-markdown>


<!-- /markdown -->


<div class="component q-ma-lg">
        <u-q-kycbackend></u-q-kycbackend>
</div>


</div>
</template>

<script>
import UQKycbackend from '../../components/UQKycbackend'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
                    <div class="form-container">
                        <u-q-kycbackend></u-q-kycbackend>
                    </div>
                </div>`
    }),
    components: { UQKycbackend },
    mounted()
    {
    },
    methods: { },
}
</script>