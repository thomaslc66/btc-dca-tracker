export type Lang = 'fr' | 'en' | 'de' | 'es' | 'ru';

export type Translations = {
  common: {
    cancel: string;
    delete: string;
    edit: string;
    save: string;
    back: string;
    invested: string;
    retry: string;
  };
  row: {
    invested: string;
    currentValue: string;
    btc: string;
    entryPrice: string;
    roi: string;
    edit: string;
    delete: string;
    deleteTitle: string;
    deleteMessage: string; // {date}, {amount}
  };
  home: {
    btcPrice: string; // {currency}
    avgBuyPrice: string; // {currency}
    syncing: string;
    purchasesTracked_one: string; // {count}
    purchasesTracked_other: string; // {count}
    addPurchase: string;
    importCsv: string;
    investedCard: string; // {currency}
    totalPnl: string;
    roi: string;
    totalBtc: string;
    byCurrency: string;
    investedLabel: string;
    dcaPurchases: string;
    deleteAllTitle: string;
    deleteAllMessage: string;
    deleteAllConfirm: string;
    emptyState: string;
    noResults: string;
    sortNewest: string;
    sortOldest: string;
    filterPositive: string;
    filterNegative: string;
    pnlInfoTitle: string;
    pnlInfoDesc: string;
  };
  addPurchase: {
    title: string;
    subtitle: string;
    preview: string;
    estimatedBtc: string;
    totalInvested: string;
    currency: string;
    date: string;
    amount: string; // {currency}
    buyPrice: string; // {currency}
    fee: string; // {currency}
    note: string;
    notePlaceholder: string;
    saveButton: string;
    saving: string;
    successMessage: string;
    errorNoDate: string;
    errorAmount: string;
    errorPrice: string;
    errorFee: string;
    errorSave: string;
  };
  editPurchase: {
    title: string;
    subtitle: string; // {date}
    saveButton: string;
    saving: string;
    errorSave: string;
  };
  settings: {
    title: string;
    subtitle: string;
    currencySection: string;
    currencyDesc: string;
    languageSection: string;
    reminderSection: string;
    reminderDesc: string;
    reminderEnabled: string;
    reminderFrequency: string;
    reminderFreqDaily: string;
    reminderFreqWeekly: string;
    reminderFreqMonthly: string;
    reminderDay: string;
    reminderDayOfMonth: string;
    reminderTime: string;
    reminderPermissionDenied: string;
    reminderSaved: string;
  };
  currencyLabels: Record<string, string>;
  langLabels: Record<Lang, string>;
  chart: {
    title: string;
    subtitle: string;
    now: string;
    legendEntry: string;
    legendCurrent: string;
  };
  goal: {
    title: string;
    reached: string;
    accumulated: string;
    target: string;
    remaining: string; // {btc}
    settingLabel: string;
    settingPlaceholder: string;
    settingSave: string;
    settingClear: string;
  };
  loading: {
    stepPurchases: string;
    stepBtcPrice: string;
  };
  import: {
    title: string;
    subtitle: string;
    sourceLabel: string;
    standardFormat: string;
    krakenExport: string;
    expectedFormatTitle: string;
    expectedFormatDesc: string;
    colBoughtAt: string;
    colAmount: string;
    colBuyPrice: string;
    colFee: string;
    colCurrency: string; // {defaultCurrency}
    colNote: string;
    downloadExample: string;
    krakenTitle: string;
    krakenDesc: string;
    krakenColPair: string;
    krakenColTime: string;
    krakenColPrice: string;
    krakenColCost: string;
    krakenColFee: string;
    krakenColVol: string;
    krakenNote: string;
    reading: string;
    successCount_one: string; // {count}
    successCount_other: string; // {count}
    selectFile: string;
    selectFileHint: string;
    errorTitle: string;
    errorFile: string;
    required: string;
  };
};

