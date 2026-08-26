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
});
