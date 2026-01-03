/**
 * RDV MODULE
 */
const rdvModule = {
    data: [],
    init: () => {
        rdvModule.data = Storage.get('rdvs');
        rdvModule.render();
    },
    toggleForm: () => {
        rdvModule.openModal();
    },
    openModal: (id = null) => {
        const container = Utils.getElement('rdv-form-container');
        const title = Utils.getElement('rdv-form-title');
        const btn = Utils.getElement('rdv-submit-btn');
        const hiddenId = Utils.getElement('rdv-id');
        
        container.classList.remove('hidden');

        if(id) {
            // EDIT MODE
            const rdv = rdvModule.data.find(r => r.id === id);
            if(rdv) {
                title.innerText = "Modifier le Rendez-vous";
                btn.innerText = "Mettre à jour";
                hiddenId.value = rdv.id;
                Utils.getElement('rdv-object').value = rdv.object;
                Utils.getElement('rdv-date').value = rdv.date || '';
                Utils.getElement('rdv-time').value = rdv.time || '';
            }
        } else {
            // CREATE MODE
            title.innerText = "Nouveau Rendez-vous";
            btn.innerText = "Confirm Slot";
            hiddenId.value = "";
            document.getElementById('rdv-form-container').querySelector('form').reset();
        }
    },
    closeModal: () => {
        Utils.getElement('rdv-form-container').classList.add('hidden');
    },
    saveRdv: () => {
        const id = Utils.getElement('rdv-id').value;
        const o = Utils.getElement('rdv-object'), d = Utils.getElement('rdv-date'), t = Utils.getElement('rdv-time');
        if(!o?.value) return alert('L\'objet est requis');

        if (id) {
            // UPDATE
            const index = rdvModule.data.findIndex(r => r.id === id);
            if (index !== -1) {
                rdvModule.data[index] = { ...rdvModule.data[index], object: o.value, date: d.value, time: t.value };
                Utils.showToast('RDV Modifié', 'Le rendez-vous a été mis à jour avec succès.');
            }
        } else {
            // CREATE
            rdvModule.data.push({ id: Utils.genId(), object: o.value, date: d.value, time: t.value });
            Utils.showToast('Scheduled', 'Meeting added to timeline.');
        }

        Storage.set('rdvs', rdvModule.data);
        rdvModule.closeModal();
        rdvModule.render();
        // Refresh dashboard (KPIs and charts)
        analyticsModule.refreshAll();
    },
    render: () => {
        const c = Utils.getElement('rdv-list-container');
        c.innerHTML = rdvModule.data.length ? rdvModule.data.map(r => `
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-center group">
                <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex flex-col items-center justify-center">
                    <span class="text-[10px] font-bold uppercase">${r.date ? new Date(r.date).toLocaleDateString('en', {month: 'short'}) : 'NA'}</span>
                    <span class="text-lg font-black">${r.date ? new Date(r.date).getDate() : '--'}</span>
                </div>
                <div class="flex-1 overflow-hidden">
                    <h4 class="font-extrabold text-slate-900 truncate text-sm">${r.object}</h4>
                    <p class="text-slate-500 text-[11px] mt-1"><i class="far fa-clock mr-1"></i> ${r.time || 'N/A'}</p>
                </div>
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onclick="rdvModule.openModal('${r.id}')" class="text-slate-200 hover:text-blue-500 transition-colors"><i class="fas fa-edit"></i></button>
                    <button onclick="rdvModule.delete('${r.id}')" class="text-slate-200 hover:text-red-500 transition-colors"><i class="fas fa-times"></i></button>
                </div>
            </div>
        `).join('') : '<div class="col-span-2 text-center py-20 text-slate-300 font-medium">No schedule</div>';
    },
    delete: (id) => { 
        rdvModule.data = rdvModule.data.filter(r => r.id !== id); 
        Storage.set('rdvs', rdvModule.data);
        rdvModule.render();
        // Refresh dashboard (KPIs and charts)
        analyticsModule.refreshAll();
    }
};