const fr: Translations = {
  common: {
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    save: 'Enregistrer',
    back: 'Retour',
    invested: 'Investi',
    retry: 'Réessayer',
  },
  row: {
    invested: 'Investi',
    currentValue: 'Valeur actuelle',
    btc: 'BTC',
    entryPrice: "Prix d'entrée",
    roi: 'ROI',
    edit: 'Modifier',
    delete: 'Supprimer',
    deleteTitle: 'Supprimer cet achat',
    deleteMessage: 'Achat du {date} — {amount}. Cette action est irréversible.',
  },
  home: {
    btcPrice: 'Prix BTC ({currency})',
    avgBuyPrice: 'Prix moyen ({currency})',
    syncing: 'Synchronisation des données…',
    purchasesTracked_one: '{count} achat suivi',
    purchasesTracked_other: '{count} achats suivis',
    addPurchase: 'Ajouter un achat',
    importCsv: 'Importer CSV',
    investedCard: 'Investi ({currency})',
    totalPnl: 'P&L total',
    roi: 'ROI',
    totalBtc: 'BTC total',
    byCurrency: 'Répartition par devise',
    investedLabel: 'Investi',
    dcaPurchases: 'Achats DCA',
    deleteAllTitle: 'Supprimer tous les achats',
    deleteAllMessage: 'Cette action est irréversible. Tous vos achats seront supprimés.',
    deleteAllConfirm: 'Tout supprimer',
    emptyState: 'Ajoute un achat ou importe un CSV pour commencer.',
    noResults: 'Aucun achat ne correspond aux filtres actifs.',
    sortNewest: 'Plus récent',
    sortOldest: 'Plus ancien',
    filterPositive: 'Positifs',
    filterNegative: 'Négatifs',
    pnlInfoTitle: 'P&L total',
    pnlInfoDesc: 'Différence entre la valeur actuelle de vos BTC et le montant total investi (achats + frais), converti dans votre devise d\'affichage.',
  },
  addPurchase: {
    title: 'Ajouter un achat',
    subtitle: "Saisie manuelle d'un achat BTC",
    preview: 'Aperçu',
    estimatedBtc: 'BTC estimé :',
    totalInvested: 'Total investi :',
    currency: 'Devise',
    date: "Date d'achat",
    amount: 'Montant investi ({currency})',
    buyPrice: "Prix d'achat BTC ({currency})",
    fee: 'Frais ({currency})',
    note: 'Note',
    notePlaceholder: 'Ex : Achat mensuel, ordre Kraken…',
    saveButton: 'Enregistrer',
    saving: 'Enregistrement…',
    successMessage: 'Achat enregistré avec succès.',
    errorNoDate: "Merci d'indiquer une date d'achat.",
    errorAmount: 'Le montant investi doit être supérieur à 0.',
    errorPrice: "Le prix d'achat BTC doit être supérieur à 0.",
    errorFee: 'Les frais ne peuvent pas être négatifs.',
    errorSave: "Impossible d'enregistrer l'achat.",
  },
  editPurchase: {
    title: "Modifier l'achat",
    subtitle: 'Achat du {date}',
    saveButton: 'Sauvegarder',
    saving: 'Sauvegarde…',
    errorSave: 'Impossible de sauvegarder les modifications.',
  },
  settings: {
    title: 'Paramètres',
    subtitle: "Configuration de l'application",
    currencySection: 'Devise de référence',
    currencyDesc:
      "Tous les montants et statistiques seront affichés dans cette devise. Les achats dans d'autres devises seront convertis au taux de change actuel.",
    languageSection: 'Langue',
    reminderSection: 'Rappel DCA',
    reminderDesc: 'Recevez une notification pour ne pas oublier vos achats programmés.',
    reminderEnabled: 'Activer le rappel',
    reminderFrequency: 'Fréquence',
    reminderFreqDaily: 'Quotidien',
    reminderFreqWeekly: 'Hebdomadaire',
    reminderFreqMonthly: 'Mensuel',
    reminderDay: 'Jour de la semaine',
    reminderDayOfMonth: 'Jour du mois',
    reminderTime: 'Heure',
    reminderPermissionDenied: 'Permission refusée. Activez les notifications dans les réglages système.',
    reminderSaved: 'Rappel enregistré !',
  },
  currencyLabels: {
    CHF: 'Franc suisse',
    USD: 'Dollar américain',
    EUR: 'Euro',
    GBP: 'Livre sterling',
    CAD: 'Dollar canadien',
    AUD: 'Dollar australien',
    JPY: 'Yen japonais',
    SEK: 'Couronne suédoise',
    NOK: 'Couronne norvégienne',
    DKK: 'Couronne danoise',
    RUB: 'Rouble russe',
  },
  langLabels: { fr: 'Français', en: 'English', de: 'Deutsch', es: 'Español', ru: 'Русский' },
  chart: {
    title: 'Prix d\'achat BTC',
    subtitle: 'Vos entrées DCA dans le temps',
    now: 'Auj.',
    legendEntry: 'Prix d\'entrée',
    legendCurrent: 'Prix actuel',
  },
  goal: {
    title: 'Objectif BTC',
    reached: '🎯 Atteint !',
    accumulated: 'Accumulé',
    target: 'Objectif',
    remaining: 'Il reste {btc} BTC à accumuler',
    settingLabel: 'Objectif d\'accumulation BTC',
    settingPlaceholder: 'Ex : 0.5',
    settingSave: 'Enregistrer',
    settingClear: 'Supprimer l\'objectif',
  },
  import: {
    title: 'Importer CSV',
    subtitle: "Importation en masse d'achats",
    sourceLabel: 'Source du fichier',
    standardFormat: 'Format standard',
    krakenExport: 'Export Kraken',
    expectedFormatTitle: 'Format attendu',
    expectedFormatDesc:
      'Ton fichier CSV doit contenir les colonnes suivantes (séparées par des virgules) :',
    colBoughtAt: 'Date au format YYYY-MM-DD',
    colAmount: "Montant investi dans la devise de l'achat",
    colBuyPrice: "Prix du BTC dans la devise de l'achat",
    colFee: 'Frais (0 si aucun)',
    colCurrency: 'Devise de l\'achat (défaut : {defaultCurrency} si absent)',
    colNote: 'Note libre (peut être vide)',
    downloadExample: 'Télécharger un exemple CSV',
    krakenTitle: 'Export Kraken Trades',
    krakenDesc:
      "Importe directement le fichier CSV exporté depuis Kraken (onglet History → Trades). Aucune modification n'est nécessaire.",
    krakenColPair: 'Paire échangée — détermine la devise (BTC/CHF, BTC/USD…)',
    krakenColTime: "Date et heure de l'achat",
    krakenColPrice: 'Prix du BTC dans la devise de la paire',
    krakenColCost: 'Montant investi dans la devise de la paire',
    krakenColFee: 'Frais',
    krakenColVol: 'Volume BTC acheté',
    krakenNote:
      "Seuls les achats BTC/* sont importés. La devise est détectée automatiquement depuis la paire. Les autres paires (XRP, ETH…) sont ignorées.",
    reading: 'Lecture du fichier…',
    successCount_one: '{count} achat importé !',
    successCount_other: '{count} achats importés !',
    selectFile: 'Sélectionner un fichier CSV',
    selectFileHint: 'Appuie pour ouvrir le gestionnaire de fichiers',
    errorTitle: 'Erreur de format',
    errorFile: "Impossible de lire le fichier. Vérifiez qu'il s'agit bien d'un fichier CSV.",
    required: 'requis',
  },
  loading: {
    stepPurchases: 'Chargement des achats…',
    stepBtcPrice: 'Récupération du prix BTC…',
  },
};

