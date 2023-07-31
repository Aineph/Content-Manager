/**
 * contact controller
 */

export default {
  sendMail: async (ctx) => {
    try {
      await strapi.plugins['email'].services.email.send({
        to: process.env.CONTACT_EMAIL_RECEIVER,
        from: process.env.EMAIL_SENDER,
        subject: ctx.request.body.object,
        text: `You received a new message from ${ctx.request.body.name} <${ctx.request.body.email}>:

${ctx.request.body.message}`,
      })
    } catch (error) {
      ctx.throw(500, error.message)
    }
    ctx.response.status = 200
  },
}
