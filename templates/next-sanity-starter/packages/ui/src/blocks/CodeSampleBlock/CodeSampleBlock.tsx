import { Highlight, type PrismTheme } from 'prism-react-renderer';
import type { CodeSampleBlock as CodeSampleBlockProps } from '@site-foundry-template/sanity-types';
import { BaseBlock } from '../../components/BaseBlock';
import { cx } from '../../lib/cx';
import { Text } from '../../primitives/Text';
import { TextColor, TextSize } from '../../primitives/Text/text-types';

/**
 * Prism theme backed by `--color-syntax-*` CSS variables in `theme.css`, so
 * syntax colors swap with the token theme. Override the vars in theme.css to
 * re-skin; no component changes needed.
 */
const codeTheme: PrismTheme = {
  plain: {
    color: 'var(--color-code-fg)',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: 'var(--color-syntax-comment)', fontStyle: 'italic' },
    },
    {
      types: ['keyword', 'control', 'directive', 'unit', 'statement', 'regex', 'atrule'],
      style: { color: 'var(--color-syntax-keyword)' },
    },
    {
      types: ['string', 'char', 'attr-value', 'template-string'],
      style: { color: 'var(--color-syntax-string)' },
    },
    {
      types: ['number', 'boolean', 'constant', 'builtin'],
      style: { color: 'var(--color-syntax-number)' },
    },
    {
      types: ['function', 'function-name', 'method'],
      style: { color: 'var(--color-syntax-function)' },
    },
    {
      types: ['property', 'property-access', 'variable', 'attr-name'],
      style: { color: 'var(--color-syntax-property)' },
    },
    {
      types: ['operator', 'punctuation'],
      style: { color: 'var(--color-syntax-operator)' },
    },
    {
      types: ['class-name', 'type', 'namespace', 'symbol', 'tag'],
      style: { color: 'var(--color-syntax-type)' },
    },
    {
      types: ['decorator', 'entity'],
      style: { color: 'var(--color-syntax-decorator)' },
    },
    {
      types: ['plain', 'identifier', 'text'],
      style: { color: 'var(--color-syntax-value)' },
    },
  ],
};

const EXTENSION_LANGUAGE_MAP: Record<string, string> = {
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  py: 'python',
  rb: 'ruby',
  go: 'go',
  rs: 'rust',
  java: 'java',
  kt: 'kotlin',
  swift: 'swift',
  json: 'json',
  md: 'markdown',
  html: 'markup',
  xml: 'markup',
  css: 'css',
  scss: 'scss',
  yaml: 'yaml',
  yml: 'yaml',
  sh: 'bash',
  bash: 'bash',
  zsh: 'bash',
  sql: 'sql',
  graphql: 'graphql',
  gql: 'graphql',
};

function deriveLanguage(language?: string | null, filename?: string | null): string {
  if (language) return language.toLowerCase();
  if (!filename) return 'text';
  const ext = filename.split('.').pop()?.toLowerCase();
  return (ext && EXTENSION_LANGUAGE_MAP[ext]) || 'text';
}

/**
 * Inner render — omits the BaseBlock section shell so this can be composed
 * inside other blocks (e.g. a tabbedFeatures tab pane) without double-wrapping.
 * Syntax highlighting via prism-react-renderer; token colors via `--color-syntax-*`.
 */
export function CodeSampleBlockContent(props: CodeSampleBlockProps) {
  if (!props.code) return null;
  const language = deriveLanguage(props.language, props.filename);

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="rounded-xl border border-[var(--color-code-border)] overflow-hidden bg-[var(--color-surface-elevated)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-code-border)] bg-[var(--color-surface-raised)]">
          <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
          {props.filename ? (
            <span className="ml-3 font-mono text-xs text-[var(--color-tertiary)] truncate">
              {props.filename}
            </span>
          ) : null}
        </div>
        <Highlight theme={codeTheme} code={props.code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cx(
                'p-5 overflow-x-auto text-sm font-mono leading-relaxed',
                className,
              )}
              style={style}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line });
                return (
                  <div key={`line-${i}`} {...lineProps}>
                    {line.map((token, j) => {
                      const tokenProps = getTokenProps({ token });
                      return <span key={`token-${i}-${j}`} {...tokenProps} />;
                    })}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
      {props.caption ? (
        <Text size={TextSize.SM} color={TextColor.MUTED} className="text-center">
          {props.caption}
        </Text>
      ) : null}
    </div>
  );
}

export function CodeSampleBlock(props: CodeSampleBlockProps) {
  return (
    <BaseBlock block={props}>
      <CodeSampleBlockContent {...props} />
    </BaseBlock>
  );
}
