import { load } from 'js-yaml';
import type { StylePackMeta } from './stylepack';

/**
 * 瀏覽器端的輕量 frontmatter 解析（gray-matter 依賴 Buffer，僅供 Node 端腳本用）。
 * 真相源仍是 stylepacks/<pack>/DESIGN.md；此處只拆 frontmatter 與 body。
 */
export function parseFrontmatter<T = Record<string, unknown>>(
  raw: string
): { data: T; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {} as T, body: raw };
  return { data: load(match[1]) as T, body: match[2] };
}

export function parseStylePackMeta(raw: string): StylePackMeta {
  return parseFrontmatter<StylePackMeta>(raw).data;
}
