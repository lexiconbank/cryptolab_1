<template>
    <div>
        <q-table
            class="own__table"
            row-key="name"
            :data="$props.tbl_data.data"
            :loading="table.is_loading"
            :columns="$props.tbl_data.columns"
            :pagination.sync="table.pagination"
            :filter="table.filter"
        >
            <template v-slot:top-left="">
                <div class="text-h6 text-primary">Clients Master List</div>
            </template>   
            <template v-slot:top-right>
                <q-space />
                <q-input
                    dense
                    debounce="300"
                    color="primary"
                    v-model="table.filter"
                    class="search-bar"
                    standout
                    unelevated
                    bg-color="white"
                    label-color="black"
                    input-class="text-black"
                    placeholder="Search"
                >
                    <template v-slot:append>
                        <q-icon color="grey-9" name="search" />
                    </template>
                </q-input>
            </template>
            <template v-slot:body="props">
                <q-tr>
                    <slot :data="props.row" name="table_rows"></slot>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>

export default {
    name    : "UQTable",
    props   : {
        tbl_data        : { type: Object     , default: () => {return {}}},
    },
    data: () => ({
        table: {
            is_loading  : false,
            filter      : "",
            pagination  : {
                rowsPerPage : 5,
                page        : 1,
            }
        }
    }),
    computed: {
    }
}
</script>

<style lang="scss" scoped>
.search-bar{
  border: solid 1px #999;
} 
.own__table{
    box-shadow: 0px 0px 0px 0px #cfcfcf; 
    border: solid 1px rgb(224, 224, 224);
}
</style>
