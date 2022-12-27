import { useRouter } from 'next/router'
import { marked } from 'marked'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

import { getAllPosts, getPostByPath } from 'lib/api'

import Layout from 'components/Layout'
import PostContent from 'components/PostContent'

type Props = {
  post: {
    slug: string
    path: string
    content: string
    // title: string
    // date: string
    // coverImage: string
    // author: {
    //   name: string
    //   picture: string
    // }
    // excerpt: string
    // ogImage: {
    //   url: string
    // }
  }
}

export default function Post({ post }: Props) {
  const router = useRouter()

  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />
  // }

  return (
    <Layout>
      <PostContent>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </PostContent>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
    directory: string
  }
}

export async function getStaticProps({ params: { directory, slug } }: Params) {
  const post = getPostByPath(`${directory}/${slug}.md`)
  // @ts-expect-error
  const purify = DOMPurify(new JSDOM('<!DOCTYPE html>').window)
  const content = purify.sanitize(marked.parse(post.content))

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts('posts')

  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug,
        directory: post.path,
      },
    })),
    fallback: false,
  }
}
