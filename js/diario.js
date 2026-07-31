// 1. BASE DE ALIMENTOS GENÉRICOS (tipo: 'g' = por 100g | tipo: 'un' = por 1 unidade)
const ALIMENTOS_GENERICOS = {
    // FRUTAS
    banana_g: { nome: "Banana (100g)", tipo: "g", g: 100, kcal: 89, carbo: 22.8, prot: 1.1, gord: 0.3 },
    banana_un: { nome: "Banana Média (1 un)", tipo: "un", kcal: 89, carbo: 22.8, prot: 1.1, gord: 0.3 },
    maca_g: { nome: "Maçã (100g)", tipo: "g", g: 100, kcal: 52, carbo: 13.8, prot: 0.3, gord: 0.2 },
    maca_un: { nome: "Maçã Média (1 un)", tipo: "un", kcal: 72, carbo: 19.0, prot: 0.4, gord: 0.2 },
    laranja_g: { nome: "Laranja (100g)", tipo: "g", g: 100, kcal: 47, carbo: 11.8, prot: 0.9, gord: 0.1 },
    mamao: { nome: "Mamão (100g)", tipo: "g", g: 100, kcal: 43, carbo: 10.8, prot: 0.5, gord: 0.1 },
    morango: { nome: "Morango (100g)", tipo: "g", g: 100, kcal: 32, carbo: 7.7, prot: 0.7, gord: 0.3 },
    melancia: { nome: "Melancia (100g)", tipo: "g", g: 100, kcal: 30, carbo: 7.6, prot: 0.6, gord: 0.2 },
    uva: { nome: "Uva (100g)", tipo: "g", g: 100, kcal: 69, carbo: 18.1, prot: 0.7, gord: 0.2 },
    abacaxi: { nome: "Abacaxi (100g)", tipo: "g", g: 100, kcal: 50, carbo: 13.1, prot: 0.5, gord: 0.1 },
    manga: { nome: "Manga (100g)", tipo: "g", g: 100, kcal: 60, carbo: 15.0, prot: 0.8, gord: 0.4 },
    abacate: { nome: "Abacate (100g)", tipo: "g", g: 100, kcal: 160, carbo: 8.5, prot: 2.0, gord: 14.7 },
    limao: { nome: "Limão (100g)", tipo: "g", g: 100, kcal: 29, carbo: 9.3, prot: 1.1, gord: 0.3 },
    kiwi: { nome: "Kiwi (100g)", tipo: "g", g: 100, kcal: 61, carbo: 14.7, prot: 1.1, gord: 0.5 },

    // LEGUMES E VERDURAS
    batata_inglesa_cozida: { nome: "Batata Inglesa Cozida", tipo: "g", g: 100, kcal: 87, carbo: 20.1, prot: 1.9, gord: 0.1 },
    batata_doce_cozida: { nome: "Batata Doce Cozida", tipo: "g", g: 100, kcal: 86, carbo: 20.1, prot: 1.6, gord: 0.1 },
    cenoura_crua: { nome: "Cenoura Crua", tipo: "g", g: 100, kcal: 41, carbo: 9.6, prot: 0.9, gord: 0.2 },
    cebola: { nome: "Cebola", tipo: "g", g: 100, kcal: 40, carbo: 9.3, prot: 1.1, gord: 0.1 },
    tomate: { nome: "Tomate", tipo: "g", g: 100, kcal: 18, carbo: 3.9, prot: 0.9, gord: 0.2 },
    brocolis_cozido: { nome: "Brócolis Cozido", tipo: "g", g: 100, kcal: 35, carbo: 7.2, prot: 2.4, gord: 0.4 },
    abobrinha: { nome: "Abobrinha", tipo: "g", g: 100, kcal: 17, carbo: 3.1, prot: 1.2, gord: 0.3 },
    alface: { nome: "Alface", tipo: "g", g: 100, kcal: 15, carbo: 2.9, prot: 1.4, gord: 0.2 },
    couve: { nome: "Couve", tipo: "g", g: 100, kcal: 32, carbo: 5.6, prot: 2.9, gord: 0.8 },
    beterraba: { nome: "Beterraba", tipo: "g", g: 100, kcal: 43, carbo: 9.6, prot: 1.6, gord: 0.2 },
    mandioca_cozida: { nome: "Mandioca Cozida", tipo: "g", g: 100, kcal: 125, carbo: 30.0, prot: 0.6, gord: 0.3 },
    pimentao: { nome: "Pimentão", tipo: "g", g: 100, kcal: 20, carbo: 4.6, prot: 0.9, gord: 0.2 },
    pepino: { nome: "Pepino", tipo: "g", g: 100, kcal: 15, carbo: 3.6, prot: 0.7, gord: 0.1 },

    // GRÃOS E LEGUMINOSAS COZIDAS
    arroz_branco_cozido: { nome: "Arroz Branco Cozido", tipo: "g", g: 100, kcal: 130, carbo: 28.2, prot: 2.7, gord: 0.3 },
    arroz_integral_cozido: { nome: "Arroz Integral Cozido", tipo: "g", g: 100, kcal: 112, carbo: 23.5, prot: 2.6, gord: 0.9 },
    feijao_carioca_cozido: { nome: "Feijão Carioca Cozido", tipo: "g", g: 100, kcal: 76, carbo: 13.6, prot: 4.8, gord: 0.5 },
    feijao_preto_cozido: { nome: "Feijão Preto Cozido", tipo: "g", g: 100, kcal: 77, carbo: 14.0, prot: 4.5, gord: 0.5 },
    lentilha_cozida: { nome: "Lentilha Cozida", tipo: "g", g: 100, kcal: 116, carbo: 20.1, prot: 9.0, gord: 0.4 },
    grao_de_bico_cozido: { nome: "Grão-de-bico Cozido", tipo: "g", g: 100, kcal: 164, carbo: 27.4, prot: 8.9, gord: 2.6 },
    aveia_em_flocos: { nome: "Aveia em Flocos", tipo: "g", g: 100, kcal: 389, carbo: 66.3, prot: 16.9, gord: 6.9 },
    quinoa_cozida: { nome: "Quinoa Cozida", tipo: "g", g: 100, kcal: 120, carbo: 21.3, prot: 4.4, gord: 1.9 },

    // PROTEÍNAS E CARNES
    peito_de_frango_grelhado: { nome: "Peito de Frango Grelhado (100g)", tipo: "g", g: 100, kcal: 165, carbo: 0.0, prot: 31.0, gord: 3.6 },
    patinho_moido_cozido: { nome: "Patinho Moído Cozido (100g)", tipo: "g", g: 100, kcal: 219, carbo: 0.0, prot: 35.9, gord: 7.3 },
    alcatra_grelhada: { nome: "Alcatra Grelhada (100g)", tipo: "g", g: 100, kcal: 201, carbo: 0.0, prot: 31.0, gord: 8.5 },
    file_de_tilapia_grelhado: { nome: "Filé de Tilápia Grelhado (100g)", tipo: "g", g: 100, kcal: 128, carbo: 0.0, prot: 26.0, gord: 2.7 },
    ovo_cozido_un: { nome: "Ovo Cozido (1 un)", tipo: "un", kcal: 78, carbo: 0.6, prot: 6.3, gord: 5.3 },
    ovo_frito_un: { nome: "Ovo Frito (1 un)", tipo: "un", kcal: 90, carbo: 0.4, prot: 6.3, gord: 7.0 },
    clara_de_ovo_cozida: { nome: "Clara de Ovo Cozida (100g)", tipo: "g", g: 100, kcal: 52, carbo: 0.7, prot: 10.9, gord: 0.2 },
    bacon_frito: { nome: "Bacon Frito (100g)", tipo: "g", g: 100, kcal: 541, carbo: 1.4, prot: 37.0, gord: 42.0 },
    lombo_suino_assado: { nome: "Lombo Suíno Assado (100g)", tipo: "g", g: 100, kcal: 210, carbo: 0.0, prot: 27.0, gord: 11.0 },
    sardinha_lata_un: { nome: "Sardinha em Lata (1 lata)", tipo: "un", kcal: 160, carbo: 0.0, prot: 20.0, gord: 9.0 },
    atum_em_lata_em_agua: { nome: "Atum em Lata em Água (100g)", tipo: "g", g: 100, kcal: 116, carbo: 0.0, prot: 26.0, gord: 1.0 },

    // LATICÍNIOS E GORDURAS
    leite_integral: { nome: "Leite Integral (100ml)", tipo: "g", g: 100, kcal: 61, carbo: 4.8, prot: 3.2, gord: 3.3 },
    leite_desnatado: { nome: "Leite Desnatado (100ml)", tipo: "g", g: 100, kcal: 35, carbo: 5.0, prot: 3.4, gord: 0.2 },
    queijo_mucarela: { nome: "Queijo Muçarela (100g)", tipo: "g", g: 100, kcal: 300, carbo: 2.2, prot: 22.2, gord: 22.4 },
    queijo_minas_frescal: { nome: "Queijo Minas Frescal (100g)", tipo: "g", g: 100, kcal: 240, carbo: 3.0, prot: 17.0, gord: 18.0 },
    requeijao_cremoso: { nome: "Requeijão Cremoso (100g)", tipo: "g", g: 100, kcal: 257, carbo: 3.0, prot: 9.6, gord: 23.0 },
    iogurte_natural: { nome: "Iogurte Natural (100g)", tipo: "g", g: 100, kcal: 61, carbo: 4.7, prot: 3.5, gord: 3.3 },
    manteiga: { nome: "Manteiga (100g)", tipo: "g", g: 100, kcal: 717, carbo: 0.1, prot: 0.9, gord: 81.1 },
    azeite_de_oliva: { nome: "Azeite de Oliva (100ml)", tipo: "g", g: 100, kcal: 884, carbo: 0.0, prot: 0.0, gord: 100.0 },
    pasta_de_amendoim: { nome: "Pasta de Amendoim (100g)", tipo: "g", g: 100, kcal: 588, carbo: 20.0, prot: 25.0, gord: 50.0 },

    // PÃES E MASSAS
    pao_frances_un: { nome: "Pão Francês (1 un ~50g)", tipo: "un", kcal: 150, carbo: 29.0, prot: 4.0, gord: 1.5 },
    pao_de_forma_fat: { nome: "Pão de Forma (1 fatia)", tipo: "un", kcal: 60, carbo: 12.0, prot: 2.0, gord: 0.8 },
    pao_integral: { nome: "Pão Integral (100g)", tipo: "g", g: 100, kcal: 247, carbo: 41.3, prot: 13.0, gord: 3.4 },
    macarrao_cozido: { nome: "Macarrão Cozido (100g)", tipo: "g", g: 100, kcal: 158, carbo: 31.0, prot: 5.8, gord: 0.9 },
    tapioca_massa: { nome: "Tapioca (100g)", tipo: "g", g: 100, kcal: 240, carbo: 60.0, prot: 0.0, gord: 0.0 },
    chocolate_amargo_70: { nome: "Chocolate Amargo 70% (100g)", tipo: "g", g: 100, kcal: 598, carbo: 45.0, prot: 7.8, gord: 43.0 }
};

