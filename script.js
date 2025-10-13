// --- QUIZ GENÉRICO --- //
function setupQuiz(formId, buttonId, feedbackId, correctMsg, incorrectMsg) {
    const form = document.getElementById(formId);
    const button = document.getElementById(buttonId);
    const feedback = document.getElementById(feedbackId);

    if (form) {
        form.addEventListener("change", () => {
            button.style.display = "inline-block";
        });

        button.addEventListener("click", () => {
            const answer = form.querySelector(`input[name='${formId.replace("-form","")}']:checked`);
            
            if (!answer) return; // por si no selecciona nada

            if (answer.value === "correcto") {
                feedback.innerHTML = `<p class='correct'>✅ ${correctMsg}</p>`;
                feedback.style.color = "green";
            } else {
                feedback.innerHTML = `<p class='incorrect'>❌ ${incorrectMsg}</p>`;
                feedback.style.color = "red";
            }
        });
    }
}

// --- CONFIGURACIÓN DE QUIZZES --- //
setupQuiz(
    "quiz-form", "submit-btn", "quiz-feedback",
    "¡Correcto! Detectaste una alteración de datos: se comprometió la integridad.",
    "Incorrecto. Piensa: los datos ya no son fiables porque fueron modificados."
);

setupQuiz(
    "quiz2-form", "submit2-btn", "quiz2-feedback",
    "¡Correcto! Detectaste un intento de phishing por dominio falso.",
    "Incorrecto. Ese enlace es fraudulento. Nunca entres a dominios sospechosos."
);

setupQuiz(
    "quiz3-form", "submit3-btn", "quiz3-feedback",
    "¡Correcto! Detectaste un intento de phishing: siempre revisa el dominio, no abras enlaces sospechosos y reporta a TI.",
    "Incorrecto. Nunca hagas clic en enlaces o archivos dudosos: verifica el remitente y dominio antes de actuar."
);

setupQuiz(
  "quiz4-form", "submit4-btn", "quiz4-feedback",
  "¡Correcto! Evitaste el USB anzuelo, no habilitaste macros y compartiste con permisos adecuados.",
  "Incorrecto. Conectar USB desconocidos, habilitar macros y reenviar por correo aumenta muchísimo el riesgo."
);
setupQuiz(
  "quiz5a-form", "submit5a-btn", "quiz5a-feedback",
  "¡Correcto! Verificar dominio/URL y usar el portal oficial evita el phishing.",
  "Incorrecto. El dominio y la URL no son oficiales; podrías entregar tus credenciales."
);

setupQuiz(
  "quiz5b-form", "submit5b-btn", "quiz5b-feedback",
  "¡Correcto! No instales nada de redes públicas; usa datos móviles o VPN corporativa autorizada.",
  "Incorrecto. Es frecuente que esas apps/certificados sean trampas de espionaje (MITM)."
);

setupQuiz(
  "quiz5c-form", "submit5c-btn", "quiz5c-feedback",
  "¡Correcto! Desconectar, no pagar y avisar a TI limita el daño del ransomware.",
  "Incorrecto. Los “limpiadores mágicos” y seguir trabajando pueden empeorar la infección."
);
setupQuiz(
  "quiz6-form", "submit6-btn", "quiz6-feedback",
  "¡Correcto! Mínimo privilegio: personas específicas, solo ver, bloqueo de descarga y caducidad.",
  "Incorrecto. “Cualquiera con el enlace (editar)” y adjuntos exponen información confidencial."
);
setupQuiz(
  "quiz7-form", "submit7-btn", "quiz7-feedback",
  "¡Correcto! Contener, evidenciar y reportar permite a TI activar los planes de respuesta y recuperación.",
  "Incorrecto. Reiniciar e instalar software por tu cuenta puede empeorar el incidente y borrar evidencias."
);




// QUIZ 3, 4, etc. se implementarían igual



// --- ESTADO DEL CURSO --- //
// Se guarda qué página estás viendo, tu progreso y qué módulos completaste
const courseState = {
    currentPage: 'home',
    progress: 0,
    completedModules: []
};


// --- NAVEGACIÓN ENTRE PÁGINAS --- //
function showPage(pageId) {
    // Oculta todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Muestra solo la página pedida (si existe)
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }

    // Actualiza el menú lateral, marca el módulo actual como activo
    document.querySelectorAll('.module-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });

    // Actualiza el estado
    courseState.currentPage = pageId;

    // Si es un módulo nuevo y no está en la lista, lo marca como completado
    if (pageId.startsWith('module') && !courseState.completedModules.includes(pageId)) {
        courseState.completedModules.push(pageId);
        updateProgress();
    }

    // Lleva el scroll arriba de todo
    window.scrollTo(0, 0);
}


// --- PROGRESO --- //
function updateProgress() {
    const totalModules = 7; // total de módulos que definiste
    const completed = courseState.completedModules.length;
    courseState.progress = Math.round((completed / totalModules) * 100);

    document.getElementById('progress-fill').style.width = `${courseState.progress}%`;
    document.getElementById('progress-text').textContent = `${courseState.progress}% Completado`;
}


