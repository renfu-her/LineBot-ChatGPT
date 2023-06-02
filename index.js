const express = require('express')
const line = require('@line/bot-sdk')

const { ask } = require('./ask')

const app = express()


const config = {
    channelAccessToken: 'QwRycwbCq2zgq+bBiVtkuCXbMfQDtHW8k47qh6SdykrkckfGZ8RUNbI50kpblWzlX/IxTPWxdilI4J6nGWk1xHTgUVfcRVSZPQjAqF5UCBhrgPMjP3j7XI6aopvoDwcclAk3LPkhKSfHOSeCRgdvLAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'b49301e7aef770299cfc95659f933c5c'
}

const client = new line.Client(config)

app
.get('/', async (req, res) => {
  res.send('Hello World')
})
.post('/webhook', line.middleware(config) , async (req, res) => {
    console.log('hook')
    const event = req.body.events
    const message = event.map(i => i.message)[0].text
    console.log(message)
    const result = await ask(message)
    const replyToken = event.map(i => i.replyToken)[0]
    console.log(replyToken)
    client.replyMessage(replyToken, {
        type: 'text',
        text: result
    })
    res.sendStatus(200)
})

app.listen(3000)
