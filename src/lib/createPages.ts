import {CreatePagesArgs} from 'gatsby';
import path from 'path';
import {Query} from '../graphql-types';

export async function createPages({ actions, graphql }: CreatePagesArgs) {
    const { createPage } = actions;

    const { data, errors } = await graphql<Query>(`
            {
              allMarkdownRemark {
                edges {
                  node {
                    frontmatter {
                      path
                      title
                      template
                      date
                    }
                    html
                  }
                }
              }
            }
        `);

    if (errors) {
        throw errors;
    }

    data.allMarkdownRemark.edges.forEach(({ node }) => {
      // if(node.frontmatter.template === 'post') {
        createPage({
            path: 'posts/'+node.frontmatter.path,
            context: {
                html: node.html,
                title: node.frontmatter.title,
                date: node.frontmatter.date,
            },
            component: path.resolve(__dirname, '../templates/PostTemplate.tsx'),
        });
      // }
    });
}