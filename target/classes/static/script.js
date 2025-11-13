// Configuração da API
const API_BASE_URL = 'http://localhost:8080';

// Elementos do DOM
let users = [];
let trilhas = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    loadTrilhas();
    updateStats();
});

// Funções de Navegação
function openTab(tabName) {
    // Esconder todas as abas
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Remover active de todos os botões
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Mostrar aba selecionada
    document.getElementById(tabName).classList.add('active');
    
    // Ativar botão selecionado
    event.currentTarget.classList.add('active');
    
    // Atualizar stats se for a aba sobre
    if (tabName === 'sobre') {
        updateStats();
    }
}

// Funções de Usuário
async function loadUsers() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios`);
        if (response.ok) {
            users = await response.json();
            renderUsers();
        } else {
            showError('Erro ao carregar usuários');
        }
    } catch (error) {
        showError('Erro de conexão com a API');
    } finally {
        hideLoading();
    }
}

function renderUsers(usersToRender = users) {
    const container = document.getElementById('usersContainer');
    
    if (usersToRender.length === 0) {
        container.innerHTML = `
            <div class="no-data">
                <i class="fas fa-users fa-3x"></i>
                <h3>Nenhum usuário encontrado</h3>
                <p>Clique em "Novo Usuário" para adicionar o primeiro usuário.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = usersToRender.map(user => `
        <div class="user-card">
            <div class="user-header">
                <div class="user-info">
                    <h3>${user.nome}</h3>
                    <div class="user-email">${user.email}</div>
                </div>
                <div class="user-actions">
                    <button class="btn btn-edit" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="user-details">
                ${user.areaAtuacao ? `
                    <div class="detail-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${user.areaAtuacao}</span>
                    </div>
                ` : ''}
                ${user.nivelCarreira ? `
                    <div class="detail-item">
                        <i class="fas fa-chart-line"></i>
                        <span>${user.nivelCarreira}</span>
                    </div>
                ` : ''}
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>Cadastro: ${new Date(user.dataCadastro).toLocaleDateString('pt-BR')}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function searchUsers() {
    const searchTerm = document.getElementById('searchUser').value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.nome.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        (user.areaAtuacao && user.areaAtuacao.toLowerCase().includes(searchTerm))
    );
    renderUsers(filteredUsers);
}

// Modal Usuário
function openUserModal(userId = null) {
    const modal = document.getElementById('userModal');
    const form = document.getElementById('userForm');
    const title = document.getElementById('userModalTitle');
    
    form.reset();
    document.getElementById('userId').value = '';
    
    if (userId) {
        // Modo edição
        const user = users.find(u => u.id === userId);
        if (user) {
            title.textContent = 'Editar Usuário';
            document.getElementById('userId').value = user.id;
            document.getElementById('nome').value = user.nome;
            document.getElementById('email').value = user.email;
            document.getElementById('areaAtuacao').value = user.areaAtuacao || '';
            document.getElementById('nivelCarreira').value = user.nivelCarreira || '';
        }
    } else {
        // Modo criação
        title.textContent = 'Novo Usuário';
    }
    
    modal.style.display = 'block';
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
}

async function saveUser(event) {
    event.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const userData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        areaAtuacao: document.getElementById('areaAtuacao').value,
        nivelCarreira: document.getElementById('nivelCarreira').value
    };
    
    showLoading();
    try {
        let response;
        if (userId) {
            // Atualizar usuário existente
            response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        } else {
            // Criar novo usuário
            response = await fetch(`${API_BASE_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        }
        
        if (response.ok) {
            closeUserModal();
            await loadUsers();
            showSuccess(userId ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
        } else {
            const error = await response.text();
            showError(`Erro ao salvar usuário: ${error}`);
        }
    } catch (error) {
        showError('Erro de conexão com a API');
    } finally {
        hideLoading();
    }
}

async function deleteUser(userId) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
        return;
    }
    
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            await loadUsers();
            showSuccess('Usuário excluído com sucesso!');
        } else {
            showError('Erro ao excluir usuário');
        }
    } catch (error) {
        showError('Erro de conexão com a API');
    } finally {
        hideLoading();
    }
}

