const form = document.querySelector('form')
const input = document.getElementById('searchInput')
const loadingSpinner = document.querySelector('.loading-spinner')
form.addEventListener('submit', (e)=>{
    
    if(input.value === ''){
        e.preventDefault()
        return
    }
    
    loadingSpinner.classList.remove('hide')
})