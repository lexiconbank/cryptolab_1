<template>
  <div class="q-pa-md">
    <q-table
        :data="kyc_data"
        :columns="columns"
        row-key="name"
        :filter="filter"
    >
        <template v-slot:top-right>
            <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
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
            </q-tr>
        </template>

        <template v-slot:body="props">
            <q-tr :props="props" @click="onClickTd(props.row)" class="cursor-pointer">
                <q-td key="date_created" align="left">{{ props.row.date_created  ? moment(props.row.date_created).format('YYYY-MMM-DD').toUpperCase() : ''}}</q-td>
                <q-td key="first_name" align="left">{{props.row.first_name     ? props.row.first_name.toUpperCase() : ''}}</q-td>
                <q-td key="middle_name" align="left">{{props.row.middle_name   ? props.row.middle_name.toUpperCase() : ''}}</q-td>
                <q-td key="last_name" align="left">{{props.row.last_name       ? props.row.last_name.toUpperCase() : ''}}</q-td>
            </q-tr>
        </template>
    </q-table>
    <q-dialog v-model="isApproved">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">KYC Details</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section style="max-height: 75vh" class="scroll">
                <q-card class="my-card" flat bordered>
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Name
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ kyc_details.name }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Birthdate
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ kyc_details.birthdate }}
                        </q-card-section>
                    </q-card-section>
                     <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Contact Number
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ kyc_details.contact_number }}
                        </q-card-section>
                    </q-card-section>
                     <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Email
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ kyc_details.email }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Nationality
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ kyc_details.nationality }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Address
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ kyc_details.address }}
                        </q-card-section>
                    </q-card-section>
                     <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        ID Type
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ kyc_details.idtype }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        ID Number
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ kyc_details.idnumber }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        ID Expiry
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ kyc_details.idexpiry }}
                        </q-card-section>
                    </q-card-section>
                     <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        ID Image
                        </q-card-section>
                        <q-card-section class="col-8">
                            <q-img 
                            class="cursor-pointer"
                            :src="`http://${config.SERVER.HOST}:${config.SERVER.PORT}/files/members/${kyc_details.id}/images/${kyc_details.idimage}`"
                            @click="zoomImage(`http://${config.SERVER.HOST}:${config.SERVER.PORT}/files/members/${kyc_details.id}/images/${kyc_details.idimage}`)"
                            >
                            </q-img>
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Selfie Image
                        </q-card-section>
                        <q-card-section class="col-8">
                        <q-img 
                        class="cursor-pointer"
                        :src="`http://${config.SERVER.HOST}:${config.SERVER.PORT}/files/members/${kyc_details.id}/images/${kyc_details.selfieimage}`"
                        @click="zoomImage(`http://${config.SERVER.HOST}:${config.SERVER.PORT}/files/members/${kyc_details.id}/images/${kyc_details.selfieimage}`)"
                            />
                        </q-card-section>
                    </q-card-section>
                </q-card>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn @click="btnApproved()" align="between" class="btn-fixed-width" color="primary" label="Approved" icon="verified_user" v-close-popup />
                <q-btn @click="onModalRejected()" align="between" class="btn-fixed-width" color="negative" label="Reject" icon="gpp_bad" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog
      v-model="isZoomImage"
    >
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="q-pt-none">
                <q-img 
                    :src="kyc_details.zoom_image"
                />
            </q-card-section>
        </q-card>
    </q-dialog>


    <q-dialog
      v-model="isRejected"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Kyc Action</div>
        </q-card-section>
    <q-form
        @submit="btnYes()"
    >
        <q-card-section class="q-pt-none">
            <div class="col-12 q-py-sm">
                <q-select
                    outlined
                    :options="remarks_options"
                    v-model="remarksSelected"
                    @input="onSelected()"
                    label="Remarks"
                    class="q-px-md inputs-design"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Remarks must not be empty']"
                />
            </div>
            <div class="col-12 q-py-sm" v-show="isOthers">
                <q-input
                    type="textarea"
                    outlined
                    autogrow
                    v-model="kyc_details.remarks"
                    class="q-px-md inputs-design"
                    placeholder="Others"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Others must not be empty']"
                />
            </div>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn type="submit" align="between" class="btn-fixed-width" color="primary" label="Yes" icon="thumb_up"/>
            <q-btn align="between" class="btn-fixed-width" color="negative" label="No" icon="thumb_down" v-close-popup />
        </q-card-actions>
    </q-form>
        
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getKycData, postApproved, postRejected } from '../references/url';
import  moment  from 'moment';
import config   from '../../config';

