export default {
  title: {
    en: 'Your cart',
    fr: 'Panier',
    el: 'Το καλάθι σας',
    nb: 'Handlekurven din'
  },
  itemSingular: {
    en: '1 item',
    fr: '1 article',
    el: '1 τεμάχιο',
    nb: '1 vare'
  },
  itemPlural: {
    en: (quantity: string | number) => `${quantity} items`,
    fr: (quantity: string | number) => `${quantity} articles`,
    el: (quantity: string | number) => `${quantity} τεμάχια`,
    nb: (quantity: string | number) => `${quantity} varer`
  },
  emptyCartLine1: {
    en: 'Your cart is empty',
    fr: 'Votre panier est vide',
    el: 'Το καλάθι σας είναι άδειο',
    nb: 'Handlekurven din er tom'
  },
  emptyCartLine2: {
    en: 'Add some items to check out',
    fr: 'Ajouter des articles à la caisse',
    el: 'Προσθέστε μερικά αντικείμενα',
    nb: 'Legg til noen ting å sjekke ut'
  },
  offersTitle: {
    en: 'Offers',
    fr: 'Des offres',
    el: 'Προσφορές',
    nb: 'Tilbud'
  },
  quantity: {
    en: 'Quantity',
    fr: 'Quantité',
    el: 'Ποσότητα',
    nb: 'Antall'
  },
  edit: {
    en: 'Edit',
    fr: 'Éditer',
    el: 'Επεξεργασία',
    nb: 'Rediger'
  },
  subtotal: {
    en: 'Subtotal',
    fr: 'Sous-total',
    el: 'Υποσύνολο',
    nb: 'Delsum'
  },
  continueShoppingButton: {
    en: 'Continue shopping',
    fr: 'Continuer vos achats',
    el: 'Συνεχίστε τις αγορές σας',
    nb: 'Fortsett å handle'
  },
  checkoutButton: {
    en: 'Checkout',
    fr: 'Payer',
    el: 'ΟΛΟΚΛΗΡΩΣΗ ΑΓΟΡΑΣ',
    nb: 'Fortsett til kassen'
  },
  editTitle: {
    en: 'Edit item',
    fr: `Modifier le produit`,
    el: 'Επεξεργασία',
    nb: 'Rediger vare'
  },
  addToCartTitle: {
    en: 'Add to cart',
    fr: 'Ajouter au panier',
    el: 'Προσθήκη στο καλάθι',
    nb: 'Legg i handlekurven'
  },
  viewItem: {
    en: 'View item',
    fr: `Regarder le produit`,
    el: 'Προβολή',
    nb: 'Se vare'
  },
  type: {
    en: 'Type',
    fr: 'Modèle',
    el: 'Επιλέξτε Χρώμα & Μέγεθος',
    nb: 'Variant'
  },
  remove: {
    en: 'Remove',
    fr: 'Supprimer',
    el: 'Αφαίρεση',
    nb: 'Fjern'
  },
  removeButton: {
    en: 'Remove from cart',
    fr: 'Retirer du panier',
    el: 'Αφαίρεση από το Καλάθι',
    nb: 'Fjern fra handlekurven'
  },
  saveButton: {
    en: 'Save',
    fr: 'Enregistrer',
    el: 'Αποθήκευση Αλλαγών',
    nb: 'Lagre'
  },
  backToCartButton: {
    en: 'Back to cart',
    fr: 'Retour au panier',
    el: 'Επιστροφή στο καλάθι',
    nb: 'Tilbake til handlekurven'
  },
  addToCartButton: {
    en: 'Add to cart',
    fr: 'Ajouter au panier',
    el: 'Προσθήκη στο καλάθι',
    nb: 'Legg i handlekurven'
  },
  cancelButton: {
    en: 'Cancel',
    fr: 'Annuler',
    el: 'Διαγραφή',
    nb: 'Avbryt'
  },
  soldOut: {
    en: 'Sold out',
    fr: 'Épuisé',
    el: 'Εξαντλήθηκε',
    nb: 'Utsolgt'
  },
  spendMoreThan: {
    en: (value: string) => `Spend more than ${value}`,
    fr: (value: string) => `Dépensez plus de ${value}`,
    el: (value: string) => `Με αγορές άνω των ${value}`,
    nb: (value: string) => `Handle for mer enn ${value}`
  },
  amountRemaining: {
    en: (value: string) => `You're only ${value} away`,
    fr: (value: string) => `Plus que ${value} pour profiter`,
    el: (value: string) => `Είστε μόνο ${value} μακριά`,
    nb: (value: string) => `Du mangler kun ${value}`
  }
}
