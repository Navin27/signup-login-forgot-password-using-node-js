"use strict";
var nodemailer = require('nodemailer');
var account = {
    user : "navin2781xav@gmail.com",
    pass : "navin@2781"
};
var email = 'navin2781mah@gmail.com';
var token = 'jfbdksjbfdsbbfkddsfbvkbdbk';

let transporter = nodemailer.createTransport({
    service : 'gmail', 
    secure: false, // true for 465, false for other ports
    auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
    }
});

var sendEmail = (email, token) =>{

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'navin2781xav@gmail.com', // sender address
        to:  email, // list of receivers
        subject: 'reset password', // Subject line
        text : '<p> your reset password link </p>',
        html : '<p>Click <a href="http://localhost:8000/forgotpsd/forgot/reset/' + token + '">here</a> to reset your password</p>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
       
    });
    return email;
};

module.exports = {sendEmail};