// --- EVALUACIÓN FINAL --- //
function submitQuiz() {
    alert('¡Evaluación enviada! En una implementación real, esto calificaría tus respuestas.');

    // Marca el curso como 100% completado
    courseState.progress = 100;
    document.getElementById('progress-fill').style.width = '100%';
    document.getElementById('progress-text').textContent = '100% Completado';
}


// --- INICIALIZACIÓN --- //
document.addEventListener('DOMContentLoaded', function () {
    // Configura los clicks del menú lateral
    document.querySelectorAll('.module-item a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // 🚫 Evita que el link <a href="#"> rompa la navegación
            const pageId = this.parentElement.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Inicializa la barra de progreso
    updateProgress();

    // Muestra la página inicial
    showPage('home');
});

function openModal() {
  const modal = document.getElementById("pdfModal");
  if (!modal) return;
  modal.classList.add("open");
  document.body.classList.add("modal-open");
  // Cerrar con ESC
  document.addEventListener('keydown', escToClose);
}

function closeModal() {
  const modal = document.getElementById("pdfModal");
  if (!modal) return;
  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
  document.removeEventListener('keydown', escToClose);
}

// Cerrar al hacer clic fuera del cuadro
document.addEventListener('click', function (e) {
  const modal = document.getElementById("pdfModal");
  if (!modal || !modal.classList.contains('open')) return;
  const content = modal.querySelector('.modal-content');
  if (!content.contains(e.target) && !e.target.closest('[onclick="openModal()"]')) {
    closeModal();
  }
});

// Cerrar con tecla ESC
function escToClose(e) {
  if (e.key === 'Escape') closeModal();
}

// Cerrar al hacer clic en el botón de cerrar
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeModal);
});

// Evitar scroll del fondo cuando el modal está abierto
document.addEventListener('wheel', function (e) {
  if (document.body.classList.contains('modal-open')) {
    e.preventDefault();
    }
}, { passive: false });

// Evitar scroll del fondo cuando el modal está abierto (touch)
document.addEventListener('touchmove', function (e) {
  if (document.body.classList.contains('modal-open')) {
    e.preventDefault();
    }
}, { passive: false });

// --- Diseño card --- //
// ===== Toggle de la carta dorada =====
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.goldcard-toggle');
  if (!toggle) return;

  const body = document.getElementById(toggle.getAttribute('aria-controls'));
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';

  toggle.setAttribute('aria-expanded', String(!isOpen));
  if (isOpen) {
    body.hidden = true;
  } else {
    body.hidden = false;
  }
});

// ===== Copiar al portapapeles (correo / tel / helpdesk) =====
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.goldcopy');
  if (!btn) return;

  const sel = btn.getAttribute('data-copy');
  const el = document.querySelector(sel);
  if (!el) return;

  const raw = el.tagName === 'A' ? (el.getAttribute('href') || el.textContent) : el.textContent;
  const cleaned = raw.replace(/^mailto:/,'').replace(/^tel:/,'').trim();

  navigator.clipboard.writeText(cleaned).then(() => {
    const old = btn.textContent;
    btn.textContent = '¡Copiado!';
    setTimeout(() => btn.textContent = old, 1200);
  });
});
 //examenn final

 /***** ========== EXAMEN: CONFIG & POOL DE PREGUNTAS (30) ========== *****/

