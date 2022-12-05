import ReactMarkdown from 'react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import 'github-markdown-css/github-markdown-light.css';
import Resilience from 'shared/components/Resilience';
import Loader from 'shared/components/Loader';
import { Tanomaly } from 'shared/types';
import { setLoaderMode } from 'shared/components/Loader';
import ClipBoard from '../ClipBoard';
import { THighlightWrapper, Token, TReadMe } from './ReadMe.type';
import { styleHighlight } from './constants';
import './ReadMe.scss';

export const regexLanguage = (className: string | undefined) => /language-(\w+)/.exec(className || '');

export const HighlightWrapper = ({ className, style, child, getLineProps, getTokenProps, tokens }: THighlightWrapper) => (
  <pre className={className} style={{ ...style, ...styleHighlight }}>
    <ClipBoard content={String(child).replace(/\n$/, '')} />
    {tokens.map((line: Token[], i: number) => (
      <div {...getLineProps({ line, key: i })}>
        <span className="token-line__number">{i + 1}</span>
        <span className="token-line__content">
          {line.map((token: Token, key: number) => (
            <span {...getTokenProps({ token, key })} />
          ))}
        </span>
      </div>
    ))}
  </pre>
);

export const codeMarkdown = ({ inline, className, children }: CodeProps) => {
  const match = regexLanguage(className);
  return !inline && match ? (
    <Highlight {...defaultProps} theme={vsDark} code={String(children).replace(/\n$/, '')} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <HighlightWrapper
          className={className}
          style={style}
          child={children}
          getLineProps={getLineProps}
          getTokenProps={getTokenProps}
          tokens={tokens}
        />
      )}
    </Highlight>
  ) : (
    <>{children}</>
  );
};

const ReadMe = ({ markdownContent, isFetching, error, refetch, codeMarkdownFn = codeMarkdown }: TReadMe) => (
  <Loader mode={setLoaderMode({ isLoading: isFetching })}>
    <Resilience anomaly={error as Tanomaly} refetch={refetch}>
      <div className="markdown-body">
        <ReactMarkdown
          children={markdownContent as string}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={{
            code: codeMarkdownFn,
          }}
        />
      </div>
    </Resilience>
  </Loader>
);

export default ReadMe;
