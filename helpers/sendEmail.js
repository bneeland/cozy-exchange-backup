import axios from 'axios'

export async function sendEmail(fromEmail, fromName, toName, exchangeName, contactName, contactEmail) {
  try {
    const response = await axios({
      method: 'post',
      url: '/api/email',
      data: { fromEmail, fromName, toName, exchangeName, contactName, contactEmail },
    })

    if (response.status === 200) {
      console.log('Email success')
    }
  } catch (error) {
    console.error(error)
  }
}
