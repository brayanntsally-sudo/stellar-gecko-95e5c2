// =====================================================
// GOD DIGITAL - SCRIPT PRINCIPAL
// =====================================================


// =====================================================
// FILTRES DES RÉALISATIONS
// =====================================================

const filterButtons = [...document.querySelectorAll(".filters button")];
const projects = [...document.querySelectorAll(".project")];

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    projects.forEach((project) => {

      project.style.display =
        filter === "all" || project.dataset.cat === filter
          ? ""
          : "none";

    });

  });

});


// =====================================================
// MENU MOBILE
// =====================================================

const menu = document.querySelector(".menu");
const links = document.querySelector(".links");

if (menu && links) {

  menu.addEventListener("click", () => {
    links.classList.toggle("open");
  });


  links.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {
      links.classList.remove("open");
    });

  });

}


// =====================================================
// FORMULAIRE CONTACT → WHATSAPP
// =====================================================

const projectForm = document.getElementById("projectForm");

if (projectForm) {

  projectForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
      document.getElementById("clientName")?.value.trim() || "";

    const service =
      document.getElementById("service")?.value || "";

    const message =
      document.getElementById("projectMessage")?.value.trim() || "";


    const whatsappMessage =
      `Bonjour God Digital 👋\n\n` +
      `Nom : ${name}\n\n` +
      `Service : ${service}\n\n` +
      `Projet :\n${message}\n\n` +
      `Je souhaite avoir plus d'informations.`;


    window.open(
      "https://wa.me/2290192271790?text=" +
      encodeURIComponent(whatsappMessage),
      "_blank"
    );

  });

}


// =====================================================
// BOUTONS DES OFFRES
// =====================================================

const offerButtons =
  document.querySelectorAll("[data-offer]");


offerButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const offer =
      button.dataset.offer;

    const messageField =
      document.getElementById("projectMessage");


    if (messageField) {

      messageField.value =
        "Bonjour God Digital, je suis intéressé(e) par " +
        "l'offre " +
        offer +
        ". Je voudrais avoir plus d'informations.";

      messageField.focus();

    }

  });

});


// =====================================================
// ESPACE ADMINISTRATEUR
// =====================================================

const openAdmin =
  document.getElementById("openAdmin");

const closeAdmin =
  document.getElementById("closeAdmin");

const adminPanel =
  document.getElementById("adminPanel");


if (openAdmin && closeAdmin && adminPanel) {

  openAdmin.addEventListener("click", () => {

    adminPanel.hidden = false;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  closeAdmin.addEventListener("click", () => {

    adminPanel.hidden = true;

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });

  });

}


// =====================================================
// GESTION DES CLIENTS
// =====================================================

const clientForm =
  document.getElementById("clientForm");

const clientsList =
  document.getElementById("clientsList");


let clients = [];


try {

  clients =
    JSON.parse(
      localStorage.getItem("godDigitalClients")
    ) || [];

} catch (error) {

  clients = [];

}


// =====================================================
// AFFICHER LES CLIENTS
// =====================================================

function displayClients() {

  if (!clientsList) return;


  if (clients.length === 0) {

    clientsList.innerHTML =
      '<p class="admin-empty">Aucun client enregistré.</p>';

    return;

  }


  clientsList.innerHTML =
    clients.map((client, index) => `

      <div class="client-item">

        <div class="client-info">

          <strong>
            ${escapeHTML(client.name)}
          </strong>

          <span>
            📞 ${escapeHTML(client.phone)}
          </span>

          <span>
            📁 ${escapeHTML(client.project)}
          </span>

        </div>


        <button
          class="delete-client"
          data-index="${index}"
          type="button"
        >
          Supprimer
        </button>

      </div>

    `).join("");


  document
    .querySelectorAll(".delete-client")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.index);


        if (confirm("Supprimer ce client ?")) {

          clients.splice(index, 1);


          localStorage.setItem(
            "godDigitalClients",
            JSON.stringify(clients)
          );


          displayClients();
          updateClientCount();

        }

      });

    });

}


// =====================================================
// COMPTEUR CLIENTS
// =====================================================

function updateClientCount() {

  const counter =
    document.getElementById("clientCount");


  if (counter) {

    counter.textContent =
      clients.length;

  }

}


// =====================================================
// PROTECTION DU HTML
// =====================================================

function escapeHTML(value) {

  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}


// =====================================================
// AJOUTER UN CLIENT
// =====================================================

if (clientForm) {

  clientForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
      document
        .getElementById("adminClientName")
        ?.value
        .trim() || "";


    const phone =
      document
        .getElementById("clientPhone")
        ?.value
        .trim() || "";


    const project =
      document
        .getElementById("clientProject")
        ?.value
        .trim() || "";


    if (!name || !phone || !project) {

      return;

    }


    clients.push({

      name: name,

      phone: phone,

      project: project

    });


    localStorage.setItem(
      "godDigitalClients",
      JSON.stringify(clients)
    );


    clientForm.reset();


    displayClients();

    updateClientCount();

  });

}


// =====================================================
// INITIALISATION
// =====================================================

displayClients();

updateClientCount();
