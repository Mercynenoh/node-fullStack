import express from 'express'
import cron from 'node-cron'
import SendEmails from './EmailService/EmailService'
import SendEmail from './EmailService/EmailServices'
import Sendadmin from './EmailService/Emailadmin'

const app= express()




const run =()=>{
cron.schedule('*/10 * * * * *', async() => {
  console.log('running at 5 seconds');
  await SendEmails()
  await SendEmail()
  await Sendadmin()
})
}
run()


app.listen(7000, ()=>{
    console.log('App is Running');
    
})