class ListPhotographersView {
  // Méthode pour afficher les données des photographes sur la page index
  async displayData(photographers) {
    // Sélection de la section contenant les photographes
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    // Stockage de la Variable HTML généré
    let html = "";
    // Parcours de la liste des photographes et création de la structure HTML pour chaque photographe
    photographers.forEach((photographer) => {
      // Construction de la structure HTML pour un photographe
      html += `
                <article class="photographer" tabindex="0">
                <a href="photographer.html?id=${photographer.id}">
                    <img src="Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}">
                    <h2>${photographer.name}</h2>
                    <h3>${photographer.city}, ${photographer.country}</h3>
                    <p>${photographer.tagline}</p>
                    <span>${photographer.price}€/jour</span>
                </a>
                </article>
            `;
    });
    // Ajout du HTML généré dans la section des photographes
    photographersSection.innerHTML = html;

    // Gestion de la navigation clavier pour les éléments <article>
    const photographerElements = document.querySelectorAll(".photographer");
    
    // Ajout d'un gestionnaire d'événements "Entrée" à chaque élément <article>
    photographerElements.forEach((element) => {
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          // Activation sur lien <a> par la touche "Entrée"
          const link = element.querySelector("a");
          link.click();
        }
      });
    });
  }
}
