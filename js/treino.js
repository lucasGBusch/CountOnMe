// Estado Inicial
let activeTab = 'a';
let timerInterval = null;

// Retorna a data de hoje no formato AAAA-MM-DD (usada pra resetar sessões de treino)
function obterChaveDoDiaAtual() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

// Zera as séries marcadas de exercícios cuja última sessão não foi hoje
function resetarSessoesAntigas() {
    const hoje = obterChaveDoDiaAtual();
    let houveMudanca = false;

    ['a', 'b', 'c'].forEach(tab => {
        workouts[tab] = workouts[tab].map(item => {
            if (item.lastSessionDate !== hoje) {
                houveMudanca = true;
                return {
                    ...item,
                    completedSets: new Array(parseInt(item.sets) || 4).fill(false),
                    lastSessionDate: hoje
                };
            }
            return item;
        });
    });

    if (houveMudanca) saveData();
}

let tabNames = JSON.parse(localStorage.getItem('tabNames')) || {
    a: { title: 'Treino A', sub: 'Peito / Tríceps' },
    b: { title: 'Treino B', sub: 'Costas / Bíceps' },
    c: { title: 'Treino C', sub: 'Pernas / Ombros' }
};

let workouts = JSON.parse(localStorage.getItem('workoutData')) || {
    a: [],
    b: [],
    c: []
};

// Elementos do DOM
const tabButtons = document.querySelectorAll('.tab-btn');
const formAdd = document.getElementById('form-add-exercise');
const exerciseNameInput = document.getElementById('exercise-name');
const exerciseWeightInput = document.getElementById('exercise-weight');
const exerciseSetsInput = document.getElementById('exercise-sets');
const exerciseRepsInput = document.getElementById('exercise-reps');
const currentTabTitle = document.getElementById('current-tab-title');
const totalBadge = document.getElementById('total-exercises-badge');
const exerciseList = document.getElementById('exercise-list');

// Elementos do Timer
const timerDisplay = document.getElementById('timer-display');
const btnTimerStop = document.getElementById('btn-timer-stop');

// Modais
const modalEdit = document.getElementById('modal-edit-exercise');
const formEdit = document.getElementById('form-edit-exercise');
const editIdInput = document.getElementById('edit-exercise-id');
const editNameInput = document.getElementById('edit-exercise-name');
const editWeightInput = document.getElementById('edit-exercise-weight');
const editSetsInput = document.getElementById('edit-exercise-sets');
const editRepsInput = document.getElementById('edit-exercise-reps');

const modalTab = document.getElementById('modal-edit-tab');
const formEditTab = document.getElementById('form-edit-tab');
const editTabTitleInput = document.getElementById('edit-tab-title-input');
const editTabSubInput = document.getElementById('edit-tab-sub-input');
const btnEditTabName = document.getElementById('btn-edit-tab-name');

// Carregamento
document.addEventListener('DOMContentLoaded', () => {
    updateTabLabelsUI();
    setupTabListeners();
    setupFormListener();
    setupModalListeners();
    setupTimer();
    resetarSessoesAntigas();
    renderExercises();
});

// Atualiza os nomes das abas na tela
function updateTabLabelsUI() {
    ['a', 'b', 'c'].forEach(tab => {
        document.getElementById(`tab-title-${tab}`).textContent = tabNames[tab].title;
        document.getElementById(`tab-sub-${tab}`).textContent = tabNames[tab].sub;
    });
    currentTabTitle.textContent = `${tabNames[activeTab].title} (${tabNames[activeTab].sub})`;
}

// Configuração das Abas
function setupTabListeners() {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeTab = btn.getAttribute('data-tab');
            updateTabLabelsUI();
            renderExercises();
        });
    });
}

