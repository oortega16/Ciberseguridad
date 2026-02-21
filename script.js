// ================================================================
// script.js — Lógica para CryptoClásico
// Métodos: César y Atbash, operando sobre valores ASCII
// Soporta conjunto de caracteres personalizado definido por el usuario
// ================================================================

// ----------------------------------------------------------------
// VARIABLES DE ESTADO GLOBAL
// currentMode:   'encrypt' (cifrar) o 'decrypt' (descifrar)
// currentCipher: 'cesar' o 'atbash'
// ----------------------------------------------------------------
let currentMode   = 'encrypt';
let currentCipher = 'cesar';


// ================================================================
// FUNCIÓN: setMode
// @param {string} mode - 'encrypt' o 'decrypt'
// ================================================================
function setMode(mode) {
  currentMode = mode;
  document.getElementById('btn-encrypt').className =
    'mode-btn' + (mode === 'encrypt' ? ' active' : '');
  document.getElementById('btn-decrypt').className =
    'mode-btn' + (mode === 'decrypt' ? ' active-red' : '');
}


// ================================================================
// FUNCIÓN: setCipher
// @param {string} cipher - 'cesar' o 'atbash'
// ================================================================
function setCipher(cipher) {
  currentCipher = cipher;
  document.getElementById('btn-cesar').classList.toggle('active', cipher === 'cesar');
  document.getElementById('btn-atbash').classList.toggle('active', cipher === 'atbash');
  document.getElementById('shift-section').style.display =
    cipher === 'cesar' ? 'block' : 'none';
}


// ================================================================
// FUNCIÓN: cesarCipher
// Cifrado César sobre un charset personalizado.
// indice_nuevo = (indice_original ± shift) mod charset.length
// Caracteres fuera del charset se dejan sin cambio.
// @param {string}  text    - Texto a procesar
// @param {string}  charset - Conjunto de caracteres sin duplicados
// @param {number}  shift   - Posiciones de desplazamiento
// @param {boolean} encrypt - true=cifrar / false=descifrar
// @returns {string}
// ================================================================
function cesarCipher(text, charset, shift, encrypt) {
  const n   = charset.length;
  const dir = encrypt ? shift : (n - shift % n);
  return text.split('').map(char => {
    const idx = charset.indexOf(char);
    if (idx === -1) return char;
    return charset[(idx + dir) % n];
  }).join('');
}


// ================================================================
// FUNCIÓN: atbashCipher
// Cifrado Atbash sobre un charset personalizado.
// indice_espejo = charset.length - 1 - indice_original
// Es simétrico: la misma función cifra y descifra.
// Caracteres fuera del charset se dejan sin cambio.
// @param {string} text    - Texto a procesar
// @param {string} charset - Conjunto de caracteres sin duplicados
// @returns {string}
// ================================================================
function atbashCipher(text, charset) {
  const last = charset.length - 1;
  return text.split('').map(char => {
    const idx = charset.indexOf(char);
    if (idx === -1) return char;
    return charset[last - idx];
  }).join('');
}


// ================================================================
// FUNCIÓN: process
// Lee los inputs, construye charset sin duplicados,
// aplica el algoritmo seleccionado y muestra el resultado.
// ================================================================
function process() {
  const inputText  = document.getElementById('input-text').value;
  const charsetRaw = document.getElementById('charset-input').value;
  const shift      = parseInt(document.getElementById('shift').value);

  if (!inputText.trim()) { alert('Escribe un mensaje para procesar.'); return; }
  if (!charsetRaw.trim()) { alert('Define el conjunto de caracteres.'); return; }

  // Eliminar duplicados conservando orden: "aabbcc" → "abc"
  const charset = [...new Set(charsetRaw.split(''))].join('');
  if (charset.length < 2) { alert('El charset debe tener al menos 2 caracteres únicos.'); return; }

  let result = '';
  if (currentCipher === 'cesar') {
    result = cesarCipher(inputText, charset, shift, currentMode === 'encrypt');
  } else {
    result = atbashCipher(inputText, charset);
  }

  document.getElementById('output-text').textContent = result;
  document.getElementById('badge-cipher').textContent =
    currentCipher === 'cesar' ? '⚔️ César' : '🪞 Atbash';
  document.getElementById('badge-mode').textContent =
    currentMode === 'encrypt' ? '🔒 Cifrado' : '🔓 Descifrado';
  document.getElementById('badge-shift').textContent =
    currentCipher === 'cesar'
      ? `Desplazamiento: ${shift}  |  Charset: ${charset.length} chars`
      : `Simétrico  |  Charset: ${charset.length} chars`;

  const card = document.getElementById('result-card');
  card.style.display = 'block';
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// ================================================================
// FUNCIÓN: copyResult
// Copia el resultado al portapapeles con confirmación visual.
// ================================================================
function copyResult() {
  const text = document.getElementById('output-text').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.copy-btn');
    btn.textContent = '✓ COPIADO';
    setTimeout(() => btn.textContent = 'COPIAR', 1500);
  });
}

// ── Inicialización ──
setCipher('cesar');