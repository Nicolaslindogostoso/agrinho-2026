// AgroTech - Main JavaScript SIMPLES

// Função para abrirViews
function openView(viewName) {
    // Esconde todas as views
    var views = document.querySelectorAll('.view');
    for (var i = 0; i < views.length; i++) {
        views[i].classList.remove('active');
    }
    
    // Mostra a view clicada
    var view = document.getElementById('view-' + viewName);
    if (view) {
        view.classList.add('active');
    }
    
    // Atualiza menu lateral
    var folders = document.querySelectorAll('.folder-item');
    for (var i = 0; i < folders.length; i++) {
        folders[i].classList.remove('active');
        if (folders[i].getAttribute('onclick').indexOf(viewName) > -1) {
            folders[i].classList.add('active');
        }
    }
}

// Função para ver máquina
function verMaquina(id) {
    var nomes = ['Trator John Deere 8R', 'Colheitadeira Case IH'];
    alert('DETALHES DA MÁQUINA\n\nNome: ' + nomes[id]);
}

// Função mock para outras funções usadas no HTML
function goBack() {}
function goForward() {}
function refreshPage() {}
function toggleNotifications() {}
function toggleCalendar() {}
function toggleWeatherWidget() {}
function exportData() {}
function refreshDashboard() {}
function openFullscreen() {}
function markAllRead() {}
function openModal() {}
function exportMachines() {}
function filterMachines() {}
function toggleSection() {}

console.log('AgroTech JavaScript loaded!');

// ========== BUSCA GLOBAL ==========
var buscaInput = document.getElementById('global-search');
if (buscaInput) {
    buscaInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            var termo = this.value.toLowerCase();
            
            // Mapeamento de termos para views
            var termos = {
                'dashboard': 'dashboard',
                'maquina': 'maquinas',
                'trator': 'maquinas',
                'colheitadeira': 'maquinas',
                'clima': 'clima',
                'tempo': 'clima',
                'cultura': 'culturas',
                'soja': 'culturas',
                'milho': 'culturas',
                'trigo': 'culturas',
                'solo': 'solo',
                'análise': 'solo',
                'praga': 'pragas',
                'pragas': 'pragas',
                'irrigação': 'irrigacao',
                'irrigar': 'irrigacao',
                'colheita': 'colheita',
                'financeiro': 'financeiro',
                'dinheiro': 'financeiro',
                'mapa': 'mapas',
                'mapas': 'mapas',
                'relatório': 'relatorios',
                'relatorios': 'relatorios',
                'config': 'configuracoes',
                'configuração': 'configuracoes'
            };
            
            for (var key in termos) {
                if (termo.indexOf(key) > -1) {
                    openView(termos[key]);
                    this.value = '';
                    break;
                }
            }
        }
    });
}

// Opcional: também procurar ao digitar (sem Enter)
var buscaInput = document.getElementById('global-search');
if (buscaInput) {
    buscaInput.addEventListener('input', function() {
        var termo = this.value.toLowerCase().trim();
        if (termo.length < 3) return;
        
        // Mostra sugestão simples
        var sugestoes = [];
        if ('clima'.indexOf(termo) > -1) sugestoes.push('Clima');
        if ('maquina'.indexOf(termo) > -1 || 'trator'.indexOf(termo) > -1) sugestoes.push('Máquinas');
        if ('cultura'.indexOf(termo) > -1) sugestoes.push('Culturas');
        if ('solo'.indexOf(termo) > -1) sugestoes.push('Solo');
        if ('colheita'.indexOf(termo) > -1) sugestoes.push('Colheita');
        if ('praga'.indexOf(termo) > -1) sugestoes.push('Pragas');
        
        if (sugestoes.length > 0) {
            // Você pode mostrar um popup de sugestões aqui se quiser
            console.log('Sugestões: ' + sugestoes.join(', '));
        }
    });
}

