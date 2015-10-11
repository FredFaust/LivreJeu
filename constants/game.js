module.exports = {
    DISCIPLINES: {
        CAMOUFLAGE: 'Camouflage',
        HUNT: 'Chasse',
        SIXTH_SENSE: '6e sens',
        ORIENTATION: 'Orientation',
        HEALING: 'Guérison',
        ARMS_CONTROL: 'Maîtrise des armes',
        PSYCHIC_SHIELD: 'Bouclier psychique',
        PSYCHIC_POWER: 'Puissance psychique',
        ANIMAL_COMMUNICATION: 'Communication animale',
        PSYCHIC_MASTER_OF_MATTER: 'Maître psychique de la matière'
    },
    ITEMS: {
        SWORD: 'Épée',
        SABRE: 'Sabre',
        SPEAR: 'Lance',
        MACE: 'Masse d\'armes',
        WAR_HAMMER: 'Marteau de guerre',
        AXE: 'Hache',
        STICK: 'Bâton',
        GLAIVE: 'Glaive',
        QUILTED_LEATHER_VEST: 'Gilet de cuir matelassé',
        LAMPSUR_POTION: 'Potion de lampsur',
        SPECIAL_RATIONS: 'Rations spéciales'
    }
};

// Object.freeze prevents our constants to be modified
Object.freeze(this.DISCIPLINES);
Object.freeze(this.ITEMS);