const en: Translations = {
  common: {
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    back: 'Back',
    invested: 'Invested',
    retry: 'Retry',
  },
  row: {
    invested: 'Invested',
    currentValue: 'Current value',
    btc: 'BTC',
    entryPrice: 'Entry price',
    roi: 'ROI',
    edit: 'Edit',
    delete: 'Delete',
    deleteTitle: 'Delete this purchase',
    deleteMessage: 'Purchase on {date} — {amount}. This action is irreversible.',
  },
  home: {
    btcPrice: 'BTC price ({currency})',
    avgBuyPrice: 'Avg. buy price ({currency})',
    syncing: 'Syncing data…',
    purchasesTracked_one: '{count} purchase tracked',
    purchasesTracked_other: '{count} purchases tracked',
    addPurchase: 'Add purchase',
    importCsv: 'Import CSV',
    investedCard: 'Invested ({currency})',
    totalPnl: 'Total P&L',
    roi: 'ROI',
    totalBtc: 'Total BTC',
    byCurrency: 'By currency',
    investedLabel: 'Invested',
    dcaPurchases: 'DCA Purchases',
    deleteAllTitle: 'Delete all purchases',
    deleteAllMessage: 'This action is irreversible. All purchases will be deleted.',
    deleteAllConfirm: 'Delete all',
    emptyState: 'Add a purchase or import a CSV to get started.',
    noResults: 'No purchases match the active filters.',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    filterPositive: 'Positive',
    filterNegative: 'Negative',
    pnlInfoTitle: 'Total P&L',
    pnlInfoDesc: 'Difference between the current value of your BTC and the total amount invested (purchases + fees), converted to your display currency.',
  },
  addPurchase: {
    title: 'Add purchase',
    subtitle: 'Manual BTC purchase entry',
    preview: 'Preview',
    estimatedBtc: 'Estimated BTC:',
    totalInvested: 'Total invested:',
    currency: 'Currency',
    date: 'Purchase date',
    amount: 'Amount invested ({currency})',
    buyPrice: 'BTC buy price ({currency})',
    fee: 'Fee ({currency})',
    note: 'Note',
    notePlaceholder: 'E.g.: Monthly buy, Kraken order…',
    saveButton: 'Save',
    saving: 'Saving…',
    successMessage: 'Purchase saved successfully.',
    errorNoDate: 'Please enter a purchase date.',
    errorAmount: 'The invested amount must be greater than 0.',
    errorPrice: 'The BTC buy price must be greater than 0.',
    errorFee: 'Fees cannot be negative.',
    errorSave: 'Unable to save the purchase.',
  },
  editPurchase: {
    title: 'Edit purchase',
    subtitle: 'Purchase on {date}',
    saveButton: 'Save changes',
    saving: 'Saving…',
    errorSave: 'Unable to save changes.',
  },
  settings: {
    title: 'Settings',
    subtitle: 'App configuration',
    currencySection: 'Reference currency',
    currencyDesc:
      'All amounts and statistics will be displayed in this currency. Purchases in other currencies will be converted at the current exchange rate.',
    languageSection: 'Language',
    reminderSection: 'DCA Reminder',
    reminderDesc: 'Receive a notification so you never miss your scheduled purchases.',
    reminderEnabled: 'Enable reminder',
    reminderFrequency: 'Frequency',
    reminderFreqDaily: 'Daily',
    reminderFreqWeekly: 'Weekly',
    reminderFreqMonthly: 'Monthly',
    reminderDay: 'Day of week',
    reminderDayOfMonth: 'Day of month',
    reminderTime: 'Time',
    reminderPermissionDenied: 'Permission denied. Enable notifications in system settings.',
    reminderSaved: 'Reminder saved!',
  },
  currencyLabels: {
    CHF: 'Swiss franc',
    USD: 'US dollar',
    EUR: 'Euro',
    GBP: 'British pound',
    CAD: 'Canadian dollar',
    AUD: 'Australian dollar',
    JPY: 'Japanese yen',
    SEK: 'Swedish krona',
    NOK: 'Norwegian krone',
    DKK: 'Danish krone',
    RUB: 'Russian ruble',
  },
  langLabels: { fr: 'Français', en: 'English', de: 'Deutsch', es: 'Español', ru: 'Русский' },
  chart: {
    title: 'BTC Buy Price',
    subtitle: 'Your DCA entries over time',
    now: 'Now',
    legendEntry: 'Entry price',
    legendCurrent: 'Current price',
  },
  goal: {
    title: 'BTC Goal',
    reached: '🎯 Reached!',
    accumulated: 'Accumulated',
    target: 'Target',
    remaining: '{btc} BTC remaining',
    settingLabel: 'BTC accumulation goal',
    settingPlaceholder: 'e.g. 0.5',
    settingSave: 'Save',
    settingClear: 'Remove goal',
  },
  import: {
    title: 'Import CSV',
    subtitle: 'Bulk purchase import',
    sourceLabel: 'File source',
    standardFormat: 'Standard format',
    krakenExport: 'Kraken export',
    expectedFormatTitle: 'Expected format',
    expectedFormatDesc:
      'Your CSV file must contain the following columns (comma-separated):',
    colBoughtAt: 'Date in YYYY-MM-DD format',
    colAmount: 'Amount invested in the purchase currency',
    colBuyPrice: 'BTC price in the purchase currency',
    colFee: 'Fees (0 if none)',
    colCurrency: 'Purchase currency (default: {defaultCurrency} if absent)',
    colNote: 'Free note (can be empty)',
    downloadExample: 'Download example CSV',
    krakenTitle: 'Kraken Trades Export',
    krakenDesc:
      'Import the CSV file directly exported from Kraken (History → Trades tab). No modifications needed.',
    krakenColPair: 'Traded pair — determines the currency (BTC/CHF, BTC/USD…)',
    krakenColTime: 'Purchase date and time',
    krakenColPrice: 'BTC price in the pair currency',
    krakenColCost: 'Amount invested in the pair currency',
    krakenColFee: 'Fees',
    krakenColVol: 'BTC volume purchased',
    krakenNote:
      'Only BTC/* purchases are imported. The currency is automatically detected from the pair. Other pairs (XRP, ETH…) are ignored.',
    reading: 'Reading file…',
    successCount_one: '{count} purchase imported!',
    successCount_other: '{count} purchases imported!',
    selectFile: 'Select a CSV file',
    selectFileHint: 'Tap to open the file manager',
    errorTitle: 'Format error',
    errorFile: "Unable to read the file. Make sure it's a valid CSV file.",
    required: 'required',
  },
  loading: {
    stepPurchases: 'Loading purchases…',
    stepBtcPrice: 'Fetching BTC price…',
  },
};

