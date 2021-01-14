module.exports = {
  siteMetadata: {
    title: `dev_eun`,
    description: `오늘보다 발전된 내일을 만들기 위한 dev_eun의 TIL 블로그`,
    author: `@eun-seong`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-generate-typings`,
      options: {
        dest: `./src/graphql-types.d.ts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon-512x512.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  pathPrefix: '/TIL',
};
