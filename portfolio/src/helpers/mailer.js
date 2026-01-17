const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // TLS
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendMail = async ({ subject, html, to }) => {
    const recipient = to || process.env.ADMIN_EMAIL;

    if (!recipient) {
        throw new Error("Recipient email is missing");
    }

    await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
        to: recipient,
        subject,
        html,
    });
};

transporter.verify((error) => {
    if (error) {
        console.error("❌ SMTP ERROR:", error);
    } else {
        console.log("✅ SMTP READY");
    }
});

module.exports = { sendMail };
