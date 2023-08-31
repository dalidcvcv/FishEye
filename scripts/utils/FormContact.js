class FormContact {
  constructor() {
    this.photographerName = null;
    this.validated = true;
  }
  // Initialisation du formulaire de contact
  initFormContact(photographerName) {
    //Sélection des éléments du DOM
    this.formContactModal = document.getElementById("contact_modal");
    this.modalTitle = document.querySelector(".form_contact_title");
    this.btnContact = document.querySelector(".contact_button");
    this.btnCloseForm = document.querySelector(".close_Form");
    this.firstNameInput = document.querySelector("#prenom");
    this.lastNameInput = document.querySelector("#nom");
    this.emailInput = document.querySelector("#email");
    this.messageInput = document.querySelector("#message");
    this.errorMessages = document.querySelectorAll(".error-message");

    // Stockage du nom du photographe
    this.photographerName = photographerName;
    // Mise à jour du titre du formulaire avec le nom du photographe
    const updateModalFormTitle = () => {
      this.modalTitle.innerHTML = "Contactez-moi <br>" + this.photographerName;
    };
    updateModalFormTitle();

    // Gestionnaire d'événements pour ouvrir le formulaire
    this.btnContact.addEventListener("click", () => {
      this.displayModal();
    });
    // Gestionnaire d'événements pour fermer le formulaire
    this.btnCloseForm.addEventListener("click", () => {
      this.closeModal();
    });
    // Gestionnaire d'événements pour fermer la modal en appuyant sur la touche "Escape"
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modalFocused) {
        this.closeModal();
      }
    });

    this.formContactModal.addEventListener("focusout", (e) => {
      // Maintien du focus à l'intérieur de la modale
      if (!this.formContactModal.contains(e.relatedTarget)) {
        this.modalFocused = true;
        this.firstNameInput.focus();
      }
    });

    // Gestionnaires d'événements pour la saisie utilisateur dans les champs
    this.firstNameInput.addEventListener("input", () => {
      this.checkFirst();
    });

    this.lastNameInput.addEventListener("input", () => {
      this.checkLast();
    });

    this.emailInput.addEventListener("input", () => {
      this.checkEmail();
    });

    this.messageInput.addEventListener("input", () => {
      this.checkMsgText();
    });

    // Gestionnaire d'événements pour soumettre le formulaire
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      this.validate(event);
    });
  }
  // Affichage de la modal de contact
  displayModal() {
    this.formContactModal.style.display = "block";
    this.modalFocused = true;
    this.firstNameInput.focus();
  }
  // Fermeture de la modal de contact
  closeModal() {
    this.formContactModal.style.display = "none";
    this.modalFocused = false;
    // Réactivation du focus sur l'élément qui a ouvert la modal
    this.btnContact.focus();
  }
  // Affichage du message d'erreur pour un champ
  showError(input, message) {
    input.nextElementSibling.innerText = message;
    input.nextElementSibling.style.display = "block";
    input.classList.add("input-error");
  }
  // Suppression du message d'erreur pour un champ
  hideError(input) {
    input.nextElementSibling.innerText = "";
    input.nextElementSibling.style.display = "none";
    input.classList.remove("input-error");
  }
  // Validation du champ de prénom
  checkFirst() {
    const firstName = this.firstNameInput.value.trim();
    if (firstName === "" || !/^[A-Za-zÀ-ÿ'-]+$/.test(firstName)) {
      this.showError(
        this.firstNameInput,
        "Veuillez saisir votre prénom correctement."
      );
      this.validated = false;
    } else {
      this.hideError(this.firstNameInput);
    }
  }
  // Validation du champ de nom
  checkLast() {
    const lastName = this.lastNameInput.value.trim();
    if (lastName === "" || !/^[A-Za-zÀ-ÿ'-]+$/.test(lastName)) {
      this.showError(
        this.lastNameInput,
        "Veuillez saisir votre nom correctement."
      );
      this.validated = false;
    } else {
      this.hideError(this.lastNameInput);
    }
  }
  // Validation du champ d'email
  checkEmail() {
    const email = this.emailInput.value.trim();
    if (
      email === "" ||
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      this.showError(
        this.emailInput,
        "Veuillez saisir une adresse email valide."
      );
      this.validated = false;
    } else {
      this.hideError(this.emailInput);
    }
  }
  // Validation du champ de message
  checkMsgText() {
    const msgText = this.messageInput.value.trim();
    if (msgText === "" || msgText.length < 10 || msgText.length > 200) {
      this.showError(
        this.messageInput,
        "Veuillez saisir un message entre 10 et 200 caractères."
      );
      this.validated = false;
    } else {
      this.hideError(this.messageInput);
    }
  }
  // Validation du formulaire complet
  validate(e) {
    e.preventDefault();
    this.validated = true;

    this.checkFirst();
    this.checkLast();
    this.checkEmail();
    this.checkMsgText();

    if (this.validated) {
      const form = document.querySelector("form");

      console.log("Prénom: ", this.firstNameInput.value);
      console.log("Nom: ", this.lastNameInput.value);
      console.log("Email: ", this.emailInput.value);
      console.log("Message: ", this.messageInput.value);

      form.reset();
    }
  }
}
