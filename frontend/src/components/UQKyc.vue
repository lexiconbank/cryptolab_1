<template>
    
    <div>
        <q-form
        enctype="multipart/form-data"
        class="q-gutter-md"
        >
            <div class="row">
                <div class="col-12 q-py-sm">
                    <q-input
                    outlined 
                    class="q-px-md inputs-design" 
                    v-model="form_data.first_name"
                    ref="firstname"
                    label="*First Name"
                    />
                        <div class="error-field" ref="error_firstname"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                    outlined 
                    class="q-px-md inputs-design" 
                    v-model="form_data.middle_name"
                    ref="middlename"
                    label="Middle Name"
                    />
                        <div class="error-field" ref="error_middlename"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                    outlined 
                    class="q-px-md inputs-design"
                    v-model="form_data.last_name"
                    ref="lastname"
                    label="*Last Name"
                    />
                        <div class="error-field" ref="error_lastname"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                    outlined 
                    class="q-px-md inputs-design"
                    v-model="form_data.birth_date"
                    ref="birthdate"
                    label="*Birthdate"
                    type="date"
                    />
                        <div class="error-field" ref="error_birthdate"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-select
                        label="Select a country"
                        :options="country_options"
                        outlined
                        v-model="selectedCountry"
                        option-value="countryNameEn"
                        option-label="countryNameEn" 
                        behavior="menu"
                        @input="onSelectCountry()"
                        ref="country"
                        class="q-px-md inputs-design"
                    >
                        <template v-slot:prepend v-if="selectedCountry != ''">
                            <img :src="'https://www.countryflags.io/' + selectedCountry.countryCode + '/flat/32.png'" />
                        </template>
                        <template v-slot:option="scope">
                            <q-item
                                v-bind="scope.itemProps"
                                v-on="scope.itemEvents"
                                >
                                <q-item-section side>
                                    <img :src="'https://www.countryflags.io/' + scope.opt.countryCode + '/flat/32.png'" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label v-html="scope.opt.countryNameEn" />
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                    <div class="error-field" ref="error_country"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-select
                        outlined
                        :options="nationality_options"
                        v-model="selectedNationality"
                        label="Nationality *"
                        option-value="nationality"
                        option-label="nationality" 
                        behavior="menu"
                        ref="nationality"
                        class="q-px-md inputs-design"
                        @input="onSelectNationality()"
                    >
                        <template v-slot:option="scope">
                            <q-item
                                v-bind="scope.itemProps"
                                v-on="scope.itemEvents"
                                >
                                <q-item-section>
                                    <q-item-label v-html="scope.opt.nationality" />
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                    <div class="error-field" ref="error_nationality"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                        outlined
                        v-model.number="form_data.mobile_number"
                        label="Mobile Number *"
                        ref="mobilenumber"
                        class="q-px-md inputs-design"
                        type="number"
                    >
                        <template v-slot:prepend v-if="flagCallingCode">
                                {{selectedCountry.countryCode}}
                                ({{selectedCountry.countryCallingCode}})
                        </template>
                    </q-input>
                    <div class="error-field" ref="error_mobilenumber"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                        outlined
                        v-model="form_data.address_line"
                        label="Address line *"
                        ref="addressline"
                        class="q-px-md inputs-design"
                    />
                        <div class="error-field" ref="error_addressline"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                        outlined
                        v-model="form_data.street"
                        label="Street *"
                        ref="street"
                        class="q-px-md inputs-design"
                    />
                        <div class="error-field" ref="error_street"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                        outlined
                        v-model="form_data.city"
                        label="City *"
                        ref="city"
                        class="q-px-md inputs-design"
                    />
                        <div class="error-field" ref="error_city"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                        outlined
                        v-model="form_data.zip_code"
                        label="Zipcode *"
                        ref="zipcode"
                        class="q-px-md inputs-design"
                    />
                        <div class="error-field" ref="error_zipcode"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-select
                        outlined
                        :options="id_type_options"
                        v-model="form_data.id_type"
                        label="ID Type *"
                        ref="idtype"
                        class="q-px-md inputs-design"
                    />
                        <div class="error-field" ref="error_idtype"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                        outlined
                        v-model="form_data.id_number"
                        label="ID Number *"
                        ref="idnumber"
                        class="q-px-md inputs-design"
                    />
                        <div class="error-field" ref="error_idnumber"></div>
                </div>
                <div class="col-12 q-py-sm">
                    <q-input
                        outlined
                        v-model="form_data.id_expiry"
                        label="ID Expiry *"
                        ref="idexpiry"
                        class="q-px-md inputs-design"
                    />
                        <div class="error-field" ref="error_idexpiry"></div>
                </div>

                <div class="text-bold q-mt-md col-12">
                    *Upload front ID image
                </div>
                <div class="col-12">
                    <input type="file" @change="uploadFrontIDImage" ref="selfieimage"/>
                    <div class="error-field" ref="error_frontid">
                    </div>
                    <div class="text-center row" v-if="form_data.frontIdImage != ''">
                        <img  :src="frontIdImage" style="width: 100%; border-radius: 10px" @click="zoomImageIn(form_data.frontId)"/>
                    </div>
                </div>

                <div class="q-mt-md col-12">
                    <q-btn label="Upload Image" @click="confirmPersonalInfo()" color="primary"/>
                </div>

                <div class="text-bold q-mt-md col-12">
                    *Upload Selfie image
                </div>
                <div class="col-12">
                    <input type="file" @change="uploadSelfieImage" ref="selfieimage"/>
                    <div class="error-field" ref="error_selfieimage">
                    </div>
                    <div class="text-center row" v-if="form_data.selfieImage != ''">
                        <img  :src="selfieImage" style="width: 100%; border-radius: 10px" @click="zoomImageIn(form_data.selfieImage)"/>
                    </div>
                </div>

                <div class="col-12 q-py-sm">
                    <q-select
                        outlined
                        :options="security_question_options"
                        v-model="form_data.security_question"
                        label="Security Question *"
                        ref="securityquestion"
                        class="q-px-md inputs-design"
                    />
                        <div class="error-field" ref="error_securityquestion"></div>
                </div>

                <div class="col-12 q-py-sm">
                    <q-input
                    outlined 
                    class="q-px-md inputs-design"
                    v-model="form_data.security_answer"
                    ref="securityanswer"
                    label="Security Answer *"
                    />
                        <div class="error-field" ref="error_securityanswer"></div>
                </div>
                
            </div>

            <div>
                <q-btn label="Submit" @click="onSubmit()" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
    </div>
