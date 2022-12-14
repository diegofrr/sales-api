import nodemailer from 'nodemailer';
import HandlebarsMailTemplate, {
    IParseMailTemplate,
} from './HandlebarsMailTemplate';

interface EmailContact {
    name: string;
    email: string;
}

interface ISendMail {
    to: EmailContact;
    from?: EmailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EtherealMail {
    static async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const mailTemplate = new HandlebarsMailTemplate();

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
            from: {
                name: from?.name || 'Sales API Team',
                address: from?.email || 'salesapi@api.com',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });

        console.log(`Message send ${(await message).messageId}`);
        console.log(
            `Preview URL: ${nodemailer.getTestMessageUrl(await message)}`,
        );
    }
}
