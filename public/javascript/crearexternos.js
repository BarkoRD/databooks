const formnewingreso = document.querySelector('.new-client')

formnewingreso.addEventListener('submit', e => {
  e.preventDefault(); // Evita el envío normal del formulario

  let action = e.submitter.getAttribute('id') === 'ingresobutton__continuar' ? 'guardarContinuar' : 'agregar';
  if (action === 'guardarContinuar') {
    let formData = new FormData(e.target);
    let formObject = {};
    formData.forEach((value, key) => { formObject[key] = value; });

    fetch('/creardeudaexterna', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject)
    })
    .then(response => {
      e.target.reset();
      mostrarPopup('Nuevo Ingreso Pendiente Guardado con Exito');
      if (response.headers.get("Content-Type").includes("application/json")) {
        return response.json();
      } else {
        return response.text(); 
      }
    })
    .then(data => {
      console.log('Respuesta recibida:', data);
    })
    .catch(error => {
      console.error('Error durante la solicitud fetch:', error);
    });
  } else {
    e.target.submit();
  }
}); 

let mostrarPopup = (texto)=> {
  var popup = document.getElementById("miPopup");
  popup.textContent = texto; // Mejor usar textContent para asignar texto
  popup.classList.add("visible");

  setTimeout(function () {
    popup.classList.remove("visible");
  }, 4000); // Ajusta el tiempo según sea necesario
}
