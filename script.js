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
