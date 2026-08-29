const buttons=[...document.querySelectorAll('.filters button')];const projects=[...document.querySelectorAll('.project')];buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;projects.forEach(p=>p.style.display=f==='all'||p.dataset.cat===f?'block':'none')}));
const menu=document.querySelector('.menu');const links=document.querySelector('.links');menu?.addEventListener('click',()=>{links.style.display=links.style.display==='flex'?'none':'flex';links.style.position='absolute';links.style.top='76px';links.style.left='0';links.style.right='0';links.style.padding='20px';links.style.background='#090909';links.style.flexDirection='column'});const projectForm = document.getElementById("projectForm");

if (projectForm) {
  projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("projectMessage").value.trim();

    const whatsappMessage =
      `Bonjour God Digital 👋%0A%0A` +
      `Nom : ${encodeURIComponent(name)}%0A` +
      `Service : ${encodeURIComponent(service)}%0A` +
      `Projet : ${encodeURIComponent(message)}%0A%0A` +
      `Je souhaite avoir plus d'informations.`;

    window.open(
      "https://wa.me/2290192271790?text=" + whatsappMessage,
      "_blank"
    );
  });
}const offerButtons = document.querySelectorAll("[data-offer]");

offerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const offer = button.dataset.offer;
    const messageField = document.getElementById("projectMessage");

    if (messageField) {
      messageField.value =
        "Bonjour God Digital, je suis intéressé(e) par l'offre " +
        offer +
        ". Je voudrais avoir plus d'informations.";
    }
  });
});// =========================
// ESPACE ADMINISTRATEUR
// =========================

const openAdmin = document.getElementById("openAdmin");
const closeAdmin = document.getElementById("closeAdmin");
const adminPanel = document.getElementById("adminPanel");

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

}// =========================
// GESTION DES CLIENTS
// =========================

const clientForm = document.getElementById("clientForm");
const clientsList = document.getElementById("clientsList");

let clients = JSON.parse(localStorage.getItem("godDigitalClients")) || [];

function displayClients() {
  if (!clientsList) return;

  if (clients.length === 0) {
    clientsList.innerHTML =
      '<p class="admin-empty">Aucun client enregistré.</p>';
    return;
  }

  clientsList.innerHTML = clients.map((client, index) => `
    <div class="client-item">
      <div class="client-info">
        <strong>${escapeHTML(client.name)}</strong>
        <span>📞 ${escapeHTML(client.phone)}</span>
        <span>📁 ${escapeHTML(client.project)}</span>
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

  document.querySelectorAll(".delete-client").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

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

function updateClientCount() {
  const counter = document.getElementById("clientCount");

  if (counter) {
    counter.textContent = clients.length;
  }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

if (clientForm) {
  clientForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const project = document.getElementById("clientProject").value.trim();

    if (!name || !phone || !project) return;

    clients.push({
      name,
      phone,
      project
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

displayClients();
updateClientCount();
