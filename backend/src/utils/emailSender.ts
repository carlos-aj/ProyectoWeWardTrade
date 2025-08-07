import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port:  Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendConfirmationEmail(to: string, confirmationLink: string) {
  const mailOptions = {
    from: '"WeWard Trade" <tu-email@dominio.com>',
    to,
    subject: 'Confirma tu cuenta',
    html: `
      <h2>¡Bienvenido!</h2>
      <p>Por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
      <a href="${confirmationLink}">Confirmar cuenta</a>
    `
  };

  await transporter.sendMail(mailOptions);
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const mailOptions = {
    from: '"WeWard Trade" <tu-email@dominio.com>',
    to,
    subject: 'Recupera tu contraseña',
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, ignora este correo.</p>
    `
  };
  await transporter.sendMail(mailOptions);
}