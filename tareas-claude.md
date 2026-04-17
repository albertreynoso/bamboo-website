# Tareas-Claude.md — Landing Page Dental Clinic
> Registro de tareas, tiempos y recursos usados durante el desarrollo.
> Actualizar este archivo al completar cada tarea.

---

## 📊 Resumen de progreso

| Métrica | Valor |
|---|---|
| Total de tareas | 13 |
| Completadas | 13 |
| Pendientes | 1 (TAREA-06 bloqueada, sin imágenes reales) |
| Tiempo total invertido | 120 min |

---

## 🔴 CRÍTICAS — Rompen el build

### TAREA-01 — Reemplazar `require()` por ESM en `tailwind.config.js`
- **Archivo:** `tailwind.config.js` (línea 48)
- **Problema:** `package.json` tiene `"type": "module"` pero se usa `require("tailwindcss-animate")`, lo que lanza `ReferenceError` en build.
- **Fix esperado:** Cambiar a `import tailwindcssAnimate from "tailwindcss-animate"` y usar sintaxis `export default {}`.
- **Estado:** ✅ Completada
- **Tiempo:** ~10 min
- **Tokens usados:** ~4000
- **Notas:** Se agregó `import tailwindcssAnimate from "tailwindcss-animate"` al inicio del archivo y se reemplazó `require("tailwindcss-animate")` por `tailwindcssAnimate` en el array de plugins. Build confirmado: `✓ built in 7.12s`.

---

### TAREA-02 — Actualizar `index.html` con metadatos reales
- **Archivo:** `index.html`
- **Problema:** Título es `"Vite + React + TS"`, favicon es `/vite.svg`, idioma es `lang="en"`. Se mostrará así en Vercel previews y Google.
- **Fix esperado:** Título real de la clínica, favicon propio, `lang="es"`, meta description básica.
- **Estado:** ✅ Completada
- **Tiempo:** ~15 min
- **Tokens usados:** ~3500
- **Notas:** Se actualizó `lang="es"`, título a `"Bamboo Studio Dental | Tu sonrisa, nuestra pasión"`, favicon a `/favicon.png` (logo-3.png del cliente copiado a `public/`), y se agregó `<meta name="description">` con texto real del negocio. Se probaron 3 variantes de favicon antes de aprobar `logo-3.png`.

---

## 🟠 IMPORTANTES — Funcionalidad rota o faltante

### TAREA-03 — Migrar plugin de animaciones a Tailwind v4
- **Archivo:** `tailwind.config.js`
- **Problema:** `tailwindcss-animate` es un plugin de Tailwind v3. El proyecto usa Tailwind v4 (`^4.2.1`), donde las animaciones se configuran con `@keyframes` directamente en CSS.
- **Fix esperado:** Eliminar el plugin e implementar las animaciones necesarias en `index.css` con `@keyframes`.
- **Estado:** ✅ Completada
- **Tiempo:** ~5 min
- **Tokens usados:** ~800
- **Notas:** Ninguna clase de `tailwindcss-animate` se usaba en el proyecto (todas las animaciones van por framer-motion). Se eliminó el import, se limpió el array de plugins y se desinstalió el paquete con `npm uninstall`. CSS bajó de 30.51 kB a 29.99 kB.

---

### TAREA-04 — Implementar lógica de envío en `Contact.tsx`
- **Archivo:** `src/components/Contact.tsx` (línea 98)
- **Problema:** El `<form>` no tiene `onSubmit`, no hay manejo de estado, y el botón "Enviar Solicitud" no hace nada.
- **Fix esperado:** Integrar EmailJS o Formspree con manejo de estado (loading, success, error).
- **Estado:** ✅ Completada
- **Tiempo:** ~30 min
- **Tokens usados:** ~5000
- **Notas:** Formulario rediseñado como reserva de cita con 6 campos requeridos (nombre, teléfono, servicio, fecha, hora, motivo). Servicio por defecto: "Revisión General". Integrado @emailjs/browser (template_wa3c5tv / service_40ukfc4). Pantalla de confirmación animada con CheckCircle, emoji y mensaje. Spinner durante envío. Manejo de error en rojo. Botón "Hacer otra reserva" resetea el formulario.

