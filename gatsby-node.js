const path = require('path')

/** @type {import("gatsby").GatsbyNode['createPages']} */
exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(gql`
        {
            allMdx(
                filter: { frontmatter: { state: { in: ["ing", "done"] } } }
            ) {
                nodes {
                    id
                    frontmatter {
                        slug
                    }
                }
            }
        }
    `)
    data.allMdx.nodes
        .filter(o => o.frontmatter.slug)
        .forEach(o => {
            actions.createPage({
                path: `/books/${o.frontmatter.slug}`,
                component: require.resolve('./src/templates/book.tsx'),
                context: {
                    id: o.id,
                },
            })
        })
}

// for gql plugin
const gql = s => s[0]