const de: Translations = {
  common: {
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    save: 'Speichern',
    back: 'Zurück',
    invested: 'Investiert',
    retry: 'Erneut versuchen',
  },
  row: {
    invested: 'Investiert',
    currentValue: 'Aktueller Wert',
    btc: 'BTC',
    entryPrice: 'Einstiegspreis',
    roi: 'ROI',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    deleteTitle: 'Kauf löschen',
    deleteMessage: 'Kauf vom {date} — {amount}. Diese Aktion ist unwiderruflich.',
  },
  home: {
    btcPrice: 'BTC-Kurs ({currency})',
    avgBuyPrice: 'Ø Kaufpreis ({currency})',
    syncing: 'Daten werden synchronisiert…',
    purchasesTracked_one: '{count} Kauf verfolgt',
    purchasesTracked_other: '{count} Käufe verfolgt',
    addPurchase: 'Kauf hinzufügen',
    importCsv: 'CSV importieren',
    investedCard: 'Investiert ({currency})',
    totalPnl: 'Gesamt G/V',
    roi: 'ROI',
    totalBtc: 'BTC gesamt',
    byCurrency: 'Nach Währung',
    investedLabel: 'Investiert',
    dcaPurchases: 'DCA-Käufe',
    deleteAllTitle: 'Alle Käufe löschen',
    deleteAllMessage: 'Diese Aktion ist unwiderruflich. Alle Käufe werden gelöscht.',
    deleteAllConfirm: 'Alle löschen',
    emptyState: 'Füge einen Kauf hinzu oder importiere eine CSV-Datei.',
    noResults: 'Keine Käufe entsprechen den aktiven Filtern.',
    sortNewest: 'Neueste zuerst',
    sortOldest: 'Älteste zuerst',
    filterPositive: 'Positiv',
    filterNegative: 'Negativ',
    pnlInfoTitle: 'Gesamt G/V',
    pnlInfoDesc: 'Differenz zwischen dem aktuellen Wert Ihrer BTC und dem Gesamtinvestitionsbetrag (Käufe + Gebühren), umgerechnet in Ihre Anzeigewährung.',
  },
  addPurchase: {
    title: 'Kauf hinzufügen',
    subtitle: 'Manuelle BTC-Kaufeingabe',
    preview: 'Vorschau',
    estimatedBtc: 'Geschätztes BTC:',
    totalInvested: 'Gesamt investiert:',
    currency: 'Währung',
    date: 'Kaufdatum',
    amount: 'Investierter Betrag ({currency})',
    buyPrice: 'BTC-Kaufpreis ({currency})',
    fee: 'Gebühren ({currency})',
    note: 'Notiz',
    notePlaceholder: 'Z.B.: Monatlicher Kauf, Kraken-Order…',
    saveButton: 'Speichern',
    saving: 'Wird gespeichert…',
    successMessage: 'Kauf erfolgreich gespeichert.',
    errorNoDate: 'Bitte gib ein Kaufdatum an.',
    errorAmount: 'Der investierte Betrag muss größer als 0 sein.',
    errorPrice: 'Der BTC-Kaufpreis muss größer als 0 sein.',
    errorFee: 'Gebühren können nicht negativ sein.',
    errorSave: 'Der Kauf konnte nicht gespeichert werden.',
  },
  editPurchase: {
    title: 'Kauf bearbeiten',
    subtitle: 'Kauf vom {date}',
    saveButton: 'Änderungen speichern',
    saving: 'Wird gespeichert…',
    errorSave: 'Änderungen konnten nicht gespeichert werden.',
  },
  settings: {
    title: 'Einstellungen',
    subtitle: 'App-Konfiguration',
    currencySection: 'Referenzwährung',
    currencyDesc:
      'Alle Beträge und Statistiken werden in dieser Währung angezeigt. Käufe in anderen Währungen werden zum aktuellen Wechselkurs umgerechnet.',
    languageSection: 'Sprache',
    reminderSection: 'DCA-Erinnerung',
    reminderDesc: 'Erhalten Sie eine Benachrichtigung, damit Sie Ihre geplanten Käufe nicht vergessen.',
    reminderEnabled: 'Erinnerung aktivieren',
    reminderFrequency: 'Häufigkeit',
    reminderFreqDaily: 'Täglich',
    reminderFreqWeekly: 'Wöchentlich',
    reminderFreqMonthly: 'Monatlich',
    reminderDay: 'Wochentag',
    reminderDayOfMonth: 'Tag des Monats',
    reminderTime: 'Uhrzeit',
    reminderPermissionDenied: 'Berechtigung verweigert. Aktivieren Sie Benachrichtigungen in den Systemeinstellungen.',
    reminderSaved: 'Erinnerung gespeichert!',
  },
  currencyLabels: {
    CHF: 'Schweizer Franken',
    USD: 'US-Dollar',
    EUR: 'Euro',
    GBP: 'Britisches Pfund',
    CAD: 'Kanadischer Dollar',
    AUD: 'Australischer Dollar',
    JPY: 'Japanischer Yen',
    SEK: 'Schwedische Krone',
    NOK: 'Norwegische Krone',
    DKK: 'Dänische Krone',
    RUB: 'Russischer Rubel',
  },
  langLabels: { fr: 'Français', en: 'English', de: 'Deutsch', es: 'Español', ru: 'Русский' },
  chart: {
    title: 'BTC Kaufpreis',
    subtitle: 'Ihre DCA-Einträge im Zeitverlauf',
    now: 'Jetzt',
    legendEntry: 'Einstiegspreis',
    legendCurrent: 'Aktueller Preis',
  },
  goal: {
    title: 'BTC-Ziel',
    reached: '🎯 Erreicht!',
    accumulated: 'Angesammelt',
    target: 'Ziel',
    remaining: 'Noch {btc} BTC zu sammeln',
    settingLabel: 'BTC-Ansammlungsziel',
    settingPlaceholder: 'z.B. 0.5',
    settingSave: 'Speichern',
    settingClear: 'Ziel entfernen',
  },
  import: {
    title: 'CSV importieren',
    subtitle: 'Massenimport von Käufen',
    sourceLabel: 'Dateiquelle',
    standardFormat: 'Standardformat',
    krakenExport: 'Kraken-Export',
    expectedFormatTitle: 'Erwartetes Format',
    expectedFormatDesc:
      'Deine CSV-Datei muss die folgenden Spalten enthalten (durch Komma getrennt):',
    colBoughtAt: 'Datum im Format JJJJ-MM-TT',
    colAmount: 'Investierter Betrag in der Kaufwährung',
    colBuyPrice: 'BTC-Preis in der Kaufwährung',
    colFee: 'Gebühren (0 wenn keine)',
    colCurrency: 'Kaufwährung (Standard: {defaultCurrency} wenn nicht angegeben)',
    colNote: 'Freie Notiz (kann leer sein)',
    downloadExample: 'Beispiel-CSV herunterladen',
    krakenTitle: 'Kraken Trades Export',
    krakenDesc:
      'Importiere die direkt von Kraken exportierte CSV-Datei (History → Trades). Keine Änderungen nötig.',
    krakenColPair: 'Handelspaar — bestimmt die Währung (BTC/CHF, BTC/USD…)',
    krakenColTime: 'Kaufdatum und -uhrzeit',
    krakenColPrice: 'BTC-Preis in der Paarwährung',
    krakenColCost: 'Investierter Betrag in der Paarwährung',
    krakenColFee: 'Gebühren',
    krakenColVol: 'Gekauftes BTC-Volumen',
    krakenNote:
      'Nur BTC/*-Käufe werden importiert. Die Währung wird automatisch aus dem Paar erkannt. Andere Paare (XRP, ETH…) werden ignoriert.',
    reading: 'Datei wird gelesen…',
    successCount_one: '{count} Kauf importiert!',
    successCount_other: '{count} Käufe importiert!',
    selectFile: 'CSV-Datei auswählen',
    selectFileHint: 'Tippen um den Dateimanager zu öffnen',
    errorTitle: 'Formatfehler',
    errorFile: 'Die Datei konnte nicht gelesen werden. Bitte stelle sicher, dass es sich um eine gültige CSV-Datei handelt.',
    required: 'erforderlich',
  },
  loading: {
    stepPurchases: 'Käufe werden geladen…',
    stepBtcPrice: 'BTC-Preis wird abgerufen…',
  },
};

