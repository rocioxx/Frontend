// --- BASE DE DATOS Y VARIABLES ---
const HERO_DATABASE = [
    { name: "Capitán Rayo", power: "Fuerza", level: 95, origin: "Tierra", weakness: "Kriptonita", emoji: "⚡" },
    { name: "Sombra Ninja", power: "Invisibilidad", level: 78, origin: "Japón", weakness: "Luz brillante", emoji: "🥷" },
    { name: "Flash Cósmico", power: "Velocidad", level: 88, origin: "Espacio", weakness: "Frío extremo", emoji: "💫" },
    { name: "Mente Maestra", power: "Telepatía", level: 82, origin: "Marte", weakness: "Metal", emoji: "🧠" },
    { name: "Águila Dorada", power: "Vuelo", level: 75, origin: "Atlántida", weakness: "Agua salada", emoji: "🦅" },
    { name: "Furia Titánica", power: "Fuerza", level: 99, origin: "Olimpo", weakness: "Amor verdadero", emoji: "💪" },
    { name: "Espectro Veloz", power: "Velocidad", level: 65, origin: "Dimensión X", weakness: "Gravedad", emoji: "👻" },
    { name: "Psíquico Supremo", power: "Telepatía", level: 89, origin: "Luna", weakness: "Emociones fuertes", emoji: "🌙" },
    { name: "Fantasma Plateado", power: "Invisibilidad", level: 71, origin: "Reino Fantasma", weakness: "Sal", emoji: "✨" },
    { name: "Halcón Estelar", power: "Vuelo", level: 86, origin: "Nebulosa", weakness: "Campos magnéticos", emoji: "🌟" }
];

let currentTeam = [];
let filteredHeroes = [...HERO_DATABASE];
const TEAM_STORAGE_KEY = 'superheroTeam'; 

const getRandomHero = () => HERO_DATABASE[Math.floor(Math.random() * HERO_DATABASE.length)];
const generateTeamName = () => {
    const adjectives = ['Invencibles', 'Legendarios', 'Supremos', 'Élite', 'Cósmicos', 'Místicos', 'Galácticos'];
    const nouns = ['Guardianes', 'Vengadores', 'Protectores', 'Campeones', 'Defensores', 'Héroes', 'Titanes'];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
};

// --- FUNCIONES DE PERSISTENCIA ---
const saveTeam = () => {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(currentTeam));
};

const loadTeam = () => {
    const storedTeam = localStorage.getItem(TEAM_STORAGE_KEY);
    if (storedTeam) {
        currentTeam = JSON.parse(storedTeam);
        showOutput(`💾 Equipo cargado con ${currentTeam.length} miembros`);
    } else {
        showOutput(`⭐ ¡Bienvenido! Crea tu primer equipo.`);
    }
};
// ----------------------------------

// --- LÓGICA DE ESTILOS Y COMPONENTES ---
const getLevelColors = (level) => {
    if (level >= 85) return { bg: 'from-purple-600 to-indigo-600', text: 'text-white', badge: 'bg-red-500' };
    if (level >= 70) return { bg: 'from-cyan-500 to-emerald-500', text: 'text-white', badge: 'bg-yellow-500' };
    return { bg: 'from-sky-500 to-cyan-500', text: 'text-white', badge: 'bg-green-500' };
};

const createHeroCard = (hero) => {
    const isInTeam = currentTeam.some(h => h.name === hero.name);
    const { bg } = getLevelColors(hero.level); 
    
    const borderColor = isInTeam ? 'border-purple-500 ring-4 ring-purple-200 animate-pulse-slow' : 'border-gray-200';

    return `
        <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${borderColor} border-2 p-6 cursor-pointer group"
                            onclick="toggleHeroInTeam('${hero.name}')">
            <div class="text-center mb-4">
                <div class="text-6xl mb-2 group-hover:animate-bounce-slow">${hero.emoji}</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${hero.name}</h3>
                <span class="inline-block bg-gradient-to-r ${bg} text-white px-4 py-2 rounded-full font-bold text-sm shadow-md">
                    Nivel ${hero.level}
                </span>
            </div>
            <div class="space-y-2 text-sm text-gray-600">
                <div class="flex justify-between">
                    <span class="font-semibold">Poder:</span>
                    <span class="text-cyan-600 font-bold">${hero.power}</span>
                </div>
                <div class="flex justify-between">
                    <span class="font-semibold">Origen:</span>
                    <span class="text-blue-600">${hero.origin}</span>
                </div>
                <div class="flex justify-between">
                    <span class="font-semibold">Debilidad:</span>
                    <span class="text-red-500">${hero.weakness}</span>
                </div>
            </div>
            <div class="mt-4 text-center">
                <button class="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform group-hover:scale-110">
                    ${isInTeam ? '✅ En Equipo' : '➕ Añadir'}
                </button>
            </div>
        </div>
    `;
};
// ------------------------------------------------

