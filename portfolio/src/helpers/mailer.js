const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false, // TLS uses false
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const sendMail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM}>`,
        to: process.env.ADMIN_EMAIL,
        subject,
        html,
    });
};
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ SMTP ERROR:", error);
    } else {
        console.log("✅ SMTP READY");
    }
});


module.exports = { sendMail };
