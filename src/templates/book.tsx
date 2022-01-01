import { graphql, Link } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import CodeBlock from '../components/CodeBlock'
import TocNav from '../components/TocNav'
import { useRef } from 'react'

import '../styles/markdown.css'
import { Helmet } from 'react-helmet'

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
            <Helmet>
                <title>{data.mdx!.frontmatter!.title} - 요약</title>
            </Helmet>
            <main className="[--main-w:680px] [--aside-h:64px] w-[var(--main-w)] mx-auto relative">
                <div className="fixed ml-[calc(var(--main-w)_+_30px)] top-[2.5vh] flex flex-col gap-3">
                    <TocNav
                        className="h-[calc(85vh_-_var(--aside-h)_-_0.75em_-_5vh)]"
                        contentRef={contentRef}
                        items={(data.mdx?.tableOfContents as any).items ?? []}
                    />
                    <aside className="bg-cottoncandy bg-[url('../assets/nav_bg.png')] bg-no-repeat bg-right h-[var(--aside-h)] rounded-lg border-cottoncandy border-2 flex justify-start items-center px-4 gap-3">
                        <Link
                            to="/"
                            className="text-sm text-mulberry py-1 group"
                        >
                            📚
                            <span className="font-topokki group-hover:underline underline-offset-4 ml-1">
                                책 목록으로
                            </span>
                        </Link>
                        <span className="border-r border-[#fff6fb] border-dashed block h-8" />
                        <button
                            className="text-sm text-mulberry py-1 group"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            ☝️
                            <span className="font-topokki group-hover:underline underline-offset-4 ml-1">
                                위로 가자!
                            </span>
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
