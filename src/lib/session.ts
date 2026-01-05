import 'server-only';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Secret key for session encryption (Fallback to random if not set, but resets on restart)
const SECRET_KEY = process.env.SESSION_SECRET || 'default-secret-key-change-me-in-prod';

// --- PASSWORD HASHING (PBKDF2) ---
export function hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
    const [salt, key] = storedHash.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return key === verifyHash;
}

// --- SESSION MANAGEMENT ---
// Very simple session: Encrypts { userId: string } into a cookie

function encrypt(text: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', crypto.scryptSync(SECRET_KEY, 'salt', 32), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', crypto.scryptSync(SECRET_KEY, 'salt', 32), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const sessionData = JSON.stringify({ userId, expiresAt: expiresAt.toISOString() });

    // Encrypt session data
    const encryptedSession = encrypt(sessionData);

    const cookieStore = await cookies();
    cookieStore.set('session', encryptedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function verifySession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;

    if (!session) return null;

    try {
        const decrypted = decrypt(session);
        const data = JSON.parse(decrypted);

        if (new Date(data.expiresAt) < new Date()) {
            return null;
        }

        return { userId: data.userId };
    } catch (e) {
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
