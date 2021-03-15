<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Admin Security
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-security></u-q-admin-security>
    </div>
</div>


</div>
</template>

<script>
import UQAdminSecurity from '../../components/UQAdminSecurity'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-security></u-q-admin-security>
    </div>
</div>`
    }),
    components: { UQAdminSecurity },
    mounted()
    {
    },
    methods: { },
}
</script>