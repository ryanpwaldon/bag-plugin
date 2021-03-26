export default {
  title: {
    en: 'Your cart',
    fr: 'Panier',
    el: 'Καλάθι'
  },
  itemSingular: {
    en: '1 item',
    fr: '1 article',
    el: '1 τεμάχιο'
  },
  itemPlural: {
    en: (quantity: string | number) => `${quantity} items`,
    fr: (quantity: string | number) => `${quantity} articles`,
    el: (quantity: string | number) => `${quantity} αντικείμενα`
  },
  emptyCart: {
    en: 'Your cart is empty',
    fr: 'Votre panier est vide',
    el: 'Το καλάθι σας είναι άδειο'
  },
  offersTitle: {
    en: 'Offers',
    fr: 'Des offres',
    el: 'προσφορές'
  },
  quantity: {
    en: 'Quantity',
    fr: 'Quantité',
    el: 'Ποσότητα'
  },
  edit: {
    en: 'Edit',
    fr: 'Éditer',
    el: 'επεξεργασία'
  },
  subtotal: {
    en: 'Subtotal',
    fr: 'Sous-total',
    el: 'Υποσύνολο'
  },
  continueShoppingButton: {
    en: 'Continue shopping',
    fr: 'Continuer vos achats',
    el: 'Συνεχίστε τις αγορές'
  },
  checkoutButton: {
    en: 'Checkout',
    fr: 'Payer',
    el: 'Ολοκληρωση αγορας'
  },
  editTitle: {
    en: 'Edit item',
    fr: `Modifier le produit`,
    el: 'επεξεργασία αντικειμένου'
  },
  addToCartTitle: {
    en: 'Add to cart',
    fr: 'Ajouter au panier',
    el: 'Προσθήκη στο καλάθι'
  },
  viewItem: {
    en: 'View item',
    fr: `Regarder le produit`,
    el: 'προβολή αντικειμένου'
  },
  type: {
    en: 'Type',
    fr: 'Modèle',
    el: 'Μοντέλο'
  },
  remove: {
    en: 'Remove',
    fr: 'Supprimer',
    el: 'Αφαίρεση'
  },
  removeButton: {
    en: 'Remove from cart',
    fr: 'Retirer du panier',
    el: 'αφαιρέστε από το καλάθι'
  },
  saveButton: {
    en: 'Save',
    fr: 'Enregistrer',
    el: 'αποθήκευσε τις αλλαγές'
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
    el: 'Ματαίωση'
  },
  spendMoreThan: {
    en: (value: string) => `Spend more than ${value}`,
    fr: (value: string) => `Dépensez plus de ${value}`,
    el: (value: string) => `Περάστε περισσότερα από ${value}`
  },
  amountRemaining: {
    en: (value: string) => `You're only ${value} away`,
    fr: (value: string) => `Plus que ${value} pour profiter`,
    el: (value: string) => `Είστε μόνο ${value} μακριά`
  }
}
