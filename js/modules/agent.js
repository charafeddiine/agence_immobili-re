/**
 * AGENT MODULE
 */
const agentModule = {
    data: [],
    init: () => {
        agentModule.data = Storage.get('agents');
        agentModule.render();
    },
    toggleForm: () => {
        agentModule.openModal();
    },
    openModal: (id = null) => {
        const container = Utils.getElement('agent-form-container');
        const title = Utils.getElement('agent-form-title');
        const btn = Utils.getElement('agent-submit-btn');
        const hiddenId = Utils.getElement('agent-id');
        
        container.classList.remove('hidden');

        if(id) {
            // EDIT MODE
            const agent = agentModule.data.find(a => a.id === id);
            if(agent) {
                title.innerText = "Modifier l'Agent";
                btn.innerText = "Mettre à jour";
                hiddenId.value = agent.id;
                Utils.getElement('agent-name').value = agent.name;
                Utils.getElement('agent-specialty').value = agent.specialty || '';
            }
        } else {
            // CREATE MODE
            title.innerText = "Nouvel Agent";
            btn.innerText = "Deploy Agent";
            hiddenId.value = "";
            document.getElementById('agent-form-container').querySelector('form').reset();
        }
    },
    closeModal: () => {
        Utils.getElement('agent-form-container').classList.add('hidden');
    },
    saveAgent: () => {
        const id = Utils.getElement('agent-id').value;
        const n = Utils.getElement('agent-name'), s = Utils.getElement('agent-specialty');
        if(!n?.value) return alert('Le nom de l\'agent est requis');

        if (id) {
            // UPDATE
            const index = agentModule.data.findIndex(a => a.id === id);
            if (index !== -1) {
                agentModule.data[index] = { ...agentModule.data[index], name: n.value, specialty: s.value };
                Utils.showToast('Agent Modifié', 'L\'agent a été mis à jour avec succès.');
            }
        } else {
            // CREATE
            agentModule.data.push({ id: Utils.genId(), name: n.value, specialty: s.value });
            Utils.showToast('Agent Deployed', 'New agent added to the roster.');
        }

        Storage.set('agents', agentModule.data);
        agentModule.closeModal();
        agentModule.render();
        // Refresh dashboard (KPIs and charts)
        analyticsModule.refreshAll();
    },
    render: () => {
        const c = Utils.getElement('agent-list-container'), m = Utils.getElement('agent-empty-msg');
        m.style.display = agentModule.data.length ? 'none' : 'block';
        c.innerHTML = agentModule.data.map(a => `
            <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center relative group">
                <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onclick="agentModule.openModal('${a.id}')" class="text-slate-200 hover:text-blue-500 transition-colors"><i class="fas fa-edit"></i></button>
                    <button onclick="agentModule.delete('${a.id}')" class="text-slate-200 hover:text-red-500 transition-colors"><i class="fas fa-times"></i></button>
                </div>
                <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mb-3"><i class="fas fa-user-shield"></i></div>
                <h4 class="font-bold text-slate-900">${a.name}</h4>
                <p class="text-xs text-slate-500 mt-1">${a.specialty}</p>
            </div>
        `).join('');
    },
    delete: (id) => {
        agentModule.data = agentModule.data.filter(a => a.id !== id);
        Storage.set('agents', agentModule.data);
        agentModule.render();
        // Refresh dashboard (KPIs and charts)
        analyticsModule.refreshAll();
    }
};

