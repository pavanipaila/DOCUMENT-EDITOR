const socket = io();
const textarea = document.getElementById('editor');

textarea.addEventListener('input', () => {
    socket.emit('text-update', textarea.value);
});

socket.on('text-update', (data) => {
    textarea.value = data;
});