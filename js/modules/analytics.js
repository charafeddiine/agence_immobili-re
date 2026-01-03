/**
 * ANALYTICS MODULE
 */
const analyticsModule = {
    isVisible: () => {
        const section = Utils.getElement('section-analytics');
        return section && section.classList.contains('active');
    },
    refreshAll: () => {
        analyticsModule.updateCounters();
        // Only refresh charts if analytics section is visible
        if(analyticsModule.isVisible()) {
            setTimeout(() => analyticsModule.initChart(), 100);
        }
    },
    updateCounters: () => {
        const totalRevenue = contratModule.data.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
        const totalClients = clientModule.data.length;
        const totalBiens = bienModule.data.length;
        const biensDisponibles = bienModule.data.filter(b => b.status === 'À Vendre' || b.status === 'À Louer').length;
        const tauxConversion = totalClients > 0 ? ((contratModule.data.length / totalClients) * 100).toFixed(1) : 0;
        const rdvAvenir = rdvModule.data.filter(rdv => {
            if(!rdv.date) return false;
            const rdvDate = new Date(rdv.date);
            return rdvDate >= new Date();
        }).length;
        
        const revEl = Utils.getElement('stat-total-revenue');
        if(revEl) revEl.innerText = `${totalRevenue.toLocaleString()} MAD`;
        
        Utils.getElement('stat-active-clients').innerText = totalClients;
        Utils.getElement('stat-total-contracts').innerText = contratModule.data.length;
        Utils.getElement('stat-total-agents').innerText = agentModule.data.length;
        Utils.getElement('stat-total-biens').innerText = totalBiens;
        Utils.getElement('stat-biens-disponibles').innerText = biensDisponibles;
        Utils.getElement('stat-taux-conversion').innerText = `${tauxConversion}%`;
        Utils.getElement('stat-rdv-a-venir').innerText = rdvAvenir;
    },
    initChart: () => {
        // Chart 1: Revenue Overview (Line Chart)
        const ctx = document.getElementById('revenueChart');
        if(ctx) {
            if(revenueChart) revenueChart.destroy();
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            const data = months.map(() => Math.floor(Math.random() * 5000) + 1000);
            revenueChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Revenue Stream (MAD)',
                        data: data,
                        borderColor: '#6366F1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#6366F1',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#F1F5F9' }, ticks: { font: { family: 'Plus Jakarta Sans' } } },
                        x: { grid: { display: false }, ticks: { font: { family: 'Plus Jakarta Sans' } } }
                    }
                }
            });
        }

        // Chart 2: Biens par Type (Pie Chart)
        const ctx2 = document.getElementById('biensTypeChart');
        if(ctx2) {
            if(biensTypeChart) biensTypeChart.destroy();
            const types = ['Appartement', 'Maison', 'Terrain', 'Commercial'];
            const typeCounts = types.map(type => bienModule.data.filter(b => b.type === type).length);
            
            biensTypeChart = new Chart(ctx2, {
                type: 'pie',
                data: {
                    labels: types,
                    datasets: [{
                        data: typeCounts,
                        backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 12 } } }
                    }
                }
            });
        }

        // Chart 3: Biens par Statut (Bar Chart)
        const ctx3 = document.getElementById('biensStatutChart');
        if(ctx3) {
            if(biensStatutChart) biensStatutChart.destroy();
            const statuts = ['À Vendre', 'À Louer', 'Sous Offre', 'Vendu'];
            const statutCounts = statuts.map(statut => bienModule.data.filter(b => b.status === statut).length);
            
            biensStatutChart = new Chart(ctx3, {
                type: 'bar',
                data: {
                    labels: statuts,
                    datasets: [{
                        label: 'Nombre de biens',
                        data: statutCounts,
                        backgroundColor: ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981'],
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#F1F5F9' }, ticks: { font: { family: 'Plus Jakarta Sans' }, stepSize: 1 } },
                        x: { grid: { display: false }, ticks: { font: { family: 'Plus Jakarta Sans' } } }
                    }
                }
            });
        }

        // Chart 4: Clients par Statut (Doughnut Chart)
        const ctx4 = document.getElementById('clientsStatutChart');
        if(ctx4) {
            if(clientsStatutChart) clientsStatutChart.destroy();
            const statuts = ['New', 'Active', 'Premium', 'Inactive'];
            const statutCounts = statuts.map(statut => clientModule.data.filter(c => c.status === statut).length);
            
            clientsStatutChart = new Chart(ctx4, {
                type: 'doughnut',
                data: {
                    labels: statuts,
                    datasets: [{
                        data: statutCounts,
                        backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#94A3B8'],
                        borderWidth: 3,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 12 } } }
                    }
                }
            });
        }

        // Chart 5: Performance des Agents (Bar Chart)
        const ctx5 = document.getElementById('agentsChart');
        if(ctx5) {
            if(agentsChart) agentsChart.destroy();
            const agentNames = agentModule.data.map(a => a.name || 'Agent');
            // Pour chaque agent, compter les contrats (simulation - dans un vrai système, vous auriez une relation)
            const agentPerformance = agentModule.data.map(() => Math.floor(Math.random() * 10) + 1);
            
            agentsChart = new Chart(ctx5, {
                type: 'bar',
                data: {
                    labels: agentNames.length > 0 ? agentNames : ['Aucun agent'],
                    datasets: [{
                        label: 'Contrats signés',
                        data: agentPerformance.length > 0 ? agentPerformance : [0],
                        backgroundColor: '#10B981',
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: { beginAtZero: true, grid: { color: '#F1F5F9' }, ticks: { font: { family: 'Plus Jakarta Sans' }, stepSize: 1 } },
                        y: { grid: { display: false }, ticks: { font: { family: 'Plus Jakarta Sans' } } }
                    }
                }
            });
        }
    }
};