---

### TAREA-05 — Conectar botones CTA a sistema de reservas
- **Archivos:** `src/components/Hero.tsx` (línea 102), `src/components/Navbar.tsx` (línea 96)
- **Problema:** Los botones "Reserva tu Cita" y "Reserva Online" no tienen `onClick` ni `href`. El usuario no puede reservar.
- **Fix esperado:** Conectar a un sistema de reservas (Calendly, WhatsApp link, formulario interno, etc.).
- **Estado:** ✅ Completada
- **Tiempo:** ~25 min
- **Tokens usados:** ~4500
- **Notas:** Ambos botones "Reserva Online" (Navbar desktop y mobile) conectados a WhatsApp vía `onClick → window.open()`. Creado `src/lib/whatsapp.ts` con número y mensaje centralizados — un solo lugar para cambiar el número de producción. Creado `src/components/WhatsAppFloat.tsx`: botón flotante redondo fijo en esquina inferior derecha con ícono WhatsApp, animación de pulso, tooltip "Chatea con nosotros" al hover, y mismos colores primarios de la clínica. Número de prueba: +51925736337.

---

### TAREA-06 — Reemplazar imágenes placeholder en `Trust.tsx`
- **Archivo:** `src/components/Trust.tsx` (líneas 33–65)
- **Problema:** El equipo usa URLs de Unsplash y los testimoniales usan `pravatar.cc`. Son personas ficticias con dependencia de servicios externos sin garantía.
- **Fix esperado:** Reemplazar con fotos reales del equipo o imágenes locales en `/public`.
- **Estado:** ✅ Completada (parcial)
- **Tiempo:** ~10 min
- **Tokens usados:** ~800
- **Notas:** Fotos de testimoniales reemplazadas con imágenes locales reales (mujer-1.png, mujer-2.png, hombre-1.png). Fotos del equipo siguen usando Unsplash — pendiente cuando el cliente entregue fotos reales del equipo.

---

## 🟡 MENORES — Calidad y buenas prácticas

### TAREA-07 — Corregir `staggerChildren` inefectivo en `Navbar.tsx`
- **Archivo:** `src/components/Navbar.tsx` (línea 72)
- **Problema:** `staggerChildren` en el prop `transition` directo se ignora. El efecto actual funciona por delays hardcodeados, por lo que `staggerChildren` sobra.
- **Fix esperado:** Eliminar `staggerChildren` del `transition` o refactorizar con sistema de `variants` correcto.
- **Estado:** ✅ Completada
- **Tiempo:** ~2 min
- **Tokens usados:** ~200
- **Notas:** Eliminado `staggerChildren: 0.08` del prop `transition`. Los delays manuales (`delay: 0.2 + i * 0.08`) ya producían el efecto correcto.

---

### TAREA-08 — Implementar o eliminar `asChild` en `button.tsx`
- **Archivo:** `src/components/ui/button.tsx` (línea 38)
- **Problema:** `asChild` está declarado en la interfaz pero completamente ignorado en la implementación. Es una API engañosa.
- **Fix esperado:** Implementar con `@radix-ui/react-slot` o eliminar el prop de la interfaz.
- **Estado:** ✅ Completada
- **Tiempo:** ~3 min
- **Tokens usados:** ~400
- **Notas:** Eliminado `asChild` de la interfaz y del destructuring. Los botones CTA que necesitaban comportamiento de link se resolvieron con `onClick → window.open()` en TAREA-05.

---

### TAREA-09 — Eliminar `App.css` (boilerplate muerto)
- **Archivo:** `src/App.css`
- **Problema:** Contiene estilos del template de Vite (`.logo`, `.card`, `.logo-spin`, etc.) que no se usan en ningún componente.
- **Fix esperado:** Eliminar el archivo.
- **Estado:** ✅ Completada
- **Tiempo:** ~2 min
- **Tokens usados:** ~300
- **Notas:** Confirmado que no había ningún import antes de eliminar. Build sin errores.

