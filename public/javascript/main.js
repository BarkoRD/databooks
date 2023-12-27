function checkForCustomTag(select) {
  // Verificar si la opción seleccionada es para agregar una nueva etiqueta
  if(select.value === 'custom') {
    // Mostrar el campo de entrada
    document.getElementById('custom-tag').style.display = 'inline';
    document.getElementById('save-continue-btn').style.display = 'inline';
    document.getElementById('custom-tag').focus(); // Poner el foco en el campo de entrada
    
  } else {
    // Ocultar el campo de entrada si se selecciona otra opción
    document.getElementById('custom-tag').style.display = 'none';
    document.getElementById('save-continue-btn').style.display = 'none';

  }
}

function addCustomTag(input) {
  var value = input.value.trim();
  if(value) { // Asegurarse de que la cadena no esté vacía
    var select = document.getElementsByName('supplier_rnc')[0];
    var option = document.createElement('option');
    option.value = value.toLowerCase(); // Usar un valor más adecuado si es necesario
    option.text = value;
    option.selected = true;
    select.add(option);
    // Ocultar el campo de entrada después de agregar la etiqueta
    input.style.display = 'none';
    document.getElementById('save-continue-btn').style.display = 'none';
    input.value = ''; // Limpiar el campo de entrada para el próximo uso
  }
}
