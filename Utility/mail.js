import express from "express";

import sgMail from "@sendgrid/mail";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: "ali.raees500@gmail.com",
    pass: "wxWBAgGQfvNYt172",
  },
});

export async function sendMailer(email, id) {
  const API_KEY =
    "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";

  sgMail.setApiKey(API_KEY);

  function getMessage() {
    const body = 'This is a test email using SendGrid from Node.js';
    return {
      to: email,
      from: 'ali.raees500@gmail.com',
      subject: 'Test email with Node.js and SendGrid',
      text: "hello",
      html: `localhost:3000/resetPassword/${id}`,
    };
  }
  
  async function sendEmail() {
    try {
      await sgMail.send(getMessage());
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
  
  (async () => {
    console.log('Sending test email');
    await sendEmail();
  })();

}