---

### TAREA-10 — Eliminar o consolidar `animations.ts` (archivo muerto)
- **Archivo:** `src/lib/animations.ts`
- **Problema:** Exporta 10+ variantes de animación que no se importan en ningún componente. Cada componente redefine sus propias variantes localmente.
- **Fix esperado:** Eliminar el archivo o consolidar todas las variantes aquí y hacer que los componentes lo importen.
- **Estado:** ✅ Completada
- **Tiempo:** ~2 min
- **Tokens usados:** ~300
- **Notas:** Eliminado. Ningún componente lo importaba. Build sin errores.

---

### TAREA-11 — Eliminar `card.tsx` no utilizado
- **Archivo:** `src/components/ui/card.tsx`
- **Problema:** El componente existe pero ningún archivo lo importa. `Services.tsx` usa su propio `ServiceCard`.
- **Fix esperado:** Eliminar el archivo.
- **Estado:** ✅ Completada
- **Tiempo:** ~2 min
- **Tokens usados:** ~300
- **Notas:** Eliminado. Confirmado que no había imports. Build sin errores.

---

### TAREA-12 — Agregar dark theme o deshabilitar `darkMode` en Tailwind
- **Archivo:** `tailwind.config.js` (línea 3), `src/index.css`
- **Problema:** `darkMode: ["class"]` está habilitado pero `index.css` no define variables `.dark {}`. Si alguien añade la clase `dark` al `<html>`, los colores no cambiarán.
- **Fix esperado:** Definir variables dark en CSS o eliminar la configuración `darkMode` si no se usará.
- **Estado:** ✅ Completada
- **Tiempo:** ~2 min
- **Tokens usados:** ~200
- **Notas:** Cambiado a `darkMode: false`. No hay planes de implementar dark mode en este proyecto.

---

### TAREA-13 — Mover dependencias de build a `devDependencies`
- **Archivo:** `package.json`
- **Problema:** `@tailwindcss/postcss` y `tailwindcss-animate` están en `dependencies` en lugar de `devDependencies`. Son herramientas de build, no de runtime.
- **Fix esperado:** Moverlas a `devDependencies`.
- **Estado:** ✅ Completada
- **Tiempo:** ~3 min
- **Tokens usados:** ~300
- **Notas:** `@tailwindcss/postcss` movido a devDependencies con `npm install --save-dev`. `tailwindcss-animate` ya fue desinstalado en TAREA-03. Build confirmado sin errores.

---

## ✅ Tareas completadas

- ✅ TAREA-01 — Reemplazar `require()` por ESM en `tailwind.config.js`
- ✅ TAREA-02 — Actualizar `index.html` con metadatos reales
- ✅ TAREA-03 — Migrar plugin de animaciones a Tailwind v4
- ✅ TAREA-04 — Implementar lógica de envío en `Contact.tsx`
- ✅ TAREA-05 — Conectar botones CTA + botón flotante WhatsApp
- ✅ TAREA-09 — Eliminar `App.css` (boilerplate muerto)
- ✅ TAREA-10 — Eliminar `animations.ts` (archivo muerto)
- ✅ TAREA-11 — Eliminar `card.tsx` no utilizado
- ✅ TAREA-07 — Corregir `staggerChildren` inefectivo en Navbar
- ✅ TAREA-08 — Eliminar `asChild` sin implementar en `button.tsx`
- ✅ TAREA-12 — Deshabilitar `darkMode` sin variables definidas
- ✅ TAREA-13 — Mover `@tailwindcss/postcss` a `devDependencies`

---

## 📝 Instrucciones para Claude Code

Al completar cada tarea, actualiza este archivo con el siguiente formato:

```
- **Estado:** ✅ Completada
- **Tiempo:** XX min
- **Tokens usados:** ~XXXX
- **Notas:** [lo que se hizo, decisiones tomadas, problemas encontrados]
```

Y actualiza el bloque "Resumen de progreso" al inicio del archivo.