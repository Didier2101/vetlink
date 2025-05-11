import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { promisify } from 'util';

const algorithm = 'aes-256-cbc';
const ivLength = 16; // Para AES, el IV es de 16 bytes

// Usamos promisify para convertir las funciones callback en promesas
const randomBytesAsync = promisify(randomBytes);

export const encrypt = async (text: string): Promise<string> => {
    try {
        if (!process.env.CRYPTO_SECRET_KEY) {
            throw new Error('CRYPTO_SECRET_KEY no está configurada');
        }

        // Generar un IV aleatorio
        const iv = await randomBytesAsync(ivLength);

        // Crear el cifrador
        const cipher = createCipheriv(
            algorithm,
            Buffer.from(process.env.CRYPTO_SECRET_KEY, 'hex'),
            iv
        );

        // Encriptar el texto
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Devolver el IV + texto encriptado (el IV es necesario para desencriptar)
        return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
        console.error('Error al encriptar datos:', error);
        throw new Error('No se pudieron encriptar los datos');
    }
};

export const decrypt = async (text: string): Promise<string> => {
    try {
        if (!process.env.CRYPTO_SECRET_KEY) {
            throw new Error('CRYPTO_SECRET_KEY no está configurada');
        }

        // Separar el IV del texto encriptado
        const [ivHex, encryptedText] = text.split(':');
        const iv = Buffer.from(ivHex, 'hex');

        // Crear el descifrador
        const decipher = createDecipheriv(
            algorithm,
            Buffer.from(process.env.CRYPTO_SECRET_KEY, 'hex'),
            iv
        );

        // Desencriptar el texto
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('Error al desencriptar datos:', error);
        throw new Error('No se pudieron desencriptar los datos');
    }
};