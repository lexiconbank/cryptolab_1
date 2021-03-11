<template>
<div>
   <div class="row q-mt-lg">
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
            <q-card class="no-shadow q-pa-md shadow">
                <q-item class="q-pb-none q-pt-xs bg-primary">
                    <q-item-section class="q-py-lg">
                    <q-item-label class="text-center text-white" style="letter-spacing: 1px;">Submitted Client</q-item-label>
                    <q-item-label class="text-h4 text-center text-white" style="font-weight: 500;letter-spacing: 3px;">{{submitted_client}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
            <q-card class="no-shadow q-pa-md shadow">
                <q-item class="q-pb-none q-pt-xs bg-grey-7">
                    <q-item-section class="q-py-lg">
                    <q-item-label class="text-center text-white" style="letter-spacing: 1px;">Not Submitted Client</q-item-label>
                    <q-item-label class="text-h4 text-center text-white text-no-w" style="font-weight: 500;letter-spacing: 3px; text-wra">{{not_submitted_client}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
            <q-card class="no-shadow q-pa-md shadow">
                <q-item class="q-pb-none q-pt-xs bg-grey-7">
                    <q-item-section class="q-py-lg">
                    <q-item-label class="text-center text-white" style="letter-spacing: 1px;">Rejected Client</q-item-label>
                    <q-item-label class="text-h4 text-center text-white" style="font-weight: 500;letter-spacing: 3px;">{{rejected_data}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
            <q-card class="no-shadow q-pa-md shadow">
                <q-item class="q-pb-none q-pt-xs bg-primary">
                    <q-item-section class="q-py-lg">
                    <q-item-label class="text-center text-white" style="letter-spacing: 1px;">Approved Client</q-item-label>
                    <q-item-label class="text-h4 text-center text-white" style="font-weight: 500;letter-spacing: 3px;">{{approved_client}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card>
        </div>
    </div>
        <div class="text-right q-ma-sm">
            <q-btn 
                outline
                unelevated
                color="primary"
                icon-right="file_download"
                label="Export to CSV"
                no-caps
                @click="exportTable"
            />
        </div>
        <q-card flat bordered class="shadow q-mx-sm">
            <q-table
                :data="data"
                :hide-header="mode === 'grid'"
                :columns="columns"
                row-key="name"
                :grid="mode=='grid'"
                :filter="filter"
                :pagination.sync="pagination"
            >
                <template v-slot:top-left="props">
                    <div class="text-h6 text-primary">Transactions</div>
                </template>
                <!-- <template v-slot:body-cell-status="props">
                <q-td :props="props" class="text-center">
                    <q-chip
                    v-bind:class="{'chip_completed': props.row.status == 'Converted' || props.row.status == 'confirmed', 'chip_pending': props.row.status == 'receiving'} "
                    text-color="white"
                    dense
                    class="text-weight-bolder text-center"
                    square
                    style="width: 85px"
                    ><span class="full-width inline-block flex flex-center text-center">{{props.row.status}}</span>
                    </q-chip>
                </q-td>
                </template> -->
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
                    >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
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
                    >{{mode==='grid' ? 'List' : 'Grid'}}
                    </q-tooltip>
                    </q-btn>
                </template>
            </q-table>
        </q-card>
    
</div>
</template>

<script>

export default {
  data:() =>(
    {
        submitted_client: 100000,
        not_submitted_client: 100000,
        rejected_data: 10000,
        approved_client: 1000,
        filter: '',
        mode: 'list',
        columns: [
          {
          name: 'date_created',
          align: 'left',
          label: 'Date and Time',
          field: 'date_created',
          sortable: true
          },
          {
          name: 'full_name  ',
          required: true,
          label: 'Full Name',
          align: 'left',
          field: 'full_name',
          sortable: true
          },
          {name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true},
          {name: 'reference_number', align: 'left', label: 'Reference Number', field: 'reference_number', sortable: true},
          {name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true},
          {name: 'transaction_type', align: 'center', label: 'Transaction Type', field: 'transaction_type', sortable: true},
        ],
          data: [
                //  sample data 
                {date_created:"213123", full_name:"Michael Merin", amount:10000, reference_number:"21312313", status:"converted",transaction_type:"send-internal"},
                {date_created:"213123", full_name:"Michael Merin", amount:10000, reference_number:"21312313", status:"converted",transaction_type:"send-internal"},
                {date_created:"213123", full_name:"Michael Merin", amount:10000, reference_number:"21312313", status:"converted",transaction_type:"send-internal"},
                ],
          pagination: {
            rowsPerPage: 10
          },
      
    }),
    methods: {
        exportTable() {
            alert('uncomment for backend')
            // ---------------- naive encoding to csv format------

            // const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
            //     this.data.map(row => this.columns.map(col => wrapCsvValue(
            //         typeof col.field === 'function'
            //             ? col.field(row)
            //             : row[col.field === void 0 ? col.name : col.field],
            //         col.format
            //     )).join(','))
            // ).join('\r\n')

            // const status = exportFile(
            //     'activity.csv',
            //     content,
            //     'text/csv'
            // )

            // if (status !== true) {
            //     this.$q.notify({
            //         message: 'Browser denied file download...',
            //         color: 'negative',
            //         icon: 'warning'
            //     })
            // }
        }
    }
}
</script>