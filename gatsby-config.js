/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
    pathPrefix: '/my-read-books',
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
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: `My Read Books`,
                icon: 'src/assets/icon.png',
                start_url: `/my-read-books`,
                background_color: `#f7f4ee`,
                theme_color: `#00ac8f`,
                display: `standalone`,
            },
        },
    ],
    jsxRuntime: 'automatic',
}
