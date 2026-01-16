const nodemailer = require("nodemailer");

// Validate required SMTP env variables
const requiredEnvs = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USERNAME",
    "SMTP_PASSWORD",
    "SMTP_FROM",
    "SMTP_FROM_NAME",
    "SMTP_TO",
];

for (const key of requiredEnvs) {
    if (!process.env[key]) {
        throw new Error(`❌ Missing environment variable: ${key}`);
    }
}

// Create SMTP transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // TLS for port 587
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});


 @param {Object} param0
 @param {string} param0.subject
 @param {string} param0.html
const sendMail = async ({ subject, html }) => {
    if (!subject || !html) {
        throw new Error("❌ Email subject or content missing");
    }

    return await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
        to: process.env.SMTP_TO,
        subject,
        html,
    });
};

// Verify SMTP only in development
if (process.env.NODE_ENV !== "production") {
    transporter.verify((error) => {
        if (error) {
            console.error("❌ SMTP ERROR:", error);
        } else {
            console.log("✅ SMTP READY");
        }
    });
}

module.exports = { sendMail };
