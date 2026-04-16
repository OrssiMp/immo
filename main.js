// SweetAlert2 sera chargé via le CDN dans le HTML
import { contactManager } from "./src/scripts/contactdata.js";

/**
 * @type {RegExp}
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * @type {RegExp}
 */
const nameRegex = /^[a-zA-ZàâäçéèêëîïôöùûüÿÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ\s'-]+$/;
//
/**
 * @type {HTMLInputElement}
 */
const emailInput = document.getElementById("email");
/**
 * @type {HTMLInputElement}
 */
const nameInput = document.getElementById("name");

const subjectInput = document.getElementById("subject");
/**
 * @type {HTMLTextAreaElement}
 */
const messageTextArea = document.getElementById("message");
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("form");
/**
 * @type {HTMLButtonElement}
 */
const FormBtnSubmit = form.querySelector("button[type='submit']");

emailInput.addEventListener("blur", (e) => {
  if (emailRegex.test(emailInput.value)) {
    FormBtnSubmit.classList.remove("opacity-50", "cursor-not-allowed");
    FormBtnSubmit.disabled = false;
  } else {
    emailInput.classList.toggle("peer", true);
    FormBtnSubmit.classList.add("opacity-50", "cursor-not-allowed");
    FormBtnSubmit.disabled = true;
  }
});

nameInput.addEventListener("blur", (e) => {
  if (nameRegex.test(nameInput.value)) {
    nameInput.classList.toggle("peer", true);
    FormBtnSubmit.classList.remove("opacity-50", "cursor-not-allowed");
    FormBtnSubmit.disabled = false;
  } else {
    nameInput.classList.toggle("peer", false);
    nameInput.nextElementSibling.classList.toggle("hidden", false);
    FormBtnSubmit.classList.add("opacity-50", "cursor-not-allowed");
    FormBtnSubmit.disabled = true;
  }
});

// messageTextArea.addEventListener("blur", (e) => {
//   if (messageTextArea.value.trim().length > 0) {
//     messageTextArea.classList.toggle("peer", true);
//     FormBtnSubmit.classList.remove("opacity-50", "cursor-not-allowed");
//     FormBtnSubmit.disabled = false;
//   } else {
//     messageTextArea.classList.toggle("peer", false);
//     messageTextArea.nextElementSibling.classList.toggle("hidden", false);
//   }
// });

// subjectInput.addEventListener("blur", (e) => {
//   if (
//     subjectInput.value.trim() !== "" ||
//     subjectInput.value.trim().length > 0
//   ) {
//     subjectInput.classList.toggle("peer", true);
//     FormBtnSubmit.classList.remove("opacity-50", "cursor-not-allowed");
//     FormBtnSubmit.disabled = false;
//   } else {
//     subjectInput.classList.toggle("peer", false);
//     FormBtnSubmit.classList.add("opacity-50", "cursor-not-allowed");
//     FormBtnSubmit.disabled = true;
//   }
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Récupérer les données du formulaire
  const contactData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    subject: subjectInput.value.trim(),
    message: messageTextArea.value.trim()
  };

  // Sauvegarder les données
  const saved = contactManager.addContact(contactData);
  
  if (saved) {
    Swal.fire({
      title: "Message Envoyé",
      text: "Merci de nous avoir contacté, nous allons traiter votre message",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#2ade8a",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        // Réinitialiser le formulaire
        form.reset();
        // Réactiver le bouton
        FormBtnSubmit.disabled = false;
        FormBtnSubmit.classList.remove("opacity-50", "cursor-not-allowed");
      }
    });
  } else {
    Swal.fire({
      title: "Erreur",
      text: "Une erreur est survenue lors de la sauvegarde de vos données",
      icon: "error",
      confirmButtonColor: "#d33",
    });
  }
});
