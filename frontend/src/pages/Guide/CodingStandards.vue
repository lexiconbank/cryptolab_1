<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
What is Uniq App Builder?
===

__Hello World__

</q-markdown>
<!-- /markdown -->

<u-q-coding-standards></u-q-coding-standards>



</div>
</template>

<script>
import UQCodingStandards from '../../components/Guide/UQCodingStandards'

export default
{
    data:() =>
    ({
        code: 
            `<div class="component q-ma-lg">
                <div class="form-container">
                    <u-q-coding-standards></u-q-coding-standards>
                </div>
            </div>
            `
    }),
    components: { UQCodingStandards },
    mounted()
    {
    },
    methods: { },
}
</script>