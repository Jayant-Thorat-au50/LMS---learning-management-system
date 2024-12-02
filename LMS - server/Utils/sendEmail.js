
import nodemailer from 'nodemailer'

const sendEmail = async (email, subject, message) => {

const transporter = nodemailer.createTransport({
    service:'gmail',
    port:465,
    auth:{
        user:'jayantthorat152@gmail.com',
        pass:'hyyf bqpz adkm vadg'
    }
})

const mailOptions = {
    from:'jayantthorat152@gmail.com',
    to:email,
    subject:subject,
    text:message
}

await transporter.sendMail(mailOptions, (err, info) => {
    if(err) console.log(err);

    console.log('success');
    
    
})

}

export default sendEmail