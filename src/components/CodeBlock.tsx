import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'

export default function CodeBlock({ children: { props } }: any) {
    return (
        <Highlight
            {...defaultProps}
            code={props.children.trim()}
            language={
                props.className?.match(/language-(?<lang>.*)/)?.groups?.lang ??
                ''
            }
            theme={theme}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                    <code>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </code>
                </pre>
            )}
        </Highlight>
    )
}