// Registro de Exercício
function setupFormListener() {
    formAdd.addEventListener('submit', (e) => {
        e.preventDefault();

        const setsNum = parseInt(exerciseSetsInput.value) || 4;
         const newExercise = {
            id: Date.now(),
            name: exerciseNameInput.value.trim(),
            weight: parseFloat(exerciseWeightInput.value) || 0,
            sets: setsNum,
            reps: exerciseRepsInput.value.trim(),
            completedSets: new Array(setsNum).fill(false),
            lastSessionDate: obterChaveDoDiaAtual()
        };

        workouts[activeTab].push(newExercise);
        saveData();
        renderExercises();

        formAdd.reset();
        exerciseSetsInput.value = '4';
        exerciseNameInput.focus();
    });
}

// Ajuste rápido de carga (+1 / -1 kg)
function adjustWeight(id, delta) {
    workouts[activeTab] = workouts[activeTab].map(item => {
        if (item.id === id) {
            const current = parseFloat(item.weight) || 0;
            const newWeight = Math.max(0, current + delta);
            return { ...item, weight: Number(newWeight.toFixed(1)) };
        }
        return item;
    });
    saveData();
    renderExercises();
}

// Alterna o status da série concluída
function toggleSetCompleted(exerciseId, setIndex) {
    workouts[activeTab] = workouts[activeTab].map(item => {
        if (item.id === exerciseId) {
            const updatedSets = [...(item.completedSets || new Array(parseInt(item.sets)).fill(false))];
            updatedSets[setIndex] = !updatedSets[setIndex];
            return { ...item, completedSets: updatedSets };
        }
        return item;
    });
    saveData();
    renderExercises();
}

// Timer de Descanso
function setupTimer() {
    document.querySelectorAll('.btn-timer').forEach(btn => {
        btn.addEventListener('click', () => {
            const seconds = parseInt(btn.getAttribute('data-sec'));
            startTimer(seconds);
        });
    });

    btnTimerStop.addEventListener('click', stopTimer);
}

