<template>
  <q-table
    title="Personal Information"
    :data="tableData"
    :columns="columns"
    row-key="name"
  />
</template>

<script>

import { postdashboardmain } from '../references/url';
export default {
  data: () => ({
    columns: [
      {
        
        name: '_id',
        required: true,
        label: 'ID',
        align: 'center',
        field: '_id',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },   {
        
        name: 'last_name',
        required: true,
        label: 'Last Name',
        align: 'center',
        field: 'last_name',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },{
        name: 'first_name',
        required: true,
        label: 'First Name',
        align: 'center',
        field: 'first_name',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },{
        name: 'age',
        required: true,
        label: 'age',
        align: 'center',
        field: 'age',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },
       
    ] , 
    tableData: []
      }),
     mounted()
    {
        this.getdatas()
    },
    methods:
    {
        async getdatas()
        {
            this.$q.loading.show();
            let information = await this.$_post(postdashboardmain);
                this.tableData= information.data.data
            this.$q.loading.hide();
        }
    }

}
</script>