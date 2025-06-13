// src/lib/edge-crypto.ts
const ALGORITHM = 'AES-GCM';

// Función mejorada para conversión de datos
function hexToBytes(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) {
        throw new Error('Hex string must have even length');
    }
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

async function getKey(): Promise<CryptoKey> {
    const keyHex = process.env.ENCRYPTION_KEY;
    if (!keyHex || keyHex.length !== 64) {
        throw new Error('Invalid ENCRYPTION_KEY - must be 64 hex chars');
    }

    const keyBytes = hexToBytes(keyHex);

    return crypto.subtle.importKey(
        'raw',
        keyBytes,
        { name: ALGORITHM },
        false,
        ['encrypt', 'decrypt']
    );
}

export async function encryptEdge(data: string): Promise<string> {
    try {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await getKey();
        const encodedData = new TextEncoder().encode(data);

        const encrypted = await crypto.subtle.encrypt(
            { name: ALGORITHM, iv },
            key,
            encodedData
        );

        return `${bytesToHex(iv)}:${bytesToHex(new Uint8Array(encrypted))}`;
    } catch (error) {
        console.error('Encryption failed:', error);
        throw new Error('Encryption failed');
    }
}

export async function decryptEdge(encryptedData: string): Promise<string> {
    try {
        const parts = encryptedData.split(':');
        if (parts.length !== 2) throw new Error('Invalid encrypted data format');

        const [ivHex, dataHex] = parts;
        const iv = hexToBytes(ivHex);
        const data = hexToBytes(dataHex);
        const key = await getKey();

        const decrypted = await crypto.subtle.decrypt(
            { name: ALGORITHM, iv },
            key,
            data
        );

        return new TextDecoder().decode(decrypted);
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Failed to decrypt data');
    }
}