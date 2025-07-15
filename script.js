// Función para hacer scroll suave a las secciones
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Calculadora de empleabilidad
function calcularEmpleabilidad() {
  const secundario = parseInt(document.getElementById("secundario").value);
  const experiencia = parseInt(document.getElementById("experiencia").value);
  const internet = parseInt(document.getElementById("internet").value);
  const computacion = parseInt(document.getElementById("computacion").value);
  const total = secundario + experiencia + internet + computacion;

  let resultado = '';
  let clase = '';
  
  if (total >= 3) {
    resultado = '🎉 ¡Excelentes posibilidades! Tienes una base sólida para la inserción laboral. Te recomendamos completar tu perfil en LinkedIn y aplicar a ofertas que coincidan con tus intereses.';
    clase = 'success';
  } else if (total === 2) {
    resultado = '🟡 Buen punto de partida. Recomendamos fortalecer algunas áreas clave. Considera tomar cursos gratuitos para mejorar tus habilidades digitales o completar tu educación.';
    clase = 'warning';
  } else {
    resultado = '🔴 Necesitas desarrollar más herramientas para mejorar tu empleabilidad. ¡No te preocupes! Estamos aquí para ayudarte. Comienza con nuestros cursos básicos y contacta a nuestro equipo de apoyo.';
    clase = 'danger';
  }

  const resultadoDiv = document.getElementById("resultado-empleabilidad");
  resultadoDiv.innerHTML = resultado;
  resultadoDiv.style.display = "block";
  resultadoDiv.className = `calculator-result ${clase}`;
}

// Test vocacional interactivo
function iniciarTestVocacional() {
  const preguntas = [
    {
      pregunta: "¿Qué actividad te resulta más atractiva?",
      opciones: [
        { texto: "Resolver problemas técnicos", area: "tecnologia" },
        { texto: "Ayudar a otras personas", area: "social" },
        { texto: "Crear contenido visual", area: "creativo" },
        { texto: "Analizar datos y números", area: "analitico" }
      ]
    },
    {
      pregunta: "¿En qué ambiente te sientes más cómodo trabajando?",
      opciones: [
        { texto: "Oficina con tecnología", area: "tecnologia" },
        { texto: "Espacios comunitarios", area: "social" },
        { texto: "Estudios creativos", area: "creativo" },
        { texto: "Entornos estructurados", area: "analitico" }
      ]
    }
  ];

  let resultados = { tecnologia: 0, social: 0, creativo: 0, analitico: 0 };
  let preguntaActual = 0;

  function mostrarPregunta() {
    if (preguntaActual < preguntas.length) {
      const pregunta = preguntas[preguntaActual];
      let opciones = pregunta.opciones.map((opcion, index) => 
        `<button class="custom-btn" onclick="responder('${opcion.area}')" style="margin: 0.5rem; display: block; width: 100%;">${opcion.texto}</button>`
      ).join('');

      document.body.innerHTML += `
        <div id="test-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 10000;">
          <div style="background: linear-gradient(135deg, #ff6b9d, #c4a1e0); padding: 2rem; border-radius: 20px; max-width: 500px; text-align: center;">
            <h3>${pregunta.pregunta}</h3>
            ${opciones}
          </div>
        </div>
      `;
    } else {
      mostrarResultado();
    }
  }

  window.responder = function(area) {
    resultados[area]++;
    preguntaActual++;
    document.getElementById('test-modal').remove();
    mostrarPregunta();
  };

  function mostrarResultado() {
    const areaMaxima = Object.keys(resultados).reduce((a, b) => resultados[a] > resultados[b] ? a : b);
    const recomendaciones = {
      tecnologia: "💻 Tecnología: Considera cursos de programación, soporte técnico o desarrollo web.",
      social: "🤝 Social: Explora oportunidades en recursos humanos, trabajo social o atención al cliente.",
      creativo: "🎨 Creativo: Desarrolla habilidades en diseño gráfico, marketing digital o comunicación.",
      analitico: "📊 Analítico: Considera roles en administración, contabilidad o análisis de datos."
    };

    document.body.innerHTML += `
      <div id="resultado-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 10000;">
        <div style="background: linear-gradient(135deg, #ff6b9d, #c4a1e0); padding: 2rem; border-radius: 20px; max-width: 500px; text-align: center;">
          <h3>🎯 Tu perfil vocacional</h3>
          <p style="font-size: 1.2rem; margin: 1rem 0;">${recomendaciones[areaMaxima]}</p>
          <button class="custom-btn" onclick="document.getElementById('resultado-modal').remove()">Cerrar</button>
        </div>
      </div>
    `;
  }

  mostrarPregunta();
}

// Función para enviar mensaje de contacto
function enviarMensaje() {
  alert('✅ ¡Mensaje enviado exitosamente! Te responderemos en las próximas 24 horas. Gracias por contactarnos.');
}

// Toggle para preguntas frecuentes
function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  const isVisible = answer.style.display === "block";
  
  // Cerrar todas las respuestas
  document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = "none");
  
  // Mostrar la respuesta seleccionada si no estaba visible
  if (!isVisible) {
    answer.style.display = "block";
  }
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Efecto de scroll suave para la navegación
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Animación de entrada para las tarjetas
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Aplicar animación a las tarjetas
  document.querySelectorAll('.card, .func-card, .audience-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});
