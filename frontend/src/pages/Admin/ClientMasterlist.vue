<template>
    <div><u-q-clients-masterlist></u-q-clients-masterlist></div>
</template>

<script>
import UQClientsMasterlist from '../../components/UQClientsMasterlist';

export default
{
    data:() =>
    ({
        code:
        `<div class="component q-ma-lg">
            <div class="form-container">
                <u-q-clients-masterlist></u-q-clients-masterlist>
            </div>
        </div>`
    }),
    components: { UQClientsMasterlist },
    mounted()
    {
    },
    methods: {},
}
</script>