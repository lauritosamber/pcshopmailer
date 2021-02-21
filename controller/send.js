const nodemailer = require('nodemailer');

exports.postSend = (req, res) => {
    const output = `
      <p>Good Day PC Shoppers</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Attachment: ${req.body.file}</li>
      </ul>
      
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'lauritosamber@gmail.com', // generated ethereal user
          pass: 'Myloves061617'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"PC SHOPS" <lauritosamber@gmail.com>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: 'PC SHOPS RKR', // Subject line
        text: 'Hello world?', // plain text body
        html: output, // html body
        attachment: [
            {
              filename: `${req.body.file}`, path: `${req.body.file}`
            }
        ]
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
    }
