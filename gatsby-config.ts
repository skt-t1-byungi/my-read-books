import type { GatsbyConfig } from 'gatsby'
import * as rehypeSlug from 'rehype-slug'

const config: GatsbyConfig = {
    graphqlTypegen: true,
    polyfill: false,
    pathPrefix: '/my-read-books',
    plugins: [
        'gatsby-plugin-pnpm',
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
                rehypePlugins: [rehypeSlug],
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
        'gatsby-plugin-preload-fonts',
    ],
    jsxRuntime: 'automatic',
}

export default config
