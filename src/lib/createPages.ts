import {CreatePagesArgs} from 'gatsby';
import path from 'path';
import {Query} from '../graphql-types';

export async function createPages({ actions, graphql }: CreatePagesArgs) {
    const { createPage } = actions;

    const { data, errors } = await graphql<Query>(`
    {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "post"}}}, sort: {fields: frontmatter___date, order: DESC}) {
        group(field: frontmatter___category) {
          fieldValue
          edges {
            node {
              frontmatter {
                path
                title
                category
                date(formatString: "MMM D, Y")
              }
              html
              id
            }
          }
        }
      }
    }
    
        `);

    if (errors) {
        throw errors;
    }

    data.allMarkdownRemark.group.forEach(({ edges, fieldValue }) => {
      edges.forEach(({node})=> {
        // if(node.frontmatter.template === 'post') {
          createPage({
              path: 'posts/' + node.frontmatter.category +'/' + node.frontmatter.path,
              context: {
                  html: node.html,
                  title: node.frontmatter.title,
                  date: node.frontmatter.date,
              },
              component: path.resolve(__dirname, '../templates/PostTemplate.tsx'),
          });
        // }
      })

      createPage({
        path: 'posts/' + fieldValue,
        context: {
          fieldValue: fieldValue,
        },
        component: path.resolve(__dirname, '../templates/PostListTemplate.tsx'),
    });
    });
}