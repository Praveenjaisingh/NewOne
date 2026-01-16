const fs = require("fs");
const path = require("path");
const { sendMail } = require("../helpers/mailer");


class MailService {

    async sendContactMail(data) {
        let template = fs.readFileSync(
            path.join(__dirname, "../template/contact.html"),
            "utf8"
        );

        template = template
            .replace(/{{name}}/g, data.name)
            .replace(/{{email}}/g, data.email)
            .replace(/{{message}}/g, data.message);

        await sendMail({
            to: process.env.ADMIN_EMAIL, 
            subject: "New Portfolio Contact Message",
            html: template
        });

        return true;
    }

}

module.exports = new MailService();
