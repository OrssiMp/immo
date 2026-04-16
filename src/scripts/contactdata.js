/**
 * Gestion des données de contact avec sauvegarde en JSON
 */

class ContactDataManager {
  constructor() {
    this.contacts = [];
    this.storageKey = 'immo_contacts';
    this.init();
  }

  /**
   * Initialise le gestionnaire en chargeant les données existantes
   */
  init() {
    this.loadContacts();
  }

  /**
   * Charge les contacts depuis localStorage
   */
  loadContacts() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.contacts = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error);
      this.contacts = [];
    }
  }

  /**
   * Sauvegarde les contacts dans localStorage
   */
  saveContacts() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.contacts, null, 2));
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des contacts:', error);
      return false;
    }
  }

  /**
   * Ajoute un nouveau contact
   * @param {Object} contactData - Données du contact
   * @returns {boolean} - Succès de l'opération
   */
  addContact(contactData) {
    const contact = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...contactData
    };

    this.contacts.push(contact);
    const saved = this.saveContacts();
    
    if (saved) {
      console.log('Contact ajouté avec succès:', contact);
      this.downloadContactFile(contact);
    }
    
    return saved;
  }

  /**
   * Télécharge un fichier JSON pour un contact spécifique
   * @param {Object} contact - Contact à télécharger
   */
  downloadContactFile(contact) {
    const fileName = `contact_${contact.id}_${new Date().getTime()}.json`;
    const jsonData = JSON.stringify(contact, null, 2);
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Exporte tous les contacts en un seul fichier JSON
   */
  exportAllContacts() {
    if (this.contacts.length === 0) {
      console.warn('Aucun contact à exporter');
      return;
    }

    const fileName = `all_contacts_${new Date().getTime()}.json`;
    const jsonData = JSON.stringify(this.contacts, null, 2);
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Importe des contacts depuis un fichier JSON
   * @param {File} file - Fichier JSON à importer
   * @returns {Promise<boolean>} - Succès de l'importation
   */
  async importContacts(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          if (Array.isArray(data)) {
            // Importer plusieurs contacts
            this.contacts = [...this.contacts, ...data];
          } else {
            // Importer un seul contact
            this.contacts.push(data);
          }
          
          const saved = this.saveContacts();
          if (saved) {
            console.log(`Importé ${Array.isArray(data) ? data.length : 1} contact(s)`);
          }
          resolve(saved);
        } catch (error) {
          console.error('Erreur lors de l\'importation:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
      reader.readAsText(file);
    });
  }

  /**
   * Récupère tous les contacts
   * @returns {Array} - Liste des contacts
   */
  getAllContacts() {
    return [...this.contacts];
  }

  /**
   * Supprime un contact par son ID
   * @param {number} id - ID du contact à supprimer
   * @returns {boolean} - Succès de l'opération
   */
  deleteContact(id) {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      return this.saveContacts();
    }
    return false;
  }

  /**
   * Vide tous les contacts
   */
  clearAllContacts() {
    this.contacts = [];
    return this.saveContacts();
  }

  /**
   * Compte le nombre de contacts
   * @returns {number} - Nombre de contacts
   */
  getContactsCount() {
    return this.contacts.length;
  }
}

// Créer une instance globale
const contactManager = new ContactDataManager();

// Exporter pour utilisation dans d'autres modules
export { ContactDataManager, contactManager };
