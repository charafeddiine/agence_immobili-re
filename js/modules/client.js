/**
 * CLIENT MODULE (FULL CRUD)
 */
const clientModule = {
    data: [],
    init: () => {
        clientModule.data = Storage.get('clients');
        // Les données sont initialisées par SeedLoader si nécessaire
        clientModule.render();
    },
    openModal: (id = null) => {
        const container = Utils.getElement('client-form-container');
        const title = Utils.getElement('client-form-title');
        const btn = Utils.getElement('client-submit-btn');
        const hiddenId = Utils.getElement('client-id');
        
        container.classList.remove('hidden');

        if(id) {
            // EDIT MODE
            const client = clientModule.data.find(c => c.id === id);
            if(client) {
                title.innerText = "Edit Client Profile";
                btn.innerText = "Update Profile";
                hiddenId.value = client.id;
                Utils.getElement('client-name').value = client.name;
                Utils.getElement('client-email').value = client.email;
                Utils.getElement('client-phone').value = client.phone;
                Utils.getElement('client-status').value = client.status;
            }
        } else {
            // CREATE MODE
            title.innerText = "New Client Profile";
            btn.innerText = "Save Profile";
            hiddenId.value = "";
            document.getElementById('form-client').reset();
        }
    },
    closeModal: () => {
        Utils.getElement('client-form-container').classList.add('hidden');
    },
    saveClient: () => {
        const id = Utils.getElement('client-id').value;
        const name = Utils.getElement('client-name').value;
        const email = Utils.getElement('client-email').value;
        const phone = Utils.getElement('client-phone').value;
        const status = Utils.getElement('client-status').value;

        if (!name) return alert('Name is required');

        if (id) {
            // UPDATE
            const index = clientModule.data.findIndex(c => c.id === id);
            if (index !== -1) {
                clientModule.data[index] = { ...clientModule.data[index], name, email, phone, status };
                Utils.showToast('Updated', `Client ${name} updated successfully.`);
            }
        } else {
            // CREATE
            const newClient = { id: Utils.genId(), name, email, phone, status };
            clientModule.data.push(newClient);
            Utils.showToast('Created', `Client ${name} added to directory.`);
        }

        Storage.set('clients', clientModule.data);
        clientModule.closeModal();
        clientModule.render();
        // Refresh dashboard (KPIs and charts)
        analyticsModule.refreshAll();
    },
    delete: (id) => {
        if(confirm('Are you sure you want to delete this client?')) {
            clientModule.data = clientModule.data.filter(c => c.id !== id);
            Storage.set('clients', clientModule.data);
            clientModule.render();
            // Refresh dashboard (KPIs and charts)
            analyticsModule.refreshAll();
            Utils.showToast('Deleted', 'Client removed.');
        }
    },
    render: () => {
        const b = Utils.getElement('client-list-body');
        const empty = Utils.getElement('client-empty');
        
        if (clientModule.data.length === 0) {
            b.innerHTML = '';
            empty.classList.remove('hidden');
            return;
        }
        
        empty.classList.add('hidden');
        b.innerHTML = clientModule.data.map(c => `
            <tr class="hover:bg-slate-50/50 transition-colors group">
                <td class="px-8 py-5 flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-sm">${c.name.charAt(0)}</div>
                    <div>
                        <span class="font-bold text-slate-800 text-sm block">${c.name}</span>
                        <span class="text-[10px] text-slate-400 block md:hidden">${c.email}</span>
                    </div>
                </td>
                <td class="px-8 py-5 hidden md:table-cell">
                     <div class="flex flex-col">
                        <span class="text-xs text-slate-600">${c.email}</span>
                        <span class="text-[10px] text-slate-400">${c.phone}</span>
                     </div>
                </td>
                <td class="px-8 py-5"><span class="px-3 py-1 text-[10px] font-bold rounded-lg ${c.status === 'Premium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'} border uppercase">${c.status}</span></td>
                <td class="px-8 py-5 text-right">
                    <button onclick="clientModule.openModal('${c.id}')" class="text-slate-300 hover:text-indigo-600 mr-3 transition-colors"><i class="fas fa-edit"></i></button>
                    <button onclick="clientModule.delete('${c.id}')" class="text-slate-300 hover:text-red-500 transition-colors"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `).join('');
    }
};

