module.exports = {
    DISCIPLINES: {
        CAMOUFLAGE: 'Camouflage',
        HUNT: 'Chasse',
        SIXTH_SENSE: '6e sens',
        ORIENTATION: 'Orientation',
        HEALING: 'Gu�rison',
        ARMS_CONTROL: 'Ma�trise des armes',
        PSYCHIC_SHIELD: 'Bouclier psychique',
        PSYCHIC_POWER: 'Puissance psychique',
        ANIMAL_COMMUNICATION: 'Communication animale',
        PSYCHIC_MASTER_OF_MATTER: 'Ma�tre psychique de la mati�re'
    },
    ITEMS: {
        SWORD: '�p�e',
        SABRE: 'Sabre',
        SPEAR: 'Lance',
        MACE: 'Masse d\'armes',
        WAR_HAMMER: 'Marteau de guerre',
        AXE: 'Hache',
        STICK: 'B�ton',
        GLAIVE: 'Glaive',
        QUILTED_LEATHER_VEST: 'Gilet de cuir matelass�',
        LAMPSUR_POTION: 'Potion de lampsur',
        SPECIAL_RATIONS: 'Rations sp�ciales'
    }
};

// Object.freeze prevents our constants to be modified
Object.freeze(this.DISCIPLINES);
Object.freeze(this.ITEMS);