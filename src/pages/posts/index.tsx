import Layout from 'components/Layout'
import { getAllPosts } from 'lib/api'
import { Item } from 'types/post.type'

interface Props {
  posts: Item[]
}

export default function Posts({ posts }: Props) {
  console.log(posts)

  return (
    <Layout>
      <h1>Post</h1>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts('posts')

  return {
    props: {
      posts,
    },
  }
}