const NOMES_REFEICOES = {
    cafe: '☕ Café da Manhã',
    almoco: '🍲 Almoço',
    jantar: '🌙 Jantar',
    lanche: '🍎 Lanches / Outros'
};

// 2. ESTADO DA APLICAÇÃO
let alimentosPersonalizados = JSON.parse(localStorage.getItem('my_custom_foods')) || {};
let alimentosConsumidos = JSON.parse(localStorage.getItem('my_logged_foods')) || [];
let metaCaloricaTotal = parseInt(localStorage.getItem('user_meta_kcal')) || 2000;

const CIRCUMFERENCE = 251.327; // 2 * PI * 40

// 3. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    carregarOpcoesSelect();
    atualizarUnidadeBadge();
    atualizarDiarioUI();
    configurarEventos();
});

// PREENCHE O DROPDOWN COM SUPORTE À BUSCA
function carregarOpcoesSelect(filtro = '') {
    const select = document.getElementById('select-food');
    if (!select) return;
    select.innerHTML = '';

    const termo = filtro.toLowerCase().trim();

    // Genéricos
    const groupGenericos = document.createElement('optgroup');
    groupGenericos.label = 'Alimentos Genéricos';
    let countGen = 0;

    for (let key in ALIMENTOS_GENERICOS) {
        const item = ALIMENTOS_GENERICOS[key];
        if (!termo || item.nome.toLowerCase().includes(termo)) {
            const opt = document.createElement('option');
            opt.value = `gen_${key}`;
            opt.textContent = item.nome;
            groupGenericos.appendChild(opt);
            countGen++;
        }
    }
    if (countGen > 0) select.appendChild(groupGenericos);

    // Personalizados
    const keysCustom = Object.keys(alimentosPersonalizados);
    if (keysCustom.length > 0) {
        const groupCustom = document.createElement('optgroup');
        groupCustom.label = 'Meus Alimentos Personalizados';
        let countCustom = 0;

        keysCustom.forEach(key => {
            const item = alimentosPersonalizados[key];
            if (!termo || item.nome.toLowerCase().includes(termo)) {
                const opt = document.createElement('option');
                opt.value = `custom_${key}`;
                opt.textContent = item.nome;
                groupCustom.appendChild(opt);
                countCustom++;
            }
        });
        if (countCustom > 0) select.appendChild(groupCustom);
    }

    if (select.options.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'Nenhum alimento encontrado...';
        select.appendChild(opt);
    }

    atualizarUnidadeBadge();
}