export default {
 data:() =>(
    {   
        moment: moment,
        isApproved: false,
        isRejected: false,
        config: config,
        isZoomImage: false,
        filter: '',
        remarksSelected: '',
        error: [],
        isOthers: false,
        remarks_options: [
            'Your details do not match',
            'Your ID is not valid at the moment you submitted your KYC application',
            'Your selfie is unclear and blurry',
            'Your note does not contain the correct information',
            'The image is unreadable, cropped, blurred or blocked by another object, or the quality of the image is bad',
            'The uploaded image is not an image of the original document',
            'The ID is not government-issued',
            `A key detail is missing such as your name, photo, complete date of birth, signature, and the ID's date of issue`,
            '(Others)',

        ],
        kyc_details: {
            id: '',
            name: '',
            birthdate: '',
            contact_number: '',
            email: '',
            nationality: '',
            address: '',
            idtype: '',
            idnumber: '',
            idexpiry: '',
            idimage: '',
            selfieimage: '',
            remarks: '',
            zoom_image: ''
            
        },
        columns: 
        [
            { name: 'date_created', align: 'left', label: 'Date Created', field: 'date_created', sortable: true },
            { name: 'first_name', align: 'left', label: 'Firstname', field: 'first_name', sortable: true },
            { name: 'middle_name', align: 'left', label: 'Middlename', field: 'middle_name', sortable: true },
            { name: 'last_name', align: 'left', label: 'Lastname', field: 'last_name', sortable: true }
        ],
        kyc_data: []
    }),
    methods: 
    {
        onClickTd(info){
            this.isApproved = true;
            this.kyc_details.id = info._id
            this.kyc_details.name = info.first_name + " " + info.middle_name + " " + info.last_name
            this.kyc_details.birthdate = moment(info.birth_date).format('YYYY-MMM-DD').toUpperCase()
            this.kyc_details.contact_number = info.code + "" + info.mobile_number
            this.kyc_details.nationality = info.nationality
            this.kyc_details.address = info.address_line + " " + info.city
            this.kyc_details.idtype = info.id_type
            this.kyc_details.idnumber = info.id_number
            this.kyc_details.idexpiry = moment(info.id_expiry).format('YYYY-MMM-DD').toUpperCase()
            this.kyc_details.idimage = info.id_image
            this.kyc_details.selfieimage = info.selfie_image
        },
        async getKycData() // camelCase
        {
            this.$q.loading.show();
            let response = await this.$_post(getKycData);
            this.kyc_data = response.data.data
            console.log(this.kyc_data)
            this.$q.loading.hide();

        },

        btnApproved(){
            this.$q.loading.show();
            let btn_approved = this.$_post(postApproved, this.kyc_details);
            if(btn_approved)
            {
                this.$q.loading.hide();
                this.$q.dialog(
                    { 
                        title: `Success Message`, 
                        message: "Successfully Approved!"
                        
                    });
                setTimeout(this.getKycData, 1000)
            }
        },

        onModalRejected(){
            this.isRejected = true
            this.remarksSelected = ''
            this.kyc_details.remarks = ''
            this.isOthers = false
        },

        btnYes(){
            this.isApproved = false
            this.isRejected = false
            this.$q.loading.show();
            let btn_rejected = this.$_post(postRejected, this.kyc_details);
            this.$q.loading.hide();
            if(btn_rejected)
            {
                this.$q.dialog(
                    { 
                        title: `Success Message`, 
                        message: "Successfully Rejected!"
                        
                    });
                
                setTimeout(this.getKycData, 1000)
            }
        },

        onSelected(){
            if (this.remarksSelected == "(Others)")
            {
                this.isOthers = true
                this.kyc_details.remarks = ''
            }
            else
            {
                this.isOthers = false
                this.kyc_details.remarks = this.remarksSelected
            }
        },

        zoomImage (image_url){
            this.isZoomImage = true
            this.kyc_details.zoom_image = image_url
        }
    },
    async mounted(){
        await this.getKycData()
    }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  
</style>