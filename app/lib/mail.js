import { Resend } from "resend"; //1. import this
import dotenv from 'dotenv'; //2. import this

dotenv.config(); //3. initalize

const resend = new Resend(process.env.RESEND_API_KEY); // 4. initialize

export const sendVerificationEmail = async (email, urlLink) => {
    let sendEmail = await resend.emails.send({
        from: "mail@authenzoa.com", //5. if you do not have a domain name on your production (vercell is not your domain so you cannot use it) use this email where resend allows you to use this to send emails
        to: email,
        subject: "Auth Codebase: Reset your password",
        html: `<p>Click this link: <a href=${urlLink}> ${urlLink}</a> to reset your password for ${email} </p>`
    })
    console.log("send Email Status: ", sendEmail);
    if(sendEmail.error === null){
        console.log("Email Verification Sent");
    }
}

export const sendVerificationEmailRegistration = async (email, urlLink) => {
    let sendEmail = await resend.emails.send({
        from: "mail@authenzoa.com", //5. if you do not have a domain name on your production (vercell is not your domain so you cannot use it) use this email where resend allows you to use this to send emails
        to: email,
        subject: "Auth Codebase: Reset your password",
        html: `<p>Click this link: <a href=${urlLink}> ${urlLink}</a> to verify your password for ${email} </p>`
    })
    console.log("send Email Status: ", sendEmail);
    if(sendEmail.error === null){
        console.log("Email Verification Sent");
    }
}