const es: Translations = {
  common: {
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    save: 'Guardar',
    back: 'Volver',
    invested: 'Invertido',
    retry: 'Reintentar',
  },
  row: {
    invested: 'Invertido',
    currentValue: 'Valor actual',
    btc: 'BTC',
    entryPrice: 'Precio de entrada',
    roi: 'ROI',
    edit: 'Editar',
    delete: 'Eliminar',
    deleteTitle: 'Eliminar esta compra',
    deleteMessage: 'Compra del {date} — {amount}. Esta acción es irreversible.',
  },
  home: {
    btcPrice: 'Precio BTC ({currency})',
    avgBuyPrice: 'Precio medio ({currency})',
    syncing: 'Sincronizando datos…',
    purchasesTracked_one: '{count} compra seguida',
    purchasesTracked_other: '{count} compras seguidas',
    addPurchase: 'Agregar compra',
    importCsv: 'Importar CSV',
    investedCard: 'Invertido ({currency})',
    totalPnl: 'G/P total',
    roi: 'ROI',
    totalBtc: 'BTC total',
    byCurrency: 'Por divisa',
    investedLabel: 'Invertido',
    dcaPurchases: 'Compras DCA',
    deleteAllTitle: 'Eliminar todas las compras',
    deleteAllMessage: 'Esta acción es irreversible. Se eliminarán todas las compras.',
    deleteAllConfirm: 'Eliminar todo',
    emptyState: 'Agrega una compra o importa un CSV para empezar.',
    noResults: 'Ninguna compra coincide con los filtros activos.',
    sortNewest: 'Más reciente',
    sortOldest: 'Más antiguo',
    filterPositive: 'Positivos',
    filterNegative: 'Negativos',
    pnlInfoTitle: 'G/P total',
    pnlInfoDesc: 'Diferencia entre el valor actual de tus BTC y el importe total invertido (compras + comisiones), convertido a tu divisa de visualización.',
  },
  addPurchase: {
    title: 'Agregar compra',
    subtitle: 'Entrada manual de compra de BTC',
    preview: 'Vista previa',
    estimatedBtc: 'BTC estimado:',
    totalInvested: 'Total invertido:',
    currency: 'Divisa',
    date: 'Fecha de compra',
    amount: 'Monto invertido ({currency})',
    buyPrice: 'Precio de compra BTC ({currency})',
    fee: 'Comisión ({currency})',
    note: 'Nota',
    notePlaceholder: 'Ej.: Compra mensual, orden Kraken…',
    saveButton: 'Guardar',
    saving: 'Guardando…',
    successMessage: 'Compra guardada con éxito.',
    errorNoDate: 'Por favor indica una fecha de compra.',
    errorAmount: 'El monto invertido debe ser mayor que 0.',
    errorPrice: 'El precio de compra de BTC debe ser mayor que 0.',
    errorFee: 'Las comisiones no pueden ser negativas.',
    errorSave: 'No se pudo guardar la compra.',
  },
  editPurchase: {
    title: 'Editar compra',
    subtitle: 'Compra del {date}',
    saveButton: 'Guardar cambios',
    saving: 'Guardando…',
    errorSave: 'No se pudieron guardar los cambios.',
  },
  settings: {
    title: 'Ajustes',
    subtitle: 'Configuración de la aplicación',
    currencySection: 'Divisa de referencia',
    currencyDesc:
      'Todos los montos y estadísticas se mostrarán en esta divisa. Las compras en otras divisas se convertirán al tipo de cambio actual.',
    languageSection: 'Idioma',
    reminderSection: 'Recordatorio DCA',
    reminderDesc: 'Recibe una notificación para no olvidar tus compras programadas.',
    reminderEnabled: 'Activar recordatorio',
    reminderFrequency: 'Frecuencia',
    reminderFreqDaily: 'Diario',
    reminderFreqWeekly: 'Semanal',
    reminderFreqMonthly: 'Mensual',
    reminderDay: 'Día de la semana',
    reminderDayOfMonth: 'Día del mes',
    reminderTime: 'Hora',
    reminderPermissionDenied: 'Permiso denegado. Activa las notificaciones en la configuración del sistema.',
    reminderSaved: '¡Recordatorio guardado!',
  },
  currencyLabels: {
    CHF: 'Franco suizo',
    USD: 'Dólar estadounidense',
    EUR: 'Euro',
    GBP: 'Libra esterlina',
    CAD: 'Dólar canadiense',
    AUD: 'Dólar australiano',
    JPY: 'Yen japonés',
    SEK: 'Corona sueca',
    NOK: 'Corona noruega',
    DKK: 'Corona danesa',
    RUB: 'Rublo ruso',
  },
  langLabels: { fr: 'Français', en: 'English', de: 'Deutsch', es: 'Español', ru: 'Русский' },
  chart: {
    title: 'Precio de compra BTC',
    subtitle: 'Tus entradas DCA en el tiempo',
    now: 'Ahora',
    legendEntry: 'Precio de entrada',
    legendCurrent: 'Precio actual',
  },
  goal: {
    title: 'Objetivo BTC',
    reached: '🎯 ¡Alcanzado!',
    accumulated: 'Acumulado',
    target: 'Objetivo',
    remaining: 'Faltan {btc} BTC',
    settingLabel: 'Objetivo de acumulación BTC',
    settingPlaceholder: 'Ej: 0.5',
    settingSave: 'Guardar',
    settingClear: 'Eliminar objetivo',
  },
  import: {
    title: 'Importar CSV',
    subtitle: 'Importación masiva de compras',
    sourceLabel: 'Fuente del archivo',
    standardFormat: 'Formato estándar',
    krakenExport: 'Exportación Kraken',
    expectedFormatTitle: 'Formato esperado',
    expectedFormatDesc:
      'Tu archivo CSV debe contener las siguientes columnas (separadas por comas):',
    colBoughtAt: 'Fecha en formato AAAA-MM-DD',
    colAmount: 'Monto invertido en la divisa de la compra',
    colBuyPrice: 'Precio BTC en la divisa de la compra',
    colFee: 'Comisión (0 si ninguna)',
    colCurrency: 'Divisa de la compra (por defecto: {defaultCurrency} si no se indica)',
    colNote: 'Nota libre (puede estar vacía)',
    downloadExample: 'Descargar CSV de ejemplo',
    krakenTitle: 'Exportación Kraken Trades',
    krakenDesc:
      'Importa directamente el archivo CSV exportado desde Kraken (pestaña History → Trades). No se necesitan modificaciones.',
    krakenColPair: 'Par negociado — determina la divisa (BTC/CHF, BTC/USD…)',
    krakenColTime: 'Fecha y hora de la compra',
    krakenColPrice: 'Precio BTC en la divisa del par',
    krakenColCost: 'Monto invertido en la divisa del par',
    krakenColFee: 'Comisión',
    krakenColVol: 'Volumen BTC comprado',
    krakenNote:
      'Solo se importan compras BTC/*. La divisa se detecta automáticamente desde el par. Otros pares (XRP, ETH…) se ignoran.',
    reading: 'Leyendo archivo…',
    successCount_one: '¡{count} compra importada!',
    successCount_other: '¡{count} compras importadas!',
    selectFile: 'Seleccionar archivo CSV',
    selectFileHint: 'Toca para abrir el gestor de archivos',
    errorTitle: 'Error de formato',
    errorFile: 'No se pudo leer el archivo. Asegúrate de que sea un archivo CSV válido.',
    required: 'requerido',
  },
  loading: {
    stepPurchases: 'Cargando compras…',
    stepBtcPrice: 'Obteniendo precio BTC…',
  },
};

