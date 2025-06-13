import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Solo para desarrollo
    }
});

export async function sendVerificationEmail(originalEmail: string, token: string) {
    // En desarrollo, redirigir todos los emails a TEST_EMAIL si está configurado
    const toEmail = process.env.FORCE_TEST_EMAIL === 'true'
        ? process.env.TEST_EMAIL || originalEmail
        : originalEmail;

    const verificationLink = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: `"VetLink" <${process.env.EMAIL_FROM}>`,
        to: toEmail,
        subject: 'Verifica tu cuenta en VetLink',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">¡Bienvenido a VetLink!</h2>
        <p>Por favor verifica tu dirección de email haciendo clic en el siguiente enlace:</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">
          Verificar mi email
        </a>
        ${process.env.FORCE_TEST_EMAIL === 'true' ? `
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            [MODO PRUEBA] Email original: ${originalEmail}
          </p>
        ` : ''}
      </div>
    `,
        text: `Verifica tu cuenta en VetLink:\n${verificationLink}\n\n${process.env.FORCE_TEST_EMAIL === 'true'
            ? `[MODO PRUEBA] Este email iba originalmente para: ${originalEmail}\n`
            : ''
            }`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', {
            intendedRecipient: originalEmail,
            actualRecipient: toEmail,
            messageId: info.messageId
        });
        return true;
    } catch (error) {
        console.error('Error enviando email:', error);
        throw error;
    }
}