// Pool de 30 preguntas. Cada una con: text, options[4], correctIndex (0..3), explanation.
// Lenguaje claro, pensado para usuarios no técnicos.
const ALL_QUESTIONS = [
  {
    text:
      "Contabilidad recibe un correo 'URGENTE: Actualice su forma de pago' con logo del proveedor habitual. El enlace muestra https y candado, pero el dominio es 'pagos-proveedores.secure-link.app/prodac'. Piden ingresar usuario y contraseña para 'evitar el corte del servicio hoy'. ¿Qué corresponde hacer?",
    options: [
      "Ingresar de inmediato porque hay candado y el logo parece auténtico.",
      "Responder el correo solicitando la contraseña del proveedor para validar la cuenta.",
      "No ingresar. Verificar el dominio oficial buscando en marcadores corporativos o escribiendo la dirección conocida, y reportar el correo a TI.",
      "Descargar el PDF adjunto y reenviarlo a todos para que 'estén atentos'."
    ],
    correctIndex: 2,
    explanation:
      "El candado solo cifra la conexión; no valida que el sitio sea legítimo. Debes entrar por el dominio oficial (marcadores/intranet) y reportar el intento de phishing a TI."
  },
  {
    text:
      "Compras recibe 'OC-12458.xlsm'. Excel muestra la barra 'Habilitar contenido' pero tú no esperabas este archivo hoy. El remitente es parecido al real (proveed0r@empresa.com, con cero). ¿Cuál es la acción correcta?",
    options: [
      "Habilitar el contenido para ver si 'funciona'.",
      "Subir el archivo a un sitio de conversión en línea para que lo 'limpie'.",
      "No habilitar. Llamar al contacto del proveedor que tienes guardado para confirmar. Si no lo enviaron, reportar a TI.",
      "Imprimir el archivo para revisarlo 'en papel'."
    ],
    correctIndex: 2,
    explanation:
      "Las macros pueden ejecutar código malicioso. Confirma por teléfono con un número que ya tenías (no el del correo) y reporta a TI si es sospechoso."
  },
  {
    text:
      "Recursos Humanos lanza un portal nuevo para vacaciones. Te tienta reutilizar la misma contraseña que usas en redes sociales para 'no olvidarte'. ¿Qué es lo más seguro?",
    options: [
      "Usar la misma clave en todo para recordarla siempre.",
      "Construir una contraseña única y fuerte para el portal y guardarla en el gestor de contraseñas aprobado por TI. Activar 2FA si está disponible.",
      "Pedir a un compañero que te recuerde su contraseña temporal.",
      "Apuntar la contraseña en un post-it debajo del teclado."
    ],
    correctIndex: 1,
    explanation:
      "Nunca reutilices contraseñas. Usa claves únicas y un gestor aprobado. Si el portal ofrece 2FA, actívalo: añade una barrera extra."
  },
  {
    text:
      "Te llama alguien que dice ser 'Soporte del Banco' con 'caso de fraude'. Te pide el código 2FA para 'bloquear movimientos'. Presionan con tono urgente. ¿Qué haces?",
    options: [
      "Dar el código si parecen confiables.",
      "Compartir solo la mitad del código 'por seguridad'.",
      "Cortar la llamada y llamar tú al número oficial del banco; reportar también a TI.",
      "Enviar el código por WhatsApp para que quede por escrito."
    ],
    correctIndex: 2,
    explanation:
      "Nadie legítimo te pedirá tu 2FA. Corta y llama al número oficial que tú marcas. Informa a TI para que quede registro del intento."
  },
  {
    text:
      "Debes compartir un Excel de 60 MB con información de ventas con tu equipo. ¿Cuál es la forma correcta de hacerlo?",
    options: [
      "Adjuntarlo directo al correo (si falla, dividir en 4 correos).",
      "Subirlo a un drive personal para agilizar.",
      "Usar OneDrive/SharePoint corporativo y compartir un enlace con permisos mínimos a las personas que lo necesitan.",
      "Subirlo a cualquier 'nube' gratuita."
    ],
    correctIndex: 2,
    explanation:
      "Usa repositorios corporativos (OneDrive/SharePoint) y permisos de acceso mínimos. Evita servicios personales o sin aprobación."
  },
  {
    text:
      "Estás en el aeropuerto usando Wi-Fi público. Debes revisar correos con contratos adjuntos. ¿Qué opción reduce mejor el riesgo?",
    options: [
      "Conectarte al Wi-Fi público y descargar todo con normalidad.",
      "Conectarte al Wi-Fi público, pero apagar el Bluetooth nada más.",
      "Usar VPN corporativa o, mejor, posponer el acceso a una red confiable o tu hotspot personal; nunca envíes credenciales sensibles sin protección.",
      "Mandarte los archivos al correo personal para abrirlos luego."
    ],
    correctIndex: 2,
    explanation:
      "El Wi-Fi público es riesgoso. Usa VPN corporativa o espera a una red segura. Evita el correo personal para documentos corporativos."
  },
  {
    text:
      "En el navegador aparece un 'pop-up' que dice 'Tu navegador está desactualizado, actualiza aquí', con un botón grande. El dominio no es el oficial del navegador. ¿Qué haces?",
    options: [
      "Actualizar desde el pop-up porque 'siempre hay que estar al día'.",
      "Ignorar el pop-up y actualizar solo desde el menú del navegador (Ajustes > Acerca de) o desde su web oficial.",
      "Buscar otro navegador en Google e instalarlo rápido.",
      "Pedirle a un compañero que descargue el archivo y te lo pase por USB."
    ],
    correctIndex: 1,
    explanation:
      "Los pop-ups pueden ser falsos. Actualiza desde la función oficial del navegador o su web auténtica."
  },
  {
    text:
      "Instalaste una extensión del navegador para 'mejorar reuniones', pero pide permisos de lectura/escritura en todos los sitios, además de cámara y micrófono. ¿Qué corresponde?",
    options: [
      "Aceptar todos los permisos para que funcione bien.",
      "Denegar permisos. Usar solo apps oficiales aprobadas por TI y consultar si realmente necesitas esa función.",
      "Probar primero en tu cuenta personal.",
      "Instalar tres extensiones similares y ver cuál pide menos permisos."
    ],
    correctIndex: 1,
    explanation:
      "Evita extensiones que piden demasiados permisos. Usa software aprobado por TI y solo si es necesario para el trabajo."
  },
  {
    text:
      "Encuentras un código QR pegado en la sala de reuniones con el texto 'Wi-Fi invitados PRODAC: escanéame'. Te lleva a una página que solicita correo y contraseña corporativa. ¿Qué haces?",
    options: [
      "Escanear y acceder: parece práctico.",
      "Introducir tus credenciales para validar el acceso invitado.",
      "No ingresar tus credenciales. Verificar el procedimiento oficial de Wi-Fi invitados con TI/Recepción o la intranet. Reportar el QR si es dudoso.",
      "Hacerle una foto y compartir el QR por el grupo de WhatsApp del área."
    ],
    correctIndex: 2,
    explanation:
      "Los QR pueden ser un vector de phishing. Verifica el flujo oficial y reporta QR sospechosos a TI."
  },
  {
    text:
      "Recibes un SMS que dice: 'Su paquete está retenido, pague la tasa aquí: http://pagos-envios.soporte-cliente.link'. Estás esperando un paquete personal. ¿Qué opción es más segura?",
    options: [
      "Tomar el enlace del SMS y pagar rápido para no retrasar el envío.",
      "Responder al SMS con tu dirección y DNI para 'acelerar'.",
      "No pulsar el enlace. Consultar en la web oficial de la paquetería escribiendo la dirección auténtica o usando su app oficial.",
      "Reenviar el SMS a varios para preguntar si 'les pasó'."
    ],
    correctIndex: 2,
    explanation:
      "Es smishing (phishing por SMS). Entra solo por la app o web oficial que tú escribes, no por enlaces de mensajes."
  },
  {
    text:
      "En una sala de reuniones aparece un USB rotulado 'Fotos aniversario'. ¿Qué haces?",
    options: [
      "Conectarlo para ver si es de alguien del equipo.",
      "Llevarlo a casa y revisarlo en tu PC personal.",
      "No conectarlo. Entregarlo a TI para análisis seguro.",
      "Conectarlo, pero con el antivirus apagado para que no 'moleste'."
    ],
    correctIndex: 2,
    explanation:
      "Classic baiting. No lo conectes. Entrégalo a TI para revisión controlada."
  },
  {
    text:
      "Te levantas a una reunión 'rápida' y dejas la PC desbloqueada. A la vuelta, tu correo envió mensajes sin que tú lo notes. ¿Qué debiste hacer?",
    options: [
      "Apagar el monitor para que 'no se vea'.",
      "Bajar el brillo.",
      "Bloquear la sesión con Windows + L al levantarte, aunque te ausentes un minuto.",
      "Nada: el auto-bloqueo llegará en algún momento."
    ],
    correctIndex: 2,
    explanation:
      "Bloquear la sesión previene accesos no autorizados y errores. Es un hábito clave."
  },
  {
    text:
      "Empiezas a recibir muchas notificaciones de aprobación 2FA de Microsoft Authenticator sin haber intentado entrar a ningún servicio. ¿Qué es correcto?",
    options: [
      "Aprobar una para que 'dejen de insistir'.",
      "Ignorar todo y esperar que pase.",
      "No aprobar ninguna. Cambiar la contraseña cuanto antes y reportar a TI (posible ataque de 'MFA fatigue').",
      "Desinstalar la app de autenticación."
    ],
    correctIndex: 2,
    explanation:
      "Nunca apruebes solicitudes inesperadas. Cambia la contraseña y avisa a TI: puede ser un ataque de fatiga MFA."
  },
  {
    text:
      "Te registras a un webinar externo. Aparece el banner de cookies con 'Aceptar todas', 'Solo necesarias' y 'Configurar'. ¿Qué opción es más prudente en el trabajo?",
    options: [
      "Aceptar todas por rapidez.",
      "Solo necesarias; si algo imprescindible no carga, ajustar lo mínimo en 'Configurar'.",
      "Bloquear todas siempre.",
      "Aceptar todas y luego borrar el historial."
    ],
    correctIndex: 1,
    explanation:
      "Minimiza la exposición: selecciona 'solo necesarias' y ajusta lo mínimo requerido para que funcione."
  },
  {
    text:
      "Necesitas trabajar desde casa con un listado de clientes. Estás tentado a enviarte el Excel a tu correo personal para acceder desde el móvil. ¿Qué es correcto?",
    options: [
      "Enviar al correo personal: 'es temporal'.",
      "Subir a un drive personal y compartir contigo mismo.",
      "Usar el acceso remoto y/o repositorios corporativos aprobados; nunca envíes datos por canales personales.",
      "Mandarlo por WhatsApp a tu otro número."
    ],
    correctIndex: 2,
    explanation:
      "Los datos de la empresa deben gestionarse por canales corporativos aprobados. Evita correo o nubes personales."
  },
  {
    text:
      "Un proveedor te manda un ZIP protegido con clave por WhatsApp y te urge abrirlo para 'no perder el descuento'. El remitente en el correo es parecido al real, pero no exacto. ¿Qué haces?",
    options: [
      "Abrirlo: trae contraseña, debe ser seguro.",
      "Subir el ZIP a una web cualquiera para ver su contenido.",
      "No abrir. Validar por teléfono el remitente y pedir reenvío por canal oficial (correo corporativo) si procede.",
      "Pedir que te lo reenvíen a tu correo personal para evitar bloqueos."
    ],
    correctIndex: 2,
    explanation:
      "Los ZIP cifrados eluden filtros. Verifica por teléfono y pide envío por el canal corporativo si es legítimo."
  },
  {
    text:
      "Desde la intranet interna ves http://intranet.prodac.local sin 'https'. ¿Qué es sensato?",
    options: [
      "Bloquearlo siempre; http es imposible de usar.",
      "Validar que sea recurso interno controlado y no enviar credenciales sensibles por HTTP externo.",
      "Ignorar avisos: en la empresa todo es seguro.",
      "Intentar forzar https manualmente en la URL."
    ],
    correctIndex: 1,
    explanation:
      "En LAN puede ser un servicio interno. Aun así, evita enviar credenciales sensibles por HTTP externo. Ante dudas, consulta a TI."
  },
  {
    text:
      "Te llega una invitación a reunión con un adjunto 'orden_del_dia.pdf.exe' que se ve como 'PDF'. El remitente es desconocido. ¿Qué haces?",
    options: [
      "Abrirlo para revisar el orden del día.",
      "Cambiarle la extensión a .pdf y abrirlo.",
      "No abrir. Revisar la extensión real, reportar a TI y eliminar si es sospechoso.",
      "Reenviar a todos preguntando si es de alguien."
    ],
    correctIndex: 2,
    explanation:
      "Los archivos doble extensión suelen ser malware. No lo abras y reporta a TI."
  },
  {
    text:
      "Tienes un Excel con DNI y teléfonos de clientes. Debes compartirlo con dos áreas internas. ¿Cuál es la mejor práctica?",
    options: [
      "Adjuntarlo a un correo a toda la empresa para 'que nadie quede fuera'.",
      "Compartirlo por OneDrive/SharePoint solo con los usuarios que deben verlo; evitar descargables si no es necesario.",
      "Subirlo a un drive personal y pasar el link por WhatsApp.",
      "Enviar una copia impresa a cada área."
    ],
    correctIndex: 1,
    explanation:
      "Aplica el principio de mínimo privilegio. Usa repositorios corporativos y permisos limitados."
  },
  {
    text:
      "Un compañero te pide tu usuario y contraseña 'solo por hoy' para cargar un reporte que no le funciona. ¿Qué haces?",
    options: [
      "Prestarle tu usuario por confianza.",
      "Cambiar la contraseña después de prestarla.",
      "Negarte: el usuario es personal e intransferible. Ofrece ayuda o pídele que abra ticket a TI.",
      "Pasarle una contraseña antigua que 'aún sirve'."
    ],
    correctIndex: 2,
    explanation:
      "Las credenciales son personales e intransferibles. Pide que use su usuario o que TI lo asista."
  },
  {
    text:
      "Un visitante 'solo quiere cargar su celular' y te pide conectar su USB a tu PC. Está apurado. ¿Qué es correcto?",
    options: [
      "Conectarlo 'un minuto' para ayudar.",
      "Conectarlo pero desconectar el mouse para 'compensar'.",
      "Negarte amablemente: no se permite conectar USBs ajenos a equipos corporativos. Ofrece un cargador de pared si hay.",
      "Conectarlo pero desactivar el antivirus para que no interfiera."
    ],
    correctIndex: 2,
    explanation:
      "Nunca conectes dispositivos USB desconocidos a equipos corporativos. Ofrece alternativas seguras."
  },
  {
    text:
      "Te llama alguien diciendo ser de 'Helpdesk PRODAC' para instalar una herramienta de control remoto no aprobada, 'porque hay un incidente general'. No hay ticket en tu correo. ¿Qué haces?",
    options: [
      "Instalar la herramienta porque 'siempre ayudan'.",
      "Dar tus credenciales completas para que 'resuelvan rápido'.",
      "Verificar por los canales oficiales (ticket/correo corporativo/llamar al número interno) antes de instalar cualquier herramienta.",
      "Dejar la PC desbloqueada para que 'ellos entren'."
    ],
    correctIndex: 2,
    explanation:
      "Valida siempre por el canal oficial antes de instalar software o ceder control remoto."
  },
  {
    text:
      "Te comparten un enlace que parece de Microsoft: https://microsоft.com-login.co/ (la 'o' es una letra cirílica). El diseño luce perfecto. ¿Qué haces?",
    options: [
      "Confiar: tiene https.",
      "Entrar y probar con una cuenta de prueba.",
      "No entrar; escribir tú el dominio oficial o usar marcadores. Reportar el intento a TI.",
      "Abrirlo en modo incógnito, así 'no hay riesgo'."
    ],
    correctIndex: 2,
    explanation:
      "Es un dominio homógrafo. Entra solo por direcciones que tú escribes o marcadores oficiales. Reporta a TI."
  },
  {
    text:
      "Alguien propone pegar texto de un informe interno en una herramienta de IA pública para 'resumirlo'. Contiene datos de clientes. ¿Qué corresponde?",
    options: [
      "Pegar todo porque 'es solo para resumir'.",
      "Pegar, pero cambiar los nombres.",
      "Revisar la política de datos y usar solo herramientas y modos aprobados por TI/Legal para información sensible.",
      "Pegar sabiendo que 'nadie lo verá'."
    ],
    correctIndex: 2,
    explanation:
      "La información sensible solo debe procesarse en herramientas aprobadas y conforme a política. Consulta a TI/Legal."
  },
  {
    text:
      "Un compañero toma una foto del pizarrón con usuarios y claves 'temporales' y la envía al grupo de WhatsApp del equipo. ¿Cuál es la acción correcta?",
    options: [
      "Agradecer la iniciativa.",
      "Descargar la imagen y guardarla para 'no olvidar'.",
      "Pedir que elimine la foto, informar a TI y solicitar que las claves se gestionen de forma segura por los canales corporativos.",
      "Reenviarla al área de Proveedores por si acaso."
    ],
    correctIndex: 2,
    explanation:
      "Nunca compartas credenciales por canales no autorizados. Solicita su eliminación y reporta para mitigar el riesgo."
  },
  {
    text:
      "Ves un correo claramente sospechoso (phishing). ¿Qué es lo mejor para que la empresa pueda bloquear campañas similares?",
    options: [
      "Eliminarlo sin más.",
      "Responder al atacante para que 'no moleste'.",
      "Usar la función corporativa de 'Reportar phishing' o reenviarlo al buzón/portal indicado por TI.",
      "Reenviarlo a muchos compañeros para avisarles."
    ],
    correctIndex: 2,
    explanation:
      "Reportar por el canal oficial ayuda a que TI bloquee la campaña para todos. Evita difundirlo internamente."
  },
  {
    text:
      "Imprimes una lista con datos personales para una reunión y la olvidas en la impresora compartida. ¿Qué debiste hacer?",
    options: [
      "Nada: el papel no es digital.",
      "Dejarla allí: alguien la llevará a tu sitio.",
      "Recogerla de inmediato (liberar y retirar). Si no la necesitas, destruirla de forma segura.",
      "Tomarle foto para tener copia en tu móvil personal."
    ],
    correctIndex: 2,
    explanation:
      "Los papeles también exponen datos. Retira de inmediato tus impresiones y destruye lo que no corresponda guardar."
  },
  {
    text:
      "Soporte te comparte un portal de proveedor: https://prodac-support.help. El logo está bien, pero no es el dominio que usas normalmente. Te pide credenciales. ¿Qué haces?",
    options: [
      "Ingresar: 'se ve profesional'.",
      "Pedir credenciales a un compañero para probar.",
      "Verificar el procedimiento oficial y el dominio en la intranet/TI antes de ingresar cualquier credencial.",
      "Crear una cuenta nueva con tu correo personal."
    ],
    correctIndex: 2,
    explanation:
      "Valida el dominio y el procedimiento oficial. No ingreses credenciales en sitios que no reconozcas como oficiales."
  },
  {
    text:
      "Notas que una carpeta compartida dejó de mostrar archivos recientes tras un incidente. ¿Cuál es la vía adecuada para recuperar información?",
    options: [
      "Descargar una herramienta gratuita de 'recuperación mágica'.",
      "Editar los archivos que quedan para 'reconstruir'.",
      "Reportar a TI/Helpdesk solicitando restauración desde las copias de seguridad corporativas.",
      "Pedir a alguien que te pase todo por WhatsApp."
    ],
    correctIndex: 2,
    explanation:
      "La recuperación debe hacerse con los procedimientos y copias de seguridad corporativas, controladas por TI."
  },
  {
    text:
      "Un correo de 'RR. HH.' pide actualizar datos personales en un formulario externo. El remitente es rrhh@prodac-soporte.com y no rrhh@prodac.com. ¿Qué haces?",
    options: [
      "Contestar con tus datos para 'avanzar'.",
      "Ingresar al formulario y completar 'rápido'.",
      "No completar. Confirmar por el canal interno (correo oficial/portal) y reportar el intento si es falso.",
      "Reenviar a todos para que 'también completen'."
    ],
    correctIndex: 2,
    explanation:
      "Dominios parecidos suelen ser phishing. Confirma por el canal interno y reporta a TI si es fraude."
  },
  {
    text:
      "Necesitas instalar un visor de PDFs 'más liviano'. El instalador lo encontraste en una web de descargas no oficial. ¿Qué haces?",
    options: [
      "Instalar igual: 'solo es un lector'.",
      "Pasar el instalador a un compañero para que lo pruebe primero.",
      "Solicitar a TI el software, indicando el caso de uso; usar solo instaladores oficiales aprobados.",
      "Instalarlo en tu sesión personal y luego usarlo en la laboral."
    ],
    correctIndex: 2,
    explanation:
      "El software debe solicitarse por el canal oficial y provenir de fuentes confiables. Evita descargas no oficiales."
  },
  {
    text:
      "Marketing quiere usar una herramienta web para editar imágenes de campañas. La versión gratuita dice que 'puede usar tus archivos para entrenar modelos'. ¿Qué corresponde?",
    options: [
      "Subir igual: 'son solo imágenes'.",
      "Subir, pero con marca de agua.",
      "Consultar a TI/Legal si la herramienta es aprobada y si la licencia permite usar material corporativo sin ceder derechos.",
      "Usar tu correo personal para 'separar' el trabajo."
    ],
    correctIndex: 2,
    explanation:
      "Verifica licencias y políticas de datos antes de subir material corporativo a servicios externos."
  },
  {
    text:
      "Operaciones recibe un correo con un enlace para 'instalar un códec' para ver un video de proveedor. El dominio del enlace es corto y genérico. ¿Qué haces?",
    options: [
      "Instalar el códec: 'si el video no se ve, algo falta'.",
      "Instalarlo en el celular personal.",
      "No instalar. Consultar a TI. Pedir que envíen el video en un formato estándar o por un canal oficial.",
      "Probar en un PC viejo 'por si acaso'."
    ],
    correctIndex: 2,
    explanation:
      "Los 'códecs' suelen disfrazar malware. Pide formatos estándar y consulta a TI."
  },
  {
    text:
      "Un correo ofrece una 'bonificación interna' si completas una encuesta externa con tus credenciales. El texto tiene faltas y prisa. ¿Qué haces?",
    options: [
      "Completar para no perder la bonificación.",
      "Responder pidiendo más información y tu premio por adelantado.",
      "Reportar a TI con la función 'Reportar phishing' y eliminarlo.",
      "Reenviarlo al grupo del área 'por si acaso' alguno lo necesita."
    ],
    correctIndex: 2,
    explanation:
      "Señales de phishing: faltas, urgencia, premio extraño. Reporta y elimina."
  },
  {
    text:
      "Durante una videollamada, un participante comparte en pantalla una hoja con datos de clientes que no necesitas para tu rol. ¿Qué corresponde?",
    options: [
      "Hacer captura por si 'luego hace falta'.",
      "Ignorarlo; total 'no es tu tema'.",
      "Avisar al organizador de forma privada o por el canal que corresponda, para que deje de compartir datos innecesarios.",
      "Pedir que te envíen el archivo por correo para revisarlo mejor."
    ],
    correctIndex: 2,
    explanation:
      "Principio de mínimo privilegio: evita exposición innecesaria. Comunícalo con respeto para detener la compartición."
  }
];

