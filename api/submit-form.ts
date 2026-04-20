// api/submit-form.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from "@upstash/redis";
import emailjs from '@emailjs/nodejs';

const redis = Redis.fromEnv();

const LIMIT = 2;
const WINDOW_SECONDS = 24 * 60 * 60;
const KEY_PREFIX = "form_bamboo_v2";

const EJS_SERVICE = process.env.EMAILJS_SERVICE_ID;
const EJS_TEMPLATE = process.env.EMAILJS_TEMPLATE_ID;
const EJS_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EJS_PRIVATE = process.env.EMAILJS_PRIVATE_KEY;

if (!EJS_SERVICE || !EJS_TEMPLATE || !EJS_KEY) {
    console.error("❌ Faltan variables de entorno de EmailJS");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
    }

    const { nombre, telefono, servicio, fecha, hora, motivo } = req.body ?? {};

    if (!nombre || !telefono || !servicio || !fecha || !hora || !motivo) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    if (!EJS_SERVICE || !EJS_TEMPLATE || !EJS_KEY) {
        return res.status(500).json({
            error: 'Error de configuración del servicio de email. Contacta al administrador.',
        });
    }

    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
        req.socket.remoteAddress ??
        'anonymous';
    const userAgent = req.headers['user-agent'] ?? 'unknown';
    const clientId = `${ip}|${userAgent}`;
    const key = `${KEY_PREFIX}:${clientId}`;

    const currentCount = Number((await redis.get<number>(key)) ?? 0);
    if (currentCount >= LIMIT) {
        return res.status(429).json({
            error: 'Límite de 2 solicitudes por día alcanzado. Vuelve mañana.',
        });
    }

    try {
        const emailResult = await emailjs.send(
            EJS_SERVICE,
            EJS_TEMPLATE,
            { nombre, telefono, servicio, fecha, hora, motivo },
            {
                publicKey: EJS_KEY,
                ...(EJS_PRIVATE ? { privateKey: EJS_PRIVATE } : {}),
            }
        );

        console.log("✅ Email enviado:", emailResult.status);

        const newCount = await redis.incr(key);
        if (newCount === 1) {
            await redis.expire(key, WINDOW_SECONDS);
        }

        return res.status(200).json({
            success: true,
            message: 'Cita agendada correctamente. Te contactaremos pronto.',
            remaining: Math.max(0, LIMIT - newCount),
        });
    } catch (error: unknown) {
        console.error("❌ Error detallado al enviar email:", error);

        let message = 'Error desconocido';
        let status: number | undefined;

        if (error instanceof Error) {
            message = error.message;
        } else if (typeof error === 'object' && error !== null) {
            const errObj = error as { status?: number; text?: string; message?: string };
            status = errObj.status;
            message = errObj.text || errObj.message || JSON.stringify(error);
        } else if (typeof error === 'string') {
            message = error;
        }

        return res.status(500).json({
            error: `No se pudo enviar: ${message}`,
            emailjsStatus: status,
        });
    }
}
