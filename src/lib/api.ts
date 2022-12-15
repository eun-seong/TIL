import fs from 'fs'
import { join, extname, basename, dirname } from 'path'
import matter from 'gray-matter'

type DirectoryType = 'posts' | 'books'

const getRootDirectory = (type: DirectoryType) => join(process.cwd(), '_contents', type)

/**
 *
 * @param path root 디렉토리부터 파일이 있는 위치까지의 path
 * @param type _contents의 하위 디렉토리 이름
 */
export function getPostByPath(path: string, type: DirectoryType = 'posts') {
  const rootDirectory = getRootDirectory(type)

  const slug = basename(path)
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(rootDirectory, path)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Item = {
    [key: string]: string
    slug: string
    path: string
    content: string
  }

  const item: Item = {
    path: dirname(path),
    slug: realSlug,
    content,
  }

  Object.entries(data).forEach(([key, value]) => {
    item[key] = value
  })

  return item
}

const getSubDirectories = (path: string, type: DirectoryType = 'posts') => {
  const rootDirectory = getRootDirectory(type)
  const postArr: Array<string> = []

  const getSubDir = (path: string) => {
    const files = fs.readdirSync(join(rootDirectory, path)).map(dir => join(path, dir))
    const nextDirectories: Array<string> = []

    files.forEach(fileName => {
      const curPath = join(rootDirectory, fileName)
      if (fs.lstatSync(curPath).isDirectory()) {
        nextDirectories.push(fileName)
      } else {
        if (extname(curPath) === '.md') {
          postArr.push(fileName)
        }
      }
    })

    nextDirectories.forEach(getSubDir)
  }

  getSubDir(path)
  return postArr
}

export function getAllPosts(type: DirectoryType = 'posts') {
  const paths = getSubDirectories('.', type)

  const posts = paths.map(path => getPostByPath(path, type))
  // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
