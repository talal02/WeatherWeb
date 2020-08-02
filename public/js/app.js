const fetchdata = (address, callback) => {
    fetch(`http://localhost:5000/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
        if(data.error){
            callback({
                error: data.error
            })
        } else {
            callback({
                forecast: data.forecast,
                location: data.location
            })
        }
    })
})
}

const wForm = document.querySelector('form')
const message = document.querySelectorAll('p')

wForm.addEventListener('submit', (e) => {
    console.log('Working')
    const input = document.querySelector('input')

    fetchdata(input.value, (data) => {
        if(data.error){
            message[1].innerHTML = `Error : ${data.error}`
            input.value = ''
        } else {
            message[2].innerHTML = `Forecast : ${data.forecast}`
            message[1].innerHTML = `Location : ${data.location}`
            input.value = ''
        }
    })
    e.preventDefault()
})