// BUSCA OBJETO DO ALIMENTO SELECIONADO
function obterAlimentoSelecionado(val) {
    if (!val) return null;
    if (val.startsWith('gen_')) {
        return ALIMENTOS_GENERICOS[val.replace('gen_', '')];
    } else if (val.startsWith('custom_')) {
        return alimentosPersonalizados[val.replace('custom_', '')];
    }
    return null;
}

// ALTERA BADGE DE "g" / "un" E VALOR PADRÃO DO INPUT
function atualizarUnidadeBadge() {
    const select = document.getElementById('select-food');
    const badge = document.getElementById('unit-badge');
    const inputGrams = document.getElementById('input-grams');

    if (!select || !badge || !inputGrams) return;

    const alimento = obterAlimentoSelecionado(select.value);
    if (!alimento) return;

    if (alimento.tipo === 'un') {
        badge.textContent = 'un';
        if (inputGrams.value === '100') inputGrams.value = '1';
    } else {
        badge.textContent = 'g';
        if (inputGrams.value === '1') inputGrams.value = '100';
    }
}

// CALCULA AS METAS DE MACROS COM BASE NAS PORCENTAGENS
function calcularMetasMacros(totalKcal) {
    const pctCarbo = parseFloat(document.getElementById('pct-carbo')?.value) || 0;
    const pctProt  = parseFloat(document.getElementById('pct-protein')?.value) || 0;
    const pctGord  = parseFloat(document.getElementById('pct-fat')?.value) || 0;

    const warningEl = document.getElementById('pct-warning');
    if (warningEl) {
        if ((pctCarbo + pctProt + pctGord) !== 100) {
            warningEl.classList.remove('hidden');
        } else {
            warningEl.classList.add('hidden');
        }
    }

    return {
        pctCarbo, pctProt, pctGord,
        carboGrams: Math.max(1, Math.round((totalKcal * (pctCarbo / 100)) / 4)),
        protGrams:  Math.max(1, Math.round((totalKcal * (pctProt / 100)) / 4)),
        gordGrams:  Math.max(1, Math.round((totalKcal * (pctGord / 100)) / 9))
    };
}