const ru: Translations = {
  common: {
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    save: 'Сохранить',
    back: 'Назад',
    invested: 'Вложено',
    retry: 'Повторить',
  },
  row: {
    invested: 'Вложено',
    currentValue: 'Текущая стоимость',
    btc: 'BTC',
    entryPrice: 'Цена входа',
    roi: 'ROI',
    edit: 'Изменить',
    delete: 'Удалить',
    deleteTitle: 'Удалить покупку',
    deleteMessage: 'Покупка от {date} — {amount}. Это действие необратимо.',
  },
  home: {
    btcPrice: 'Цена BTC ({currency})',
    avgBuyPrice: 'Ср. цена покупки ({currency})',
    syncing: 'Синхронизация данных…',
    purchasesTracked_one: '{count} покупка отслеживается',
    purchasesTracked_other: '{count} покупок отслеживается',
    addPurchase: 'Добавить покупку',
    importCsv: 'Импорт CSV',
    investedCard: 'Вложено ({currency})',
    totalPnl: 'Общий P&L',
    roi: 'ROI',
    totalBtc: 'BTC всего',
    byCurrency: 'По валютам',
    investedLabel: 'Вложено',
    dcaPurchases: 'DCA-покупки',
    deleteAllTitle: 'Удалить все покупки',
    deleteAllMessage: 'Это действие необратимо. Все покупки будут удалены.',
    deleteAllConfirm: 'Удалить всё',
    emptyState: 'Добавьте покупку или импортируйте CSV для начала.',
    noResults: 'Нет покупок, соответствующих фильтрам.',
    sortNewest: 'Сначала новые',
    sortOldest: 'Сначала старые',
    filterPositive: 'Прибыльные',
    filterNegative: 'Убыточные',
    pnlInfoTitle: 'Общий P&L',
    pnlInfoDesc: 'Разница между текущей стоимостью ваших BTC и общей суммой инвестиций (покупки + комиссии), конвертированная в вашу отображаемую валюту.',
  },
  addPurchase: {
    title: 'Добавить покупку',
    subtitle: 'Ручной ввод покупки BTC',
    preview: 'Предпросмотр',
    estimatedBtc: 'Расчётный BTC:',
    totalInvested: 'Всего вложено:',
    currency: 'Валюта',
    date: 'Дата покупки',
    amount: 'Сумма инвестиций ({currency})',
    buyPrice: 'Цена покупки BTC ({currency})',
    fee: 'Комиссия ({currency})',
    note: 'Заметка',
    notePlaceholder: 'Напр.: Ежемесячная покупка, ордер Kraken…',
    saveButton: 'Сохранить',
    saving: 'Сохранение…',
    successMessage: 'Покупка успешно сохранена.',
    errorNoDate: 'Пожалуйста, укажите дату покупки.',
    errorAmount: 'Сумма инвестиций должна быть больше 0.',
    errorPrice: 'Цена покупки BTC должна быть больше 0.',
    errorFee: 'Комиссия не может быть отрицательной.',
    errorSave: 'Не удалось сохранить покупку.',
  },
  editPurchase: {
    title: 'Изменить покупку',
    subtitle: 'Покупка от {date}',
    saveButton: 'Сохранить изменения',
    saving: 'Сохранение…',
    errorSave: 'Не удалось сохранить изменения.',
  },
  settings: {
    title: 'Настройки',
    subtitle: 'Конфигурация приложения',
    currencySection: 'Базовая валюта',
    currencyDesc:
      'Все суммы и статистика будут отображаться в этой валюте. Покупки в других валютах будут конвертированы по текущему курсу.',
    languageSection: 'Язык',
    reminderSection: 'Напоминание DCA',
    reminderDesc: 'Получайте уведомление, чтобы не пропустить запланованные покупки.',
    reminderEnabled: 'Включить напоминание',
    reminderFrequency: 'Частота',
    reminderFreqDaily: 'Ежедневно',
    reminderFreqWeekly: 'Еженедельно',
    reminderFreqMonthly: 'Ежемесячно',
    reminderDay: 'День недели',
    reminderDayOfMonth: 'День месяца',
    reminderTime: 'Время',
    reminderPermissionDenied: 'Разрешение отклонено. Включите уведомления в системных настройках.',
    reminderSaved: 'Напоминание сохранено!',
  },
  currencyLabels: {
    CHF: 'Швейцарский франк',
    USD: 'Доллар США',
    EUR: 'Евро',
    GBP: 'Британский фунт',
    CAD: 'Канадский доллар',
    AUD: 'Австралийский доллар',
    JPY: 'Японская иена',
    SEK: 'Шведская крона',
    NOK: 'Норвежская крона',
    DKK: 'Датская крона',
    RUB: 'Российский рубль',
  },
  langLabels: { fr: 'Français', en: 'English', de: 'Deutsch', es: 'Español', ru: 'Русский' },
  chart: {
    title: 'Цена покупки BTC',
    subtitle: 'Ваши DCA-входы во времени',
    now: 'Сейчас',
    legendEntry: 'Цена входа',
    legendCurrent: 'Текущая цена',
  },
  goal: {
    title: 'Цель BTC',
    reached: '🎯 Достигнуто!',
    accumulated: 'Накоплено',
    target: 'Цель',
    remaining: 'Осталось накопить {btc} BTC',
    settingLabel: 'Цель накопления BTC',
    settingPlaceholder: 'Напр. 0.5',
    settingSave: 'Сохранить',
    settingClear: 'Удалить цель',
  },
  import: {
    title: 'Импорт CSV',
    subtitle: 'Массовый импорт покупок',
    sourceLabel: 'Источник файла',
    standardFormat: 'Стандартный формат',
    krakenExport: 'Экспорт Kraken',
    expectedFormatTitle: 'Ожидаемый формат',
    expectedFormatDesc:
      'Ваш CSV-файл должен содержать следующие столбцы (разделённые запятыми):',
    colBoughtAt: 'Дата в формате ГГГГ-ММ-ДД',
    colAmount: 'Сумма инвестиций в валюте покупки',
    colBuyPrice: 'Цена BTC в валюте покупки',
    colFee: 'Комиссия (0 если нет)',
    colCurrency: 'Валюта покупки (по умолчанию: {defaultCurrency})',
    colNote: 'Свободная заметка (может быть пустой)',
    downloadExample: 'Скачать пример CSV',
    krakenTitle: 'Экспорт Kraken Trades',
    krakenDesc:
      'Импортируйте CSV-файл, экспортированный из Kraken (вкладка History → Trades). Изменения не требуются.',
    krakenColPair: 'Торговая пара — определяет валюту (BTC/CHF, BTC/USD…)',
    krakenColTime: 'Дата и время покупки',
    krakenColPrice: 'Цена BTC в валюте пары',
    krakenColCost: 'Сумма инвестиций в валюте пары',
    krakenColFee: 'Комиссия',
    krakenColVol: 'Купленный объём BTC',
    krakenNote:
      'Импортируются только покупки BTC/*. Валюта определяется автоматически из пары. Другие пары (XRP, ETH…) игнорируются.',
    reading: 'Чтение файла…',
    successCount_one: '{count} покупка импортирована!',
    successCount_other: '{count} покупок импортировано!',
    selectFile: 'Выбрать CSV-файл',
    selectFileHint: 'Нажмите, чтобы открыть менеджер файлов',
    errorTitle: 'Ошибка формата',
    errorFile: 'Не удалось прочитать файл. Убедитесь, что это корректный CSV-файл.',
    required: 'обязательно',
  },
  loading: {
    stepPurchases: 'Загрузка покупок…',
    stepBtcPrice: 'Получение цены BTC…',
  },
};

export const allTranslations: Record<Lang, Translations> = { fr, en, de, es, ru };
