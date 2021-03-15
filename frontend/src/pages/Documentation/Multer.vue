<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Multer
===

</q-markdown>


<!-- /markdown -->


<div class="component q-ma-lg">
        <u-q-multer></u-q-multer>
</div>


</div>
</template>

<script>
import UQMulter from '../../components/UQMulter'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
                    <div class="form-container">
                        <u-q-multer></u-q-multer>
                    </div>
                </div>`
    }),
    components: { UQMulter },
    mounted()
    {
    },
    methods: { },
}
</script>