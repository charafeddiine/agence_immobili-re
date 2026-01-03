/**
 * CONTRAT MODULE
 */
const contratModule = {
    data: [],
    init: () => {
        contratModule.data = Storage.get('contrats');
        contratModule.render();
    },
    toggleForm: () => {
        contratModule.openModal();
    },
    openModal: (id = null) => {
        const container = Utils.getElement('contrat-form-container');
        const title = Utils.getElement('contrat-form-title');
        const btn = Utils.getElement('contrat-submit-btn');
        const hiddenId = Utils.getElement('contrat-id');
        
        container.classList.remove('hidden');

        if(id) {
            // EDIT MODE
            const contrat = contratModule.data.find(c => c.id === id);
            if(contrat) {
                title.innerText = "Modifier le Contrat";
                btn.innerText = "Mettre à jour";
                hiddenId.value = contrat.id;
                Utils.getElement('contrat-ref').value = contrat.ref;
                Utils.getElement('contrat-date').value = contrat.date || '';
                Utils.getElement('contrat-amount').value = contrat.amount || '';
            }
        } else {
            // CREATE MODE
            title.innerText = "Nouveau Contrat";
            btn.innerText = "Sign Contract";
            hiddenId.value = "";
            document.getElementById('contrat-form-container').querySelector('form').reset();
        }
    },
    closeModal: () => {
        Utils.getElement('contrat-form-container').classList.add('hidden');
    },
    saveContrat: () => {
        const id = Utils.getElement('contrat-id').value;
        const r = Utils.getElement('contrat-ref'), d = Utils.getElement('contrat-date'), a = Utils.getElement('contrat-amount');
        if(!r?.value) return alert('La référence est requise');

        if (id) {
            // UPDATE
            const index = contratModule.data.findIndex(c => c.id === id);
            if (index !== -1) {
                contratModule.data[index] = { ...contratModule.data[index], ref: r.value, date: d.value, amount: a.value };
                Utils.showToast('Contrat Modifié', 'Le contrat a été mis à jour avec succès.');
            }
        } else {
            // CREATE
            contratModule.data.push({ id: Utils.genId(), ref: r.value, date: d.value, amount: a.value });
            Utils.showToast('Deal Closed', 'Contract registered successfully.');
        }

        Storage.set('contrats', contratModule.data);
        contratModule.closeModal();
        contratModule.render();
        // Refresh dashboard (KPIs and charts)
        analyticsModule.refreshAll();
    },
    delete: (id) => {
        contratModule.data = contratModule.data.filter(c => c.id !== id);
        Storage.set('contrats', contratModule.data);
        contratModule.render();
        // Refresh dashboard (KPIs and charts)
        analyticsModule.refreshAll();
    },
    render: () => {
        const b = Utils.getElement('contrat-list-body');
        b.innerHTML = contratModule.data.map(item => `
            <tr class="hover:bg-slate-50 transition-colors group">
                <td class="px-8 py-4 font-bold text-slate-800 text-sm">${item.ref}</td>
                <td class="px-8 py-4 text-slate-900 font-bold text-sm">${item.amount ? parseFloat(item.amount).toLocaleString() : '0'} MAD</td>
                <td class="px-8 py-4 text-slate-600 text-xs">${item.date ? Utils.formatDate(item.date) : 'N/A'}</td>
                <td class="px-8 py-4 text-right"><span class="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-extrabold rounded uppercase">Active</span></td>
                <td class="px-8 py-4 text-right">
                    <div class="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-all">
                        <button onclick="contratModule.openModal('${item.id}')" class="text-slate-300 hover:text-blue-500 transition-colors"><i class="fas fa-edit"></i></button>
                        <button onclick="contratModule.delete('${item.id}')" class="text-slate-300 hover:text-red-500 transition-colors"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
};

