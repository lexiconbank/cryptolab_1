<template>
    <div>
        <template>
            <div class="q-pa-md">
                 <q-table
                    title="Transaction History"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    />
            </div>
            </template>
    </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Date/Time',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'TransactionType', align: 'left', label: 'Transaction Type', field: 'TransactionType', sortable: true },
        { name: 'RefNumber', label: 'Ref Number', align: 'left', field: 'RefNumber', sortable: true },
        { name: 'Amount', label: 'Amount', field: 'Amount', align: 'left' },
        { name: 'RunningBalance', label: 'Running Balance', field: 'RunningBalance', align: 'left' },
      ],
      data: [
        {
          name: 'Feb-11-2021 | 08:03 PM',
          TransactionType: 'Received 0.00118 BTC from Blockchain',
          RefNumber: 'BTC-8ECFGS00A',
          Amount: '0.00148 BTC',
          RunningBalance: '0.00118 BTC  57.94 USD',     
        }
      ]
    }
  }
}
</script>