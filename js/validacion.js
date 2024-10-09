// Obtener referencias a los campos del formulario
const form = document.querySelector('form');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const terminos = document.getElementById('terminos');
const modalTerminosButton = document.querySelector('button[data-bs-target="#modalTerminos"]');

// Desactivar validación nativa HTML5 para manejarla con JavaScript
form.setAttribute('novalidate', true);

form.addEventListener('submit', function(event) {
  event.preventDefault();  // Prevenir el envío por defecto
  event.stopPropagation(); // Detener propagación del evento
  
  let esValido = true;

  // Validación del campo Nombre
  if (nombre.value.trim() === '') {
    mostrarError(nombre, 'El nombre no puede estar vacío.');
    esValido = false;
  } else {
    limpiarError(nombre);
  }

  // Validación del campo Apellido
  if (apellido.value.trim() === '') {
    mostrarError(apellido, 'El apellido no puede estar vacío.');
    esValido = false;
  } else {
    limpiarError(apellido);
  }

  // Validación del campo Email
  if (!validarEmail(email.value)) {
    mostrarError(email, 'Debe ser un email válido.');
    esValido = false;
  } else {
    limpiarError(email);
  }

  // Validación de la contraseña
  if (password1.value.length < 6) {
    mostrarError(password1, 'La contraseña debe tener al menos 6 caracteres.');
    esValido = false;
  } else {
    limpiarError(password1);
  }

  // Validación de coincidencia de contraseñas
  if (password1.value !== password2.value || password2.value === '') {
    mostrarError(password2, 'Las contraseñas no coinciden.');
    esValido = false;
  } else {
    limpiarError(password2);
  }

  // Validación del checkbox de términos y condiciones
  if (!terminos.checked) {
    mostrarError(terminos, 'Debes aceptar los términos y condiciones.');
    modalTerminosButton.classList.add('btn-danger');
    esValido = false;
  } else {
    limpiarError(terminos);
    modalTerminosButton.classList.remove('btn-danger');
  }

  // Si es válido, mostrar un mensaje o enviar el formulario
  if (esValido) {
    alert('Formulario enviado con éxito');
    form.submit(); // Enviar el formulario si es válido
  }
});

// Validar en tiempo real mientras se completa el formulario
form.addEventListener('input', function(event) {
  const input = event.target;
  if (input.id === 'password2') {
    if (password1.value !== password2.value) {
      mostrarError(password2, 'Las contraseñas no coinciden.');
    } else {
      limpiarError(password2);
    }
  } else {
    if (input.checkValidity()) {
      limpiarError(input);
    }
  }
});

// Función para validar el formato del email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Función para mostrar errores
function mostrarError(campo, mensaje) {
  campo.classList.add('is-invalid');
  let feedback = campo.nextElementSibling;
  if (!feedback || !feedback.classList.contains('invalid-feedback')) {
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    campo.parentNode.appendChild(feedback);
  }
  feedback.textContent = mensaje;
}

// Función para limpiar los errores
function limpiarError(campo) {
  campo.classList.remove('is-invalid');
  campo.classList.add('is-valid');
  const feedback = campo.nextElementSibling;
  if (feedback && feedback.classList.contains('invalid-feedback')) {
    feedback.remove();
  }
}