// ========== NOVA MÁQUINA ==========
function openModal(modalName) {
    if (modalName === 'add-machine') {
        var html = '<div id="modal-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000;" onclick="if(event.target===this)this.remove();">' +
            '<div style="background:#252526;border:1px solid #3c3c3c;border-radius:8px;padding:30px;width:400px;">' +
            '<h2 style="color:#fff;margin-bottom:20px;"><i class="fas fa-plus"></i> Nova Máquina</h2>' +
            '<form onsubmit="event.preventDefault();salvarMaquina();">' +
            '<div style="margin-bottom:15px;"><label style="color:#858585;display:block;margin-bottom:5px;">Nome</label><input type="text" id="nova-maquina-nome" required style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #3c3c3c;border-radius:5px;color:#fff;"></div>' +
            '<div style="margin-bottom:15px;"><label style="color:#858585;display:block;margin-bottom:5px;">Tipo</label><select id="nova-maquina-tipo" style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #3c3c3c;border-radius:5px;color:#fff;"><option value="Trator">Trator</option><option value="Colheitadeira">Colheitadeira</option><option value="Pulverizador">Pulverizador</option><option value="Plantadeira">Plantadeira</option><option value="Semeadora">Semeadora</option></select></div>' +
            '<div style="margin-bottom:15px;"><label style="color:#858585;display:block;margin-bottom:5px;">Área</label><select id="nova-maquina-area" style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #3c3c3c;border-radius:5px;color:#fff;"><option value="Área A">Área A</option><option value="Área B">Área B</option><option value="Área C">Área C</option><option value="Área D">Área D</option><option value="Área E">Área E</option></select></div>' +
            '<div style="margin-bottom:20px;"><label style="color:#858585;display:block;margin-bottom:5px;">Horas de Uso</label><input type="number" id="nova-maquina-horas" value="0" style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #3c3c3c;border-radius:5px;color:#fff;"></div>' +
            '<div style="display:flex;gap:10px;"><button type="submit" class="btn btn-primary" style="flex:1;">Salvar</button><button type="button" onclick="document.getElementById(\'modal-overlay\').remove();" class="btn btn-secondary" style="flex:1;">Cancelar</button></div>' +
            '</form></div></div>';
        
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

function salvarMaquina() {
    var nome = document.getElementById('nova-maquina-nome').value;
    var tipo = document.getElementById('nova-maquina-tipo').value;
    var area = document.getElementById('nova-maquina-area').value;
    var horas = document.getElementById('nova-maquina-horas').value;
    
    // Define imagem berdasarkan tipo
    var img = '';
    if (tipo === 'Trator') img = '🚜';
    else if (tipo === 'Colheitadeira') img = '🌾';
    else if (tipo === 'Pulverizador') img = '💨';
    else if (tipo === 'Plantadeira') img = '🌱';
    else if (tipo === 'Semeadora') img = '🌿';
    
    // Adiciona na tabela
    var tbody = document.getElementById('machine-table-body');
    var newRow = tbody.insertRow();
    newRow.innerHTML = '<td>' + img + '</td>' +
        '<td><strong>' + nome + '</strong></td>' +
        '<td>' + tipo + '</td>' +
        '<td><span class="status-badge status-ativa">ativa</span></td>' +
        '<td>' + horas + 'h</td>' +
        '<td>100h</td>' +
        '<td>' + area + '</td>' +
        '<td><button class="btn btn-primary btn-small" onclick="alert(\'Máquina: ' + nome + '\')">Ver</button></td>';
    
    // Remove modal
    document.getElementById('modal-overlay').remove();
    
    alert('✅ Máquina "' + nome + '"cadastrada com sucesso!');
}

// ========== TOOLBAR - BOTÕES ==========

// Notificações
function toggleNotifications() {
    var html = '<div id="modal-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000;" onclick="if(event.target===this)this.remove();">' +
        '<div style="background:#252526;border:1px solid #3c3c3c;border-radius:8px;padding:20px;width:350px;max-height:400px;overflow-y:auto;">' +
        '<h2 style="color:#fff;margin-bottom:15px;"><i class="fas fa-bell"></i> Notificações</h2>' +
        '<div style="background:#1e1e1e;border-radius:8px;padding:15px;margin-bottom:10px;">' +
        '<div style="color:#fff;font-weight:bold;">🚨 Manutenção - Pulverizador</div>' +
        '<div style="color:#858585;font-size:12px;">Próximo serviço em 50h</div>' +
        '<div style="color:#858585;font-size:11px;">Há 2 horas</div>' +
        '</div>' +
        '<div style="background:#1e1e1e;border-radius:8px;padding:15px;margin-bottom:10px;">' +
        '<div style="color:#fff;font-weight:bold;">⚠️ Praga detectada</div>' +
        '<div style="color:#858585;font-size:12px;">Área de Milho</div>' +
        '<div style="color:#858585;font-size:11px;">Há 4 horas</div>' +
        '</div>' +
        '<div style="background:#1e1e1e;border-radius:8px;padding:15px;margin-bottom:10px;">' +
        '<div style="color:#fff;font-weight:bold;">📅 Colheita próxima</div>' +
        '<div style="color:#858585;font-size:12px;">Trigo - Area C em 30 dias</div>' +
        '<div style="color:#858585;font-size:11px;">Há 1 dia</div>' +
        '</div>' +
        '<button onclick="document.getElementById(\'modal-overlay\').remove();" class="btn btn-secondary" style="width:100%;margin-top:10px;">Fechar</button>' +
        '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

// Calendário
function toggleCalendar() {
    var html = '<div id="modal-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000;" onclick="if(event.target===this)this.remove();">' +
        '<div style="background:#252526;border:1px solid #3c3c3c;border-radius:8px;padding:20px;width:400px;">' +
        '<h2 style="color:#fff;margin-bottom:15px;"><i class="fas fa-calendar"></i> Calendário Agrícola</h2>' +
        '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;text-align:center;margin-bottom:15px;">' +
        '<div style="color:#858585;font-size:11px;">Dom</div><div style="color:#858585;font-size:11px;">Seg</div><div style="color:#858585;font-size:11px;">Ter</div><div style="color:#858585;font-size:11px;">Qua</div><div style="color:#858585;font-size:11px;">Qui</div><div style="color:#858585;font-size:11px;">Sex</div><div style="color:#858585;font-size:11px;">Sáb</div>' +
        '<div style="background:#1e1e1e;padding:10px;border-radius:5px;color:#858585;">1</div>' +
        '<div style="background:#1e1e1e;padding:10px;border-radius:5px;color:#858585;">2</div>' +
        '<div style="background:#4ec9b0;padding:10px;border-radius:5px;color:#1e1e1e;font-weight:bold;">3</div>' +
        '<div style="background:#1e1e1e;padding:10px;border-radius:5px;color:#858585;">4</div>' +
        '<div style="background:#1e1e1e;padding:10px;border-radius:5px;color:#858585;">5</div>' +
        '<div style="background:#1e1e1e;padding:10px;border-radius:5px;color:#858585;">6</div>' +
        '<div style="background:#1e1e1e;padding:10px;border-radius:5px;color:#858585;">7</div>' +
        '</div>' +
        '<h3 style="color:#fff;margin-bottom:10px;">Próximos Eventos</h3>' +
        '<div style="color:#858585;padding:10px;border-bottom:1px solid #3c3c3c;">🌾 Colheita Trigo - Área C<br><span style="color:#4ec9b0;">03/02</span></div>' +
        '<div style="color:#858585;padding:10px;border-bottom:1px solid #3c3c3c;">🌽 Plantio Milho - Área B<br><span style="color:#cca700;">10/02</span></div>' +
        '<div style="color:#858585;padding:10px;border-bottom:1px solid #3c3c3c;">🫘 colheita Soja - Área A<br><span style="color:#f14c4c;">15/02</span></div>' +
        '<button onclick="document.getElementById(\'modal-overlay\').remove();" class="btn btn-secondary" style="width:100%;margin-top:15px;">Fechar</button>' +
        '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

// Widget do Clima (mini)
function toggleWeatherWidget() {
    var html = '<div id="modal-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000;" onclick="if(event.target===this)this.remove();">' +
        '<div style="background:#252526;border:1px solid #3c3c3c;border-radius:8px;padding:20px;width:300px;">' +
        '<h2 style="color:#fff;margin-bottom:15px;"><i class="fas fa-cloud-sun"></i> Clima Rápido</h2>' +
        '<div style="text-align:center;padding:20px;">' +
        '<div style="font-size:48px;color:#ffc107;"><i class="fas fa-sun"></i></div>' +
        '<div style="font-size:36px;font-weight:bold;color:#fff;">28°C</div>' +
        '<div style="color:#858585;">Ensolarado</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
        '<div style="background:#1e1e1e;padding:10px;border-radius:5px;text-align:center;">' +
        '<div style="color:#858585;font-size:11px;">Umidade</div>' +
        '<div style="color:#fff;font-weight:bold;">65%</div>' +
        '</div>' +
        '<div style="background:#1e1e1e;padding:10px;border-radius:5px;text-align:center;">' +
        '<div style="color:#858585;font-size:11px;">Vento</div>' +
        '<div style="color:#fff;font-weight:bold;">12 km/h</div>' +
        '</div>' +
        '</div>' +
        '<button onclick="openView(\'clima\');document.getElementById(\'modal-overlay\').remove();" class="btn btn-primary" style="width:100%;margin-top:15px;">Ver Clima Completo</button>' +
        '<button onclick="document.getElementById(\'modal-overlay\').remove();" class="btn btn-secondary" style="width:100%;margin-top:10px;">Fechar</button>' +
        '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

// Exportar Dados
function exportData() {
    var html = '<div id="modal-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000;" onclick="if(event.target===this)this.remove();">' +
        '<div style="background:#252526;border:1px solid #3c3c3c;border-radius:8px;padding:20px;width:350px;">' +
        '<h2 style="color:#fff;margin-bottom:15px;"><i class="fas fa-download"></i> Exportar Dados</h2>' +
        '<div onclick="alert(\'📥 Baixando relatório de máquinas...\');document.getElementById(\'modal-overlay\').remove();" style="padding:15px;background:#1e1e1e;border-radius:8px;margin-bottom:10px;cursor:pointer;">' +
        '<div style="color:#fff;font-weight:bold;"><i class="fas fa-tractor"></i> Máquinas</div>' +
        '<div style="color:#858585;font-size:12px;">Exportar lista de máquinas (CSV)</div>' +
        '</div>' +
        '<div onclick="alert(\'📥 Baixando dados financeiros...\');document.getElementById(\'modal-overlay\').remove();" style="padding:15px;background:#1e1e1e;border-radius:8px;margin-bottom:10px;cursor:pointer;">' +
        '<div style="color:#fff;font-weight:bold;"><i class="fas fa-dollar-sign"></i> Financeiro</div>' +
        '<div style="color:#858585;font-size:12px;">Exportar financial (CSV)</div>' +
        '</div>' +
        '<div onclick="alert(\'📥 Baixando culturas...\');document.getElementById(\'modal-overlay\').remove();" style="padding:15px;background:#1e1e1e;border-radius:8px;margin-bottom:10px;cursor:pointer;">' +
        '<div style="color:#fff;font-weight:bold;"><i class="fas fa-seedling"></i> Culturas</div>' +
        '<div style="color:#858585;font-size:12px;">Exportar culturas (CSV)</div>' +
        '</div>' +
        '<div onclick="alert(\'📥 Baixando relatório completo...\');document.getElementById(\'modal-overlay\').remove();" style="padding:15px;background:#1e1e1e;border-radius:8px;margin-bottom:10px;cursor:pointer;">' +
        '<div style="color:#fff;font-weight:bold;"><i class="fas fa-file-alt"></i> Relatório Geral</div>' +
        '<div style="color:#858585;font-size:12px;">Exportar tudo (PDF)</div>' +
        '</div>' +
        '<button onclick="document.getElementById(\'modal-overlay\').remove();" class="btn btn-secondary" style="width:100%;margin-top:10px;">Cancelar</button>' +
        '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
} 

// ========== SISTEMA DE ABAS ==========
var abasAbertas = ['dashboard'];
var abaAtiva = 'dashboard';

function openView(viewName) {
    // Se a view já está aberta, só mostra ela
    if (abasAbertas.indexOf(viewName) === -1) {
        abasAbertas.push(viewName);
    }
    
    // Esconde todas as views
    var views = document.querySelectorAll('.view');
    for (var i = 0; i < views.length; i++) {
        views[i].classList.remove('active');
    }
    
    // Mostra a view clicada
    var view = document.getElementById('view-' + viewName);
    if (view) {
        view.classList.add('active');
    }
    
    // Atualiza abas
    renderAbas();
    
    // Atualiza menu
    var folders = document.querySelectorAll('.folder-item');
    for (var i = 0; i < folders.length; i++) {
        folders[i].classList.remove('active');
        if (folders[i].getAttribute('onclick') && folders[i].getAttribute('onclick').indexOf(viewName) > -1) {
            folders[i].classList.add('active');
        }
    }
    
    abaAtiva = viewName;
}

function renderAbas() {
    var container = document.getElementById('tabs-container');
    var nombres = {
        'dashboard': '📊 Dashboard',
        'maquinas': '🚜 Máquinas',
        'clima': '🌤️ Clima',
        'culturas': '🌾 Culturas',
        'solo': '🪨 Solo',
        'pragas': '🐛 Pragas',
        'irrigacao': '💧 Irrigação',
        'colheita': '🌽 Colheita',
        'financeiro': '💰 Financeiro',
        'mapas': '🗺️ Mapas',
        'relatorios': '📈 Relatórios',
        'configuracoes': '⚙️ Config'
    };
    
    var html = '';
    for (var i = 0; i < abasAbertas.length; i++) {
        var aba = abasAbertas[i];
        var active = aba === abaAtiva ? 'active' : '';
        html += '<div class="tab ' + active + '" onclick="openView(\'' + aba + '\')">' +
            '<span>' + (nombres[aba] || aba) + '</span>' +
            '<i class="fas fa-times" onclick="event.stopPropagation();fecharAba(\'' + aba + '\')" style="margin-left:8px;font-size:10px;"></i>' +
            '</div>';
    }
    
    container.innerHTML = html;
}

function fecharAba(aba) {
    var idx = abasAbertas.indexOf(aba);
    if (idx > -1) {
        abasAbertas.splice(idx, 1);
        
        // Se fechou a aba ativa, abre outra
        if (aba === abaAtiva && abasAbertas.length > 0) {
            var novaAba = abasAbertas[Math.max(0, idx - 1)];
            openView(novaAba);
        } else {
            renderAbas();
        }
    }
} 

// ========== GRÁFICOS DO DASHBOARD ==========
function loadGraficos() {
    // Verifica se Chart.js está carregado
    if (typeof Chart === 'undefined') {
        console.log('Chart.js não carregou');
        return;
    }
    
    // Gráfico 1: Produção por Cultura
    var ctx1 = document.getElementById('productionChart');
    if (ctx1 && !ctx1.chart) {
        ctx1.chart = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Soja', 'Milho', 'Trigo', 'Algodão', 'Feijão', 'Café'],
                datasets: [{
                    label: 'Produção (kg/ha)',
                    data: [3500, 8000, 4000, 1500, 2000, 800],
                    backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#9C27B0', '#795548', '#607D8B']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { ticks: { color: '#858585' }, grid: { color: '#3c3c3c' } },
                    x: { ticks: { color: '#858585' }, grid: { color: '#3c3c3c' } }
                }
            }
        });
    }
    
    // Gráfico 2: Distribuição de Áreas
    var ctx2 = document.getElementById('areasChart');
    if (ctx2 && !ctx2.chart) {
        ctx2.chart = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Soja', 'Milho', 'Trigo', 'Algodão', 'Cana', 'Outros'],
                datasets: [{
                    data: [250, 180, 120, 80, 150, 70],
                    backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#9C27B0', '#8BC34A', '#607D8B']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: '#858585' } } }
            }
        });
    }
    
    // Gráfico 3: Temperatura 7 dias
    var ctx3 = document.getElementById('weatherChart');
    if (ctx3 && !ctx3.chart) {
        ctx3.chart = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Temperatura (°C)',
                    data: [28, 26, 24, 25, 27, 29, 30],
                    borderColor: '#FFC107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { ticks: { color: '#858585' }, grid: { color: '#3c3c3c' } },
                    x: { ticks: { color: '#858585' }, grid: { color: '#3c3c3c' } }
                }
            }
        });
    }
    
    // Gráfico 4: Despesas vs Receitas
    var ctx4 = document.getElementById('financeChart');
    if (ctx4 && !ctx4.chart) {
        ctx4.chart = new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                    {
                        label: 'Receitas',
                        data: [450000, 380000, 520000, 410000, 480000, 550000],
                        backgroundColor: '#4CAF50'
                    },
                    {
                        label: 'Despesas',
                        data: [180000, 220000, 190000, 250000, 210000, 200000],
                        backgroundColor: '#F44336'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#858585' } } },
                scales: {
                    y: { ticks: { color: '#858585' }, grid: { color: '#3c3c3c' } },
                    x: { ticks: { color: '#858585' }, grid: { color: '#3c3c3c' } }
                }
            }
        });
    }
    
    console.log('✅ Gráficos carregados!');
}

