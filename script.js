document.addEventListener("DOMContentLoaded", () => {
  const listMenu = document.querySelector(".listMenu");
  const menuButton = document.querySelector(".menuButton img");

  // Toggle visible class
  menuButton.addEventListener("click", () => {
    listMenu.classList.toggle("visible");
  });

  // Cierra el menú al hacer clic en un enlace
  document.querySelectorAll(".listMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      listMenu.classList.remove("visible");
    });
  });

  // Cierra si haces clic fuera del menú
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".menuButton") &&
      !e.target.closest(".listMenu")
    ) {
      listMenu.classList.remove("visible");
    }
  });
});

function iniciarCuentaRegresiva(fechaObjetivo) {
  const meses = document.getElementById("meses");
  const dias = document.getElementById("dias");
  const horas = document.getElementById("horas");
  const minutos = document.getElementById("minutos");

  function actualizar() {
    const ahora = new Date();
    let diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
      meses.textContent = "00";
      dias.textContent = "00";
      horas.textContent = "00";
      minutos.textContent = "00";
      return;
    }

    const totalMin = Math.floor(diferencia / (1000 * 60));
    const totalHoras = Math.floor(totalMin / 60);
    const totalDias = Math.floor(totalHoras / 24);
    const totalMeses = Math.floor(totalDias / 30);

    meses.textContent = String(totalMeses).padStart(2, "0");
    dias.textContent = String(totalDias % 30).padStart(2, "0");
    horas.textContent = String(totalHoras % 24).padStart(2, "0");
    minutos.textContent = String(totalMin % 60).padStart(2, "0");
  }

  actualizar();
  setInterval(actualizar, 60000); // Actualiza cada minuto
}

document.addEventListener("DOMContentLoaded", () => {
  // Fecha objetivo: 15 diciembre 2025, 19:00 hrs
  const fechaEvento = new Date("2025-09-06T17:15:00");
  iniciarCuentaRegresiva(fechaEvento);
});

let listaInvitados = [];

// Cargar archivo JSON (asegúrate que esté en la misma carpeta o ajústalo)
fetch("ListaInvitados.json")
  .then(res => res.json())
  .then(data => listaInvitados = data);

function buscarInvitado() {
  const telInput = document.getElementById("telefono");
  const resultado = document.getElementById("resultado");
  const telefono = telInput.value.trim();

  const invitado = listaInvitados.find(inv => inv.Teléfono && inv.Teléfono.toString() === telefono);

  if (!invitado) {
    resultado.innerHTML = `<p style="color: red;">Número no encontrado. Verifica y vuelve a intentar.</p>`;
    return;
  }

  // Mostrar formulario de confirmación
  const opciones = Array.from({ length: invitado.Boletos }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("");

  resultado.innerHTML = `
    <p>¡Hola <strong>${invitado.Nombre}</strong>! Puedes confirmar hasta <strong>${invitado.Boletos}</strong> boleto(s).</p>
    <label for="boletos">¿Cuántos boletos deseas confirmar?</label>
    <select id="boletos">${opciones}</select>
    <button onclick="confirmarBoletos('${invitado.Nombre}')">Confirmar</button>
  `;
}

function confirmarBoletos(nombre) {
  const boletosConfirmados = document.getElementById("boletos").value;
  const resultado = document.getElementById("resultado");
  const telefono = document.getElementById("telefono").value;

  // ---- genera fecha y hora actual ----
  const fechaHora = new Date().toLocaleString('es-MX', { hour12: false });

  resultado.innerHTML = `
    <p style="color: green;">✅ ¡Gracias, <strong>${nombre}</strong>! Se han confirmado <strong>${boletosConfirmados}</strong> boleto(s).</p>
  `;

  // ---- ENVÍO A GOOGLE FORMS ----
  const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSeJPBZzZKsru93PdpjemUwjtgZ3g1meGr5onpLm6KSW9IRsWA/formResponse';
  const data = new URLSearchParams({
    'entry.1831100056': nombre,
    'entry.742445467': telefono,
    'entry.1910376896': boletosConfirmados,
    'entry.915690385': fechaHora  // <---- pon aquí el entry.X del campo de fecha/hora en tu Google Forms
  });

  fetch(formURL, {
    method: 'POST',
    mode: 'no-cors',
    body: data
  });
}
