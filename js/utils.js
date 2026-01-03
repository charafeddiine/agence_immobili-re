/**
 * CORE UTILITIES & STORAGE
 */
const Utils = {
    getElement: (id) => document.getElementById(id),
    formatDate: (d) => d ? new Date(d).toLocaleDateString('fr-FR') : 'N/A',
    genId: () => Date.now().toString(36) + Math.random().toString(36).substr(2),
    showToast: (title, msg) => {
        const toast = Utils.getElement('toast-container');
        Utils.getElement('toast-title').innerText = title;
        Utils.getElement('toast-msg').innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

const Storage = {
    get: (key) => JSON.parse(localStorage.getItem(`crm_${key}`)) || [],
    set: (key, data) => localStorage.setItem(`crm_${key}`, JSON.stringify(data))
};

let revenueChart = null;
let biensTypeChart = null;
let biensStatutChart = null;
let clientsStatutChart = null;
let agentsChart = null;