// ATUALIZA ANIMAÇÃO DO CIRCULAR SVG
function atualizarCirculo(circleId, pctTextId, consumido, meta) {
    const circle = document.getElementById(circleId);
    const txtPct = document.getElementById(pctTextId);
    if (!circle || !txtPct) return;

    const pct = Math.min((consumido / meta) * 100, 100);
    const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

    circle.style.strokeDashoffset = offset;
    txtPct.textContent = `${Math.round(pct)}%`;
}

// REFRESH COMPLETO NA INTERFACE
function atualizarDiarioUI() {
    const listEl = document.getElementById('logged-foods-list');
    if (!listEl) return;

    const metas = calcularMetasMacros(metaCaloricaTotal);
    let totCarbo = 0, totProt = 0, totGord = 0, totKcal = 0;

    const grupos = { cafe: [], almoco: [], jantar: [], lanche: [] };

    alimentosConsumidos.forEach(item => {
        totCarbo += item.carbo;
        totProt += item.prot;
        totGord += item.gord;
        totKcal += item.kcal;

        const refKey = item.refeicao || 'cafe';
        if (!grupos[refKey]) grupos[refKey] = [];
        grupos[refKey].push(item);
    });

    listEl.innerHTML = '';

    if (alimentosConsumidos.length === 0) {
        listEl.innerHTML = '<p class="empty-msg">Nenhum alimento registrado hoje.</p>';
    } else {
        Object.keys(grupos).forEach(key => {
            const itensDoGrupo = grupos[key];
            if (itensDoGrupo.length === 0) return;

            const totalKcalGrupo = itensDoGrupo.reduce((acc, i) => acc + i.kcal, 0);

            let htmlGrupo = `
                <div class="meal-group">
                    <div class="meal-group-header">
                        <span class="meal-group-title">${NOMES_REFEICOES[key] || key}</span>
                        <span class="meal-group-kcal">${Math.round(totalKcalGrupo)} kcal</span>
                    </div>
                    <ul class="meal-food-list">
            `;

            itensDoGrupo.forEach(item => {
                const sulfix = item.tipo === 'un' ? 'un' : 'g';
                htmlGrupo += `
                    <li class="food-item">
                        <div class="food-item-info">
                            <strong>${item.nome} (${item.quantidade}${sulfix})</strong>
                            <small>Carbo: ${item.carbo.toFixed(1)}g | Prot: ${item.prot.toFixed(1)}g | Gord: ${item.gord.toFixed(1)}g — ${item.kcal} kcal</small>
                        </div>
                        <button class="btn-delete-item" onclick="removerAlimento(${item.id})">✕</button>
                    </li>
                `;
            });

            htmlGrupo += `</ul></div>`;
            listEl.innerHTML += htmlGrupo;
        });
    }

    localStorage.setItem('my_logged_foods', JSON.stringify(alimentosConsumidos));

    // Atualiza badges e legendas
    const currentKcalEl = document.getElementById('current-kcal');
    if (currentKcalEl) currentKcalEl.textContent = Math.round(totKcal);

    const dotCarbs = document.querySelector('.dot-carbs-text');
    if (dotCarbs) dotCarbs.textContent = `Carboidratos (${metas.pctCarbo}%)`;

    const dotProtein = document.querySelector('.dot-protein-text');
    if (dotProtein) dotProtein.textContent = `Proteínas (${metas.pctProt}%)`;

    const dotFats = document.querySelector('.dot-fats-text');
    if (dotFats) dotFats.textContent = `Gorduras (${metas.pctGord}%)`;

    const txtCarbsProg = document.getElementById('txt-carbs-progress');
    if (txtCarbsProg) txtCarbsProg.textContent = `${Math.round(totCarbo)}g / ${metas.carboGrams}g`;

    const txtProtProg = document.getElementById('txt-protein-progress');
    if (txtProtProg) txtProtProg.textContent = `${Math.round(totProt)}g / ${metas.protGrams}g`;

    const txtFatsProg = document.getElementById('txt-fats-progress');
    if (txtFatsProg) txtFatsProg.textContent = `${Math.round(totGord)}g / ${metas.gordGrams}g`;

    atualizarCirculo('circle-carbs', 'txt-carbs-pct', totCarbo, metas.carboGrams);
    atualizarCirculo('circle-protein', 'txt-protein-pct', totProt, metas.protGrams);
    atualizarCirculo('circle-fats', 'txt-fats-pct', totGord, metas.gordGrams);
}

