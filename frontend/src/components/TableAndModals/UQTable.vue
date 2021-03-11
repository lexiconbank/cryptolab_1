<template>
    <div>
        <q-table
            class="font-monseratt text-weight-bold"
            :title="$props.tbl_data.title"
            row-key="name"
            :data="$props.tbl_data.data"
            :loading="table.is_loading"
            :columns="$props.tbl_data.columns"
            :pagination.sync="table.pagination"
            :filter="table.filter"
            color
        >
                      
            <template v-slot:top-right>
                <q-space />
                <q-input
                    dense
                    debounce="300"
                    color="primary"
                    v-model="table.filter"
                    class="search-bar"
                    rounded
                    standout
                    bg-color="white"
                    label-color="black"
                    input-class="text-black"
                    placeholder="Search"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
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

<style scoped>
.search-bar {
  width: 51px;
  transition: 0.5s;
}

.search-bar:hover {
  width: 150px;
}

div.q-table__container > div:first-child {
    background: #9a67ac !important;
    color: white !important;
}

table.q-table thead{
    text-transform: uppercase !important;
}
table.q-table tbody tr{
    text-transform: capitalize;
}
</style>
