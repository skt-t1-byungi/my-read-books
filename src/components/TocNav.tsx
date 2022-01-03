import cx from 'clsx'
import { RefObject, useEffect, useRef, useState } from 'react'
import { debounceTime, filter, fromEvent, map } from 'rxjs'

interface TocItem {
    url: string
    title: string
    items?: TocItem[]
}

export default function TocNav({
    className,
    items,
    contentElement,
}: {
    className?: string
    items: TocItem[]
    contentElement?: HTMLElement
}) {
    const elRef = useRef<HTMLDivElement>(null)
    const [currUrl, setCurrUrl] = useState(items[0]?.url)

    useEffect(() => {
        if (!contentElement) return

        const set = new Set<Element>()
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    set.add(entry.target)
                } else {
                    set.delete(entry.target)
                }
            })
        })
        contentElement
            ?.querySelectorAll('[id]')
            .forEach(el => observer.observe(el))

        const subs = fromEvent(window, 'scroll')
            .pipe(
                debounceTime(150),
                filter(() => set.size > 0),
                map(
                    () =>
                        [...set.values()].sort(
                            (a, b) =>
                                a.getBoundingClientRect().top -
                                b.getBoundingClientRect().top
                        )[0]
                )
            )
            .subscribe(el => {
                const url = `#${el.id}`
                setCurrUrl(url)
                elRef.current
                    ?.querySelector(`a[href="${url}"]`)
                    ?.scrollIntoView({ block: 'nearest' })
            })

        return () => {
            observer.disconnect()
            subs.unsubscribe()
        }
    }, [contentElement])

    return (
        <nav
            className={cx(
                'bg-water py-3 pl-4 pr-0 w-[320px] rounded-lg',
                className
            )}
        >
            <div
                className="overflow-y-auto text-sm break-all h-full overscroll-contain scrollbar-water pr-4"
                ref={elRef}
            >
                {(function recur(items: TocItem[], depth: number = 0) {
                    return (
                        <ul
                            className={cx(
                                depth &&
                                    'pl-2 my-[0.2em] border-l border-[#c1e0ee] list-["-"] marker:text-[#00ACD2]'
                            )}
                        >
                            {items?.map((o, i) => (
                                <li
                                    key={i}
                                    className={cx(
                                        depth && 'text-[0.95em] ml-1 pl-1'
                                    )}
                                >
                                    {o.url ? (
                                        <a
                                            href={o.url}
                                            className={cx(
                                                'inline-block px-1 align-top rounded',
                                                o.url === currUrl
                                                    ? 'bg-deepcarrotorange text-white transition-[background-color,color] duration-150'
                                                    : 'hover:text-deepcarrotorange'
                                            )}
                                        >
                                            {o.title}
                                        </a>
                                    ) : (
                                        ''
                                    )}
                                    {o.items && recur(o.items, depth + 1)}
                                </li>
                            ))}
                        </ul>
                    )
                })(items)}
            </div>
        </nav>
    )
}