// Carrega gráficos ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadGraficos();
});

// ========== CLIQUE NOS BOTÕES DE PERÍODO ==========
// Espera um poco e depois configura os cliques
setTimeout(function() {
    var botoes = document.querySelectorAll('.chart-btn');
    botoes.forEach(function(btn) {
        btn.onclick = function(e) {
            // Nãofecha a view
            e.stopPropagation();
            
            // Remove active de todos do mesmo grupo
            var container = this.parentElement;
            container.querySelectorAll('.chart-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            var periodo = this.getAttribute('data-period');
            
            // Encontrao chartcontainerpai
            var chartContainer = this.closest('.chart-container');
            var titulo = chartContainer.querySelector('h3').textContent;
            
            console.log('Clicou: ' + periodo + ' em ' + titulo);
            
            // Atualiza gráfico de Produção
            if (titulo.indexOf('Produção') > -1) {
                var ctx = document.getElementById('productionChart');
                if (ctx && ctx.chart) {
                    var dados;
                    if (periodo === 'ano') {
                        ctx.chart.data.labels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                        dados = [3500,4200,3800,4500,5200,4800,3500,4000,5500,6000,5800,6500];
                    } else if (periodo === 'mes') {
                        ctx.chart.data.labels = ['Sem 1','Sem 2','Sem 3','Sem 4'];
                        dados = [3500,2800,4200,3800];
                    } else if (periodo === 'semana') {
                        ctx.chart.data.labels = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
                        dados = [1200,1500,1100,1800,1400,1600,1300];
                    }
                    ctx.chart.data.datasets[0].data = dados;
                    ctx.chart.update();
                }
            }
            
            // Atualiza gráfico Financeiro
            if (titulo.indexOf('Despesas') > -1 || titulo.indexOf('Receitas') > -1) {
                var ctx = document.getElementById('financeChart');
                if (ctx && ctx.chart) {
                    if (periodo === 'ano') {
                        ctx.chart.data.labels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
                        ctx.chart.data.datasets[0].data = [450000,380000,520000,410000,480000,550000,420000,390000,510000,460000,580000,620000];
                        ctx.chart.data.datasets[1].data = [180000,220000,190000,250000,210000,200000,230000,190000,220000,240000,180000,210000];
                    } else if (periodo === 'trimestre') {
                        ctx.chart.data.labels = ['Jan','Fev','Mar'];
                        ctx.chart.data.datasets[0].data = [450000,380000,520000];
                        ctx.chart.data.datasets[1].data = [180000,220000,190000];
                    }
                    ctx.chart.update();
                }
            }
        };
    });
}, 1000); // Espera 1 segundo depois de carrega

// ========== BOTÕES DO DASHBOARD ==========

// Atualizar Dashboard
function refreshDashboard() {
    // Atualiza KPIs com valores aleatórios
    var temp = 25 + Math.floor(Math.random() * 10);
    var el = document.getElementById('kpi-temperatura');
    if (el) el.textContent = temp + '°C';
    
    var sens = document.getElementById('kpi-temp-trend');
    if (sens) sens.textContent = 'Sensação: ' + (temp + 2) + '°C';
    
    var umid = 55 + Math.floor(Math.random() * 30);
    var el = document.getElementById('kpi-umidade');
    if (el) el.textContent = umid + '%';
    
    var el = document.getElementById('kpi-alertas');
    if (el) {
        var num = Math.floor(Math.random() * 5) + 1;
        el.textContent = num;
    }
    
    // Atualiza gráficos
    var prods = document.getElementById('productionChart');
    if (prods && prods.chart) {
        var dados = [];
        for (var i = 0; i < prods.chart.data.labels.length; i++) {
            dados.push(Math.floor(Math.random() * 8000) + 1000);
        }
        prods.chart.data.datasets[0].data = dados;
        prods.chart.update();
    }
    
    var fin = document.getElementById('financeChart');
    if (fin && fin.chart) {
        var rece = [], desp = [];
        for (var i = 0; i < fin.chart.data.labels.length; i++) {
            rece.push(Math.floor(Math.random() * 600000) + 100000);
            desp.push(Math.floor(Math.random() * 300000) + 50000);
        }
        fin.chart.data.datasets[0].data = rece;
        fin.chart.data.datasets[1].data = desp;
        fin.chart.update();
    }
    
    var areas = document.getElementById('areasChart');
    if (areas && areas.chart) {
        var dados = [];
        for (var i = 0; i < 6; i++) {
            dados.push(Math.floor(Math.random() * 300));
        }
        areas.chart.data.datasets[0].data = dados;
        areas.chart.update();
    }
    
    var temp = document.getElementById('weatherChart');
    if (temp && temp.chart) {
        var temps = [];
        for (var i = 0; i < 7; i++) {
            temps.push(20 + Math.floor(Math.random() * 15));
        }
        temp.chart.data.datasets[0].data = temps;
        temp.chart.update();
    }
    
    alert('✅ Dashboard atualizado!\n\n📊 Novos dados carregados');
}

// Tela Cheia
function openFullscreen() {
    var elem = document.documentElement;
    
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
}

// Também marca todos como lidos
function markAllRead() {
    document.querySelectorAll('.alert-action').forEach(function(btn) {
        btn.innerHTML = '<i class="fas fa-check" style="color:#4ec9b0;"></i>';
    });
    var badge = document.getElementById('notification-badge');
    if (badge) badge.textContent = '0';
    alert('✅ Todas as notificações marcadas como lidas!');
}

// Adiciona onclick no	user-info automaticamente
document.addEventListener('DOMContentLoaded', function() {
    // Esperaum poco
    setTimeout(function() {
        var userInfo = document.querySelector('.user-info');
        if (userInfo) {
            userInfo.setAttribute('onclick', 'openPerfil()');
            userInfo.style.cursor = 'pointer';
            userInfo.title = 'Clique para editar perfil';
        }
        
        var userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.style.cursor = 'pointer';
        }
    }, 500);
});

