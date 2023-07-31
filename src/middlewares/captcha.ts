/**
 * `captcha` middleware
 */

import axios from 'axios'
import { Strapi } from '@strapi/strapi'
import * as querystring from 'querystring'

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    const { recaptcha } = ctx.request.body

    try {
      const response = await axios.post(process.env.RECAPTCHA_VERIFICATION_URL, querystring.stringify({
        secret: process.env.RECAPTCHA_KEY,
        response: recaptcha,
      }))

      if (response.data.success) {
        await next()
      } else {
        ctx.throw(400, 'Invalid captcha.')
      }
    } catch (error) {
      console.error(error)
      ctx.throw(500, error.message)
    }
  }
};