// --- LÓGICA DE GESTIÓN DE EQUIPO ---
const toggleHeroInTeam = (heroName) => {
    const hero = HERO_DATABASE.find(h => h.name === heroName);
    const heroIndex = currentTeam.findIndex(h => h.name === heroName);

    if (heroIndex >= 0) {
        currentTeam = currentTeam.filter(h => h.name !== heroName);
        showOutput(`❌ ${heroName} removido del equipo`);
    } else {
        addHeroToTeam(hero);
    }
    saveTeam(); 
    updateDisplay();
};

const addHeroToTeam = (hero) => {
    const heroExists = currentTeam.find(h => h.name === hero.name);
    if (!heroExists && currentTeam.length < 5) {
        currentTeam = [...currentTeam, hero];
        saveTeam(); 
        updateDisplay();
        showOutput(`✅ ${hero.name} añadido al equipo!`);
    } else if (currentTeam.length >= 5) {
        showOutput(`❌ El equipo está completo (máximo 5 héroes)`);
    } else {
        showOutput(`❌ ${hero.name} ya está en el equipo`);
    }
};

const clearTeam = () => {
    currentTeam = [];
    localStorage.removeItem(TEAM_STORAGE_KEY);
    updateDisplay();
    document.getElementById('teamSummary').classList.add('hidden');
    showOutput(`🗑️ Equipo limpiado`);
};

const calculateTeamStats = () => {
    if (currentTeam.length === 0) return null;
    return currentTeam.reduce((stats, hero) => ({
        totalPower: stats.totalPower + hero.level,
        avgPower: Math.round((stats.totalPower + hero.level) / currentTeam.length),
        maxPower: Math.max(stats.maxPower, hero.level),
        minPower: Math.min(stats.minPower, hero.level),
        memberCount: currentTeam.length 
    }), {
        totalPower: 0,
        avgPower: 0,
        maxPower: 0,
        minPower: 100
    });
};
// ------------------------------------

// --- LÓGICA DE ACCIONES PRINCIPALES ---
const generateRandomTeam = () => {
    currentTeam = [];
    const teamSize = Math.floor(Math.random() * 3) + 3;
    const usedHeroes = new Set();
    while (currentTeam.length < teamSize) {
        const randomHero = getRandomHero();
        if (!usedHeroes.has(randomHero.name)) {
            currentTeam = [...currentTeam, randomHero];
            usedHeroes.add(randomHero.name);
        }
    }
    const teamName = generateTeamName();
    saveTeam(); 
    updateDisplay();
    showOutput(`🎲 ¡Equipo "${teamName}" generado con ${currentTeam.length} miembros!`);
};

const createSuperTeam = () => {
    const topHeroes = HERO_DATABASE
        .filter(hero => hero.level >= 85)
        .sort((a, b) => b.level - a.level)
        .slice(0, 4);
    currentTeam = [...topHeroes];
    saveTeam(); 
    updateDisplay();
    showOutput(`⭐ Equipo Elite creado con los ${currentTeam.length} héroes más poderosos (Nivel 85+)`);
};

const findStrongestHero = () => {
    const strongest = HERO_DATABASE.reduce((max, hero) => 
        (hero.level > max.level ? hero : max), { level: -1, name: "Nadie" });

    if (strongest.name !== "Nadie") {
        const {name, level, power} = strongest;
        showOutput(`💪 Héroe más fuerte encontrado: ${name} (Nivel ${level}, Poder: ${power}). ¡Añádelo con un click!`);
    }
};

const analyzeCurrentTeam = () => {
    if (currentTeam.length === 0) {
        showOutput(`❌ No hay equipo para analizar. Genera uno primero.`);
        return;
    }
    const stats = calculateTeamStats();
    const powers = currentTeam.map(hero => hero.power);
    const uniquePowers = [...new Set(powers)];
    const analysis = `📊 ANÁLISIS COMPLETO DEL EQUIPO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 Miembros: ${stats.memberCount}
⚡ Poder Total: ${stats.totalPower}
📈 Poder Promedio: ${stats.avgPower}
🏆 Máximo: ${stats.maxPower}
📉 Mínimo: ${stats.minPower}
🎯 Poderes únicos: ${uniquePowers.length} (${uniquePowers.join(', ')})

🏅 RANKING DEL EQUIPO:
${currentTeam
    .sort((a, b) => b.level - a.level)
    .map((hero, index) => `${index + 1}. ${hero.emoji} ${hero.name} (${hero.level})`)
    .join('\n')}`;
    showOutput(analysis);
};

