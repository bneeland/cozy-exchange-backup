var postmark = require('postmark')

var client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_TOKEN)

export default async function handler(request, response) {
  try {
    await client.sendEmail({
      'From': 'hello@simplegiftsapp.com',
      'To': request.body.fromEmail,
      'Subject': `Your match for the ${request.body.exchangeName} gift exchange!`,
      'HtmlBody': `
        <div><b>Your match for the ${request.body.exchangeName} gift exchange!</b></div>
        <div>Hello ${request.body.fromName},</div>
        <div>Here is your match for the ${request.body.exchangeName} gift exchange:</div>
        <div><b>${request.body.toName}</b></div>
        <div>You will give a gift to ${request.body.toName}, and someone will give you a gift as part of the exchange!</div>
        <div>If you have any questions, the person to contact is ${request.body.contactName} at ${request.body.contactEmail}.</div>
      `,
      'TextBody': '',
      'MessageStream': 'outbound'
    })
    response.status(200).send('Success')
  } catch (error) {
    console.log(error)
    response.status(error.statusCode).send('Failed')
  }
}
