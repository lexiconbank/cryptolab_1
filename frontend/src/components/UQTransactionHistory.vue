<template>
    <div>
        <template>
          <div class="q-pa-sm full-height">
            <q-table
            flat
            bordered
            :data="data"
            :columns="columns"
            :filter="filter"
            row-key="name"
            :hide-header="mode === 'grid'"
            :grid="mode=='grid'"
            :pagination.sync="pagination"
            >
            <template v-slot:top-left="">
                <div class="text-h6 text-primary">Wallet Transaction</div>
            </template>
            <template v-slot:top-right="props">
              <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search"/>
                </template>
              </q-input>
              <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="mode === 'list'"
              class="text-grey-7"
              >
                <q-tooltip
                :disable="$q.platform.is.mobile"
                v-close-popup
                >
                  {{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
                </q-tooltip>
              </q-btn>
              <q-btn
              flat
              round
              dense
              :icon="mode === 'grid' ? 'list' : 'grid_on'"
              @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
              v-if="!props.inFullscreen"
              class="text-grey-7"
              >
                <q-tooltip
                :disable="$q.platform.is.mobile"
                v-close-popup
                >
                  {{mode==='grid' ? 'List' : 'Grid'}}
                </q-tooltip>
              </q-btn>
            </template>
            </q-table>
          </div>
        </template>
    </div>
</template>

<script>
export default {
  data () {
    return {
      
      filter: '',
      props: '',
      mode: 'list',
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
      ],
      pagination: {
        rowsPerPage: 10
      },
    }
  }
}
</script>