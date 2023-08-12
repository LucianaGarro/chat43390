//lógica del lado del cliente

const socket = io();

//  Swal.fire({
//     title: 'Saludos',
//     text: 'Mensaje inicial',
//     icon: 'success'
// });

let user;
const chatbox = document.getElementById('chatBox')

Swal.fire({
    title: 'Registrese',
    input: 'text',
    text: 'Ingresa tu nombre de usuario para ingresar en el chat',
    inputValidator: (value) =>{
        return !value && 'Ingresa tu nombre de usuario para ingresar en el chat'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}) .then (result => {
    user = result.value;
    socket.emit('Autenticado, user')
});

chatbox.addEventListener('keyup', evt =>{
    if(evt.key === 'Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message', {user, massage: chatbox.value});
        }
    }
})

socket.on ('messageLogs', data =>{
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages += `${message.user} dice ${message.message}<br/>`
        
    });
    log.innerHTML = messages;
});

//cada vez que se conecta un nuevo usuario mostramos un modal
socket.on( 'newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmationButton: false,
        timer:2000,
        title: `${data} sa ha unido al chat`,
        icon:'success'
    })
})