function startTimer(seconds) {
    stopTimer();
    let remaining = seconds;

    const updateDisplay = () => {
        const m = Math.floor(remaining / 60).toString().padStart(2, '0');
        const s = (remaining % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${m}:${s}`;
    };

    updateDisplay();

    timerInterval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            stopTimer();
            timerDisplay.textContent = "🔥 BORA!";
            playBeep();
        } else {
            updateDisplay();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    timerDisplay.textContent = "00:00";
}

// Som/Vibração do Timer
function playBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}

// Modais
function setupModalListeners() {
    // Modal Exercício
    document.getElementById('btn-close-edit-modal')?.addEventListener('click', () => modalEdit.classList.add('hidden'));
    document.getElementById('btn-cancel-edit')?.addEventListener('click', () => modalEdit.classList.add('hidden'));

    formEdit?.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(editIdInput.value);
        const newSets = parseInt(editSetsInput.value) || 4;

        workouts[activeTab] = workouts[activeTab].map(item => {
            if (item.id === id) {
                // Ajusta o tamanho do array de séries caso o número tenha mudado
                let currentCompleted = item.completedSets || [];
                if (currentCompleted.length < newSets) {
                    currentCompleted = [...currentCompleted, ...new Array(newSets - currentCompleted.length).fill(false)];
                } else {
                    currentCompleted = currentCompleted.slice(0, newSets);
                }

                return {
                    ...item,
                    name: editNameInput.value.trim(),
                    weight: parseFloat(editWeightInput.value) || 0,
                    sets: newSets,
                    reps: editRepsInput.value.trim(),
                    completedSets: currentCompleted
                };
            }
            return item;
        });

        saveData();
        renderExercises();
        modalEdit.classList.add('hidden');
    });

    // Modal Renomear Ficha
    btnEditTabName?.addEventListener('click', () => {
        editTabTitleInput.value = tabNames[activeTab].title;
        editTabSubInput.value = tabNames[activeTab].sub;
        modalTab.classList.remove('hidden');
    });

    document.getElementById('btn-close-tab-modal')?.addEventListener('click', () => modalTab.classList.add('hidden'));
    document.getElementById('btn-cancel-tab-edit')?.addEventListener('click', () => modalTab.classList.add('hidden'));

    formEditTab?.addEventListener('submit', (e) => {
        e.preventDefault();
        tabNames[activeTab] = {
            title: editTabTitleInput.value.trim(),
            sub: editTabSubInput.value.trim()
        };
        localStorage.setItem('tabNames', JSON.stringify(tabNames));
        updateTabLabelsUI();
        modalTab.classList.add('hidden');
    });
}

function openEditModal(id) {
    const item = workouts[activeTab].find(ex => ex.id === id);
    if (!item) return;

    editIdInput.value = item.id;
    editNameInput.value = item.name;
    editWeightInput.value = item.weight;
    editSetsInput.value = item.sets;
    editRepsInput.value = item.reps;

    modalEdit.classList.remove('hidden');
}

// Confirmação de Exclusão Segura
function deleteExercise(id) {
    const item = workouts[activeTab].find(ex => ex.id === id);
    const confirmName = item ? item.name : 'este exercício';

    if (confirm(`Tem certeza que deseja excluir "${confirmName}" da sua ficha?`)) {
        workouts[activeTab] = workouts[activeTab].filter(ex => ex.id !== id);
        saveData();
        renderExercises();
    }
}

// Persistence
function saveData() {
    localStorage.setItem('workoutData', JSON.stringify(workouts));
}

// Renderização Principal
function renderExercises() {
    const list = workouts[activeTab] || [];
    exerciseList.innerHTML = '';

    totalBadge.textContent = `${list.length} ${list.length === 1 ? 'exercício' : 'exercícios'}`;

    if (list.length === 0) {
        exerciseList.innerHTML = '<p class="empty-msg">Nenhum exercício cadastrado nesta ficha ainda.</p>';
        return;
    }

    list.forEach(item => {
        const numSets = parseInt(item.sets) || 4;
        const completedSets = item.completedSets || new Array(numSets).fill(false);

        const card = document.createElement('div');
        card.className = 'exercise-card';

        // Render das bolinhas de séries
        let setsHTML = '';
        for (let i = 0; i < numSets; i++) {
            const isDone = completedSets[i] ? 'completed' : '';
            setsHTML += `<button class="set-circle ${isDone}" data-set="${i}">${i + 1}</button>`;
        }

        card.innerHTML = `
            <div class="card-top">
                <div class="exercise-info">
                    <h5>${item.name}</h5>
                </div>
                <div class="card-actions">
                    <button class="btn-edit" title="Editar">✏️</button>
                    <button class="btn-delete" title="Excluir">&times;</button>
                </div>
            </div>

            <div class="load-controller">
                <span>Carga atual: <strong>${item.weight} kg</strong> (${item.sets}x ${item.reps})</span>
                <div class="quick-weight-btns">
                    <button class="btn-quick-w btn-minus">-1kg</button>
                    <button class="btn-quick-w btn-plus">+1kg</button>
                </div>
            </div>

            <div class="sets-tracker">
                <span class="sets-label">Séries:</span>
                <div class="sets-circles">
                    ${setsHTML}
                </div>
            </div>
        `;

        // Eventos
        card.querySelector('.btn-edit').addEventListener('click', () => openEditModal(item.id));
        card.querySelector('.btn-delete').addEventListener('click', () => deleteExercise(item.id));
        
        card.querySelector('.btn-minus').addEventListener('click', () => adjustWeight(item.id, -1));
        card.querySelector('.btn-plus').addEventListener('click', () => adjustWeight(item.id, 1));

        card.querySelectorAll('.set-circle').forEach(btn => {
            btn.addEventListener('click', () => {
                const setIndex = parseInt(btn.getAttribute('data-set'));
                toggleSetCompleted(item.id, setIndex);
            });
        });

        exerciseList.appendChild(card);
    });
}