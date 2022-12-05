import nodemailer from 'nodemailer';

interface ISendMail {
    to: string;
    body: string;
}

export default class EtherealMail {
    static async sendMail({ to, body }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const message = transporter.sendMail({
            from: 'salesapi@sales.com.br',
            to,
            subject: 'Recuperação de Senha',
            text: body,
        });

        console.log(`Message send ${(await message).messageId}`);
        console.log(
            `Preview URL: ${nodemailer.getTestMessageUrl(await message)}`,
        );
    }
}
