# index.html — Estructura de la página

La parte más importante es el atributo data-label:
html<div class="card" data-label="MÓDULO">
Este atributo es el que genera automáticamente las etiquetas flotantes que aparecen en cada sección del programa. El CSS las lee y las muestra sin necesidad de escribirlas por separado.
Los botones con onclick:
html<button onclick="setMode('encrypt')">🔒 Cifrar</button>
<button onclick="setCipher('cesar')">⚔️ César</button>
Cada botón llama directamente a una función de JavaScript al hacer clic. Así el HTML y el JS se comunican.
El input del charset:
html<input type="text" id="charset-input"
       value="abcdefghijklmnopqrstuvwxyz...">
Este campo es el corazón del programa. El usuario puede modificarlo y todo el cifrado cambia según lo que escriba aquí.
El slider de César:
html<input type="range" id="shift" min="1" max="50" value="3"
       oninput="document.getElementById('shift-display').textContent=this.value">
El oninput actualiza el número visible en pantalla en tiempo real mientras el usuario mueve el control, sin necesidad de hacer clic en ningún botón.
Las badges del resultado:
html<div class="badge badge-cipher" id="badge-cipher">César</div>
<div class="badge badge-mode"   id="badge-mode">Cifrado</div>
<div class="badge badge-shift"  id="badge-shift">Desplazamiento: 3</div>
Estas tres etiquetas son las que identifican el módulo utilizado. El JavaScript las actualiza con cada ejecución mostrando qué cifrado se usó, si fue cifrado o descifrado, y el desplazamiento.

#script.js — Lógica del programa
Las variables de estado:
javascriptlet currentMode   = 'encrypt';
let currentCipher = 'cesar';
Estas dos variables controlan todo el programa. Guardan en todo momento qué modo y qué cifrado está activo. Cuando el usuario hace clic en un botón, solo cambian estas variables.
La parte más importante de César:
javascriptconst dir = encrypt ? shift : (n - shift % n);
return charset[(idx + dir) % n];
La primera línea decide si suma o resta el desplazamiento según si es cifrar o descifrar. La segunda línea aplica el % n que hace la circularidad, es decir, que al llegar al final del charset vuelva al inicio automáticamente.
La parte más importante de Atbash:
javascriptconst last = charset.length - 1;
return charset[last - idx];
Estas dos líneas son todo el algoritmo Atbash. Calcula el índice espejo restando la posición del carácter al último índice del charset. Simple pero efectivo.
La eliminación de duplicados:
javascriptconst charset = [...new Set(charsetRaw.split(''))].join('');
Esta línea convierte el texto del charset en un arreglo, usa Set para eliminar automáticamente cualquier letra repetida, y lo vuelve a convertir en texto. Por ejemplo si el usuario escribe "aabbcc" el programa lo convierte en "abc" antes de usarlo.
La validación antes de procesar:
javascriptif (!inputText.trim()) { alert('Escribe un mensaje para procesar.'); return; }
if (!charsetRaw.trim()) { alert('Define el conjunto de caracteres.'); return; }
if (charset.length < 2) { alert('El charset debe tener al menos 2 caracteres únicos.'); return; }
Estas tres líneas evitan que el programa falle si el usuario deja campos vacíos o pone un solo carácter. El return detiene la ejecución si algo está mal.
