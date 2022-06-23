import type { GatsbyNode } from 'gatsby'
import * as path from 'path'

export const createPages: GatsbyNode['createPages'] = async ({
    actions,
    graphql,
}) => {
    const { data } = await graphql<Queries.PageSlugsQuery>(gql`
        query PageSlugs {
            allMdx(
                filter: { frontmatter: { content: { in: ["ing", "done"] } } }
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
    data!.allMdx.nodes
        .filter(o => o.frontmatter?.slug)
        .forEach(o => {
            actions.createPage({
                path: `/books/${o.frontmatter!.slug}`,
                component: path.resolve('./src/templates/book.tsx'),
                context: {
                    id: o.id,
                },
            })
        })
}

// for gql plugin
const gql = (s: any) => s[0]