const showTeamStats = () => {
    if (currentTeam.length === 0) {
        showOutput(`❌ No hay equipo actual`);
        return;
    }
    const stats = calculateTeamStats();
    const statsText = `📊 ESTADÍSTICAS DEL EQUIPO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 Miembros: ${stats.memberCount}
⚡ Poder Total: ${stats.totalPower}
📈 Promedio: ${stats.avgPower}
🏆 Nivel Máx: ${stats.maxPower}
📉 Nivel Mín: ${stats.minPower}`;
    showOutput(statsText);
};
// ------------------------------------

// --- FUNCIÓN PARA INSPECCIONAR PROPIEDADES DEL DOM ---
const inspectDOM = () => {
    const forms = document.forms;
    const links = document.links;
    const scripts = document.scripts;

    const formInfo = forms.length > 0 
        ? `ID: ${forms[0].id || 'N/A'} | Método: ${forms[0].method}`
        : 'No se encontraron formularios.';

    const linkInfo = links.length > 0 
        ? `Href: ${links[0].href} | Clases: ${links[0].classList.value}`
        : 'No se encontraron enlaces (links) con href.';

    const scriptInfo = scripts.length > 0 
        ? `Total: ${scripts.length} | Primer SRC: ${scripts[0].src || 'Interno/En línea'}`
        : 'No se encontraron scripts.';
        
    const bodyClass = document.body.className.split(' ').slice(0, 3).join(' ') + '...';
    const domain = document.domain;

    const outputMessage = `🔍 INSPECCIÓN DE PROPIEDADES DOM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Dominio: ${domain}
📄 Total de elementos (document.all): ${document.all.length}
----------------------------------
👤 Elemento Body (Clases): ${bodyClass}
🔗 Primer Link: ${linkInfo}
📝 Scripts: ${scriptInfo}
⚙️ Formularios: ${forms.length} (${formInfo})
🖼️ Imágenes: ${document.images.length}`;

    showOutput(outputMessage);
};
// -----------------------------------------------------------

// --- LÓGICA DE FILTROS (Activada por evento 'change') ---
const checkLevelRange = (level, range) => {
    switch(range) {
        case 'elite': return level >= 85; 
        case 'high': return level >= 70 && level < 85;
        case 'medium': return level >= 50 && level < 70;
        case 'low': return level < 50;
        default: return true;
    }
};

const filterHeroes = () => {
    const powerFilter = document.getElementById('powerFilter').value;
    const levelFilter = document.getElementById('levelFilter').value;

    filteredHeroes = HERO_DATABASE.filter(hero => {
        const powerMatch = !powerFilter || hero.power === powerFilter;
        const levelMatch = !levelFilter || checkLevelRange(hero.level, levelFilter);
        return powerMatch && levelMatch;
    });

    updateDisplay();
    showOutput(`🔍 Filtrados: ${filteredHeroes.length} héroes encontrados (onchange ejecutado)`);
};
// ------------------------------------

// --- LÓGICA DE VISUALIZACIÓN ---
const showOutput = (message) => {
    const output = document.getElementById('output');
    const outputContent = document.getElementById('outputContent');
    if (!output || !outputContent) return; // Protección
    output.classList.remove('hidden');
    outputContent.textContent = message;
};

const showTeamSummary = (teamName) => {
    const summary = document.getElementById('teamSummary');
    const content = document.getElementById('teamSummaryContent');
    const stats = calculateTeamStats();
    
    if (!summary || !content) return; // Protección

    if (!stats || stats.memberCount === 0) { 
        summary.classList.add('hidden');
        return;
    }
    
    const teamMates = currentTeam.map(h => `${h.emoji} ${h.name}`).join(' | ');
    const totalPowerBar = Math.min(100, Math.round(stats.totalPower / 500 * 100)); 

    summary.classList.remove('hidden');
    content.innerHTML = `
        <h3 class="text-2xl font-bold text-emerald-700 mb-4 flex items-center">
            <span class="mr-3">⭐</span> Equipo: ${teamName} 
            <span class="ml-auto text-xl text-gray-500">${stats.memberCount}/5</span>
        </h3>
        <div class="space-y-3">
            <div class="bg-gray-200 rounded-full h-4 mb-4" title="Poder Total: ${stats.totalPower}">
                <div class="bg-gradient-to-r from-teal-400 to-cyan-500 h-4 rounded-full transition-all duration-500" 
                        style="width: ${totalPowerBar}%"></div>
            </div>
            <p class="text-gray-700 font-semibold flex justify-between">
                <span>⚡ Poder Total:</span>
                <span class="text-teal-600 font-bold">${stats.totalPower}</span>
            </p>
            <p class="text-gray-700 flex justify-between">
                <span>📈 Promedio:</span>
                <span class="text-cyan-600">${stats.avgPower}</span>
            </p>
            <p class="text-gray-700 flex justify-between">
                <span>🏆 Nivel Máximo:</span>
                <span class="text-indigo-600">${stats.maxPower}</span>
            </p>
            <p class="mt-4 pt-4 border-t border-gray-300 text-sm overflow-x-auto whitespace-nowrap">
                **Miembros:** ${teamMates}
            </p>
        </div>
    `;
};

