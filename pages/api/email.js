var postmark = require('postmark')

var client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_TOKEN)

export default async function handler(request, response) {
  try {
    await client.sendEmail({
      'From': 'hello@simplegiftsapp.com',
      'To': request.body.fromEmail,
      'Subject': request.body.exchangeName ? `Your match for the ${request.body.exchangeName} gift exchange!` : 'Your match for a gift exchange!',
      'HtmlBody': `
        <div><b>${request.body.exchangeName ? `Your match for the ${request.body.exchangeName} gift exchange!` : 'Your match for a gift exchange!'}</b></div>
        <div>Hello ${request.body.fromName},</div>
        <div>${request.body.exchangeName ? `Here is your match for the ${request.body.exchangeName} gift exchange:` : 'You have been matched for a gift exchange. Here is your match:'}</div>
        <div><b>${request.body.toName}</b></div>
        <div>You will give a gift to ${request.body.toName}, and someone will give you a gift as part of the exchange!</div>
        ${request.body.contactName && request.body.contactEmail && `<div>If you have any questions, the person to contact is ${request.body.contactName} at ${request.body.contactEmail}.</div>`}
        <div><small>Powered by <a href="https://www.giftexchanger.io">giftexchanger.io</a></small</div>
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
