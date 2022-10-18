let template = undefined

const socket = io();

socket.on('productos', message => {
  console.log('From server: ', message)
  const html = template({
    productos: message
  })
  document.getElementById("listado").innerHTML = html

})
document.getElementById("productos").addEventListener('submit', evnt => {
  evnt.preventDefault()
  const title = document.querySelector('[name="title"]').value
  const price = document.querySelector('[name="price"]').value
  const icon = document.querySelector('[name="icon"]').value
  console.log(title)
  fetch('/productos', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        price,
        icon
      }),
    })
    .then((response) => response.json())
    .then((data) => {

    })
})
document.getElementById("chat").addEventListener('submit', evnt => {
  enviarMensaje(event)
})
fetch("/productos.hbs")
  .then(async (response) => {
    const texto = await response.text()
    console.log(texto)
    template = Handlebars.compile(texto);
    const html = template()
    document.getElementById("listado").innerHTML = html
  })




function render(data) {
  debugger
  const html = data.map((msg) => {
    return `<li class="msj">
                <p class="email-message"><b>${msg.autor}</b></p>
                <p class="fecha">${msg.fecha}</p>
                <p class="mensaje">${msg.mensaje}</p>
              </li>`
  }).join(" ")

  document.getElementById('mensajes').innerHTML = html
}

socket.on("mensajes", (data) => {
  console.log(data)
  render(data)
})

function enviarMensaje(event) {
  debugger
  event.preventDefault()
  const nombre = document.getElementById('nombre').value
  const msj = document.getElementById('chat_mensaje').value
  if (!nombre) {
    return alert('ingrese su mail')
  }
  if (!msj) {
    alert('ingrese un mensaje')
  }
  socket.emit('mensajes', {
    autor: nombre,
    mensaje: msj
  })
  document.getElementById('chat_mensaje').value = ''
  return false
}