</template>

<script>
import country_code_list from "country-codes-list";
import npm_nationality_list from "npm-nationality-list";
import { postKyc, getFile } from '../references/url';


export default {
    data:() =>(
        {
            flagCallingCode: false, 
            country_options: [],
            selectedCountry: '',
            nationality_options: [],
            selectedNationality: '',
            selfieImage: null,
            frontIdImage: null,
            frontIdFiles: null,
            id_type_options: [
                'Passport',
                'National ID',
                'Drivers License',
                'Others (Must be government issued ID)'
            ],
            security_question_options: [
                'In what city did you meet your spouse/significant other?',
                'What is the name of your favorite childhood friend?',
                'What street did you live on in third grade?',
                'What is the middle name of your youngest child?',
                'What was your childhood phone number including area code?',
                'What was the name of your first stuffed animal?',
                'Where were you when you had your first kiss?',
                'What was the last name of your third grade teacher?',
                'What is your youngest brother’s birthday month and year?',
                'What is the name of a college you applied to but did not attend?',
                '(Personalize your own question)'
            ],
            form_data:
            {
                id                  : '603c8f1859ea3337102c7f81',
                first_name          : '',
                middle_name         : '',
                last_name           : '',
                birth_date          :  'mm/dd/yyyy',
                country             : '',
                nationality         : '',
                mobile_number       : '',
                address_line        : '',
                street              : '',
                city                : '',
                zip_code            : '',
                id_type             : '',
                id_number           : '',
                id_expiry           : 'mm/dd/yyyy',
                security_question   : '',
                security_answer     : '',
                code                : '',
                frontId             : '',
                selfieImage         : '',
                errors              : []
            },
        }),
        mounted(){
            this.country_options = country_code_list.all("all")
            this.nationality_options = npm_nationality_list.getList()
        },
        methods: {
            onSelectCountry(){
                if (this.selectedCountry != ''){
                    this.flagCallingCode = true
                    this.form_data.code = this.selectedCountry.countryCallingCode
                    this.form_data.country = this.selectedCountry.countryNameEn
                }
            },
            onSelectNationality(){
                this.form_data.nationality = this.selectedNationality.nationality
            },
            async confirmPersonalInfo(){
                console.log(this.form_data.nationality)
                if (this.form_data.first_name == '')
                {
                    this.$refs['error_firstname'].innerHTML = '*firstname must not be empty';
                    this.form_data.errors.push('*firstname must not be empty');
                }
                else
                {
                    this.$refs['error_firstname'].innerHTML = '';
                }

                if (this.form_data.last_name == '')
                {
                    this.$refs['error_lastname'].innerHTML = '*lastname must not be empty';
                    this.form_data.errors.push('*lastname must not be empty');
                }
                else
                {
                    this.$refs['error_lastname'].innerHTML = '';
                }

                if (this.form_data.birth_date == 'mm/dd/yyyy')
                {
                    this.$refs['error_birthdate'].innerHTML = '*birthdate must not be empty';
                    this.form_data.errors.push('*birthdate must not be empty');
                }
                else
                {
                    this.$refs['error_birthdate'].innerHTML = '';
                }

                if (this.form_data.country == '')
                {
                    this.$refs['error_country'].innerHTML = '*country must not be empty';
                    this.form_data.errors.push('*country must not be empty');
                }
                else
                {
                    this.$refs['error_country'].innerHTML = '';
                }

                if (this.form_data.nationality == '')
                {
                    this.$refs['error_nationality'].innerHTML = '*nationality must not be empty';
                    this.form_data.errors.push('*nationality must not be empty');
                }
                else
                {
                    this.$refs['error_nationality'].innerHTML = '';
                }

                if (this.form_data.mobile_number == '')
                {
                    this.$refs['error_mobilenumber'].innerHTML = '*mobile number must not be empty';
                    this.form_data.errors.push('*mobile number must not be empty');
                }
                else
                {
                    this.$refs['error_mobilenumber'].innerHTML = '';
                }

                if (this.form_data.address_line == '')
                {
                    this.$refs['error_addressline'].innerHTML = '*address line must not be empty';
                    this.form_data.errors.push('*address line must not be empty');
                }
                else
                {
                    this.$refs['error_addressline'].innerHTML = '';
                }

                if (this.form_data.street == '')
                {
                    this.$refs['error_street'].innerHTML = '*street must not be empty';
                    this.form_data.errors.push('*street must not be empty');
                }
                else
                {
                    this.$refs['error_street'].innerHTML = '';
                }

                if (this.form_data.city == '')
                {
                    this.$refs['error_city'].innerHTML = '*city must not be empty';
                    this.form_data.errors.push('*city must not be empty');
                }
                else
                {
                    this.$refs['error_city'].innerHTML = '';
                }

                if (this.form_data.zip_code == '')
                {
                    this.$refs['error_zipcode'].innerHTML = '*zip code must not be empty';
                    this.form_data.errors.push('*zip code must not be empty');
                }
                else
                {
                    this.$refs['error_zipcode'].innerHTML = '';
                }

                if (this.form_data.id_type == '')
                {
                    this.$refs['error_idtype'].innerHTML = '*ID Type is required';
                    this.form_data.errors.push('*ID Type is required');
                }
                else
                {
                    this.$refs['error_idtype'].innerHTML = '';
                }

                if (this.form_data.id_number == '')
                {
                    this.$refs['error_idnumber'].innerHTML = '*ID Number is required';
                    this.form_data.errors.push('*ID Number is required');
                }
                else
                {
                    this.$refs['error_idnumber'].innerHTML = '';
                }

                if (this.form_data.id_expiry == 'mm/dd/yyyy')
                {
                    this.$refs['error_idexpiry'].innerHTML = '*ID Expiry is required';
                    this.form_data.errors.push('*ID Expiry is required');
                }
                else
                {
                    this.$refs['error_idexpiry'].innerHTML = '';
                }

                 if (this.form_data.frontId == '')
                {
                    this.$refs['error_frontid'].innerHTML = '*Front ID is required';
                    this.form_data.errors.push('*Front ID is required');
                }
                else
                {
                    this.$refs['error_frontid'].innerHTML = '';
                }

                if (this.form_data.selfieId == '')
                {
                    this.$refs['error_selfieid'].innerHTML = '*Selfie Image is required';
                    this.form_data.errors.push('*Selfie Image is required');
                }
                else
                {
                    this.$refs['error_selfieid'].innerHTML = '';
                }

                if (this.form_data.security_question == '')
                {
                    this.$refs['error_securityquestion'].innerHTML = '*Security Question is required';
                    this.form_data.errors.push('*Security Question is required');
                }
                else
                {
                    this.$refs['error_securityquestion'].innerHTML = '';
                }

                if (this.form_data.security_answer == '')
                {
                    this.$refs['error_securityanswer'].innerHTML = '*Security Answer is required';
                    this.form_data.errors.push('*Security Answer is required');
                }
                else
                {
                    this.$refs['error_securityanswer'].innerHTML = '';
                }
            },
            onSubmit(){
                this.$q.loading.show();
                let kyc_info = this.$_post(postKyc, this.form_data);
                if(kyc_info)
                {
                    this.$q.loading.hide();
                    this.$q.dialog(
                        { 
                            title: `Success Message`, 
                            message: "Successfully Submitted!"
                            
                        });
                }
            },
            zoomImageIn(){

            },
            uploadFrontIDImage(front_id){
                this.form_data.frontId = front_id.target.files[0].name
                this.frontIdFiles = front_id.target.files[0]
                this.frontIdImage = URL.createObjectURL(event.target.files[0])
                
            },
            uploadSelfieImage(selfieimage){
                this.form_data.selfieId = selfieimage.target.files[0].name
                this.selfieImage = URL.createObjectURL(event.target.files[0])
                
            },
            async onUpload(){
                let formData = new FormData();
                formData.append("id_image", this.frontIdFiles)
                formData.append("id", this.form_data)
                await this.$_post(getFile, formData);
                // fetch('../public/', {method: "POST", body: formData});
            }
            
        }
}
</script>

<style>
    div.error-field
    {
        color: red;
        margin-top: 6px;
        margin-left: 4px;
    }
</style>