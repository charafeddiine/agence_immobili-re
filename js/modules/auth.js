/**
 * AUTH MODULE
 */
const authModule = {
    init: () => {
        const isLogged = localStorage.getItem('crm_auth');
        if(isLogged) {
            authModule.showApp();
        }

        Utils.getElement('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const u = Utils.getElement('login-user').value;
            const p = Utils.getElement('login-pass').value;

            if(u === 'admin' && p === 'admin123') {
                localStorage.setItem('crm_auth', 'true');
                authModule.showApp();
                Utils.showToast('Bienvenue', 'Connexion réussie en tant qu\'administrateur.');
            } else {
                alert('Identifiants invalides ! (Essayez: admin / admin123)');
            }
        });
    },
    showApp: () => {
        Utils.getElement('login-screen').style.display = 'none';
        Utils.getElement('main-app').classList.remove('hidden');
        app.init();
    },
    logout: () => {
        localStorage.removeItem('crm_auth');
        window.location.reload();
    }
};

