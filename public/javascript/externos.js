const table = document.querySelector('.table tbody')
let sortOrder = true
const data = fetch('/tabla4').then(res => res.json())
data.then(res => {
  sorted(table, res, 'fecha', sortOrder)
})

const sorted = (table, obj, sortBy, sort) => {
  table.innerHTML = ''
  if (typeof obj[0][sortBy] === "number")
    sort ? obj.sort((a, b) => a[sortBy] - b[sortBy]) : obj.sort((a, b) => b[sortBy] - a[sortBy])
  else
    sort ? obj.sort((a, b) => a[sortBy].localeCompare(b[sortBy])) : obj.sort((a, b) => b[sortBy].localeCompare(a[sortBy]))


  obj.forEach(element => {
    table.innerHTML += `
<tr class="table__row" id="${element.id}">
  
    <td class="table__row-data">
      ${element.descripcion} 
      </td>
      <td class="table__row-data">
        ${element.credito} 
        </td>
        <td class="table__row-data">
          ${new Date(element.fecha).toLocaleDateString()}
          </td>
            </tr>
            <td colspan="5" class="table__row-data">
            <div class="modal"  id="modal${element.id}"></div>
            </td>
            `
  })
  sortOrder = !sortOrder

  const deudas = document.querySelectorAll('.table__row')

  deudas.forEach(e => {
    e.addEventListener('click', () => {
      const id = e.id
      const tabledata = e.querySelectorAll('.table__row-data')
      const descripcion = tabledata[0].textContent;
      const debito = tabledata[1].textContent;
      const fecha = tabledata[2].textContent;
      const modal = document.getElementById("modal" + id)

      const modals = document.querySelectorAll('.modal');
      modals.forEach(e => {
        if (e.id !== id)
          e.innerHTML = ''
      });


      modal.classList.add('modal--open')

      modal.innerHTML = `
        <div class="modal__container fade-in">
        <h2 class="modal__title"><span>Descripcion:</span> ${descripcion}</h2>
        <div class="modal__content">
        <p class="modal__item"><span>Deuda total:</span> ${debito}</p>
        </div>
        <div class="buttons__container">
        <button class="modal__button modal__close" id="modal__close">Cerrar menu</button>
        <button class="modal__button marcar__pagado" id="modal__close">Marcar Pagado!</button>
        <button class="modal__button marcar__finiquitar" id="modal__close">Finiquitar!</button>

        </div>
        </div>
        `
      const cerrarModal = document.querySelector('#modal__close')
      cerrarModal.addEventListener('click', () => {
        modal.classList.remove('modal--open')
        modal.innerHTML = ''
      })

      const marcarPagado = document.querySelector('.marcar__pagado')
      marcarPagado.addEventListener('click', () => {
        modal.classList.remove('modal--open')
        modal.innerHTML = ''
        fetch(`/marcarPagadoexteno/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })  // Asumiendo que quieres enviar el id en el cuerpo de la solicitud
        })
        .then(response => response.json())
        .then(data => {
          sorted(table, data, 'fecha', sortOrder); // Asumiendo que esto es lo que quieres hacer con la respuesta
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
      })
    })
  })

}

const thead = document.querySelectorAll('.table__head-title')

thead[0].addEventListener('click', () => {
  data.then(res => {
    sorted(table, res, 'descripcion', sortOrder)
  })
})
thead[1].addEventListener('click', () => {
  data.then(res => {
    sorted(table, res, 'credito', sortOrder)
  })
})
thead[2].addEventListener('click', () => {
  data.then(res => {
    sorted(table, res, 'fecha', sortOrder)
  })
})