// ========== PERFIL - VERSÃO SIMPLES ==========
function openPerfil() {
    // Remove modal antigo se existir
    var antigo = document.getElementById('modal-perfil');
    if (antigo) antigo.remove();
    
    var html = '<div id="modal-perfil" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:2000;">' +
        '<div style="background:#252526;border:1px solid #3c3c3c;border-radius:8px;padding:30px;width:350px;">' +
        '<h2 style="color:#fff;margin-bottom:20px;">✏️ Editar Perfil</h2>' +
        
        '<div style="text-align:center;margin-bottom:20px;">' +
        '<div id="avatar-preview" style="width:80px;height:80px;background:#007fd4;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:32px;color:#fff;margin-bottom:10px;">AT</div>' +
        '<div><button onclick="mudarAvatar()" style="background:#3c3c3c;border:none;color:#858585;padding:5px 10px;border-radius:5px;cursor:pointer;">🔄 Mudar Avatar</button></div>' +
        '</div>' +
        
        '<div style="margin-bottom:15px;"><label style="color:#858585;font-size:11px;">Nome</label><input type="text" id="perfil-nome" value="AgroTech User" style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #3c3c3c;border-radius:5px;color:#fff;"></div>' +
        '<div style="margin-bottom:15px;"><label style="color:#858585;font-size:11px;">Email</label><input type="email" id="perfil-email" value="agrotech@fazenda.com" style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #3c3c3c;border-radius:5px;color:#fff;"></div>' +
        '<div style="margin-bottom:20px;"><label style="color:#858585;font-size:11px;">Fazenda</label><input type="text" id="perfil-fazenda" value="Fazenda AgroTech" style="width:100%;padding:10px;background:#1e1e1e;border:1px solid #3c3c3c;border-radius:5px;color:#fff;"></div>' +
        
        '<div style="display:flex;gap:10px;"><button onclick="salvarPerfil()" style="flex:1;padding:10px;background:#007fd4;border:none;border-radius:5px;color:#fff;cursor:pointer;">Salvar</button><button onclick="document.getElementById(\'modal-perfil\').remove()" style="flex:1;padding:10px;background:#3c3c3c;border:1px solid #3c3c3c;border-radius:5px;color:#858585;cursor:pointer;">Cancelar</button></div>' +
        '</div></div>';
    
    document.body.innerHTML += html;
}

