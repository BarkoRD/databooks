
const customtag = document.getElementById('custom-tag');
const addtag = document.getElementById('save-continue-btn')
const select = document.getElementById('ingresoselect');

select.addEventListener('change', (e) => {
  const select = document.getElementById('ingresoselect');
  if (select.value === 'custom') {
    customtag.style.display = 'inline';
    document.getElementById('save-continue-btn').style.display = 'inline';
    customtag.focus();

  } else {
    customtag.style.display = 'none';
    document.getElementById('save-continue-btn').style.display = 'none';
    //
  }
});


customtag.addEventListener('blur', (e) => {
  const select = document.getElementById('ingresoselect');
  setTimeout(() => {
    var value = customtag.value.trim();
    if (value) {
      var option = document.createElement('option');
      option.value = select.lastElementChild.index;
      // ^^^^^^^^^^^^ al añadar una nueva etiqueta, se le asigna el valor del index de la ultima etiqueta
      option.text = value;
      option.selected = true;
      select.add(option);

      customtag.style.display = 'none';
      document.getElementById('save-continue-btn').style.display = 'none';
      customtag.value = '';
    }
  }, 200);
});





addtag.addEventListener('click', e => {
  let tipo = ''
  if (document.URL.toLowerCase().includes('ingresos')) tipo = 'ingreso'
  else if (document.URL.toLowerCase().includes('gastos')) tipo = 'gasto'
  else if(document.URL.toLowerCase().includes('deuda')) tipo = 'deuda'
  console.log(tipo)
  var customTag = customtag.value;
  fetch('/nuevaetiqueta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre: customTag, tipo }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

})

const formnewingreso = document.querySelector('.new-client')

formnewingreso.addEventListener('submit', e => {
  e.preventDefault(); // Evita el envío normal del formulario

  let action = e.submitter.getAttribute('id') === 'ingresobutton__continuar' ? 'guardarContinuar' : 'agregar';

  if (action === 'guardarContinuar') {
    let formData = new FormData(e.target);
    let formObject = {};
    formData.forEach((value, key) => { formObject[key] = value; });

    fetch('/crearingresos', {
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








