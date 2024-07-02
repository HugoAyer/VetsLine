const Registration_carousel = document.getElementById('Registration_carousel')
const title_AsistantModal = document.getElementById('title_AsistantModal')

const registration_step_1 = document.getElementById('registration_step_1')
const registration_step_2 = document.getElementById('registration_step_2')
const registration_step_3 = document.getElementById('registration_step_3')
const registration_step_4 = document.getElementById('registration_step_4')
const registration_step_5 = document.getElementById('registration_step_5')

export const registration_next_onclick = () => {
    $('#Registration_carousel').carousel('next')   
    registration_steps_onchange() 
}

const registration_steps_onchange = () => {
    setTimeout(() => {
        let step = get_carousel_current_step() 
        let booking_step = document.querySelectorAll('.step-wizard-item')
        booking_step.forEach(step => step.classList.remove('current-item'))

        switch(step){
            case '0':
                registration_step_1.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Asistente de registro - Generales'
                break
            case '1':
                registration_step_2.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Asistente de registro - Especialidades'
                break
            case '2':
                registration_step_3.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Asistente de registro - Domicilio'
                break
            case '3':
                registration_step_4.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Asistente de registro - Experiencia profesional'
                break
            case '4':
                registration_step_5.classList.add('current-item')
                title_AsistantModal.innerHTML = 'Asistente de registro - Cuéntanos sobre ti'
                break

        }
    }, 800);
}

const get_carousel_current_step = () => {
    let carousel_items = Registration_carousel.querySelectorAll('.carousel-item')
    let step =''
    carousel_items.forEach((node) => {
        if(node.classList.contains('active')){            
            step = node.getAttribute('step')            
            return
        }
    })
    return step    
}