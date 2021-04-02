export default {
  title: {
    en: 'Your cart',
    fr: 'Panier',
    el: 'Το καλάθι σας'
  },
  itemSingular: {
    en: '1 item',
    fr: '1 article',
    el: '1 τεμάχιο'
  },
  itemPlural: {
    en: (quantity: string | number) => `${quantity} items`,
    fr: (quantity: string | number) => `${quantity} articles`,
    el: (quantity: string | number) => `${quantity} τεμάχια`
  },
  emptyCart: {
    en: 'Your cart is empty',
    fr: 'Votre panier est vide',
    el: 'Το καλάθι σας είναι άδειο'
  },
  offersTitle: {
    en: 'Offers',
    fr: 'Des offres',
    el: 'Προσφορές'
  },
  quantity: {
    en: 'Quantity',
    fr: 'Quantité',
    el: 'Ποσότητα'
  },
  edit: {
    en: 'Edit',
    fr: 'Éditer',
    el: 'Επεξεργασία'
  },
  subtotal: {
    en: 'Subtotal',
    fr: 'Sous-total',
    el: 'Υποσύνολο'
  },
  continueShoppingButton: {
    en: 'Continue shopping',
    fr: 'Continuer vos achats',
    el: 'Συνεχίστε τις αγορές σας'
  },
  checkoutButton: {
    en: 'Checkout',
    fr: 'Payer',
    el: 'ΟΛΟΚΛΗΡΩΣΗ ΑΓΟΡΑΣ'
  },
  editTitle: {
    en: 'Edit item',
    fr: `Modifier le produit`,
    el: 'Επεξεργασία'
  },
  addToCartTitle: {
    en: 'Add to cart',
    fr: 'Ajouter au panier',
    el: 'Προσθήκη στο καλάθι'
  },
  viewItem: {
    en: 'View item',
    fr: `Regarder le produit`,
    el: 'Προβολή'
  },
  type: {
    en: 'Type',
    fr: 'Modèle',
    el: 'Επιλέξτε Χρώμα & Μέγεθος'
  },
  remove: {
    en: 'Remove',
    fr: 'Supprimer',
    el: 'Αφαίρεση'
  },
  removeButton: {
    en: 'Remove from cart',
    fr: 'Retirer du panier',
    el: 'Αφαίρεση από το Καλάθι'
  },
  saveButton: {
    en: 'Save',
    fr: 'Enregistrer',
    el: 'Αποθήκευση Αλλαγών'
  },
  backToCartButton: {
    en: 'Back to cart',
    fr: 'Retour au panier',
    el: 'Επιστροφή στο καλάθι'
  },
  addToCartButton: {
    en: 'Add to cart',
    fr: 'Ajouter au panier',
    el: 'Προσθήκη στο καλάθι'
  },
  cancelButton: {
    en: 'Cancel',
    fr: 'Annuler',
    el: 'Διαγραφή'
  },
  soldOut: {
    en: 'Sold out',
    fr: 'Épuisé',
    el: 'Εξαντλήθηκε'
  },
  spendMoreThan: {
    en: (value: string) => `Spend more than ${value}`,
    fr: (value: string) => `Dépensez plus de ${value}`,
    el: (value: string) => `Με αγορές άνω των ${value}`
  },
  amountRemaining: {
    en: (value: string) => `You're only ${value} away`,
    fr: (value: string) => `Plus que ${value} pour profiter`,
    el: (value: string) => `Είστε μόνο ${value} μακριά`
  }
}