ALL_QUESTIONS.forEach(q => {
  // Guarda las opciones junto a su índice original
  const pairs = q.options.map((opt, i) => ({ opt, i }));
  // Mezcla las opciones de forma aleatoria
  const shuffled = shuffle(pairs);
  // Actualiza las opciones ya mezcladas
  q.options = shuffled.map(p => p.opt);
  // Recalcula el nuevo índice de la respuesta correcta
  q.correctIndex = shuffled.findIndex(p => p.i === q.correctIndex);
});

// Parámetros del examen
const EXAM_TOTAL = 30;   // tamaño del pool (informativo)
const EXAM_SHOW = 15;    // cuántas se renderizan por intento
const EXAM_PASS = 12;    // mínimo para aprobar (por ejemplo, 12/15)

/***** Utilidades *****/
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/***** Estado del examen *****/
const examState = {
  generated: false,
  pickedQuestions: [],
  answers: {} // name -> selected index
};

/***** Renderizar examen *****/
function buildExam() {
  const root = document.getElementById('exam-root');
  const submitBtn = document.getElementById('exam-submit');
  const retryBtn = document.getElementById('exam-retry');
  const resultBox = document.getElementById('exam-result');

  // Reset visual
  root.innerHTML = '';
  resultBox.style.display = 'none';
  retryBtn.style.display = 'none';
  submitBtn.disabled = true;
  examState.answers = {};

  // Elegir 15 al azar
  examState.pickedQuestions = shuffle(ALL_QUESTIONS).slice(0, EXAM_SHOW);
  examState.generated = true;

  // Título
  const title = document.createElement('div');
  title.className = 'quiz-title';
  title.innerHTML = `Evaluación de conocimientos — Selec. aleatoria (${EXAM_SHOW} de ${EXAM_TOTAL})`;
  root.appendChild(title);

  // Preguntas
  examState.pickedQuestions.forEach((q, i) => {
    const qWrap = document.createElement('div');
    qWrap.className = 'question';
    qWrap.dataset.qIndex = i;

    const qText = document.createElement('div');
    qText.className = 'question-text';
    qText.textContent = `${i + 1}. ${q.text}`;
    qWrap.appendChild(qText);

    const opts = document.createElement('div');
    opts.className = 'options';

    q.options.forEach((opt, optIndex) => {
      const optId = `q${i}_opt${optIndex}`;
      const optWrap = document.createElement('label');
      optWrap.className = 'option';
      optWrap.setAttribute('for', optId);

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `q-${i}`;
      radio.id = optId;
      radio.value = String(optIndex);

      radio.addEventListener('change', () => {
        examState.answers[`q-${i}`] = optIndex;
        // Habilitar submit si TODAS respondidas
        const allAnswered = Object.keys(examState.answers).length === EXAM_SHOW;
        document.getElementById('exam-submit').disabled = !allAnswered;
      });

      const lbl = document.createElement('span');
      lbl.textContent = `${String.fromCharCode(65 + optIndex)}) ${opt}`;

      optWrap.appendChild(radio);
      optWrap.appendChild(lbl);
      opts.appendChild(optWrap);
    });

    qWrap.appendChild(opts);

    // Espacio para explicación (se llena tras calificar)
    const expl = document.createElement('div');
    expl.className = 'explanation';
    expl.style.display = 'none';
    qWrap.appendChild(expl);

    root.appendChild(qWrap);
  });
}

