// Obtener referencias a los elementos
const emailField = document.getElementById('email');
const errorBox = document.getElementById('error-box');
const form = document.getElementById('email-form');

let hasErrors = false; // Variable para verificar si hay errores

const validateEmails = (emails) => {
    const validEmails = [];
    const invalidEmails = [];

    // Expresión regular para correos en formato estándar y nombre <correo@dominio.com>
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const complexEmailRegex = /<([^<>]+)>/; // Regex para detectar correos entre <>

    emails.forEach(email => {
        const cleanedEmail = email.trim();

        // Si el correo está en formato "Nombre <correo@dominio.com>"
        if (complexEmailRegex.test(cleanedEmail)) {
            const extractedEmail = cleanedEmail.match(complexEmailRegex)[1]; // Extraer el correo dentro de <>

            if (emailRegex.test(extractedEmail)) {
                validEmails.push(extractedEmail); // Guardar solo el correo extraído
            } else {
                invalidEmails.push(cleanedEmail);
            }
        } 
        // Si es un correo simple
        else if (emailRegex.test(cleanedEmail)) {
            validEmails.push(cleanedEmail);
        } else {
            invalidEmails.push(cleanedEmail);
        }
    });

    return { validEmails, invalidEmails };
};

const parseEmails = (input) => input.split(/[,;]+/).map(email => email.trim());

const handleEmailInput = () => {
    const emailInput = emailField.value;

    // Procesar los correos
    const emails = parseEmails(emailInput);
    const { validEmails, invalidEmails } = validateEmails(emails);

    // Mostrar correos inválidos en el cuadro de error
    if (invalidEmails.length > 0) {
        errorBox.style.display = 'block';
        errorBox.innerHTML = `Correos inválidos: <br>${invalidEmails.join('<br>')}`;
        hasErrors = true;
    } else {
        errorBox.style.display = 'none';
        hasErrors = false;
    }

    // Actualizar el campo de entrada solo con los correos válidos
    emailField.value = validEmails.join('; ');
};

// Evitar envío si hay errores (Arrow Function)
form.addEventListener('submit', (e) => {
    handleEmailInput(); // Validar correos antes de enviar

    if (hasErrors) {
        e.preventDefault(); // Prevenir envío si hay errores
        alert('Corrige los correos inválidos antes de enviar.');
    } else {
        alert('Formulario enviado con éxito.');
        console.log('Correos válidos enviados: ', parseEmails(emailField.value));
    }
});

// Escuchar el evento 'input' para validar automáticamente en tiempo real (Arrow Function)
emailField.addEventListener('input', handleEmailInput);
