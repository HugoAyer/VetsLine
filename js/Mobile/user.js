import {disclosure} from './text.js'

const btn_activities = document.getElementById("btn-activities")
const activities_div = document.getElementById("activities-div")

const activities_div_1 = document.getElementById("activities-div-1")
const activities_div_2 = document.getElementById("activities-div-2")
const activities_div_3 = document.getElementById("activities-div-3")
const activities_div_4 = document.getElementById("activities-div-4")
const toast_appointments_modal = document.getElementById('toast_appointments_modal')

const vet_content_tab_about = document.getElementById("vet-content-tab-about")
const vet_content_tab_about_bar = document.getElementById("vet-content-tab-about-bar")
const vet_content_tab_address = document.getElementById("vet-content-tab-address")
const vet_content_tab_address_bar = document.getElementById("vet-content-tab-address-bar")
const vet_content_tab_opinions = document.getElementById("vet-content-tab-opinions")
const vet_content_tab_opinions_bar = document.getElementById("vet-content-tab-opinions-bar")
const vet_content_tab_blog = document.getElementById("vet-content-tab-blog")
const vet_content_tab_blog_bar = document.getElementById("vet-content-tab-blog-bar")
const vet_content_about = document.getElementById('vet-content-abouts')
const vet_content_addresses = document.getElementById('vet-content-addresses')
const vet_content_reviews = document.getElementById('vet-content-reviews')
const vet_content_answers = document.getElementById('vet-content-answers')

const vet_schedule_tab_monday = document.getElementById('vet-schedule-tab-monday')
const vet_schedule_tab_monday_bar = document.getElementById('vet-schedule-tab-monday-bar')
const vet_schedule_tab_tuesday = document.getElementById('vet-schedule-tab-tuesday')
const vet_schedule_tab_tuesday_bar = document.getElementById('vet-schedule-tab-tuesday-bar')
const vet_schedule_tab_wednesday = document.getElementById('vet-schedule-tab-wednesday')
const vet_schedule_tab_wednesday_bar = document.getElementById('vet-schedule-tab-wednesday-bar')
const vet_schedule_tab_thursday = document.getElementById('vet-schedule-tab-thursday')
const vet_schedule_tab_thursday_bar = document.getElementById('vet-schedule-tab-thursday-bar')
const vet_schedule_tab_friday = document.getElementById('vet-schedule-tab-friday')
const vet_schedule_tab_friday_bar = document.getElementById('vet-schedule-tab-friday-bar')
const vet_schedule_tab_saturday = document.getElementById('vet-schedule-tab-saturday')
const vet_schedule_tab_saturday_bar = document.getElementById('vet-schedule-tab-saturday-bar')
const vet_schedule_tab_sunday = document.getElementById('vet-schedule-tab-sunday')
const vet_schedule_tab_sunday_bar = document.getElementById('vet-schedule-tab-sunday-bar')
const vet_content_monday = document.getElementById('vet-content-monday')
const vet_content_tuesday = document.getElementById('vet-content-tuesday')
const vet_content_wednesday = document.getElementById('vet-content-wednesday')
const vet_content_thursday = document.getElementById('vet-content-thursday')
const vet_content_friday = document.getElementById('vet-content-friday')
const vet_content_saturday = document.getElementById('vet-content-saturday')
const vet_content_sunday = document.getElementById('vet-content-sunday')
const scheduler_footer = document.getElementById('scheduler-footer')

const vet_content_review_bars = document.querySelectorAll('.vet-content-review-bar')

const search_vets_vet_link = document.querySelectorAll('.search-vets-vet-link')

const appointment_cards = document.querySelectorAll('.appointment-card')
const AppointmentModal = document.getElementById('AppointmentModal')
const modal_close = document.querySelectorAll('.modal-close')

const schedule_box = document.querySelectorAll('.schedule-box')
const VetScheduleContent = document.getElementById('VetScheduleContent')

const vet_schedule_back = document.getElementById('vet-schedule-back')
const VetScheduleSteps = document.querySelectorAll('.VetScheduleSteps')
const VetScheduleStep1 = document.getElementById('VetScheduleStep1')
const Appointment_pet = document.querySelectorAll('.Appointment-pet')
const VetScheduleStep2 = document.getElementById('VetScheduleStep2')
const reazon_box = document.querySelectorAll('.reazon-box')
const VetScheduleStep3 = document.getElementById('VetScheduleStep3')
const schedule_confirm_button = document.getElementById('schedule-confirm-button')
const VetScheduleStep4 = document.getElementById('VetScheduleStep4')
const schedule_toPay_button = document.getElementById('schedule-toPay-button')
const VetScheduleStep5 = document.getElementById('VetScheduleStep5')
const credit_card_link = document.querySelectorAll('.credit-card-link')

