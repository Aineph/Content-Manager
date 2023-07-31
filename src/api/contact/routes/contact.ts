/**
 * contact router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/contact',
      handler: 'contact.sendMail',
      config: {
        policies: [],
        middlewares: ['global::captcha'],
      },
    },
  ],
}