/***** Calificar *****/
function gradeExam() {
  const submitBtn = document.getElementById('exam-submit');
  const retryBtn = document.getElementById('exam-retry');
  const resultBox = document.getElementById('exam-result');

  let correct = 0;

  examState.pickedQuestions.forEach((q, i) => {
    const qWrap = document.querySelector(`.question[data-q-index='${i}']`);
    const selected = examState.answers[`q-${i}`]; // number
    const optionsDom = qWrap.querySelectorAll('.option');

    // Deshabilitar radios
    qWrap.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);

    optionsDom.forEach((optEl, idx) => {
      // pintar correcto/incorrecto
      if (idx === q.correctIndex) optEl.classList.add('correct');
      if (typeof selected === 'number' && selected !== q.correctIndex && idx === selected) {
        optEl.classList.add('incorrect');
      }
    });

    if (selected === q.correctIndex) correct++;

    const expl = qWrap.querySelector('.explanation');
    expl.innerHTML = `<strong>Explicación:</strong> ${q.explanation}`;
    expl.style.display = 'block';
  });

  // Mostrar resultado
  const pass = correct >= EXAM_PASS;
  resultBox.className = `quiz-feedback ${pass ? 'pass' : 'fail'}`;
  resultBox.style.display = 'block';
  resultBox.innerHTML =
    `<strong>Resultado:</strong> ${correct}/${EXAM_SHOW} ${pass ? '✔ Aprobado' : '✘ No aprobado'}.
     <br> Mínimo requerido: ${EXAM_PASS}/${EXAM_SHOW}.
     <br> Puedes revisar las explicaciones bajo cada pregunta.`;

  // Permitir reintentar (nuevo set aleatorio)
  retryBtn.style.display = 'inline-block';
  submitBtn.disabled = true;
}

