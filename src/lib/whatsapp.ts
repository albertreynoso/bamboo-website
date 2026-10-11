// ─── Configuración central de WhatsApp ───────────────────────────────────────
// Cambiar el número aquí actualiza TODOS los botones del sitio automáticamente.
// Formato: código de país + número, sin + ni espacios. Ej. Peru: 51XXXXXXXXX

const WHATSAPP_NUMBER = "51944779844";
const WHATSAPP_TEXT = "Hola, quisiera agendar una cita. ¿Qué horarios tienen disponibles?";

export const getWhatsAppUrl = () =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;