function mudarAvatar() {
    var avatars = ['AT', 'AG', 'JD', 'MF', 'NH', 'KH', '🌾', '🚜', '🌽'];
    var cores = ['#007fd4', '#4CAF50', '#FF9800', '#E91E63', '#9C27B0'];
    var avatar = avatars[Math.floor(Math.random() * avatars.length)];
    var cor = cores[Math.floor(Math.random() * cores.length)];
    var el = document.getElementById('avatar-preview');
    el.textContent = avatar;
    el.style.background = cor;
}

function salvarPerfil() {
    var nome = document.getElementById('perfil-nome').value;
    var email = document.getElementById('perfil-email').value;
    var fazenda = document.getElementById('perfil-fazenda').value;
    var avatar = document.getElementById('avatar-preview');
    var avText = avatar.textContent;
    var avCor = avatar.style.background;
    
    // Atualiza sidebar
    var users = document.querySelectorAll('.user-name');
    users.forEach(function(u) { u.textContent = nome; });
    
    var avs = document.querySelectorAll('.user-avatar');
    avs.forEach(function(a) { 
        a.textContent = avText; 
        a.style.background = avCor;
    });
    
    document.getElementById('modal-perfil').remove();
    alert('✅ Perfil salvo!');
}

// ========== GRÁFICOS COM PERÍODOS ==========
var periodoAtual = 'ano';

function mudarPeriodo(elemento, tipo) {
    // Remove classe active de todos os botões
    var botoes = elemento.parentElement.querySelectorAll('.chart-btn');
    for (var i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove('active');
    }
    elemento.classList.add('active');
    
    var periodo = elemento.getAttribute('data-period');
    periodoAtual = periodo;
    
    // Atualiza gráficos baseado no período
    if (tipo === 'producao') {
        atualizarGraficoProducao(periodo);
    } else if (tipo === 'financeiro') {
        atualizarGraficoFinanceiro(periodo);
    }
}

function atualizarGraficoProducao(periodo) {
    var ctx = document.getElementById('productionChart');
    if (!ctx || !ctx.chart) return;
    
    var dados, labels;
    if (periodo === 'ano') {
        labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        dados = [3500, 4200, 3800, 4500, 5200, 4800, 3500, 4000, 5500, 6000, 5800, 6500];
    } else if (periodo === 'mes') {
        labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
        dados = [3500, 2800, 4200, 3800];
    } else if (periodo === 'semana') {
        labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
        dados = [1200, 1500, 1100, 1800, 1400, 1600, 1300];
    }
    
    ctx.chart.data.labels = labels;
    ctx.chart.data.datasets[0].data = dados;
    ctx.chart.update();
}

function atualizarGraficoFinanceiro(periodo) {
    var ctx = document.getElementById('financeChart');
    if (!ctx || !ctx.chart) return;
    
    var labels, receitas, despesas;
    if (periodo === 'ano') {
        labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        receitas = [450000, 380000, 520000, 410000, 480000, 550000, 420000, 390000, 510000, 460000, 580000, 620000];
        despesas = [180000, 220000, 190000, 250000, 210000, 200000, 230000, 190000, 220000, 240000, 180000, 210000];
    } else if (periodo === 'trimestre') {
        labels = ['Jan', 'Fev', 'Mar'];
        receitas = [450000, 380000, 520000];
        despesas = [180000, 220000, 190000];
    }
    
    ctx.chart.data.labels = labels;
    ctx.chart.data.datasets[0].data = receitas;
    ctx.chart.data.datasets[1].data = despesas;
    ctx.chart.update();
}

