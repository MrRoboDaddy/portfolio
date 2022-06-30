const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  if (!body.firstName || !body.lastName || !body.email || !body.subject || !body.message) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'A required fileds data is not found' });
  }

  const message = `
    From: ${body.firstName} ${body.lastName}\r\n
    Email: ${body.email}\r\n
    Subject: ${body.subject}\r\n
    Message: ${body.message}
  `;

  const data = {
    to: 'rdemoss.media@gmail.com',
    from: 'robodaddyportfolio@gmail.com',
    subject: `New message from ${body.name}`,
    text: message,
    html: message.replace(/\r\n/g, '<br />'),
  };

  await mail.send(data);

  res.status(200).json({ status: 'OK' });
};