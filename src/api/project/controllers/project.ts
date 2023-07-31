/**
 * project controller
 */

import axios from 'axios'
import { factories } from '@strapi/strapi'

const axiosOptions = {
  headers: {
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json'
  }
}

export default factories.createCoreController('api::project.project', ({ strapi }) => ({
  async find(ctx) {
    try {
      const response = await axios.get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`, axiosOptions)

      const projects = await Promise.all(response.data.map(async (data) => {
        const projectReadMeResponse = await axios.get(data.contents_url.replace("{+path}", "README.md"), axiosOptions)
        const projectReadMeContent = Buffer.from(projectReadMeResponse.data.content, 'base64').toString()
        const imageRegex = /!\[.*?\]\((.*?)\)/
        const match = projectReadMeContent.match(imageRegex)
        const imageUrl = match && match.length > 1 ? match[1]:null

        return {
          id: data.id,
          attributes: {
            name: data.name,
            description: data.description,
            createdAt: data.created_at,
            url: data.html_url,
            imageUrl,
          }
        }
      }))

      ctx.send({ data: projects })
    } catch (error) {
      ctx.throw(error)
    }
  },
  async findOne(ctx) {
    try {
      const { id } = ctx.params
      const response = await axios.get(`https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${id}`, axiosOptions)
      const projectReadMeResponse = await axios.get(response.data.contents_url.replace("{+path}", "README.md"), axiosOptions)
      const projectReadMeContent = Buffer.from(projectReadMeResponse.data.content, 'base64').toString()
      const imageRegex = /!\[.*?\]\((.*?)\)/
      const match = projectReadMeContent.match(imageRegex)
      const imageUrl = match && match.length > 1 ? match[1]:null

      const project = {
        id: response.data.id,
        attributes: {
          name: response.data.name,
          description: response.data.description,
          createdAt: response.data.created_at,
          url: response.data.html_url,
          imageUrl,
        }
      }

      ctx.send({ data: project })
    } catch (error) {
      ctx.throw(error)
    }
  },
}))
