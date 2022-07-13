import nodemailer from 'nodemailer';

type EmailType = {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}

const sendEmail = async ({ from, to, subject, text, html }: EmailType ) => {
    try {
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.EMAIL_AUTH_USER as string,
              pass: process.env.EMAIL_AUTH_PASS as string,
            }
        });

        await transport.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html,
        })
    
        console.log('Email send succesfully')
        
    } catch (err) {
        console.log(err);
    }
}

export default sendEmail;