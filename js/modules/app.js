/**
 * APP CONTROLLER
 */
const app = {
    init: async () => {
        console.log("[SYSTEM] App Booting...");
        
        // Charger les données initiales depuis JSON si nécessaire
        await SeedLoader.initializeIfEmpty();
        
        const dateEl = Utils.getElement('header-date');
        if(dateEl) dateEl.innerText = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

        app.showSection('analytics');
        
        // Initialize Modules
        clientModule.init();
        bienModule.init();
        agentModule.init();
        contratModule.init();
        rdvModule.init();
        
        analyticsModule.updateCounters();
        // Delay chart init slightly to ensure container is visible
        setTimeout(analyticsModule.initChart, 100);
    },
    showSection: (id) => {
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        const target = Utils.getElement(`section-${id}`);
        if (target) {
            target.classList.add('active');
            Utils.getElement('page-title').innerText = id.charAt(0).toUpperCase() + id.slice(1);
            
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('sidebar-item-active'));
            const activeBtn = Utils.getElement(`btn-${id}`);
            if(activeBtn) activeBtn.classList.add('sidebar-item-active');
            
            // Refresh analytics when switching to analytics section
            if(id === 'analytics') {
                analyticsModule.updateCounters();
                setTimeout(() => analyticsModule.initChart(), 100);
            }
        }
    }
};

