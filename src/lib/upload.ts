import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function saveFileLocally(file: File): Promise<string> {
    if (!canUseLocalStorage()) {
        throw new Error('Local storage not available in production');
    }

    if (!existsSync(UPLOAD_DIR)) {
        await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filepath = join(UPLOAD_DIR, filename);

    await writeFile(filepath, buffer);

    return `/uploads/${filename}`;
}

export function canUseLocalStorage(): boolean {
    return process.env.NODE_ENV !== 'production';
}
