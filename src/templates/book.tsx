import { graphql, Link } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import CodeBlock from '../components/CodeBlock'
import TocNav from '../components/TocNav'
import { useRef } from 'react'

import '../styles/markdown.css'

export const query = graphql`
    query Book($id: String!) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
            }
            body
            tableOfContents
        }
    }
`

const components = { pre: CodeBlock }

export default function Post({ data }: { data: GatsbyTypes.BookQuery }) {
    const contentRef = useRef<HTMLElement>(null)
    return (
        <>
            <main className="[--main-w:680px] w-[var(--main-w)] mx-auto relative">
                <div className="fixed ml-[calc(var(--main-w)_+_30px)] top-[2.5vh] flex flex-col gap-3">
                    <TocNav
                        className="h-[calc(80vh_-_60px_-_0.75em_-_5vh)]"
                        contentRef={contentRef}
                        items={(data.mdx?.tableOfContents as any).items ?? []}
                    />
                    <aside className="bg-cottoncandy bg-[url('../assets/nav_bg.png')] bg-no-repeat bg-right h-[60px] rounded-lg border-cottoncandy border-2 flex justify-start items-center px-4 gap-3">
                        <Link
                            to="/"
                            className="font-topokki text-sm text-englishred py-1 hover:underline underline-offset-4"
                        >
                            🏠첫 페이지로
                        </Link>
                        <button
                            className="font-topokki text-sm text-englishred py-1 hover:underline underline-offset-4"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            👆위로 가기
                        </button>
                    </aside>
                </div>
                <article className="markdown" ref={contentRef}>
                    <MDXProvider components={components}>
                        <MDXRenderer>{data.mdx!.body}</MDXRenderer>
                    </MDXProvider>
                </article>
            </main>
        </>
    )
}