const updateDisplay = () => {
    const heroGrid = document.getElementById('heroGrid');
    if (heroGrid) {
        heroGrid.innerHTML = filteredHeroes.map(createHeroCard).join('');
    }
    showTeamSummary(currentTeam.length > 0 ? 'Equipo Actual' : 'No hay equipo');
};
// ------------------------------------

// --- FUNCIONES ASÍNCRONAS PARA CARGA PROGRESIVA (CREACIÓN DE NODOS) ---
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const generateProgressiveGrid = async () => {
    const gridContainer = document.getElementById('progressiveGrid');
    if (!gridContainer) {
        // showOutput('❌ ERROR: Contenedor #progressiveGrid no encontrado.');
        return; 
    }
    
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
    const totalCells = 20;
    const size = 'w-10 h-10';

    gridContainer.innerHTML = ''; 
    showOutput(`⏳ Iniciando carga progresiva de ${totalCells} celdas...`);

    for (let i = 0; i < totalCells; i++) {
        // CREACIÓN DE NODO: document.createElement() y appendChild()
        const cell = document.createElement('div');
        const colorClass = colors[i % colors.length];
        cell.className = `${size} ${colorClass} transition-all duration-100 ease-in-out transform hover:scale-125`;
        gridContainer.appendChild(cell);
        await sleep(250);
    }
    showOutput(`✅ Carga progresiva finalizada.`);
};
// -----------------------------------------------------

// --- LÓGICA DE EVENTOS (onmouseover, onmousedown) ---
const animateOnMouse = (event) => {
    const target = event.currentTarget; // Usamos currentTarget ya que los eventos se asignan al div
    if (!target) return;

    if (event.type === 'mouseover') {
        target.classList.remove('bg-yellow-400', 'scale-100');
        target.classList.add('bg-pink-500', 'scale-110');
        showOutput(`👆 Evento MOUSE-OVER activado.`);
    } else if (event.type === 'mouseout') {
        target.classList.remove('bg-pink-500', 'scale-110', 'border-8', 'border-red-700', 'bg-red-300');
        target.classList.add('bg-yellow-400', 'scale-100');
        showOutput(`➡️ Evento MOUSE-OUT activado.`);
    } else if (event.type === 'mousedown') {
        target.classList.add('border-8', 'border-red-700', 'bg-red-300');
        showOutput(`⬇️ Evento MOUSE-DOWN activado en la caja.`);
    } else if (event.type === 'mouseup') {
        target.classList.remove('border-8', 'border-red-700', 'bg-red-300');
        showOutput(`⬆️ Evento MOUSE-UP (soltar click) activado.`);
    }
};

// --- PUNTO DE INICIO Y ASIGNACIÓN DE EVENTOS ---
const initialize = async () => {
    // 1. Carga progresiva (async) - Crea los nodos dinámicamente
    await generateProgressiveGrid(); 
    
    // 2. Carga del equipo y display
    loadTeam();
    updateDisplay();

    // 3. ASIGNACIÓN DE EVENTOS con addEventListener
    
    // a) Eventos de Ratón
    const eventBox = document.getElementById('eventBox');
    if (eventBox) {
        eventBox.addEventListener('mouseover', animateOnMouse);
        eventBox.addEventListener('mouseout', animateOnMouse);
        eventBox.addEventListener('mousedown', animateOnMouse);
        eventBox.addEventListener('mouseup', animateOnMouse); 
    }

    // b) Evento de Cambio (onchange) para los filtros
    const powerFilter = document.getElementById('powerFilter');
    const levelFilter = document.getElementById('levelFilter');
    
    if (powerFilter) powerFilter.addEventListener('change', filterHeroes);
    if (levelFilter) levelFilter.addEventListener('change', filterHeroes);
};

// Iniciar la aplicación al cargar el script
initialize();