<template>
    <div class="font-rubik-labels">
            <div class="text-center">
            <!-- v-if="user.kyc_status == 'submitted'" -->
                <q-card class="text-red my-card q-px-xl" v-if="user.kyc_status == 'pending'">
                    <br />
                    <q-icon name="pending" size="100px" class="text-red-5" />
                    <h5>Your KYC has been submitted. Please wait for your verification</h5>
                    <br />
                </q-card>
                
                <!-- v-if="user.kyc_status == 'rejected'" -->
                <q-card class="my-card q-px-xl" v-if="user.kyc_status == 'rejected'">
                    <br />
                    <h5 class="text-red">Your KYC has been rejected. Please resubmit your information</h5>
                    {{user.remarks}}
                    <br />
                </q-card>
                <!-- v-if="user.kyc_status == 'approved'" -->
                <q-card class="my-card q-px-xl" v-if="user.kyc_status == 'approved'">
                    <br />
                    <q-icon name="task_alt" size="100px" class="text-green-5" />
                    <h5 class="text-green-5">Your KYC has been approved</h5>
                    <br />
                </q-card>
            </div>
            <div class="row" v-if="user.kyc_status == 'not submitted' || user.kyc_status == 'rejected'">
                <q-linear-progress :value="progress" class="q-mt-md" />
                <!--Personal Information-->
                <q-card class="my-card q-px-xl" v-if="count_continue == 0">
                        <br />
                        <q-card-section>
                            <div class="text-h6">Personal Information</div>
                            <div>Please make sure all information below are correct before proceeding</div>
                        </q-card-section>
                        <q-card-section>
                            <div>Items with an asterisk (*) Has to be filled out</div>
                            <div class="col-12 q-py-sm">
                                <q-input
                                outlined
                                class="col-12 q-px-md inputs-design"
                                v-model="form_data.first_name"
                                label="*First Name"
                                />
                                <div class="error-field" ref="error_firstname"></div>
                            </div>
                            <div class="col-12 q-py-sm">
                                <q-input
                                outlined
                                class="col-12 q-px-md inputs-design"
                                v-model="form_data.middle_name"
                                label="Middle Name"
                                />
                                <div class="error-field" ref="error_middlename"></div>
                            </div>
                            <div class="col-12 q-py-sm">
                                <q-input
                                outlined
                                class="col-12 q-px-md inputs-design"
                                v-model="form_data.last_name"
                                label="*Last Name"
                                />
                                <div class="error-field" ref="error_lastname"></div>
                            </div>
                            <div class="col-12 q-py-sm">
                                <q-input
                                outlined
                                class="col-12 q-px-md inputs-design"
                                v-model="form_data.birth_date"
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
                                class="col-12 q-px-md inputs-design"
                                >
                                    <template v-slot:prepend v-if="selectedCountry != ''">
                                        <img :src="'https://www.countryflags.io/' + selectedCountry.countryCode + '/flat/32.png'" />
                                    </template>
                                    <template v-slot:option="scope">
                                        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
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
                                class="col-12 q-px-md inputs-design"
                                @input="onSelectNationality()"
                                >
                                    <template v-slot:option="scope">
                                        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
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
                                class="col-12 q-px-md inputs-design"
                                type="number"
                                >
                                    <template v-slot:prepend v-if="flagCallingCode">
                                        {{selectedCountry.countryCode}}
                                        ({{selectedCountry.countryCallingCode}})
                                    </template>
                                </q-input>
                                <div class="error-field" ref="error_mobilenumber"></div>
                            </div>
                            
                            <q-btn color="primary" class="full-width" label="Continue" @click="continuePersonalInfo()" />
                        </q-card-section>
                        <br />
                </q-card>

                <!--Address Information-->
                <q-card class="my-card q-px-xl" v-if="count_continue == 1">
                    <br />
                    <q-card-section>
                        <q-item>
                            <q-item-section side>
                                <q-icon
                                  color="primary"
                                  name="keyboard_backspace"
                                  style="font-size: 3em;"
                                  class="cursor-pointer"
                                  @click="back_button()" />
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>
                                    <div class="text-h6">Address Information</div>
                                </q-item-label>
                                <q-item-label>
                                    Please make sure all information below are correct before proceeding
                                </q-item-label>
                            </q-item-section>

                            <q-item-section side top>
                            </q-item-section>
                        </q-item>
                    </q-card-section>
                    
                    <q-card-section>
                        <div>Items with an asterisk (*) Has to be filled out</div>
                        <div class="col-12 q-py-sm">
                            <q-input
                            outlined
                            v-model="form_data.address_line"
                            label="Address line *"
                            class="col-12 q-px-md inputs-design"
                            />
                            <div class="error-field" ref="error_addressline"></div>
                        </div>
                        <div class="col-12 q-py-sm">
                            <q-input
                            outlined
                            v-model="form_data.street"
                            label="Street *"
                            class="col-12 q-px-md inputs-design"
                            />
                            <div class="error-field" ref="error_street"></div>
                        </div>
                        <div class="col-12 q-py-sm">
                            <q-input
                            outlined
                            v-model="form_data.city"
                            label="City *"
                            class="col-12 q-px-md inputs-design"
                            />
                            <div class="error-field" ref="error_city"></div>
                        </div>
                        <div class="col-12 q-py-sm">
                            <q-input
                            outlined
                            v-model="form_data.zip_code"
                            label="Zipcode *"
                            class="col-12 q-px-md inputs-design"
                            />
                            <div class="error-field" ref="error_zipcode"></div>
                        </div>
                        
                        <q-btn color="primary" class="full-width" label="Continue" @click="continueAddressInfo()"/>
                    </q-card-section>
                    <br />
                </q-card>

                 <!--Verify-->
                <q-card class="my-card q-px-xl" v-if="count_continue == 2">
                    <br />
                    
                    <q-card-section>
                        <q-item>
                            <q-item-section side>
                                <q-icon
                                color="primary"
                                name="keyboard_backspace"
                                style="font-size: 3em;"
                                class="cursor-pointer"
                                @click="back_button()" />
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>
                                    <div class="text-h6">Let's get you verify</div>
                                </q-item-label>
                                <q-item-label>
                                    Please make sure all information below are correct before proceeding
                                </q-item-label>
                            </q-item-section>

                            <q-item-section side top>
                            </q-item-section>
                        </q-item>
                    </q-card-section>
                    <q-card-section>
                        <div>Items with an asterisk (*) Has to be filled out</div>
                        <div class="col-12 q-py-sm">
                            <q-select
                            outlined
                            :options="id_type_options"
                            v-model="form_data.id_type"
                            label="ID Type *"
                            class="col-12 q-px-md inputs-design"
                            />
                            <div class="error-field" ref="error_idtype"></div>
                        </div>
                        <div class="col-12 q-py-sm">
                            <q-input
                            outlined
                            v-model="form_data.id_number"
                            label="ID Number *"
                            class="col-12 q-px-md inputs-design"
                            />
                            <div class="error-field" ref="error_idnumber"></div>
                        </div>
                        <div class="col-12 q-py-sm">
                            <q-input
                            outlined
                            v-model="form_data.id_expiry"
                            label="ID Expiry *"
                            class="col-12 q-px-md inputs-design"
                            :disable="form_data.id_has_no_expiry"
                            stack-label
                            type="date"/>
                            <div class="check-box">
                                <q-checkbox v-model="form_data.id_has_no_expiry" label="My ID has no expiration" color="primary" />
                            </div>
                            <div class="error-field" ref="error_idexpiry"></div>
                        </div>
                        <div class="col-12 q-py-sm">
                            <q-file
                            outlined
                            label="Upload front ID image"
                            v-model="frontid_files"
                            class="col-12 q-px-md inputs-design"
                            @input="uploadFrontIDImage"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                            </q-file>
                            <div class="error-field" ref="error_frontidimage"></div>
                            <img
                              :src="frontid_image"
                              style="border-radius: 10px; max-width: 250px; max-height: 250px; border: 1px solid #1D1D1D; "
                              @click="zoomImageIn(frontid_image)"
                              class="cursor-pointer"
                              v-if="form_data.id_image != ''" />
                        </div>
                        <div class="col-12 q-py-sm">
                            <q-file
                            outlined
                            label="Upload Selfie image"
                            v-model="selfie_files"
                            class="col-12 q-px-md inputs-design"
                            @input="uploadSelfieImage"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                            </q-file>
                            <div class="error-field" ref="error_selfieimage"></div>
                                <img
                                  :src="selfie_image_view"
                                  style="border-radius: 10px; max-width: 250px; max-height: 250px; border: 1px solid #1D1D1D;"
                                  @click="zoomImageIn(selfie_image_view)"
                                  class="cursor-pointer"
                                  v-if="form_data.selfie_image != ''" />
                        </div>
                        
                        <q-btn color="primary" class="full-width" label="Continue" @click="continueVerify()"/>
                    </q-card-section>
                    <br />
                </q-card>
                <!--Zoom IN-->
                <q-dialog
                    v-model="isZoomImage"
                    >
                    <q-card style="width: 700px; max-width: 80vw; border-radius: 10px;">
                        <q-card-section class="row items-center q-pb-none">
                            <q-space />
                            <q-btn icon="close" flat round dense v-close-popup />
                            <img
                              :src="zoom_in"
                              style="width: 100%;" />
                        </q-card-section>
                            
                    </q-card>
                    </q-dialog>

                 <!--Secret Question-->
                <q-card class="my-card q-px-xl" v-if="count_continue == 3">
                    <br /> 
                    <q-card-section>
                        <q-item>
                            <q-item-section side>
                                <q-icon
                                color="primary"
                                name="keyboard_backspace"
                                style="font-size: 3em;"
                                class="cursor-pointer"
                                @click="back_button()" />
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>
                                    <div class="text-h6">Secret Question</div>
                                </q-item-label>
                                <q-item-label>
                                    Please make sure all information below are correct before proceeding
                                </q-item-label>
                            </q-item-section>

                            <q-item-section side top>
                            </q-item-section>
                        </q-item>
                    </q-card-section>
                    <q-card-section>
                        <div>Items with an asterisk (*) Has to be filled out</div>
                        <div class="col-12 q-py-sm">
                            <q-select
                            outlined
                            :options="security_question_options"
                            v-model="form_data.security_question"
                            label="Security Question *"
                            class="col-12 q-px-md inputs-design"
                            />
                            <div class="error-field" ref="error_securityquestion"></div>
                        </div>
                        <div class="col-12 q-py-sm">
                            <q-input
                            outlined
                            class="col-12 q-px-md inputs-design"
                            v-model="form_data.security_answer"
                            label="Security Answer *"
                            :type="isSecurityQuestion ? 'password' : 'text'"
                            >
                            <template v-slot:append>
                                <q-icon
                                    :name="isSecurityQuestion ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isSecurityQuestion = !isSecurityQuestion"
                                />
                            </template>
                            </q-input>
                            <div class="error-field" ref="error_securityanswer"></div>
                        </div>
                        <q-btn color="primary" class="full-width" label="Continue" @click="continueSecurityQuestion()"/>
                    </q-card-section>
                    <br />
                </q-card>
            </div>
        <q-dialog v-model="isReview">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Please confirm your KYC information</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section style="max-height: 75vh" class="scroll">
                <q-card class="my-card" flat bordered>
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Firstname
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.first_name }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Middlename
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.middle_name }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Lastname
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.last_name }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Birthdate
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.birth_date !='mm/dd/yyyy' ? moment(form_data.birth_date).format('YYYY-MMM-DD').toUpperCase() : '' }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Country
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.country }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Nationality
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.nationality }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Mobile Number
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.mobile_number }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Address line
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.address_line }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Street
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.street }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        City
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.city }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Zipcode
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.zip_code }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        ID Type
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.id_type }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        ID Number
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.id_number }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        ID Expiry
                        </q-card-section>
                        <q-card-section class="col-8">
                            {{ form_data.id_expiry != null ? moment(form_data.id_expiry).format('YYYY-MMM-DD').toUpperCase() : 'ID has no expiry'}}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Front ID Image
                        </q-card-section>
                        <q-card-section class="col-8">
                            <img
                              :src="frontid_image"
                              style="border-radius: 10px; max-width: 250px; max-height: 250px; border: 1px solid #1D1D1D; "
                              @click="zoomImageIn(frontid_image)"
                              class="cursor-pointer"
                              v-if="form_data.id_image != ''" />
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Selfie Image
                        </q-card-section>
                        <q-card-section class="col-8">
                            <img
                                  :src="selfie_image_view"
                                  style="border-radius: 10px; max-width: 250px; max-height: 250px; border: 1px solid #1D1D1D;"
                                  @click="zoomImageIn(selfie_image_view)"
                                  class="cursor-pointer"
                                  v-if="form_data.selfie_image != ''" />
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Security Question
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.security_question }}
                        </q-card-section>
                    </q-card-section>
                    <q-separator />
                    <q-card-section horizontal>
                        <q-card-section class="col-4">
                        Security Answer
                        </q-card-section>
                        <q-card-section class="col-8">
                        {{ form_data.security_answer }}
                        </q-card-section>
                    </q-card-section>
                </q-card>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn @click="onSubmit()" align="between" class="btn-fixed-width" color="primary" label="Confirm" icon="verified_user" v-close-popup />
                <q-btn align="between" class="btn-fixed-width" color="negative" label="Cancel" icon="gpp_bad" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    </div>