const vet_step_tab_pet_bar = document.getElementById('vet-step-tab-pet-bar')
const vet_step_tab_reason_bar = document.getElementById('vet-step-tab-reason-bar')
const vet_step_tab_desc_bar = document.getElementById('vet-step-tab-desc-bar')
const vet_step_tab_confirm_bar = document.getElementById('vet-step-tab-confirm-bar')
const vet_step_tab_payment_bar = document.getElementById('vet-step-tab-payment-bar')

$(document).ready(function () {

    btn_activities.addEventListener('click',function(){
        activities_div.classList.remove('btn-invisible')
        activities_div.classList.add('activities-background')
    })

    $(document).click(function(event) {        
        if(event.target.id != 'btn-activities') {                    
            activities_div_1.classList.remove("ao1")
            activities_div_2.classList.remove("ao2")
            activities_div_3.classList.remove("ao3")
            activities_div_4.classList.remove("ao4")
            activities_div_1.classList.add("back-ao1")
            activities_div_2.classList.add("back-ao2")
            activities_div_3.classList.add("back-ao3")
            activities_div_4.classList.add("back-ao4")
            setTimeout(() => {
                activities_div.classList.add('btn-invisible')
                activities_div_1.classList.remove("back-ao1")
                activities_div_2.classList.remove("back-ao2")
                activities_div_3.classList.remove("back-ao3")
                activities_div_4.classList.remove("back-ao4")
                activities_div_1.classList.add("ao1")
                activities_div_2.classList.add("ao2")
                activities_div_3.classList.add("ao3")
                activities_div_4.classList.add("ao4")
                activities_div.classList.remove('activities-background')
            }, 300);
            
        }
      });

      vet_content_tab_about.addEventListener('click',function(){
        vet_content_review_bar_filler()        
        vet_content_tab_activate(vet_content_tab_about_bar,vet_content_about)
        vet_content_tab_inactivate(vet_content_tab_opinions_bar,vet_content_reviews)
        vet_content_tab_inactivate(vet_content_tab_address_bar,vet_content_addresses)        
        vet_content_tab_inactivate(vet_content_tab_blog_bar,vet_content_answers)
      })
      vet_content_tab_opinions.addEventListener('click',function(){
        vet_content_review_bar_filler()
        vet_content_tab_activate(vet_content_tab_opinions_bar,vet_content_reviews)
        vet_content_tab_inactivate(vet_content_tab_about_bar,vet_content_about)
        vet_content_tab_inactivate(vet_content_tab_address_bar,vet_content_addresses)        
        vet_content_tab_inactivate(vet_content_tab_blog_bar,vet_content_answers)
      })
      vet_content_tab_address.addEventListener('click',function(){
        vet_content_review_bar_clear()
        vet_content_tab_activate(vet_content_tab_address_bar,vet_content_addresses)
        vet_content_tab_inactivate(vet_content_tab_about_bar,vet_content_about)
        vet_content_tab_inactivate(vet_content_tab_opinions_bar,vet_content_reviews)
        vet_content_tab_inactivate(vet_content_tab_blog_bar,vet_content_answers)
      })
      vet_content_tab_blog.addEventListener('click',function(){
        vet_content_review_bar_clear()
        vet_content_tab_activate(vet_content_tab_blog_bar,vet_content_answers)
        vet_content_tab_inactivate(vet_content_tab_about_bar,vet_content_about)
        vet_content_tab_inactivate(vet_content_tab_opinions_bar,vet_content_reviews)
        vet_content_tab_inactivate(vet_content_tab_address_bar,vet_content_addresses)
      })

      vet_schedule_back.addEventListener('click',function(){        
        VetScheduleSteps.forEach(element => {
            if(element.classList.contains('active-div')){
                console.log(element)
            }
        })
      })
      vet_schedule_tab_monday.addEventListener('click',function(){        
        vet_content_tab_activate(vet_schedule_tab_monday_bar,vet_content_monday)
        vet_content_tab_inactivate(vet_schedule_tab_tuesday_bar,vet_content_tuesday)
        vet_content_tab_inactivate(vet_schedule_tab_wednesday_bar,vet_content_wednesday)
        vet_content_tab_inactivate(vet_schedule_tab_thursday_bar,vet_content_thursday)
        vet_content_tab_inactivate(vet_schedule_tab_friday_bar,vet_content_friday)      
        vet_content_tab_inactivate(vet_schedule_tab_saturday_bar,vet_content_saturday)  
        vet_content_tab_inactivate(vet_schedule_tab_sunday_bar,vet_content_sunday)
      })
      vet_schedule_tab_tuesday.addEventListener('click',function(){
        vet_content_tab_inactivate(vet_schedule_tab_saturday_bar,vet_content_saturday)
        vet_content_tab_inactivate(vet_schedule_tab_monday_bar,vet_content_monday)
        vet_content_tab_activate(vet_schedule_tab_tuesday_bar,vet_content_tuesday)
        vet_content_tab_inactivate(vet_schedule_tab_wednesday_bar,vet_content_wednesday)
        vet_content_tab_inactivate(vet_schedule_tab_thursday_bar,vet_content_thursday)
        vet_content_tab_inactivate(vet_schedule_tab_friday_bar,vet_content_friday)        
        vet_content_tab_inactivate(vet_schedule_tab_sunday_bar,vet_content_sunday)
      })
      vet_schedule_tab_wednesday.addEventListener('click',function(){
        vet_content_tab_inactivate(vet_schedule_tab_saturday_bar,vet_content_saturday)
        vet_content_tab_inactivate(vet_schedule_tab_monday_bar,vet_content_monday)
        vet_content_tab_inactivate(vet_schedule_tab_tuesday_bar,vet_content_tuesday)
        vet_content_tab_activate(vet_schedule_tab_wednesday_bar,vet_content_wednesday)
        vet_content_tab_inactivate(vet_schedule_tab_thursday_bar,vet_content_thursday)
        vet_content_tab_inactivate(vet_schedule_tab_friday_bar,vet_content_friday)        
        vet_content_tab_inactivate(vet_schedule_tab_sunday_bar,vet_content_sunday)
      })
      vet_schedule_tab_thursday.addEventListener('click',function(){
        vet_content_tab_inactivate(vet_schedule_tab_saturday_bar,vet_content_saturday)
        vet_content_tab_inactivate(vet_schedule_tab_monday_bar,vet_content_monday)
        vet_content_tab_inactivate(vet_schedule_tab_tuesday_bar,vet_content_tuesday)
        vet_content_tab_inactivate(vet_schedule_tab_wednesday_bar,vet_content_wednesday)
        vet_content_tab_activate(vet_schedule_tab_thursday_bar,vet_content_thursday)
        vet_content_tab_inactivate(vet_schedule_tab_friday_bar,vet_content_friday)        
        vet_content_tab_inactivate(vet_schedule_tab_sunday_bar,vet_content_sunday)
      })
      vet_schedule_tab_friday.addEventListener('click',function(){
        vet_content_tab_inactivate(vet_schedule_tab_saturday_bar,vet_content_saturday)
        vet_content_tab_inactivate(vet_schedule_tab_monday_bar,vet_content_monday)
        vet_content_tab_inactivate(vet_schedule_tab_tuesday_bar,vet_content_tuesday)
        vet_content_tab_inactivate(vet_schedule_tab_wednesday_bar,vet_content_wednesday)
        vet_content_tab_inactivate(vet_schedule_tab_thursday_bar,vet_content_thursday)
        vet_content_tab_activate(vet_schedule_tab_friday_bar,vet_content_friday)        
        vet_content_tab_inactivate(vet_schedule_tab_sunday_bar,vet_content_sunday)
      })
      vet_schedule_tab_saturday.addEventListener('click',function(){
        vet_content_tab_activate(vet_schedule_tab_saturday_bar,vet_content_saturday)
        vet_content_tab_inactivate(vet_schedule_tab_monday_bar,vet_content_monday)
        vet_content_tab_inactivate(vet_schedule_tab_tuesday_bar,vet_content_tuesday)
        vet_content_tab_inactivate(vet_schedule_tab_wednesday_bar,vet_content_wednesday)
        vet_content_tab_inactivate(vet_schedule_tab_thursday_bar,vet_content_thursday)
        vet_content_tab_inactivate(vet_schedule_tab_friday_bar,vet_content_friday)        
        vet_content_tab_inactivate(vet_schedule_tab_sunday_bar,vet_content_sunday)
      })
      vet_schedule_tab_sunday.addEventListener('click',function(){
        vet_content_tab_activate(vet_schedule_tab_sunday_bar,vet_content_sunday)
        vet_content_tab_inactivate(vet_schedule_tab_monday_bar,vet_content_monday)
        vet_content_tab_inactivate(vet_schedule_tab_tuesday_bar,vet_content_tuesday)
        vet_content_tab_inactivate(vet_schedule_tab_wednesday_bar,vet_content_wednesday)
        vet_content_tab_inactivate(vet_schedule_tab_thursday_bar,vet_content_thursday)
        vet_content_tab_inactivate(vet_schedule_tab_friday_bar,vet_content_friday)
        vet_content_tab_inactivate(vet_schedule_tab_saturday_bar,vet_content_saturday)        
      })
    
      search_vets_vet_link.forEach(element => {        
        element.addEventListener('click',function(){
            bootbox.confirm({
                title: 'Consentimiento',
                message: disclosure,
                buttons: {
                confirm: {
                label: 'Aceptar - llamar',
                className: 'btn-success'
                },
                cancel: {
                label: 'Cancelar',
                className: 'btn-danger'
                }
                },
                callback: function (result) {
                    if(result){
                        $('#OnCallModal').modal('show')
                    }                    
                }
                });
        })

        modal_close.forEach(element => {
            element.addEventListener('click',function(){
                AppointmentModal.classList.remove('show')
                AppointmentModal.classList.add('hidding')
                setTimeout(() => {
                    AppointmentModal.classList.remove('hidding')
                }, 500);
            })
        })

      })

      appointment_cards.forEach(element => {
        element.addEventListener('click',function(){            
            AppointmentModal.classList.add('show')                   
        })
      })

      schedule_box.forEach(element => {
        element.addEventListener('click',function(){
            console.log('Horario')
            inactive_div(VetScheduleContent,vet_step_tab_pet_bar)
            active_div(VetScheduleStep1,vet_step_tab_pet_bar)     
            scheduler_footer.classList.remove('invisible')           
        })
      })

      Appointment_pet.forEach(element => {
        element.addEventListener('click',function(){
            inactive_div(VetScheduleStep1,vet_step_tab_pet_bar)
            active_div(VetScheduleStep2,vet_step_tab_reason_bar)
        })
      })

      reazon_box.forEach(element => {
        element.addEventListener('click',function(){
            inactive_div(VetScheduleStep2,vet_step_tab_reason_bar)
            active_div(VetScheduleStep3,vet_step_tab_desc_bar)
        })
      })

      schedule_confirm_button.addEventListener('click',function(){
            inactive_div(VetScheduleStep3,vet_step_tab_desc_bar)
            active_div(VetScheduleStep4,vet_step_tab_confirm_bar)
      })

      schedule_toPay_button.addEventListener('click',function(){
            inactive_div(VetScheduleStep4,vet_step_tab_confirm_bar)
            active_div(VetScheduleStep5,vet_step_tab_payment_bar)
      })

      credit_card_link.forEach(element => {
        element.addEventListener('click',function(){
            inactive_div(VetScheduleStep5,vet_step_tab_payment_bar)
            active_div(VetScheduleStep1,vet_step_tab_pet_bar)
            let toast = new bootstrap.Toast(toast_appointments_modal)
            toast.show()
            $('#VetScheduleModal').modal('hide')
        })
      })
    
});

const vet_content_review_bar_filler = () => {    
    vet_content_review_bars.forEach(element => {
        element.classList.add(`r${element.attributes.getNamedItem("data").value.replace(".","-")}`)
    })
}
const vet_content_review_bar_clear = () => {    
    vet_content_review_bars.forEach(element => {
        element.classList.remove(`r${element.attributes.getNamedItem("data").value.replace(".","-")}`)
    })
}
const vet_content_tab_activate = (tab,content) => {
    if(!tab.classList.contains('active')){
        tab.classList.remove('inactive')
        tab.classList.add('active')
        content.classList.remove('inactive')
        content.classList.add('active')            
    }
}
const vet_content_tab_inactivate = (tab,content) => {
    if(tab.classList.contains('active')){
        tab.classList.remove('active')
        tab.classList.add('inactive')
        content.classList.remove('active')
        content.classList.add('inactive')
    }
}
const inactive_div = (content,tab) => {
    content.classList.remove('active-div')
    content.classList.add('inactive-div')   
    tab.classList.remove('active')
    tab.classList.add('inactive')
}
const active_div = (content,tab) => {
    content.classList.add('active-div')
    content.classList.remove('inactive-div')    
    tab.classList.remove('inactive')
    tab.classList.add('active')
}