// Funções de Trilha
async function loadTrilhas() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/trilhas`);
        if (response.ok) {
            trilhas = await response.json();
            renderTrilhas();
        } else {
            showError('Erro ao carregar trilhas');
        }
    } catch (error) {
        showError('Erro de conexão com a API');
    } finally {
        hideLoading();
    }
}

function renderTrilhas(trilhasToRender = trilhas) {
    const container = document.getElementById('trilhasContainer');
    
    if (trilhasToRender.length === 0) {
        container.innerHTML = `
            <div class="no-data">
                <i class="fas fa-road fa-3x"></i>
                <h3>Nenhuma trilha encontrada</h3>
                <p>Clique em "Nova Trilha" para adicionar a primeira trilha.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = trilhasToRender.map(trilha => `
        <div class="trilha-card">
            <div class="trilha-header">
                <div class="trilha-info">
                    <h3>${trilha.nome}</h3>
                    <div class="nivel-badge nivel-${trilha.nivel}">${trilha.nivel}</div>
                </div>
                <div class="trilha-actions">
                    <button class="btn btn-edit" onclick="editTrilha(${trilha.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteTrilha(${trilha.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="trilha-details">
                ${trilha.descricao ? `
                    <div class="detail-item">
                        <i class="fas fa-align-left"></i>
                        <span>${trilha.descricao}</span>
                    </div>
                ` : ''}
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${trilha.cargaHoraria} horas</span>
                </div>
                ${trilha.focoPrincipal ? `
                    <div class="detail-item">
                        <i class="fas fa-bullseye"></i>
                        <span class="foco-badge">${trilha.focoPrincipal}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function filterTrilhas() {
    const nivelFilter = document.getElementById('filterNivel').value;
    const focoFilter = document.getElementById('filterFoco').value;
    
    const filteredTrilhas = trilhas.filter(trilha => {
        const nivelMatch = !nivelFilter || trilha.nivel === nivelFilter;
        const focoMatch = !focoFilter || trilha.focoPrincipal === focoFilter;
        return nivelMatch && focoMatch;
    });
    
    renderTrilhas(filteredTrilhas);
}

// Modal Trilha
function openTrilhaModal(trilhaId = null) {
    const modal = document.getElementById('trilhaModal');
    const form = document.getElementById('trilhaForm');
    const title = document.getElementById('trilhaModalTitle');
    
    form.reset();
    document.getElementById('trilhaId').value = '';
    
    if (trilhaId) {
        // Modo edição
        const trilha = trilhas.find(t => t.id === trilhaId);
        if (trilha) {
            title.textContent = 'Editar Trilha';
            document.getElementById('trilhaId').value = trilha.id;
            document.getElementById('trilhaNome').value = trilha.nome;
            document.getElementById('descricao').value = trilha.descricao || '';
            document.getElementById('nivel').value = trilha.nivel;
            document.getElementById('cargaHoraria').value = trilha.cargaHoraria;
            document.getElementById('focoPrincipal').value = trilha.focoPrincipal || '';
        }
    } else {
        // Modo criação
        title.textContent = 'Nova Trilha';
    }
    
    modal.style.display = 'block';
}

function closeTrilhaModal() {
    document.getElementById('trilhaModal').style.display = 'none';
}

async function saveTrilha(event) {
    event.preventDefault();
    
    const trilhaId = document.getElementById('trilhaId').value;
    const trilhaData = {
        nome: document.getElementById('trilhaNome').value,
        descricao: document.getElementById('descricao').value,
        nivel: document.getElementById('nivel').value,
        cargaHoraria: parseInt(document.getElementById('cargaHoraria').value),
        focoPrincipal: document.getElementById('focoPrincipal').value
    };
    
    showLoading();
    try {
        let response;
        if (trilhaId) {
            // Atualizar trilha existente
            response = await fetch(`${API_BASE_URL}/trilhas/${trilhaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(trilhaData)
            });
        } else {
            // Criar nova trilha
            response = await fetch(`${API_BASE_URL}/trilhas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(trilhaData)
            });
        }
        
        if (response.ok) {
            closeTrilhaModal();
            await loadTrilhas();
            showSuccess(trilhaId ? 'Trilha atualizada com sucesso!' : 'Trilha criada com sucesso!');
        } else {
            const error = await response.text();
            showError(`Erro ao salvar trilha: ${error}`);
        }
    } catch (error) {
        showError('Erro de conexão com a API');
    } finally {
        hideLoading();
    }
}

async function deleteTrilha(trilhaId) {
    if (!confirm('Tem certeza que deseja excluir esta trilha?')) {
        return;
    }
    
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/trilhas/${trilhaId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            await loadTrilhas();
            showSuccess('Trilha excluída com sucesso!');
        } else {
            showError('Erro ao excluir trilha');
        }
    } catch (error) {
        showError('Erro de conexão com a API');
    } finally {
        hideLoading();
    }
}

// Funções Auxiliares
function updateStats() {
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalTrilhas').textContent = trilhas.length;
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showSuccess(message) {
    alert(message); // Em uma aplicação real, use um toast notification
}

function showError(message) {
    alert('Erro: ' + message); // Em uma aplicação real, use um toast notification
}

// Fechar modais ao clicar fora
window.onclick = function(event) {
    const userModal = document.getElementById('userModal');
    const trilhaModal = document.getElementById('trilhaModal');
    
    if (event.target === userModal) {
        closeUserModal();
    }
    if (event.target === trilhaModal) {
        closeTrilhaModal();
    }
}

// Aliases para funções de edição (para compatibilidade)
function editUser(userId) {
    openUserModal(userId);
}

function editTrilha(trilhaId) {
    openTrilhaModal(trilhaId);
}