</template>

<script>
import country_code_list from "country-codes-list";
import npm_nationality_list from "npm-nationality-list";
import { postKyc, get_user } from '../references/url';
import  moment  from 'moment';



export default {
    data:() =>(
        {
            moment: moment,
            isSecurityQuestion: true,
            progress: 0.25,
            count_continue: 0,
            zoom_in: '',
            isReview: false,
            isZoomImage: false,
            flagCallingCode: false, 
            country_options: [],
            selectedCountry: '',
            nationality_options: [],
            selectedNationality: '',
            selfie_image_view: null,
            frontid_image: null,
            frontid_files: null,
            selfie_files: null,
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
                id_expiry           : null,
                id_has_no_expiry    : false,
                security_question   : '',
                security_answer     : '',
                code                : '',
                id_image             : '',
                selfie_image        : '',
            },
            user: {}
        }),
        mounted(){
            this.country_options = country_code_list.all("all")
            this.nationality_options = npm_nationality_list.getList()
            this.authenticateUser()
        },
        methods: {
            async authenticateUser(){
                this.$q.loading.show();
                let response = await this.$_post(get_user, this.form_data);
                this.user = response.data.data[0]
                this.$q.loading.hide();
            },
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
            
            onSubmit(){
                this.$q.loading.show();
                const fd = new FormData()
                fd.append('id'                  , this.form_data.id);
                fd.append('first_name'          , this.form_data.first_name);
                fd.append('middle_name'         , this.form_data.middle_name);
                fd.append('last_name'           , this.form_data.last_name);
                fd.append('birth_date'          , this.form_data.birth_date);
                fd.append('country'             , this.form_data.country);
                fd.append('nationality'         , this.form_data.nationality);
                fd.append('mobile_number'       , this.form_data.mobile_number);
                fd.append('address_line'        , this.form_data.address_line);
                fd.append('street'              , this.form_data.street);
                fd.append('city'                , this.form_data.city);
                fd.append('zip_code'            , this.form_data.zip_code);
                fd.append('id_type'             , this.form_data.id_type);
                fd.append('id_number'           , this.form_data.id_number);
                fd.append('id_expiry'           , this.form_data.id_expiry);
                fd.append('security_question'   , this.form_data.security_question);
                fd.append('security_answer'     , this.form_data.security_answer);
                fd.append('code'                , this.form_data.code);
                fd.append('id_image'            , this.form_data.id_image);
                fd.append('selfie_image'        , this.form_data.selfie_image);
                fd.append('id_image_files'      , this.frontid_files);
                fd.append('selfie_image_files'  , this.selfie_files);
                let kyc_info = this.$_post(postKyc, fd);
                if(kyc_info)
                {
                    this.$q.loading.hide();
                    this.$q.dialog(
                        { 
                            title: `Success Message`, 
                            message: "Successfully Submitted!"
                            
                        });
                    this.authenticateUser()
                }
            },
            zoomImageIn(image){
                this.isZoomImage = true
                this.zoom_in = image
            },
            uploadFrontIDImage(){
                this.form_data.id_image = this.frontid_files.name
                this.frontid_image = URL.createObjectURL(event.target.files[0])
            },
            uploadSelfieImage(){
                this.form_data.selfie_image = this.selfie_files.name
                this.selfie_image_view = URL.createObjectURL(event.target.files[0])
            },
            async onUpload(){
                let formData = new FormData();
                formData.append("id_image", this.frontid_files)
                formData.append("id", this.form_data)
                await this.$_post(getFile, formData);
                // fetch('../public/', {method: "POST", body: formData});
            },
            
            continuePersonalInfo(){
                let today                       = new Date();
                today.setHours(0, 0, 0, 0);
                let today_mmt                   = moment(today);
                
                let birthdate                   = this.form_data.birth_date;
                birthdate                       = new Date(birthdate);
                birthdate.setHours(0, 0, 0, 0);
                let birthdate_mmt               = moment(birthdate);
                let age                         = today_mmt.diff(birthdate_mmt, 'years');
                if (this.form_data.first_name == '')
                {
                    this.$refs['error_firstname'].innerHTML = 'Firstname must not be empty';
                }
                else
                {
                    this.$refs['error_firstname'].innerHTML = '';
                }

                if (this.form_data.last_name == '')
                {
                    this.$refs['error_lastname'].innerHTML = 'Lastname must not be empty';
                }
                else
                {
                    this.$refs['error_lastname'].innerHTML = '';
                }

                if (this.form_data.birth_date == 'mm/dd/yyyy')
                {
                    this.$refs['error_birthdate'].innerHTML = 'Birthdate must not be empty';
                }
                else
                if (age <= 18)
                {
                    this.$refs['error_birthdate'].innerHTML = '18 below are not allowed';
                }
                else
                {
                    this.$refs['error_birthdate'].innerHTML = '';
                }

                if (this.form_data.country == '')
                {
                    this.$refs['error_country'].innerHTML = 'Country must not be empty';
                }
                else
                {
                    this.$refs['error_country'].innerHTML = '';
                }

                if (this.form_data.nationality == '')
                {
                    this.$refs['error_nationality'].innerHTML = 'Nationality must not be empty';
                }
                else
                {
                    this.$refs['error_nationality'].innerHTML = '';
                }

                if (this.form_data.mobile_number == '')
                {
                    this.$refs['error_mobilenumber'].innerHTML = 'Mobile Number must not be empty';
                }
                else
                {
                    this.$refs['error_mobilenumber'].innerHTML = '';
                }
                
                if (this.form_data.first_name != '' && 
                    this.form_data.last_name != '' && 
                    this.form_data.birth_date != 'mm/dd/yyyy' && 
                    age >= 18 &&
                    this.form_data.country != '' && 
                    this.form_data.nationality != '' && 
                    this.form_data.mobile_number != '')
                {
                    this.progress = 0.50
                    this.count_continue = 1
                }
            },

            continueAddressInfo(){
                

                if (this.form_data.address_line == '')
                {
                    this.$refs['error_addressline'].innerHTML = 'Address line must not be empty';
                }
                else
                {
                    this.$refs['error_addressline'].innerHTML = '';
                }

                if (this.form_data.street == '')
                {
                    this.$refs['error_street'].innerHTML = 'Street must not be empty';
                }
                else
                {
                    this.$refs['error_street'].innerHTML = '';
                }

                if (this.form_data.city == '')
                {
                    this.$refs['error_city'].innerHTML = 'City must not be empty';
                }
                else
                {
                    this.$refs['error_city'].innerHTML = '';
                }

                if (this.form_data.zip_code == '')
                {
                    this.$refs['error_zipcode'].innerHTML = 'Zipcode must not be empty';
                }
                else
                {
                    this.$refs['error_zipcode'].innerHTML = '';
                }

                if (this.form_data.address_line != '' && 
                    this.form_data.street != '' && 
                    this.form_data.city != '' && 
                    this.form_data.zip_code != '')
                {
                    this.progress = 0.75
                    this.count_continue = 2
                }
            },

            continueVerify(){
                let today                       = new Date();
                today.setHours(0, 0, 0, 0);
                let today_mmt                   = moment(today);
                let specified_id_expiry         = this.form_data.id_expiry;
                specified_id_expiry             = new Date(specified_id_expiry);
                specified_id_expiry.setHours(23, 59, 59, 999);
                let specified_id_expiry_mmt     = moment(specified_id_expiry)
                let id_expiry_remaining_days    = specified_id_expiry_mmt.diff(today_mmt, 'days');
                if (this.form_data.id_type == '')
                {
                    this.$refs['error_idtype'].innerHTML = 'ID Type must not be empty';
                }
                else
                {
                    this.$refs['error_idtype'].innerHTML = '';
                }

                if (this.form_data.id_number == '')
                {
                    this.$refs['error_idnumber'].innerHTML = 'ID Number must not be empty';
                }
                else
                {
                    this.$refs['error_idnumber'].innerHTML = '';
                }

                if (this.form_data.id_expiry == 'mm/dd/yyyy' && this.form_data.id_has_no_expiry != true)
                {
                    this.$refs['error_idexpiry'].innerHTML = 'ID Expiry must not be empty';
                }
                else
                if (this.form_data.id_has_no_expiry == false && id_expiry_remaining_days <= 0)
                {
                    this.$refs['error_idexpiry'].innerHTML = 'Your ID is already expired';
                }
                else
                {
                    this.$refs['error_idexpiry'].innerHTML = '';
                }

                if (this.form_data.id_image == '')
                {
                    this.$refs['error_frontidimage'].innerHTML = 'Front ID Image must not be empty';
                }
                else
                {
                    this.$refs['error_frontidimage'].innerHTML = '';
                }

                if (this.form_data.selfie_image == '')
                {
                    this.$refs['error_selfieimage'].innerHTML = 'Selfie Image must not be empty';
                }
                else
                {
                    this.$refs['error_selfieimage'].innerHTML = '';
                }

                if(this.form_data.id_has_no_expiry == true)
                {
                    this.form_data.id_expiry = null
                }

                if (this.form_data.id_type != '' && 
                    this.form_data.id_number != '' && 
                    this.form_data.id_expiry != '' && 
                    this.form_data.frontid_image != '' &&
                    this.form_data.selfie_image != '' )
                {
                    this.progress = 1
                    this.count_continue = 3
                }

            },

            continueSecurityQuestion(){
                if (this.form_data.security_question == '')
                {
                    this.$refs['error_securityquestion'].innerHTML = 'Security Question must not be empty';
                }
                else
                {
                    this.$refs['error_securityquestion'].innerHTML = '';
                }

                if (this.form_data.security_answer == '')
                {
                    this.$refs['error_securityanswer'].innerHTML = 'Security Answer must not be empty';
                }
                else
                {
                    this.$refs['error_securityanswer'].innerHTML = '';
                }

                if (this.form_data.security_question != '' && 
                    this.form_data.security_answer != '')
                {
                    this.isReview = true
                }

                
            },
            back_button(){
                if (this.progress == 0.50 && this.count_continue == 1)
                {
                    this.progress = 0.25
                    this.count_continue = 0
                }
                else if (this.progress == 0.75 && this.count_continue == 2)
                {
                    this.progress = 0.50
                    this.count_continue = 1
                }
                else if (this.progress == 1 && this.count_continue == 3)
                {
                    this.progress = 0.75
                    this.count_continue = 2
                }
            }
        }
}
</script>

<style  scoped>
.my-card
{
  width: 100%;
  max-width: 1000px;
}
div.error-field
{
    color: red;
    margin-top: 6px;
    text-align: left;
    margin-left: 20px;
}
div.check-box
{
    text-align: left;
    margin-left: 10px;
}
</style>