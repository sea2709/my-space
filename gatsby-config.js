require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Dang\'s Space',
    description: 'Welcome to my SPACE',
    config: {
      ...contentfulConfig,
      'managementAccessToken': process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
      'nodeType': process.env.CONTENTFUL_NODE_TYPE
    }
  },
  pathPrefix: '/dang-space',
  plugins: [
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        icon: 'src/favicon/favicon-32x32.png'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
}