// Atualiza os cliques dos botões
document.addEventListener('DOMContentLoaded', function() {
    // Botões de produção
    var prodBotoes = document.querySelectorAll('#productionChart ~ .chart-actions .chart-btn, #view-dashboard .charts-row:first-child .chart-btn');
    for (var i = 0; i < prodBotoes.length; i++) {
        prodBotoes[i].onclick = function() {
            mudarPeriodo(this, 'producao');
        };
    }
    
    // Botões de financeiro
    var finBotoes = document.querySelectorAll('#financeChart ~ .chart-actions .chart-btn, #view-dashboard .charts-row:last-child .chart-btn');
    for (var i = 0; i < finBotoes.length; i++) {
        finBotoes[i].onclick = function() {
            mudarPeriodo(this, 'financeiro');
        };
    }
});

// ========== EXPORTAR MÁQUINAS ==========
function exportMachines() {
    var html = '<div id="modal-perfil" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:2000;">' +
        '<div style="background:#252526;border:1px solid #3c3c3c;border-radius:8px;padding:30px;width:350px;">' +
        '<h2 style="color:#fff;margin-bottom:20px;">⬇️ Exportar Máquinas</h2>' +
        
        '<div onclick="downloadMachines(\'csv\')" style="padding:15px;background:#1e1e1e;border-radius:8px;margin-bottom:10px;cursor:pointer;">' +
        '<div style="color:#fff;font-weight:bold;">📄 CSV</div>' +
        '<div style="color:#858585;font-size:12px;">Planilha (Excel/Google Sheets)</div>' +
        '</div>' +
        
        '<div onclick="downloadMachines(\'json\')" style="padding:15px;background:#1e1e1e;border-radius:8px;margin-bottom:10px;cursor:pointer;">' +
        '<div style="color:#fff;font-weight:bold;">📋 JSON</div>' +
        '<div style="color:#858585;font-size:12px;">Dados structurados</div>' +
        '</div>' +
        
        '<div onclick="downloadMachines(\'txt\')" style="padding:15px;background:#1e1e1e;border-radius:8px;margin-bottom:10px;cursor:pointer;">' +
        '<div style="color:#fff;font-weight:bold;">📝 TXT</div>' +
        '<div style="color:#858585;font-size:12px;">Arquivo de texto</div>' +
        '</div>' +
        
        '<button onclick="document.getElementById(\'modal-perfil\').remove()" style="width:100%;padding:10px;background:#3c3c3c;border:1px solid #3c3c3c;border-radius:5px;color:#858585;cursor:pointer;margin-top:10px;">Cancelar</button>' +
        '</div></div>';
    
    document.body.innerHTML += html;
}

function downloadMachines(formato) {
    var dados = [
        { nome: 'Trator John Deere 8R', tipo: 'Trator', status: 'ativa', horas: 1250, manut: 50, area: 'Área A' },
        { nome: 'Colheitadeira Case IH', tipo: 'Colheitadeira', status: 'ativa', horas: 890, manut: 110, area: 'Área B' },
        { nome: 'Pulverizador John Deere', tipo: 'Pulverizador', status: 'manutencao', horas: 2100, manut: 0, area: 'Área C' },
        { nome: 'Plantadeira Kuhn', tipo: 'Plantadeira', status: 'inativa', horas: 450, manut: 200, area: 'Área A' },
        { nome: 'Trator Massey Ferguson', tipo: 'Trator', status: 'ativa', horas: 780, manut: 120, area: 'Área D' }
    ];
    
    if (formato === 'csv') {
        var csv = 'Nome,Tipo,Status,Horas,Manutenção,Área\n';
        dados.forEach(function(d) {
            csv += d.nome + ',' + d.tipo + ',' + d.status + ',' + d.horas + ',' + d.manut + ',' + d.area + '\n';
        });
        
        var blob = new Blob([csv], { type: 'text/csv' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'maquinas.csv';
        a.click();
    } 
    else if (formato === 'json') {
        var json = JSON.stringify(dados, null, 2);
        var blob = new Blob([json], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'maquinas.json';
        a.click();
    }
    else if (formato === 'txt') {
        var txt = 'MÁQUINAS AGRÍCOLAS\n================\n\n';
        dados.forEach(function(d) {
            txt += '- ' + d.nome + '\n  Tipo: ' + d.tipo + '\n  Status: ' + d.status + '\n  Horas: ' + d.horas + '\n  Área: ' + d.area + '\n\n';
        });
        
        var blob = new Blob([txt], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'maquinas.txt';
        a.click();
    }
    
    document.getElementById('modal-perfil').remove();
    alert('✅ Máquinas exportadas!\n\n📁 Formato: ' + formato.toUpperCase());
}

// ========== CORRIGIR ÍCONES SOJA E CAFÉ ==========
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // Procura todas as culturais
        var cards = document.querySelectorAll('#view-culturas .cultura-card');
        cards.forEach(function(card) {
            var texto = card.textContent || '';
            var iconDiv = card.querySelector('div:first-child');
            
            if (texto.indexOf('Soja') > -1) {
                iconDiv.innerHTML = '<i class="fas fa-leaf" style="font-size:40px;color:#4CAF50;"></i>';
            } else if (texto.indexOf('Milho') > -1) {
                iconDiv.innerHTML = '<i class="fas fa-wheat-awn" style="font-size:40px;color:#FFC107;"></i>';
            } else if (texto.indexOf('Trigo') > -1) {
                iconDiv.innerHTML = '<i class="fas fa-wheat" style="font-size:40px;color:#FF9800;"></i>';
            } else if (texto.indexOf('Algodão') > -1) {
                iconDiv.innerHTML = '<i class="fas fa-cloud" style="font-size:40px;color:#9C27B0;"></i>';
            } else if (texto.indexOf('Feijão') > -1) {
                iconDiv.innerHTML = '<i class="fas fa-seedling" style="font-size:40px;color:#8BC34A;"></i>';
            } else if (texto.indexOf('Café') > -1) {
                iconDiv.innerHTML = '<i class="fas fa-mug-hot" style="font-size:40px;color:#795548;"></i>';
            }
        });
        
        console.log('✅ Ícones da Cultura corrigidos!');
    }, 500);
});

// ========== CORRIGE SOJA E FEIJÃO ==========
function corrigeIcones() {
    var culturasView = document.getElementById('view-culturas');
    if (!culturasView) return;
    
    var html = culturasView.innerHTML;
    
    // Substitui todos os 🫘 por ícones corretos
    // Primeiro替换pormeio (Soja)
    html = html.replace('🫘', '<i class="fas fa-leaf" style="font-size:40px;color:#4CAF50;"></i>');
    
    culturasView.innerHTML = html;
}

// Corrige ao abrir culturas
var openViewAntigo2 = openView;
openView = function(viewName) {
    openViewAntigo2(viewName);
    if (viewName === 'culturas') {
        setTimeout(corrigeIcones, 100);
    }
};


