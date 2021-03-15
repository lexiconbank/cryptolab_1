<template>
    <div>
        <div class="q-mt-xl text-right">
            <q-btn class="q-mr-sm" name="role" outline rounded color="primary" label="Manage Role" @click="openModal('role')"/>
            <q-btn class="q-mr-xl" outline round color="primary" icon="add"  @click="openModal('add')"/>
        </div>
        <div class="q-mx-xl">
            <q-table
            class="q-mt-sm"
            flat
            bordered
            :columns="this.admin_table.columns"
            :data="this.admin_table.data"

            row-key="fullname"
            :sort-method="customSort"   
            binary-state-sort

            ref="adminUserTable"
            :selected.sync="selected"
            :pagination.sync="pagination"
            :filter="filterAdminUser"
            @focusin.native="activateNavigation"
            @focusout.native="deactivateNavigation"
            @keydown.native="onKey"

            :grid="gridStyle"
            :hide-header="gridStyle"

            >
                
                <template v-slot:top-left="">
                    <div class="text-h6 text-primary">Admin Users</div>
                </template>
                <template v-slot:top-right="props">
                    
                    <q-input outlined dense debounce="300" v-model="filterAdminUser" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input>
                    <q-btn
                        flat round dense
                        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" 
                        @click="props.toggleFullscreen"
                    />
                    <q-btn
                        flat round dense
                        :icon="mode === 'grid' ? 'list' : 'grid_on'"
                        @click="grid"
                    >
                    
                    </q-btn>
                    <!-- <q-btn
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
                    </q-btn> -->

                    <!-- <q-btn
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
                    </q-btn> -->
                </template>
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >
                            {{ col.label }}
                        </q-th>
                        <q-th>
                            Action
                        </q-th>
                    </q-tr>
                </template>

                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >
                            {{ col.value }}
                        </q-td>
                        <q-td class="text-center">
                            <q-btn class="q-mr-sm" outline round size="sm" color="primary" icon="edit" @click="openModal('update', props.row)"/>
                            <q-btn outline round size="sm" color="negative" icon="delete" @click="deleteThis(props.row)"/>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
        
        <q-dialog full-width v-model="modal" @keyup.esc="closeModal()">  
            <div v-if="this.modal_content == 'role'">
                <div class="row">
                    <div class="col-12 col-md-4 q-pa-xl">
                        <q-card flat bordered>
                            <q-card-section>
                                <div class="text-primary">+ Add New Role</div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <q-form class="field">
                                    <div class="q-mt-md">
                                        <q-input 
                                            outlined 
                                            label="Role"
                                            v-model="role_data.role_title"
                                            type="text"
                                        />
                                        <div ref="role_title" style="color: red"></div>
                                    </div>
                                    <div class="q-mt-md">
                                        <q-input 
                                            outlined
                                            label="Access"
                                            v-model="role_data.access"
                                            type="text"
                                        />
                                        <div ref="access" style="color: red"></div>
                                    </div>
                                    <div class="q-mt-md">
                                        <q-input
                                            outlined
                                            label="Description"
                                            v-model="role_data.description"
                                            type="text"
                                        />    
                                        <div ref="description" style="color: red"></div>
                                    </div>
                                </q-form>
                            </q-card-section>
                            
                            <q-card-actions>
                                <q-btn unelevated color="primary" class="full-width" label="Save" @click="validate()"></q-btn>
                            </q-card-actions>
                        </q-card>
                    </div>
                    <div class="col-12 col-md-8">
                        <q-card flat bordered class="col-12 col-md-8">
                            <q-card-section>
                                <div class="text-h6 text-primary">Admin Role</div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <q-table 
                                    flat
                                    bordered
                                    :columns="this.role_table.columns"
                                    :data="this.role_table.data"
                                    row-key="role_title"
                                    :sort-method="customSort"
                                    binary-state-sort
                                    ref="roleTable"
                                    selection="single"
                                    :selected.sync="selected"
                                    :pagination.sync="pagination"
                                    :filter="filterRole"
                                    @focusin.native="activateNavigation"
                                    @focusout.native="deactivateNavigation"
                                    @keydown.native="onKey"
                                >
                                    <template v-slot:top-right>
                                        <q-input outlined dense debounce="300" v-model="filterRole" placeholder="Search">
                                        <template v-slot:append>
                                            <q-icon name="search" />
                                        </template>
                                        </q-input>
                                    </template>
                                    <template v-slot:header="props">
                                        <q-tr :props="props">
                                            <q-th
                                                v-for="col in props.cols"
                                                :key="col.name"
                                                :props="props"
                                            >
                                                {{ col.label }}
                                            </q-th>
                                            <q-th>
                                                Action
                                            </q-th>
                                        </q-tr>
                                    </template>

                                    <template v-slot:body="props">
                                        <q-tr :props="props">
                                            <q-td
                                                v-for="col in props.cols"
                                                :key="col.name"
                                                :props="props"
                                            >
                                                {{ col.value }}
                                            </q-td>
                                            <q-td class="text-center">
                                                <q-btn size="sm" outline class="q-mr-sm" round color="primary" icon="edit" @click="dataToRoleForm(props.row)"/>
                                                <q-btn size="sm" outline round color="negative" icon="delete" @click="deleteThis(props.row)"/>
                                            </q-td>
                                        </q-tr>
                                    </template>
                                </q-table>
                            </q-card-section>    
                        </q-card>
                    </div>
                </div>
            </div>

            <div v-else>
                <q-card>
                    <q-card-section style="max-width:450px; margin:auto">
                        <q-form class="field"> 
                            <div class="q-mt-md">
                                <q-input 
                                    outlined
                                    v-model="form_data.fullname"
                                    label="Full Name"
                                    type="text"   
                                />
                                <div ref="fullname" style="color: red"></div>
                            </div>
                            <div class="q-mt-md">
                                <q-select 
                                    outlined
                                    v-model="form_data.designation"
                                    label="Designation"
                                    :options="options"
                                />
                                <div ref="designation" style="color: red"></div>
                            </div>
                            <div class="q-mt-md">
                                <q-input 
                                    outlined 
                                    v-model="form_data.contact_number"
                                    label="Contact Number"
                                    type="number"
                                />
                                <div ref="contact_number" style="color: red"></div>
                            </div>
                            <div class="q-mt-md">
                                <q-input 
                                outlined
                                v-model="form_data.email"
                                label="Email"
                                type="email"
                                />
                                <div ref="email" style="color: red"></div>
                                <!-- :rules="[
                                    value => !!value || 'Field is required!', 
                                    isValidEmail
                                ]" -->
                            </div>
                            <div class="q-mt-md">
                                <q-input 
                                    outlined
                                    v-model="form_data.password"
                                    label="Password"
                                    type="password"
                                />
                                <div ref="password" style="color: red"></div>
                            </div>
                            
                            <div class="col-12 q-mt-md">
                                <q-btn color="primary" unelevated size="16px" class="full-width" label="Submit" @click="validate()"/>
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
        </q-dialog>
    </div>
   
