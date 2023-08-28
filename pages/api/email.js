var postmark = require('postmark')

var client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_TOKEN)

export default async function handler(request, response) {
  try {
    await client.sendEmail({
      'From': 'hello@cozy.exchange',
      'To': request.body.fromEmail,
      'Subject': request.body.exchangeName ? `Your match for the ${request.body.exchangeName} gift exchange!` : 'Your match for a gift exchange!',
      'HtmlBody': `
        <div style="margin-bottom: 10px"><b>${request.body.exchangeName ? `Your match for the ${request.body.exchangeName} gift exchange!` : 'Your match for a gift exchange!'}</b></div>
        <div style="margin-bottom: 10px">Hello ${request.body.fromName},</div>
        <div style="margin-bottom: 10px">${request.body.exchangeName ? `Here is your match for the ${request.body.exchangeName} gift exchange:` : 'You have been matched for a gift exchange. Here is your match:'}</div>
        <div style="margin-bottom: 10px"><b>${request.body.toName}</b></div>
        <div style="margin-bottom: 10px">You will give a gift to ${request.body.toName}, and someone will give you a gift as part of the exchange!</div>
        ${request.body.contactName && request.body.contactEmail && `<div style="margin-bottom: 10px">If you have any questions, get in touch with ${request.body.contactName} at ${request.body.contactEmail}.</div>`}
        ${request.body.message && `
          <div>Here is an extra message from the person who set up this exchange:</div>
          <div><blockquote>${request.body.message}</blockquote></div>
        `}
        <div><small>Powered by <a href="https://www.cozy.exchange">cozy.exchange</a></small</div>
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
