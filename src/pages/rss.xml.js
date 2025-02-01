import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: '拾遗',
    description: '浮生若梦，拾遗几何。',
    site: context.site,
    items: blog.map((post) => ({
      link: `/blog/${post.id}/`,
      // 注意：这不会处理 MDX 文件中的组件或 JSX 表达式。
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
      ...post.data,
    })),
  });
}