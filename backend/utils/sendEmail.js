import nodemailer from "nodemailer";

const sendEmail = async (to, password) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"SculpXTechlabs" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Welcome to SculpXTechlabs 🎉",

            html: `
        <h2>🎉 Congratulations!</h2>

<p>Your application has been accepted.</p>

<p><b>Click below to access the portal:</b></p>

<a href="http://localhost:5173/">
  Go to Portal
</a>

<br/><br/>

<b>Login Credentials:</b>
<p>Email: ${to}</p>
<p>Password: ${password}</p>

<p>👉 After opening the portal, click on <b>Candidate Login</b> and enter your credentials.</p>

<p>Please login and complete your assigned task before the deadline.</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");

    } catch (error) {
        console.error("Email Error:", error);
    }
};

export default sendEmail;