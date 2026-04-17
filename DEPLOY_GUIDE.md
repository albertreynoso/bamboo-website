# 🚀 Guía de Despliegue - Bamboo Studio Dental

Esta guía detalla los pasos necesarios para desplegar y mantener el sitio web en **Vercel** con una configuración profesional y segura.

---

## 📋 Requisitos Previos
1. Una cuenta en [GitHub](https://github.com).
2. Una cuenta en [Vercel](https://vercel.com) vinculada a GitHub.
3. El proyecto subido a un repositorio de GitHub.

---

## 🐙 Paso 0: Subir el Proyecto a GitHub

Si aún no tienes tu proyecto en GitHub, sigue estos pasos:

1. **Crear Repositorio:**
   - Ve a [GitHub](https://github.com/new) y crea un nuevo repositorio (puedes llamarlo `bamboo-website`).
   - Manténlo como **Public** o **Private** según prefieras. No lo inicialices con README ni .gitignore (ya los tenemos).

2. **Comandos en tu terminal:**
   Abre una terminal en la carpeta raíz de tu proyecto y ejecuta:

   ```bash
   # 1. Inicializar Git si no lo has hecho
   git init

   # 2. Añadir todos los archivos
   git add .

   # 3. Primer commit
   git commit -m "feat: initial commit for bamboo dental website"

   # 4. Cambiar a rama principal
   git branch -M main

   # 5. Vincular con GitHub (reemplaza 'TU_USUARIO' por tu nombre real de GitHub)
   git remote add origin https://github.com/TU_USUARIO/bamboo-website.git

   # 6. Subir archivos
   git push -u origin main
   ```

---

## 🛠️ Paso 1: Configuración en Vercel

1. **Importar Proyecto:**
   - En el Dashboard de Vercel, haz clic en **"Add New..."** > **"Project"**.
   - Selecciona el repositorio de GitHub donde se encuentra este proyecto.

2. **Configuración de Build:**
   - Vercel detectará automáticamente que es un proyecto de **Vite/React**.
   - Verifica que:
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Variables de Entorno (CRÍTICO):**
   - Antes de dar clic en "Deploy", despliega la sección **Environment Variables**.
   - Añade las siguientes 3 variables (copia los valores actuales de tu cuenta de EmailJS):

| Key | Value (Ejemplo) |
| :--- | :--- |
| `VITE_EMAILJS_SERVICE_ID` | `service_40ukfc4` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_wa3c5tv` |
| `VITE_EMAILJS_PUBLIC_KEY` | `z7j-sCDLwP6lAoeqw` |

> [!TIP]
> Si no configuras estas variables, el formulario de contacto no funcionará en producción porque el código ahora las busca de manera segura.

---

## 🌐 Paso 2: Configuración de Dominio Personalizado

1. Ve a la pestaña **Settings** > **Domains**.
2. Escribe tu dominio (ej: `bamboostudiodental.com`).
3. Sigue las instrucciones de configuración de DNS proporcionadas por Vercel (generalmente crear un registro `A` o `CNAME` en tu proveedor de dominio como Namecheap, GoDaddy, etc.).
4. Vercel generará automáticamente el certificado **SSL (HTTPS)** una vez que las DNS propaguen.

---

## 🔄 Paso 3: Ruteo y Redirecciones

El proyecto incluye un archivo `vercel.json` configurado para manejar el ruteo de Aplicaciones de Una Sola Página (SPA).
Esto asegura que si alguien refresca la página en una ruta interna, no reciba un error 404.

---

## 🧪 Paso 4: Pruebas y Previews

- Cada vez que subas cambios a una rama diferente a `main`, Vercel creará un **Preview Deployment**.
- Puedes usar estas URLs para probar cambios antes de unirlos a la versión definitiva del sitio.

---

## 🧹 Mantenimiento

Para actualizar el sitio solo debes:
1. Hacer tus cambios localmente.
2. Hacer `push` a la rama `main` en GitHub.
3. Vercel detectará el cambio y lo desplegará automáticamente en segundos.
