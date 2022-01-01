/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
    siteMetadata: {},
    plugins: [
        'gatsby-plugin-pnpm',
        'gatsby-plugin-graphql-config',
        'gatsby-plugin-typegen',
        'gatsby-plugin-postcss',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/books/`,
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                rehypePlugins: [require('rehype-slug')],
            },
        },
        'gatsby-plugin-react-helmet',
    ],
    jsxRuntime: 'automatic',
}
