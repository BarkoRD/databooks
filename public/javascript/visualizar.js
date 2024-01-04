



const headers = document.querySelectorAll('.resumen__container__item_header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    let item = header.parentElement;
    item.classList.toggle('resumen__container__item--expanded');
    let content = item.querySelector('.resumen__container__item__content');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';

    setTimeout(() => {
      window.scrollBy({
        top: 5000,
        left: 0,
        behavior: 'smooth'
      });


    }, 250);

  });
});

const enviarform = (form, url,message,balance) => {
 
  form.addEventListener('submit', e => {
    e.preventDefault(); 

    let action = e.submitter.getAttribute('id') === 'ingresobutton__continuar' ? 'guardarContinuar' : 'agregar';

    if (action === 'guardarContinuar') {
      let formData = new FormData(e.target);
      let formObject = {};
      formData.forEach((value, key) => { formObject[key] = value; });
      fetch(`/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject)
      })
      .then(response => response.json())
      .then(data => {
        let a = parseInt(balance.innerHTML);
        balance.innerHTML = a + parseInt(data.mensaje) + "$"; 
        e.target.reset();
        mostrarPopup(`${message}`);
      })
      .catch(error => {
        console.error('Error durante la solicitud fetch:', error);
        mostrarPopup('Ha ocurrido un error.');
      });
    } else {
      alert("enviando sin fetch")
  
      e.target.submit();
    }
  });
}

const balanceg = document.getElementById('balanceg');
const balancei = document.getElementById('balancei');
const balanced = document.getElementById('balanced');

const formnewingreso1 = document.querySelector('.new-client1')
const formnewingreso2 = document.querySelector('.new-client2')
const formnewingreso3 = document.querySelector('.new-client3')

enviarform(formnewingreso1, "crearGastosV","Nuevo Gasto Guardado con Exito",balanceg);
enviarform(formnewingreso2, "crearingresosI","Nuevo Ingreso Guardado con Exito",balancei);
enviarform(formnewingreso3, "creardeudaexternaD","Nuevo Deuda Externa Guardada con Exito",balanced);

// formnewingreso.addEventListener('submit', e => {
//   e.preventDefault(); // Evita el envío normal del formulario

//   let action = e.submitter.getAttribute('id') === 'ingresobutton__continuar' ? 'guardarContinuar' : 'agregar';

//   if (action === 'guardarContinuar') {
//     let formData = new FormData(e.target);
//     let formObject = {};
//     formData.forEach((value, key) => { formObject[key] = value; });
//     fetch('/crearGastosV', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formObject)
//     })
//     .then(response => response.json())
//     .then(data => {
//       let a = parseInt(balancev.innerHTML);
//       balancev.innerHTML = a + parseInt(data.mensaje) + "$"; 
//       e.target.reset();
//       mostrarPopup("Nuevo Gasto Guardado con Exito"); // Llama a la función para mostrar el popup con el mensaje de respuesta
//     })
//     .catch(error => {
//       console.error('Error durante la solicitud fetch:', error);
//       mostrarPopup('Ha ocurrido un error.'); // Muestra el popup con mensaje de error
//     });
//   } else {
//     alert("enviando sin fetch")

//     e.target.submit();
//   }
// });

// Asegúrate de que esta función esté definida para que pueda ser llamada
let mostrarPopup = (texto)=> {
  var popup = document.getElementById("miPopup");
  popup.textContent = texto; // Mejor usar textContent para asignar texto
  popup.classList.add("visible");

  setTimeout(function () {
    popup.classList.remove("visible");
  }, 4000); // Ajusta el tiempo según sea necesario
}