// ADICIONAR ALIMENTO
function adicionarAlimento() {
    const select = document.getElementById('select-food');
    const inputGrams = document.getElementById('input-grams');
    const selectMeal = document.getElementById('select-meal');
    const errorEl = document.getElementById('add-food-error');

    const val = select.value;
    const qty = parseFloat(inputGrams.value);
    const refeicao = selectMeal ? selectMeal.value : 'cafe';

    if (!val || isNaN(qty) || qty <= 0) {
        if (errorEl) errorEl.classList.remove('hidden');
        return;
    }

    if (errorEl) errorEl.classList.add('hidden');

    const alimentoBase = obterAlimentoSelecionado(val);
    if (!alimentoBase) return;

    const fator = alimentoBase.tipo === 'un' ? qty : qty / 100;

    const item = {
        id: Date.now(),
        nome: alimentoBase.nome,
        refeicao: refeicao,
        quantidade: qty,
        tipo: alimentoBase.tipo,
        carbo: alimentoBase.carbo * fator,
        prot: alimentoBase.prot * fator,
        gord: alimentoBase.gord * fator,
        kcal: Math.round(((alimentoBase.carbo * 4) + (alimentoBase.prot * 4) + (alimentoBase.gord * 9)) * fator)
    };

    alimentosConsumidos.push(item);
    atualizarDiarioUI();
}