</template>

<script>
import { insert, update, fetch, deleteThis, roleFetch } from '../references/url';

export default
{
    data: () => (
    {
        gridStyle: false,
        modal: false,
        modal_content: null,
        options: [],
        mode: 'list',
        navigationActive: false,
        filterRole: '',
        filterAdminUser: '',
        selected: [],
        pagination: {},

        admin_table: {
            columns: [
                {name: 'fullname', label:"Name", field: row => row.fullname, format: val => `${val}`, align:"center", required: true, sortable: true},
                {name: 'email', label:"Email", field: 'email', align:"center", sortable: true},
                {name: 'designation', label:"Designation", field: 'designation', align:"center", sortable: true},
            ],
            data: [
                // { name: 'Mark Venber Infante', email: 'lamborghinicountach13@gmail.com', designation: 'Verifier'}
            ]
        },
        role_table: {
            columns: [
                {name: 'role_title', label:"Role Title", field: row => row.role_title, format: val => `${val}`, field: 'role_title', align:"center", required: true, sortable: true},
                {name: 'access', label:"Access", field: 'access', align:"center", sortable: true},
                {name: 'description', label:"Description", field: 'description', align:"center", sortable: true},
            ],
            data: [
                // {roleTitle: "Verifier", access: "Verifier", description: "Verifier"}
            ]
        },
        form_data: {
            form: "admin",
            id: "",
            fullname: "",
            designation: "",
            contact_number: "",
            email: "",
            password: "",
            dateCreated: ""
        },
        role_data: {
            form: "role",
            id: "",
            role_title: "",
            access: "",
            description: "",
            dateCreated: ""
        },
    }),

    mounted(){
        this.fetch()
        this.roleFetch()
    },

    updated(){
        let count = 0

        for(let x in this.role_data){
            if(this.role_data[x] === ""){
                count++
            }
        }

        if(count == 3){
            this.role_data.id = ""
        }
    },

    computed: {
        tableClass () {
        return this.navigationActive === true ? 'shadow-8 no-outline' : void 0
        }
    },

    methods: {
        openModal(btn, row){
            this.modal = !this.modal
            this.modal_content = btn

            if(this.modal_content == "update"){
                this.form_data.id = row._id
                this.form_data.fullname = row.fullname
                this.form_data.designation = row.designation
                this.form_data.contact_number = row.contact_number
                this.form_data.email = row.email
                this.form_data.password = row.password
            }
        },

        closeModal(){
            let check_data = null
            
            if(this.modal_content == "role"){
                check_data = this.role_data
            }else{
                check_data = this.form_data
            }
        
            for(let x in check_data){
                if(x == "form"){
                    continue                            
                }else{
                    check_data[x] = ""
                }
            }

            this.modal = !this.modal
            this.modal_content = null
        },

        dataToRoleForm(row){
            this.role_data.id = row._id
            this.role_data.role_title = row.role_title
            this.role_data.access = row.access
            this.role_data.description = row.description
            this.role_data.dateCreated = row.dateCreated
        },

        isValidEmail(val) {
            const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return emailPattern.test(val) || 'Invalid email';
        },

        isEmpty(val){
            if(val.trim() == ""){
                return "Field is required"
            }
        },

        customSort (rows, sortBy, descending) {
            const data = [ ...rows ]

            if (sortBy) {
                data.sort((a, b) => {
                const x = descending ? b : a
                const y = descending ? a : b

                return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
              
                })
            }

            return data
        },

        grid(){
            this.gridStyle = !this.gridStyle
            this.mode = this.mode === 'grid' ? 'list' : 'grid'
        },

        activateNavigation () {
            this.navigationActive = true
        },

        deactivateNavigation () {
            this.navigationActive = false
        },

        onKey (evt) {
            let table = null

            if (
                this.navigationActive !== true ||
                [ 33, 34, 35, 36, 38, 40 ].indexOf(evt.keyCode) === -1 ||
                this.$refs.myTable === void 0
            ) {
                return
            }

            evt.preventDefault()

            if(this.modal_content == "role"){
                table = this.$refs.roleTable
            }else{
                table = this.$refs.adminUserTable
            }

            const { computedRowsNumber, computedRows } = table

            if (computedRows.length === 0) {
                return
            }

            const currentIndex = this.selected.length > 0 ? computedRows.indexOf(this.selected[0]) : -1
            const currentPage = this.pagination.page
            const rowsPerPage = this.pagination.rowsPerPage === 0 ? computedRowsNumber : this.pagination.rowsPerPage
            const lastIndex = computedRows.length - 1
            const lastPage = Math.ceil(computedRowsNumber / rowsPerPage)

            let index = currentIndex
            let page = currentPage

            switch (evt.keyCode) {
                case 36: // Home
                page = 1
                index = 0
                break
                case 35: // End
                page = lastPage
                index = rowsPerPage - 1
                break
                case 33: // PageUp
                page = currentPage <= 1 ? lastPage : currentPage - 1
                if (index < 0) {
                    index = 0
                }
                break
                case 34: // PageDown
                page = currentPage >= lastPage ? 1 : currentPage + 1
                if (index < 0) {
                    index = rowsPerPage - 1
                }
                break
                case 38: // ArrowUp
                if (currentIndex <= 0) {
                    page = currentPage <= 1 ? lastPage : currentPage - 1
                    index = rowsPerPage - 1
                }
                else {
                    index = currentIndex - 1
                }
                break
                case 40: // ArrowDown
                if (currentIndex >= lastIndex) {
                    page = currentPage >= lastPage ? 1 : currentPage + 1
                    index = 0
                }
                else {
                    index = currentIndex + 1
                }
                break
            }

            if (page !== this.pagination.page) {
                this.pagination = {
                ...this.pagination,
                page
                }

                this.$nextTick(() => {
                const { computedRows } = table
                this.selected = [ computedRows[Math.min(index, computedRows.length - 1)] ]
                })
            }
            else {
                this.selected = [ computedRows[index] ]
            }
        },

        async validate(){
            let error = 0
            let data_object = null

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0')
            var mm = String(today.getMonth() + 1).padStart(2, '0')
            var yyyy = today.getFullYear()

            if(this.modal_content == "role"){
                data_object = this.role_data
                this.role_data.dateCreated = mm + '/' + dd + '/' + yyyy
            }else{
                data_object = this.form_data
                this.form_data.dateCreated = mm + '/' + dd + '/' + yyyy
            }

            for(let x in data_object){
                 if(data_object[x] == ""){
                    if((x == "id" || x == "form") && (this.modal_content == "add" || this.modal_content == "role")){
                        continue
                    }

                    if(x === "dateCreated"){
                        continue
                    }
                    
                    error++
                    this.$refs[x].innerHTML = "Field is required"
                }else{
                    if((x == "id" || x == "form") && (this.modal_content == "add" || this.modal_content == "role" || this.modal_content == "update")){
                        continue
                    }

                    if(x === "dateCreated"){
                        continue
                    }
                    
                    this.$refs[x].innerHTML = ""
                }
            }
            
            if(!error){
                if(this.modal_content == "update" || this.role_data.id){
                    this.update()
                }else{
                    if(this.modal_content == "role"){
                        this.submit()
                    }else{
                        let response = await this.$_post(fetch)

                        if(response){
                            for (let i = 0; i < response.data.length; i++) {
                                if(this.form_data.email.toLowerCase() === response.data[i].email){
                                    this.$q.dialog({title: "Email already used!", message: ""})
                                    return
                                }
                            }
                        }

                        this.submit()
                    }
                }
            }
        },

        async submit(){
            let response = null
            
            if(this.modal_content == "role"){
                response = await this.$_post(insert, this.role_data)
            }else{
                response = await this.$_post(insert, this.form_data)
            }
            
            if(response){
                if(this.modal_content == "role"){
                    this.roleFetch()

                    for(let x in this.role_data){
                        if(x == "form"){
                            continue                            
                        }else{
                            this.role_data[x] = ""
                        }
                    }

                    this.$q.dialog({title: "Successfully Registered", message: ""})
                }else{
                    this.$q.dialog({title: "Successfully Registered", message: ""})
                    this.fetch()
                }
            }
        },

        async update(){
            let response = null

            if(this.modal_content == "role"){
                response = await this.$_post(update, this.role_data)
            }else{
                response = await this.$_post(update, this.form_data)
            }

            if(response){                
                if(this.modal_content == "role"){
                    this.roleFetch()

                    for(let x in this.role_data){
                        if(x == "form"){
                            continue                            
                        }else{
                            this.role_data[x] = ""
                        }
                    }
                    
                    this.$q.dialog({title: "Successfully Update", message: ""})
                }else{
                    this.closeModal()
                    this.fetch()
                    this.$q.dialog({title: "Successfully Update", message: ""})
                }
            }
        },

        async deleteThis(row){
            let send = {}

            if(this.modal_content == "role"){
                send = {
                    id: row._id,
                    form: "role"
                }
            }else{
                send = {
                    id: row._id,
                    form: null
                }
            }

            let response = await this.$_post(deleteThis, send)
            
            if(response){
                if(this.modal_content == "role"){
                    this.roleFetch()

                    for(let x in this.role_data){
                        if(x == "form"){
                            continue                            
                        }else{
                            this.role_data[x] = null
                        }
                    }
                }else{
                    this.fetch()
                }
            }
        },

        async fetch(){
            let response = await this.$_post(fetch)

if(response){
                this.admin_table.data = response.data
            }
        },

        async roleFetch(){
            let response = await this.$_post(roleFetch)

            if(response){
                for (let i = 0; i < response.data.length; i++) {
                    this.options.push(response.data[i].role_title)
                }
                this.role_table.data = response.data
            }
        }
    }
}
</script>

<style scoped>
.my-card{
    width: 100%;
    max-width: 250px;
}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}
</style>