// Roda tudo junto
setTimeout(function() {
    corrigeIcones();
    corrigeIconesSolo();
    corrigeExplorer();
}, 2000);

// ========== CORRIGE TUDO DIRETO NO DOM ==========
function corrigirIcones() {
    // === SOLO - KPIs ===
    var soloKpis = document.querySelectorAll('#view-solo .kpi-card');
    soloKpis.forEach(function(kpi, i) {
        var icon = kpi.querySelector('.kpi-icon');
        if (icon) {
            if (i === 0) icon.innerHTML = '<i class="fas fa-vial"></i>';
            if (i === 1) icon.innerHTML = '<i class="fas fa-droplet"></i>';
            if (i === 2) icon.innerHTML = '<i class="fas fa-leaf"></i>';
        }
    });
    
    // === EXPLORER - Sidebar ===
    var folders = document.querySelectorAll('.folder-item span');
    folders.forEach(function(span) {
        var texto = span.textContent.trim();
        
        if (texto.indexOf('Dashboard') > -1) {
            span.innerHTML = '<i class="fas fa-chart-line"></i> Dashboard';
        } else if (texto.indexOf('Máquinas') > -1) {
            span.innerHTML = '<i class="fas fa-tractor"></i> Máquinas';
        } else if (texto.indexOf('Clima') > -1) {
            span.innerHTML = '<i class="fas fa-cloud-sun"></i> Clima';
        } else if (texto.indexOf('Culturas') > -1) {
            span.innerHTML = '<i class="fas fa-wheat-awn"></i> Culturas';
        } else if (texto.indexOf('Solo') > -1) {
            span.innerHTML = '<i class="fas fa-layer-group"></i> Análise Solo';
        } else if (texto.indexOf('Pragas') > -1) {
            span.innerHTML = '<i class="fas fa-bug"></i> Pragas';
        } else if (texto.indexOf('Irrigação') > -1) {
            span.innerHTML = '<i class="fas fa-tint"></i> Irrigação';
        } else if (texto.indexOf('Colheita') > -1) {
            span.innerHTML = '<i class="fas fa-calendar-check"></i> Colheita';
        } else if (texto.indexOf('Financeiro') > -1) {
            span.innerHTML = '<i class="fas fa-dollar-sign"></i> Financeiro';
        } else if (texto.indexOf('Mapas') > -1) {
            span.innerHTML = '<i class="fas fa-map"></i> Mapas';
        } else if (texto.indexOf('Relatórios') > -1) {
            span.innerHTML = '<i class="fas fa-chart-bar"></i> Relatórios';
        } else if (texto.indexOf('Config') > -1) {
            span.innerHTML = '<i class="fas fa-cog"></i> Configurações';
        }
    });
    
    console.log('✅ Tudo corrigido!');
}

// Roda quando abrir as views
var openViewOriginal = openView;
openView = function(viewName) {
    openViewOriginal(viewName);
    setTimeout(corrigirIcones, 200);
};

// Roda ao iniciar
setTimeout(corrigirIcones, 1000);



function enterApp(){
  document.getElementById('splash-screen').classList.add('hid');
  setTimeout(function(){
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
  }, 600);
}

