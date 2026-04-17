// ─── Configuración central de WhatsApp ───────────────────────────────────────
// Cambiar el número aquí actualiza TODOS los botones del sitio automáticamente.
// Formato: código de país + número, sin + ni espacios. Ej. Peru: 51XXXXXXXXX

const WHATSAPP_NUMBER = "51925736337";
const WHATSAPP_TEXT = "Hola, quisiera que me den más información sobre sus servicios...";

export const getWhatsAppUrl = () =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;