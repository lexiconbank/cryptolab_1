<template>
    <div class="row">
        <div class="col-12 col-lg-4">
            <div class="q-mt-xl">
                <u-q-admin-wallet class="q-mx-auto" style="max-width: 500px;"></u-q-admin-wallet>
            </div>
        </div>
        <div class="col-12 col-lg-8">
            <div class="q-my-xl">
                <u-q-transaction-history></u-q-transaction-history>
            </div>
        </div>
    </div>
</template>

<script>

import UQAdminWallet from '../../components/UQAdminWallet'
import UQTransactionHistory from '../../components/UQTransactionHistory'

export default
{
    data:() =>
    ({
    }),
    components: { UQAdminWallet, UQTransactionHistory },
    mounted()
    {
    },
    methods: {},
}
</script>