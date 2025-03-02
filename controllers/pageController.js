const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);

  res.status(200).render("index", { pageName: "index" });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", { pageName: "about" });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", { pageName: "register" });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", { pageName: "login" });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", { pageName: "contact" });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  <h1>Mail Details </h1>
  <ul>
  <li>Name: ${req.body.name} </li>
  <li>Email:  ${req.body.email} </li>
  </ul>
   <h1>Message Details </h1>
   <p>  ${req.body.message} </p>
  `;

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "kitty35@ethereal.email",
        pass: "xpt83k1eKDRgUjTSXy",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Kitty McLaughlin Smart Edu Contact Form" <sametcandan38@gmail.com>', // sender address
      to: "c._samet@hotmail.com", // list of receivers
      subject: "Smart Edu Contact Form New Message ✔", // Subject line
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash("success", "We Received Your Message Succesfully!");

    res.status(200).redirect("/contact");
  } catch (err) {
    // req.flash("error", `Something Went Wrong! ${err}`);
    req.flash("error", `Something Went Wrong!`);

    res.status(400).redirect("/contact");
  }
};
