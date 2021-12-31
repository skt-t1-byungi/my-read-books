import { graphql, Link } from 'gatsby'
import cx from 'clsx'

export const query = graphql`
    query Index {
        allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
            nodes {
                id
                frontmatter {
                    title
                    cover
                    date
                    state
                    slug
                    description
                }
            }
        }
    }
`

export default function Index({ data }: { data: GatsbyTypes.IndexQuery }) {
    return (
        <>
            <header className="bg-water h-[260px] bg-[url(../assets/bg.png)] bg-no-repeat [background-position:calc(50%_+_210px)_-80px] text-darkslategray text-center pt-[90px] box-border">
                <h2 className="text-6xl font-topokki mb-4 border-b-[10px] border-sunny inline-block pb-3">
                    읽은 책들
                </h2>
                <p className="text-moonstoneblue text-lg">
                    책 좀 욘데구다사이!
                </p>
            </header>
            <main className="max-w-[720px] mx-auto pt-14 pb-20">
                <ul className="grid grid-cols-4 gap-x-6 gap-y-8">
                    {data.allMdx.nodes.map((o, i) => {
                        const hasContent = ['ing', 'done'].includes(
                            o.frontmatter!.state!
                        )
                        let body = (
                            <>
                                <div
                                    className={cx(
                                        'w-full aspect-[210/297] bg-center bg-[length:110%] mb-3 border flex gap-1 flex-row items-end justify-end px-2 py-3',
                                        hasContent &&
                                            'group-hover:bg-[length:120%] transition-[background-size] hover:duration-500 shadow-lg'
                                    )}
                                    style={{
                                        backgroundImage: `url(${
                                            o.frontmatter!.cover
                                        } )`,
                                    }}
                                >
                                    {hasContent && (
                                        <span className="bg-[#ae8974] text-white text-xs p-[2px_4px] rounded-md">
                                            요약있음
                                        </span>
                                    )}
                                    {o.frontmatter!.state === 'ing' && (
                                        <span className="bg-[#8292ab] text-white text-xs p-[2px_4px] rounded-md">
                                            작성중
                                        </span>
                                    )}
                                </div>
                                <p className="mb-2 font-topokki [word-break:keep-all]">
                                    {o.frontmatter!.title}
                                </p>
                                <p className="text-[#787673] text-xs">
                                    {o.frontmatter!.description}
                                </p>
                            </>
                        )
                        if (o.frontmatter?.slug) {
                            body = (
                                <Link
                                    to={`books/${o.frontmatter.slug}`}
                                    className={cx(hasContent && 'group')}
                                >
                                    {body}
                                </Link>
                            )
                        }
                        return (
                            <li className={cx('text-center text-sm')} key={i}>
                                {body}
                            </li>
                        )
                    })}
                </ul>
            </main>
        </>
    )
}
