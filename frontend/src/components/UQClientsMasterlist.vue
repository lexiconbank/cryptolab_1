<template>
  <div>
      <div class="q-pa-md">
        <div class="q-gutter-sm">     

              <!-- <q-select
                filled
                v-model="kyc_status"
                label="KYC STATUS"
                :options="client_master_list_table.status"
                style="width: 250px"
                behavior="menu"
                @input="fetchfilteredClients"
                 />          -->

                <q-option-group 
                :options="client_master_list_table.status"
                type="toggle"
                label="Status"
                color="primary"
                inline
                v-model="kyc_status"
                @input="fetchfilteredClients"
            />
           
         
        </div>
        
      </div>
      <u-q-table 
      :tbl_data="client_master_list_table">
            <template v-slot:table_rows="props">
                <q-td key="created_at" align="center">{{moment(props.data.created_at).format('YYYY-MMM-DD')}}</q-td>
                <q-td key="updated_at" align="center">{{moment(props.data.updated_at).format('YYYY-MMM-DD')}}</q-td>
                <q-td key="first_name" align="center">{{props.data.first_name}}</q-td>
                <q-td key="last_name" align="center">{{props.data.last_name}}</q-td>
                <q-td key="gender" align="center">{{props.data.gender}}</q-td>
                <!-- <q-td key="full_name" align="center">{{props.data.full_name}}</q-td>
                <q-td key="email" align="center">{{props.data.email}}</q-td>
                <q-td key="country" align="center">{{props.data.country}}</q-td> -->
                <q-td key="kyc_status" align="center">{{props.data.kyc_status}}</q-td>
                <q-td key="view" align="center">
                    <q-btn flat @click="viewDetails(props.data)" color="black-14">
                        <i class="fas fa-eye"></i>
                    </q-btn>
                </q-td>
            </template>
      </u-q-table>
      <u-q-modal :modal_data="client_modal" ref="client_modal">
            <template v-slot:body="props">
                <q-list bordered separator>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>NAME</q-item-label>
                        </q-item-section>
                        <!-- <q-item-section>
                            <q-item-label>{{props.data.full_name ? props.data.full_name.toUpperCase() : '' }} </q-item-label>
                        </q-item-section> -->
                        <q-item-section>
                            <q-item-label>{{props.data.first_name ? props.data.first_name.toUpperCase() : '' }} {{props.data.middle_name ? props.data.middle_name.toUpperCase() : '' }} {{props.data.last_name ? props.data.last_name.toUpperCase() : '' }}</q-item-label>
                        </q-item-section>
                        
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>KYC STATUS</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.kyc_status ? props.data.kyc_status.toUpperCase() : ''}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>BIRTHDATE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{moment(props.data.birth_date).format('YYYY-MMM-DD').toUpperCase()}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>CONTACT NO.</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.contact_code}} {{props.data.contact_number}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>EMAIL</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.email ? props.data.email.toUpperCase() : '' }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>NATIONALITY</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.nationality ? props.data.nationality.toUpperCase() : '' }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ADDRESS</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>
                                {{props.data.house_number}} 
                                {{props.data.street ? props.data.street.toUpperCase() : '' }} 
                                {{props.data.city ? props.data.city.toUpperCase() : '' }} 
                                {{props.data.zip_code}}, 
                                {{props.data.country ? props.data.country.toUpperCase() : '' }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ID TYPE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.identification_card ? props.data.identification_card.toUpperCase() : '' }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ID NO.</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.id_number }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ID EXPIRY</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.id_has_expiry == true ? moment(props.data.id_expiry).format('YYYY-MMM-DD').toUpperCase() : 'no expiry'.toUpperCase()}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ID IMAGE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-img 
                                :src="`${server.IMAGE_URL}/${props.data._id}/images/${props.data.id_image}`" 
                                alt="id"
                                @click="zoomImage(`${server.IMAGE_URL}/${props.data._id}/images/${props.data.id_image}`)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>SELFIE IMAGE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-img 
                                :src="`${server.IMAGE_URL}/${props.data._id}/images/${props.data.selfie_image}`" alt="selfie"
                               @click="zoomImage(`${server.IMAGE_URL}/${props.data._id}/images/${props.data.selfie_image}`)"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </template>
            <template v-slots:footer="props">

            </template>
      </u-q-modal>
  </div>
</template>

<script>
import moment   from 'moment';
import config   from '../../config';
import UQTable  from '../components/TableAndModals/UQTable';
import UQModal  from '../components/TableAndModals/UQModal';
import { fetchPostfilteredClients } from '../references/url';

export default {
    components: {
        UQTable,
        UQModal
    },

    data: () => 
    ({
        
   
        moment      : moment,
        
        server: {
            IMAGE_URL: config.IMAGE_URL
        },
         kyc_status  : [],  
        client_modal: {
            title   : 'Client Details',
            data    : []
        },
        client_master_list_table: {
            title   : 'Clients Master List',
            status  : [
                    {
                        label: 'APPROVED',
                        value:  'approved'
                    },
                    {
                        label: 'REJECTED',
                        value:  'rejected'
                    },
                    {
                        label: 'SUBMITTED',
                        value:  'submitted'
                    },
                    {
                        label: 'NOT SUBMITTED',
                        value:  'not submitted'
                    }
                ],   
            prompt: false,
            columns : [
                 { 
                    name    : 'created_at', 
                    label   : 'Date Created', 
                    field   : 'created_at',
                    align   : 'center',
                    sortable: true 
                },
                { 
                    name    : 'updated_at', 
                    label   : 'Date Updated', 
                    field   : 'updated_at',
                    align   : 'center',
                    sortable: true 
                },
                { 
                    name    : 'first_name', 
                    label   : 'First Name', 
                    field   : 'first_name',
                    align   : 'center',
                    sortable: true 
                },
                { 
                    name    : 'last_name', 
                    label   : 'Last Name', 
                    field   : 'last_name',
                    align   : 'center',
                    sortable: true 
                },
                { 
                    name    : 'gender', 
                    label   : 'Gender', 
                    field   : 'gender',
                    align   : 'center',
                },
                { 
                    name    : 'kyc_status', 
                    label   : 'KYC Status', 
                    field   : 'kyc_status',
                    align   : 'center',
                    sortable: true 
                },
                { 
                    name    : 'view', 
                    label   : 'View', 
                    align   : 'center',
                },
            ],
            data    : []
        }
    }),

    async mounted()
    {
        await this.fetchfilteredClients();   
    },

    methods: {
        async fetchfilteredClients()
        {
            console.log(this.kyc_status)
            let clients_res_obj = await this.$_post(fetchPostfilteredClients,
            {
                kyc_status: this.kyc_status
            });
            
            this.client_master_list_table.data = clients_res_obj.data.clients;
        },

        async viewDetails(user_data)
        {
            this.client_modal.data = user_data;
            this.$refs['client_modal'].show();
        },

    }
}
</script>

<style>

</style>