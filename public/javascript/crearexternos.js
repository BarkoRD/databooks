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