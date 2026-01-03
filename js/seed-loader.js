/**
 * SEED DATA LOADER
 * Charge les données initiales depuis le fichier JSON
 */
const SeedLoader = {
    seedData: null,
    
    /**
     * Charge le fichier JSON de données initiales
     */
    async loadSeedData() {
        try {
            const response = await fetch('data/seed-data.json');
            if (!response.ok) {
                throw new Error('Fichier seed-data.json introuvable');
            }
            SeedLoader.seedData = await response.json();
            return SeedLoader.seedData;
        } catch (error) {
            console.warn('Impossible de charger seed-data.json, utilisation des données par défaut:', error);
            // Retourner des données par défaut si le fichier n'est pas trouvé
            return SeedLoader.getDefaultData();
        }
    },

    /**
     * Retourne les données par défaut (fallback)
     */
    getDefaultData() {
        return {
            clients: [
                { id: '1', name: "Ahmed Alami", email: "ahmed.alami@gmail.com", phone: "0612345678", status: "Premium" },
                { id: '2', name: "Fatima Benali", email: "fatima.benali@outlook.com", phone: "0623456789", status: "Active" }
            ],
            biens: [
                { id: '1', address: "Villa Californie, Casablanca", type: "Maison", price: "4500000", surface: "350", status: "À Vendre", image: null },
                { id: '2', address: "Appartement Hay Riad, Rabat", type: "Appartement", price: "1200000", surface: "120", status: "Sous Offre", image: null }
            ],
            agents: [],
            contrats: [],
            rdvs: []
        };
    },

    /**
     * Charge et initialise les données depuis le JSON
     */
    async loadAndInitialize() {
        const data = await SeedLoader.loadSeedData();
        
        // Initialiser chaque module avec les données du JSON
        if (data.clients && data.clients.length > 0) {
            Storage.set('clients', data.clients);
        }
        if (data.biens && data.biens.length > 0) {
            Storage.set('biens', data.biens);
        }
        if (data.agents && data.agents.length > 0) {
            Storage.set('agents', data.agents);
        }
        if (data.contrats && data.contrats.length > 0) {
            Storage.set('contrats', data.contrats);
        }
        if (data.rdvs && data.rdvs.length > 0) {
            Storage.set('rdvs', data.rdvs);
        }
        
        console.log('[SEED] Données chargées depuis seed-data.json');
        return true;
    },

    /**
     * Initialise les données si le storage est vide
     */
    async initializeIfEmpty() {
        // Vérifier si les données ont déjà été initialisées depuis le JSON
        const wasInitialized = localStorage.getItem('crm_seed_initialized');
        
        // Vérifier si au moins un module a des données
        const hasData = Storage.get('clients').length > 0 || 
                       Storage.get('biens').length > 0 ||
                       Storage.get('agents').length > 0 ||
                       Storage.get('contrats').length > 0 ||
                       Storage.get('rdvs').length > 0;

        // Si pas de données OU si jamais initialisé depuis le JSON, charger les données
        if (!hasData || !wasInitialized) {
            await SeedLoader.loadAndInitialize();
            // Marquer comme initialisé pour éviter de réinitialiser à chaque fois
            localStorage.setItem('crm_seed_initialized', 'true');
        }
    },

    /**
     * Réinitialise toutes les données depuis le JSON (force le rechargement)
     */
    async resetAllData() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cela supprimera toutes les données existantes et les remplacera par les données du fichier JSON.')) {
            await SeedLoader.loadAndInitialize();
            
            // Recharger tous les modules
            if (typeof clientModule !== 'undefined') {
                clientModule.data = Storage.get('clients');
                clientModule.render();
            }
            if (typeof bienModule !== 'undefined') {
                bienModule.data = Storage.get('biens');
                bienModule.render();
            }
            if (typeof agentModule !== 'undefined') {
                agentModule.data = Storage.get('agents');
                agentModule.render();
            }
            if (typeof contratModule !== 'undefined') {
                contratModule.data = Storage.get('contrats');
                contratModule.render();
            }
            if (typeof rdvModule !== 'undefined') {
                rdvModule.data = Storage.get('rdvs');
                rdvModule.render();
            }
            
            // Rafraîchir le dashboard
            if (typeof analyticsModule !== 'undefined') {
                analyticsModule.refreshAll();
            }
            
            Utils.showToast('Données réinitialisées', 'Toutes les données ont été rechargées depuis le fichier JSON.');
        }
    }
};

