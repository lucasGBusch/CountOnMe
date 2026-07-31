document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('countonme_auth') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // 1. SELEÇÃO DE ELEMENTOS DO DOM (IDs Corrigidos)
    const calcForm = document.getElementById('calculator-form');
    const calcModal = document.getElementById('calculator-modal');
    const btnCloseModal = document.getElementById('modal-close');
    const calcTypeInput = document.getElementById('calc-type');
    const modalTitle = document.getElementById('modal-title');
    
    // Campos dinâmicos da modal
    const advancedFields = document.querySelectorAll('.calc-field-advanced');
    const activityFields = document.querySelectorAll('.calc-field-activity');
    
    // Elementos dos Cards do Dashboard
    const valWeight = document.getElementById('val-weight');
    const valImc = document.getElementById('val-imc');
    const valTdee = document.getElementById('val-tdee');
    const statusWeight = document.getElementById('status-weight');
    const statusImc = document.getElementById('status-imc');
    const statusTdee = document.getElementById('status-tdee');
    const badgeGoal = document.getElementById('badge-goal');

    // 2. FUNÇÕES DA MODAL
    function openModal() {
        if (calcModal) calcModal.classList.add('active');
    }

    function closeModal() {
        if (calcModal) calcModal.classList.remove('active');
    }

    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

    // Fechar ao clicar fora do conteúdo da modal
    window.addEventListener('click', (e) => {
        if (e.target === calcModal) closeModal();
    });

    // 3. EVENT LISTENERS PARA OS BOTÕES "ACESSAR" (.btn-tool)
    const toolButtons = document.querySelectorAll('.tool-card .btn-tool');
    
    toolButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const toolCard = e.target.closest('.tool-card');
            const toolType = toolCard.getAttribute('data-tool');

            if (calcTypeInput) calcTypeInput.value = toolType;

            // Ajusta o título e a exibição dos campos de acordo com a ferramenta
            if (toolType === 'imc') {
                if (modalTitle) modalTitle.textContent = 'Calculadora de IMC';
                advancedFields.forEach(el => el.classList.add('hidden'));
                activityFields.forEach(el => el.classList.add('hidden'));

            } else if (toolType === 'tmb') {
                if (modalTitle) modalTitle.textContent = 'Metabolismo Basal (TMB)';
                advancedFields.forEach(el => el.classList.remove('hidden'));
                activityFields.forEach(el => el.classList.add('hidden'));

            } else if (toolType === 'bulk') {
                if (modalTitle) modalTitle.textContent = 'Calculadora de Bulk (+350 kcal)';
                advancedFields.forEach(el => el.classList.remove('hidden'));
                activityFields.forEach(el => el.classList.remove('hidden'));

            } else if (toolType === 'cut') {
                if (modalTitle) modalTitle.textContent = 'Calculadora de Cut (-450 kcal)';
                advancedFields.forEach(el => el.classList.remove('hidden'));
                activityFields.forEach(el => el.classList.remove('hidden'));
            }

            openModal();
        });
    });

    // 4. SUBMIT DO FORMULÁRIO (CÁLCULO E SALVAMENTO)
    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const weight = parseFloat(document.getElementById('calc-weight').value);
            const heightCm = parseFloat(document.getElementById('calc-height').value);
            const heightM = heightCm / 100;
            const age = parseInt(document.getElementById('calc-age').value) || 25;
            const gender = document.getElementById('calc-gender').value;
            const activity = parseFloat(document.getElementById('calc-activity').value) || 1.55;
            const type = calcTypeInput ? calcTypeInput.value : 'maint';

            // Cálculo do IMC
            const imc = (weight / (heightM * heightM)).toFixed(1);

            // Cálculo da TMB / TDEE (Mifflin-St Jeor)
            let tmb = (10 * weight) + (6.25 * heightCm) - (5 * age);
            tmb = (gender === 'male') ? tmb + 5 : tmb - 161;
            let tdee = Math.round(tmb * activity);

            // Ajuste pelo objetivo
            if (type === 'bulk') {
                tdee += 350;
            } else if (type === 'cut') {
                tdee -= 450;
            }

            // Criar objeto de dados
            const userData = {
                weight: weight,
                height: heightCm,
                age: age,
                gender: gender,
                activity: activity,
                type: type,
                imc: imc,
                tdee: tdee
            };

            // Salvar no localStorage
            localStorage.setItem('fitDashboardData', JSON.stringify(userData));

            // Atualizar interface
            renderData(userData);

            // Fechar Modal
            closeModal();
        });
    }

    // 5. FUNÇÃO PARA RENDERIZAR OS DADOS NA TELA
    function renderData(data) {
        if (valWeight) valWeight.textContent = Number(data.weight).toFixed(1);
        if (valImc) valImc.textContent = data.imc;
        if (valTdee) valTdee.textContent = `${data.tdee.toLocaleString('pt-BR')} kcal`;

        // Atualizar IMC Status
        if (statusImc) {
            if (data.imc < 18.5) statusImc.textContent = 'Abaixo do Peso';
            else if (data.imc < 24.9) statusImc.textContent = 'Peso Normal';
            else if (data.imc < 29.9) statusImc.textContent = 'Sobrepeso';
            else statusImc.textContent = 'Obesidade';
        }

        // Atualizar Objetivo e Badge
        if (data.type === 'bulk') {
            if (badgeGoal) {
                badgeGoal.textContent = '🔥 Bulk (+350 kcal)';
                badgeGoal.className = 'badge-goal badge-bulk';
            }
            if (statusWeight) statusWeight.textContent = `↑ Meta: ${(data.weight + 4).toFixed(1)}kg (Ganho)`;
            if (statusTdee) statusTdee.textContent = 'Foco: Ganho de Massa Muscular';

        } else if (data.type === 'cut') {
            if (badgeGoal) {
                badgeGoal.textContent = '✂️ Cut (-450 kcal)';
                badgeGoal.className = 'badge-goal badge-cut';
            }
            if (statusWeight) statusWeight.textContent = `↓ Meta: ${(data.weight - 4).toFixed(1)}kg (Perda)`;
            if (statusTdee) statusTdee.textContent = 'Foco: Definição & Perda de Gordura';

        } else {
            if (badgeGoal) {
                badgeGoal.textContent = '⚡ Manutenção';
                badgeGoal.className = 'badge-goal badge-maint';
            }
            if (statusWeight) statusWeight.textContent = `= Meta: Manter ${Number(data.weight).toFixed(1)}kg`;
            if (statusTdee) statusTdee.textContent = 'Foco: Manter Peso & Energia';
        }
    }

    // 6. CARREGAR DADOS SALVOS DO LOCALSTORAGE
    function loadSavedData() {
        const savedData = localStorage.getItem('fitDashboardData');
        if (savedData) {
            const data = JSON.parse(savedData);
            renderData(data);
        }
    }

    loadSavedData();
    inicializarHistoricoDePeso();

    // 7. LOGOUT
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
          btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('countonme_auth');
            window.location.href = 'login.html';
        });
    }

    // 8. HISTÓRICO DE PESO
    function obterChaveDoDiaAtual() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    function carregarHistoricoDePeso() {
        return JSON.parse(localStorage.getItem('weightHistory')) || [];
    }

    function salvarHistoricoDePeso(historico) {
        localStorage.setItem('weightHistory', JSON.stringify(historico));
    }

    function registrarPesoDeHoje(pesoValor) {
        let historico = carregarHistoricoDePeso();
        const hoje = obterChaveDoDiaAtual();

        // Se já existe um registro de hoje, atualiza em vez de duplicar
        const indiceExistente = historico.findIndex(item => item.date === hoje);
        if (indiceExistente >= 0) {
            historico[indiceExistente].weight = pesoValor;
        } else {
            historico.push({ date: hoje, weight: pesoValor });
        }

        historico.sort((a, b) => a.date.localeCompare(b.date));
        salvarHistoricoDePeso(historico);
        renderizarHistoricoDePeso(historico);
    }

    function renderizarHistoricoDePeso(historico) {
        const lista = document.getElementById('weight-history-list');
        const resumo = document.getElementById('weight-trend-summary');
        if (!lista || !resumo) return;

        lista.innerHTML = '';

        if (historico.length === 0) {
            resumo.textContent = 'Nenhum peso registrado ainda.';
            return;
        }

        // Lista do mais recente pro mais antigo
        [...historico].reverse().forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.date} — ${item.weight.toFixed(1)} kg`;
            lista.appendChild(li);
        });

        // Tendência: compara o registro mais recente com o de ~7 dias atrás
        const maisRecente = historico[historico.length - 1];
        const seteDiasAtras = new Date(maisRecente.date);
        seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

        const referencia = [...historico].reverse().find(item => new Date(item.date) <= seteDiasAtras);

        if (referencia) {
            const diferenca = (maisRecente.weight - referencia.weight).toFixed(1);
            const sinal = diferenca >= 0 ? '+' : '';
            resumo.textContent = `${sinal}${diferenca}kg nos últimos 7 dias (de ${referencia.date} até ${maisRecente.date})`;
        } else {
            resumo.textContent = `Peso atual: ${maisRecente.weight.toFixed(1)}kg — ainda sem 7 dias de histórico pra calcular tendência`;
        }
    }

    function inicializarHistoricoDePeso() {
        const historico = carregarHistoricoDePeso();
        renderizarHistoricoDePeso(historico);

        const formLogWeight = document.getElementById('form-log-weight');
        const inputTodayWeight = document.getElementById('input-today-weight');

        if (formLogWeight) {
            formLogWeight.addEventListener('submit', (e) => {
                e.preventDefault();
                const peso = parseFloat(inputTodayWeight.value);
                if (!peso || peso <= 0) return;

                registrarPesoDeHoje(peso);
                formLogWeight.reset();
            });
        }
    }

});