/* ═══════════════════════════════════════════════════════════
   MÁQUINAS - JAVASCRIPT COMPLETO
   ═══════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────
// DADOS DAS MÁQUINAS
// ─────────────────────────────────────────────────────────
let maquinas = [
    { id: 1, nome: 'Trator John Deere 8R', serie: 'JD8R-2024-0156', tipo: 'Trator', status: 'ativa', horas: 1250, proxManut: 50, area: 'Área A', emoji: '🚜', cor: '#4CAF50' },
    { id: 2, nome: 'Colheitadeira Case IH', serie: 'CI-2023-0892', tipo: 'Colheitadeira', status: 'ativa', horas: 890, proxManut: 110, area: 'Área B', emoji: '🌾', cor: '#FF9800' },
    { id: 3, nome: 'Pulverizador John Deere', serie: 'JDPM-2024-0201', tipo: 'Pulverizador', status: 'manutencao', horas: 620, proxManut: 10, area: 'Área C', emoji: '🚿', cor: '#9C27B0' },
    { id: 4, nome: 'Plantadeira Massey', serie: 'MF-2023-0456', tipo: 'Plantadeira', status: 'ativa', horas: 450, proxManut: 50, area: 'Área A', emoji: '📦', cor: '#3498db' },
    { id: 5, nome: 'Semeadora John Deere', serie: 'JDSE-2024-0089', tipo: 'Semeadora', status: 'ativa', horas: 320, proxManut: 180, area: 'Área D', emoji: '🌱', cor: '#00ff88' }
];

let chartMaquinas = null;
let chartTipos = null;

// ─────────────────────────────────────────────────────────
// INICIALIZAR GRÁFICOS
// ─────────────────────────────────────────────────────────
function initChartsMaquinas() {
    // Gráfico de Barras - Uso por Máquina
    const ctxBarras = document.getElementById('usoMaquinasChart');
    if (ctxBarras) {
        chartMaquinas = new Chart(ctxBarras, {
            type: 'bar',
            data: {
                labels: maquinas.map(m => m.nome.split(' ')[0]),
                datasets: [{
                    label: 'Horas de Uso',
                    data: maquinas.map(m => m.horas),
                    backgroundColor: maquinas.map(m => m.cor + '80'),
                    borderColor: maquinas.map(m => m.cor),
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1a1a1f',
                        titleColor: '#00ff88',
                        bodyColor: '#fff',
                        borderColor: '#00ff88',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#858585' }
                    },
                    y: {
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#858585' }
                    }
                }
            }
        });
    }
    
    // Gráfico de Pizza - Distribuição por Tipo
    const ctxPizza = document.getElementById('tipoMaquinasChart');
    if (ctxPizza) {
        const tipos = [...new Set(maquina.map(m => m.tipo))];
        const qtdPorTipo = tipos.map(t => maquinas.filter(m => m.tipo === t).length);
        
        chartTipos = new Chart(ctxPizza, {
            type: 'doughnut',
            data: {
                labels: tipos,
                datasets: [{
                    data: qtdPorTipo,
                    backgroundColor: ['#4CAF50', '#FF9800', '#9C27B0', '#3498db', '#00ff88'],
                    borderColor: '#1a1a1f',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#fff',
                            padding: 15,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1a1a1f',
                        titleColor: '#00ff88',
                        bodyColor: '#fff',
                        borderColor: '#00ff88',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8
                    }
                }
            }
        });
    }
}

// ─────────────────────────────────────────────────────────
// MODAL DE ADICIONAR MÁQUINA
// ─────────────────────────────────────────────────────────
function abrirModalMaquina() {
    const modalHTML = `
        <div id="modal-maquina" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;display:flex;justify-content:center;align-items:center;">
            <div style="background:linear-gradient(145deg,#1a1a1f,#252526);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;width:90%;max-width:500px;max-height:90vh;overflow-y:auto;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <h2 style="color:#fff;font-size:18px;"><i class="fas fa-plus"></i> Nova Máquina</h2>
                    <button onclick="fecharModalMaquina()" style="background:none;border:none;color:#858585;font-size:20px;cursor:pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <form id="form-nova-maquina" onsubmit="salvarMaquina(event)">
                    <div style="margin-bottom:16px;">
                        <label style="display:block;color:#858585;font-size:12px;margin-bottom:6px;">Nome da Máquina</label>
                        <input type="text" id="nova-maquina-nome" required style="width:100%;padding:12px;background:#141418;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:14px;">
                    </div>
                    
                    <div style="margin-bottom:16px;">
                        <label style="display:block;color:#858585;font-size:12px;margin-bottom:6px;">Tipo</label>
                        <select id="nova-maquina-tipo" required style="width:100%;padding:12px;background:#141418;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:14px;">
                            <option value="Trator">Trator</option>
                            <option value="Colheitadeira">Colheitadeira</option>
                            <option value="Pulverizador">Pulverizador</option>
                            <option value="Plantadeira">Plantadeira</option>
                            <option value="Semeadora">Semeadora</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom:16px;">
                        <label style="display:block;color:#858585;font-size:12px;margin-bottom:6px;">Número de Série</label>
                        <input type="text" id="nova-maquina-serie" required style="width:100%;padding:12px;background:#141418;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:14px;">
                    </div>
                    
                    <div style="margin-bottom:16px;">
                        <label style="display:block;color:#858585;font-size:12px;margin-bottom:6px;">Horas de Uso</label>
                        <input type="number" id="nova-maquina-horas" value="0" required style="width:100%;padding:12px;background:#141418;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:14px;">
                    </div>
                    
                    <div style="margin-bottom:20px;">
                        <label style="display:block;color:#858585;font-size:12px;margin-bottom:6px;">Área</label>
                        <select id="nova-maquina-area" required style="width:100%;padding:12px;background:#141418;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;font-size:14px;">
                            <option value="Área A">Área A</option>
                            <option value="Área B">Área B</option>
                            <option value="Área C">Área C</option>
                            <option value="Área D">Área D</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width:100%;">
                        <i class="fas fa-save"></i> Salvar Máquina
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function fecharModalMaquina() {
    const modal = document.getElementById('modal-maquina');
    if (modal) modal.remove();
}

function salvarMaquina(event) {
    event.preventDefault();
    
    const novaMaquina = {
        id: maquinas.length + 1,
        nome: document.getElementById('nova-maquina-nome').value,
        serie: document.getElementById('nova-maquina-serie').value,
        tipo: document.getElementById('nova-maquina-tipo').value,
        status: 'ativa',
        horas: parseInt(document.getElementById('nova-maquina-horas').value),
        proxManut: 200,
        area: document.getElementById('nova-maquina-area').value,
        emoji: getEmojiTipo(document.getElementById('nova-maquina-tipo').value),
        cor: getCorTipo(document.getElementById('nova-maquina-tipo').value)
    };
    
    maquinas.push(novaMaquina);
    fecharModalMaquina();
    atualizarTabelaMaquinas();
    initChartsMaquinas();
    
    // Notificação
    showNotification('Máquina adicionada com sucesso!', 'success');
}

function getEmojiTipo(tipo) {
    const emojis = { 'Trator': '🚜', 'Colheitadeira': '🌾', 'Pulverizador': '🚿', 'Plantadeira': '📦', 'Semeadora': '🌱' };
    return emojis[tipo] || '⚙️';
}

function getCorTipo(tipo) {
    const cores = { 'Trator': '#4CAF50', 'Colheitadeira': '#FF9800', 'Pulverizador': '#9C27B0', 'Plantadeira': '#3498db', 'Semeadora': '#00ff88' };
    return cores[tipo] || '#858585';
}

// ─────────────────────────────────────────────────────────
// ATUALIZAR TABELA
// ─────────────────────────────────────────────────────────
function atualizarTabelaMaquinas() {
    const tbody = document.getElementById('machine-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = maquinas.map(m => `
        <tr style="transition: all 0.3s;">
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, ${m.cor}, ${m.cor}80); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                        ${m.emoji}
                    </div>
                    <div>
                        <div style="font-weight: 600; color: var(--text);">${m.nome}</div>
                        <div style="font-size: 11px; color: var(--text-3);">Série: ${m.serie}</div>
                    </div>
                </div>
            </td>
            <td>
                <span style="padding: 6px 12px; background: ${m.cor}26; color: ${m.cor}; border-radius: 6px; font-size: 11px; font-weight: 600;">${m.tipo}</span>
            </td>
            <td>
                <span class="status-badge ${m.status === 'ativa' ? 'status-ativa' : 'status-manutencao'}">${m.status}</span>
            </td>
            <td>
                <span style="font-family: 'Orbitron'; font-weight: 600;">${m.horas}h</span>
            </td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 50px; height: 6px; background: var(--dark-4); border-radius: 3px; overflow: hidden;">
                        <div style="width: ${(200 - m.proxManut) / 2}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent));"></div>
                    </div>
                    <span style="font-size: 12px; color: var(--primary);">${m.proxManut}h</span>
                </div>
            </td>
            <td>
                <span style="color: var(--text-2);">${m.area}</span>
            </td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-primary btn-small" onclick="verMaquina(${m.id})">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                    <button style="padding: 6px 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: var(--text-2); cursor: pointer;">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ─────────────────────────────────────────────────────────
// NOTIFICAÇÕES
// ─────────────────────────────────────────────────────────
function showNotification(mensagem, tipo = 'info') {
    const notification = `
        <div id="notification" style="position:fixed;top:20px;right:20px;background:linear-gradient(145deg,#1a1a1f,#252526);border:1px solid ${tipo === 'success' ? 'var(--primary)' : 'var(--warning)'};border-radius:10px;padding:16px 24px;z-index:10000;animation:slideIn 0.3s ease;">
            <div style="display:flex;align-items:center;gap:12px;">
                <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'info-circle'}" style="color:${tipo === 'success' ? 'var(--primary)' : 'var(--warning)'};"></i>
                <span style="color:#fff;">${mensagem}</span>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', notification);
    setTimeout(() => {
        const notif = document.getElementById('notification');
        if (notif) notif.remove();
    }, 3000);
}

// ─────────────────────────────────────────────────────────
// INICIALIZAR
// ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    initChartsMaquinas();
    atualizarTabelaMaquinas();
});