/**
 * BIEN MODULE
 */
const bienModule = {
    data: [],
    init: () => {
        bienModule.data = Storage.get('biens');
        // Les données sont initialisées par SeedLoader si nécessaire
        bienModule.render();
    },
    toggleForm: () => {
        bienModule.openModal();
    },
    openModal: (id = null) => {
        const container = Utils.getElement('bien-form-container');
        const title = Utils.getElement('bien-form-title');
        const btn = Utils.getElement('bien-submit-btn');
        const hiddenId = Utils.getElement('bien-id');
        
        container.classList.remove('hidden');

        if(id) {
            // EDIT MODE
            const bien = bienModule.data.find(b => b.id === id);
            if(bien) {
                title.innerText = "Modifier le Bien";
                btn.innerText = "Mettre à jour";
                hiddenId.value = bien.id;
                Utils.getElement('bien-address').value = bien.address;
                Utils.getElement('bien-type').value = bien.type;
                Utils.getElement('bien-price').value = bien.price;
                Utils.getElement('bien-surface').value = bien.surface;
                Utils.getElement('bien-status').value = bien.status;
                // Reset image preview for edit (would need to store current image separately)
                Utils.getElement('bien-image').value = '';
                Utils.getElement('file-preview-name').classList.add('hidden');
            }
        } else {
            // CREATE MODE
            title.innerText = "Nouveau Mandat";
            btn.innerText = "Enregistrer le Bien";
            hiddenId.value = "";
            document.getElementById('bien-form-container').querySelector('form').reset();
            Utils.getElement('bien-image').value = '';
            Utils.getElement('file-preview-name').classList.add('hidden');
        }
    },
    closeModal: () => {
        Utils.getElement('bien-form-container').classList.add('hidden');
    },
    handleFileSelect: (input) => {
        const label = Utils.getElement('file-preview-name');
        if(input.files && input.files[0]) {
            label.classList.remove('hidden');
            label.innerHTML = `<i class="fas fa-check"></i> ${input.files[0].name}`;
        } else {
            label.classList.add('hidden');
        }
    },
    saveBien: async () => {
        const id = Utils.getElement('bien-id').value;
        const addr = Utils.getElement('bien-address').value;
        const type = Utils.getElement('bien-type').value;
        const price = Utils.getElement('bien-price').value;
        const surface = Utils.getElement('bien-surface').value;
        const status = Utils.getElement('bien-status').value;
        const fileInput = Utils.getElement('bien-image');

        if(!addr || !price) return alert('Adresse et Prix requis');

        // Image Handling
        let imageSrc = null;
        if(fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if(file.size > 1024 * 1024) return alert('Image trop volumineuse (Max 1Mo)');
            
            try {
                imageSrc = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            } catch(e) {
                console.error("Image read error", e);
            }
        }

        if (id) {
            // UPDATE
            const index = bienModule.data.findIndex(b => b.id === id);
            if (index !== -1) {
                bienModule.data[index] = { 
                    ...bienModule.data[index], 
                    address: addr,
                    type: type,
                    price: price,
                    surface: surface,
                    status: status,
                    image: imageSrc || bienModule.data[index].image // Keep existing image if no new one
                };
                Utils.showToast('Bien Modifié', 'Le mandat a été mis à jour avec succès.');
            }
        } else {
            // CREATE
            bienModule.data.push({
                id: Utils.genId(),
                address: addr,
                type: type,
                price: price,
                surface: surface,
                status: status,
                image: imageSrc
            });
            Utils.showToast('Bien Ajouté', 'Le mandat a été créé avec succès.');
        }

        Storage.set('biens', bienModule.data);
        bienModule.closeModal();
        bienModule.render();
        // Refresh dashboard (KPIs and charts)
        analyticsModule.refreshAll();
    },
    delete: (id) => {
        if(confirm('Supprimer ce bien ?')) {
            bienModule.data = bienModule.data.filter(b => b.id !== id);
            Storage.set('biens', bienModule.data);
            bienModule.render();
            // Refresh dashboard (KPIs and charts)
            analyticsModule.refreshAll();
        }
    },
    render: () => {
        const c = Utils.getElement('bien-list-container');
        const empty = Utils.getElement('bien-empty-msg');
        
        if(bienModule.data.length === 0) {
            c.innerHTML = '';
            empty.classList.remove('hidden');
            return;
        }
        empty.classList.add('hidden');

        c.innerHTML = bienModule.data.map(b => `
            <div class="bg-white p-0 rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all">
                <div class="h-48 bg-slate-100 relative bg-cover bg-center" style="${b.image ? `background-image: url('${b.image}')` : ''}">
                     ${!b.image ? `
                        <div class="absolute inset-0 flex items-center justify-center text-slate-300">
                            <i class="fas fa-image text-4xl"></i>
                        </div>
                     ` : ''}
                     <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                     <span class="absolute top-4 right-4 px-3 py-1 text-[10px] font-bold rounded-lg bg-white/90 backdrop-blur text-slate-800 uppercase shadow-sm z-10">${b.status}</span>
                     <div class="absolute bottom-4 left-4 text-white z-10">
                        <p class="text-[10px] font-bold uppercase tracking-wide opacity-80 mb-1">${b.type}</p>
                        <h4 class="font-bold text-lg leading-tight shadow-sm">${b.address}</h4>
                     </div>
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-4 text-sm text-slate-500">
                        <span><i class="fas fa-ruler-combined mr-1 text-slate-300"></i> ${b.surface} m²</span>
                        <span><i class="fas fa-tag mr-1 text-slate-300"></i> ${parseInt(b.price).toLocaleString()} MAD</span>
                    </div>
                    <div class="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                        <button class="text-xs font-bold text-slate-400 hover:text-slate-800 uppercase">Voir Détails</button>
                        <div class="flex gap-2">
                            <button onclick="bienModule.openModal('${b.id}')" class="text-slate-300 hover:text-blue-500 transition-colors"><i class="fas fa-edit"></i></button>
                            <button onclick="bienModule.delete('${b.id}')" class="text-slate-300 hover:text-red-500 transition-colors"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

