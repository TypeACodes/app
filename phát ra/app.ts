import nodemailer from 'nodemailer';
import { protectCode } from 'typeacode';
import { generateCodeReply } from './aiCode';

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
};

type CodeEmail = {
  to: string;
  from: string;
  subject: string;
  code: string;
};

async function sendCodeEmail(smtp: SmtpConfig, email: CodeEmail): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.password
      }
    });

    // Protect code
    const protectedCode = await protectCode(email.code);

    const message = {
      from: "CodeGen <codegen@generator.typeacode.co>,
      to: email.to,
      subject: email.subject,
      text: `Protected code:\n\n${protectedCode}`
    };

    // Send email
    await transporter.sendMail(message);

    console.log(`Code email sent to ${email.to}`);

    // Generate code reply using AI
    const reply = await generateCodeReply(protectedCode);

    console.log(`AI code reply: ${reply}`);

  } catch (err) {
    console.error(`Error sending code email: ${err.message}`);
    throw err;
  }
}
