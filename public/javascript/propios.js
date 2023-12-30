const deudas = document.querySelectorAll('.table__row')

deudas.forEach(e => {
  e.addEventListener('click', () => {

    const id = e.id
    const tabledata = e.querySelectorAll('.table__row-data')
    const etiqueta = tabledata[0].textContent;
    const descripcion = tabledata[1].textContent;
    const debito = tabledata[2].textContent;
    const fecha = tabledata[3].textContent;
    const modal = document.getElementById("modal" + e.id)

    const modals = document.querySelectorAll('.modal');
    modals.forEach(e => {
      if(e.id !== id)
      e.innerHTML = ''
    });
    modal.classList.add('modal--open')
    modal.innerHTML = `
        <div class="modal__container fade-in">
          <h2 class="modal__title">Saldo faltante <span class="red">${debito}</span> proxima fecha de pago: ${fecha}</h2>
          <div class="modal__content">
          <p class="modal__item"><span>Descripcion:</span> ${descripcion}</p>
          <p class="modal__item"><span>Deuda total:</span> 7500</p>
            <p class="modal__item"><span>Mensualidad:</span> 500</p>
            <p class="modal__item"><span>Monto a pagar:</span> ${debito}</p>
          </div>
          <div class="buttons__container">
          <button class="modal__button modal__close" id="modal__close">Cerrar menu</button>
          <button class="modal__button modal__update" id="modal__close">Actualizar</button>
          <button class="modal__button marcar__pagado" id="modal__close">Pagar!</button>
          </div>
        </div>
      `
    const cerrarModal = document.querySelector('#modal__close')
    cerrarModal.addEventListener('click', () => {
      modal.classList.remove('modal--open')
      modal.innerHTML = ''
    })
  });
})