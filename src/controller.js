const nodeMailer = require("nodemailer");
const connection = require("../config/db");
const responseStructure = require("../utils/responseStructure");

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const create = async (req, res) => {
  const from = "chittudoll79@gmail.com";
  const { to, subject } = req.body;

  // Generate OTP
  const otp = generateOtp();

  const mailOptions = {
    from,
    to,
    subject: subject || "Your OTP Code",
    text: `Your OTP code is: ${otp}. This code is valid for 10 minutes.`,
  };

  // Create transporter
  const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "chittudoll79@gmail.com",
      pass: "ozne efsg jtsa stwu", // Password from environment variables
    },
  });

  // Send mail
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      let responseMessage =
        responseStructure.errorResponse("Faied to send OTP");
      res.send(responseMessage);
    } else {
      var updatesql =
        `UPDATE user SET user.otp = ` +
        otp +
        ` WHERE  user.email = '` +
        to +
        `'`;
      console.log(updatesql);
      connection.query(updatesql, async (err, result) => {
        if (result) {
          let responseMessage = responseStructure.successResponse(
            "otp send to your mailid"
          );
          res.send(responseMessage);
        } else {
          let responseMessage =
            responseStructure.errorResponse("Faied to send OTP");
          res.send(responseMessage);
        }
      });
    }
  });
};

module.exports = { create };
