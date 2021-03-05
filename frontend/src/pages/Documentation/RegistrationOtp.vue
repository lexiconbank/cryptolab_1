<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
OTP Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
      <u-q-registration-otp></u-q-registration-otp>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Login Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQRegistrationOtp from '../../components/UQRegistrationOtp'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-registration-otp></u-q-login>
    </div>
</div>`
    }),
    components: { UQRegistrationOtp },
    mounted()
    {
    },
    methods: { },
}
</script>