/***** Reintentar *****/
function retryExam() {
  buildExam();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/***** Desbloqueo del Quiz por progreso *****/
function isQuizUnlocked() {
  // Requiere que estén visitados module1..module7 (tu app ya los va agregando a courseState.completedModules)
  const needed = ['module1','module2','module3','module4','module5','module6','module7'];
  return needed.every(m => courseState.completedModules.includes(m));
}

function updateQuizMenuLockUI() {
  const quizItem = document.querySelector('.module-item[data-page="quiz"]');
  if (!quizItem) return;
  if (isQuizUnlocked()) {
    quizItem.classList.remove('disabled');
  } else {
    quizItem.classList.add('disabled');
  }
}

/***** Hook a tu navegación: BLOQUEAR acceso al quiz si no completó *****/
/* 
   — IMPORTANTE —
   Debes llamar a updateQuizMenuLockUI() cada vez que cambie el progreso.
   Si ya tienes showPage(), añade el chequeo allí (sin romper tu lógica).
*/

// 1) En tu showPage existente, AÑADE este guard:
const originalShowPage = window.showPage;
window.showPage = function(pageId) {
  // Si intenta ir a 'quiz' sin desbloquear: muestra aviso y no navega
  if (pageId === 'quiz' && !isQuizUnlocked()) {
    const banner = document.getElementById('quiz-locked-banner');
    if (banner) {
      banner.style.display = 'block';
      // Oculta después de unos segundos
      setTimeout(() => (banner.style.display = 'none'), 3500);
    }
    return; // bloquea la navegación
  }

  // Llama a tu showPage original
  originalShowPage(pageId);

  // Si ya entró al quiz y no hemos generado preguntas aún, generarlas:
  if (pageId === 'quiz') {
    if (!examState.generated) buildExam();
  }

  // Refresca estado del menú (por si se completó otro módulo)
  updateQuizMenuLockUI();
};

// 2) En tu updateProgress existente, tras calcular el progreso, llama:
const originalUpdateProgress = window.updateProgress;
window.updateProgress = function() {
  originalUpdateProgress();
  updateQuizMenuLockUI();
};

// 3) Listeners del examen (cuando el DOM esté listo)
document.addEventListener('DOMContentLoaded', () => {
  // Botón enviar
  const submitBtn = document.getElementById('exam-submit');
  if (submitBtn) submitBtn.addEventListener('click', gradeExam);

  // Botón reintentar
  const retryBtn = document.getElementById('exam-retry');
  if (retryBtn) retryBtn.addEventListener('click', retryExam);

  // Estado inicial del menú del quiz
  updateQuizMenuLockUI();
});