// REMOVER ALIMENTO DO DIÁRIO (DISPONÍVEL NO ESCOPO GLOBAL)
window.removerAlimento = function(id) {
    alimentosConsumidos = alimentosConsumidos.filter(item => item.id !== id);
    atualizarDiarioUI();
};

// EVENTOS DA PÁGINA
function configurarEventos() {
    document.getElementById('btn-add-food')?.addEventListener('click', adicionarAlimento);
    document.getElementById('select-food')?.addEventListener('change', atualizarUnidadeBadge);

    document.getElementById('input-search-food')?.addEventListener('input', (e) => {
        carregarOpcoesSelect(e.target.value);
    });

    ['pct-carbo', 'pct-protein', 'pct-fat'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', atualizarDiarioUI);
    });

    const inputMeta = document.getElementById('input-meta-kcal');
    if (inputMeta) {
        inputMeta.value = metaCaloricaTotal;
        inputMeta.addEventListener('input', (e) => {
            const val = parseInt(e.target.value) || 0;
            if (val > 0) {
                metaCaloricaTotal = val;
                localStorage.setItem('user_meta_kcal', metaCaloricaTotal);
                atualizarDiarioUI();
            }
        });
    }

    // Modal
    const modal = document.getElementById('modal-custom-food');
    const btnOpen = document.getElementById('btn-open-custom-modal');
    const btnClose = document.getElementById('btn-close-modal');
    const btnCancel = document.getElementById('btn-cancel-modal');
    const formCustom = document.getElementById('form-custom-food');

    const toggleModal = (show) => {
        if (!modal) return;
        if (show) modal.classList.remove('hidden');
        else modal.classList.add('hidden');
    };

    btnOpen?.addEventListener('click', () => toggleModal(true));
    btnClose?.addEventListener('click', () => toggleModal(false));
    btnCancel?.addEventListener('click', () => toggleModal(false));

    formCustom?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('custom-name').value.trim();
        const tipo = document.getElementById('custom-type').value;
        const carbo = parseFloat(document.getElementById('custom-carbo').value) || 0;
        const prot = parseFloat(document.getElementById('custom-prot').value) || 0;
        const gord = parseFloat(document.getElementById('custom-gord').value) || 0;

        const key = 'custom_' + Date.now();
        alimentosPersonalizados[key] = { nome, tipo, carbo, prot, gord };

        localStorage.setItem('my_custom_foods', JSON.stringify(alimentosPersonalizados));

        carregarOpcoesSelect();
        const select = document.getElementById('select-food');
        if (select) select.value = `custom_${key}`;
        atualizarUnidadeBadge();
        
        formCustom.reset();
        toggleModal(false);
    });
}