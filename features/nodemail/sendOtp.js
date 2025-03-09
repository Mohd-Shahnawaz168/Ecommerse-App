import nodemailer from "nodemailer";

export default async function sendOtp(email, OTP) {
  let transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let data = {
    from: process.env.NODEMAILER_USER, // sender address
    to: email, // list of receivers
    subject: "OTP for Email Confirmation",
    html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                  /* Add your custom CSS styles here */
                  body {
                      font-family: Arial, sans-serif;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                  }
                  .header {
                      text-align: center;
                  }
                  .logo {
                      max-width: 150px;
                  }
                  .content {
                      margin-top: 20px;
                  }
                  .button {
                      display: inline-block;
                      padding: 10px 20px;
                      background-color: #20d49a;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 5px;
                  }
                  /* Mobile Responsive Styles */
                  @media only screen and (max-width: 600px) {
                      .container {
                          padding: 10px;
                      }
                      .logo {
                          max-width: 100px;
                      }
                      .button {
                          display: block;
                          margin-top: 10px;
                      }
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" alt="Storefleet Logo">
                  </div>
                  <div class="content">
                      <p>Please use ${OTP} for email Id Confirmation  </p>
                      <p> OTP is valid only for 10 min </p>
                     
                  </div>
              </div>
          </body>
          </html>
      `,
  };

  return await transporter.sendMail(data);
}
