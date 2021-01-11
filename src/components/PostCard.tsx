import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MarkdownRemark } from '../graphql-types';

interface IProps {
  node: MarkdownRemark;
}

const TitleLink = styled(Link)`
  text-decoration: none;
`;

const Description = styled.div`
  font-size: 1rem;
  margin-bottom: 0.6rem;
`;

const Date = styled.div`
  font-size: 0.9rem;
  color: #999;
`;

const PostCard: React.FC<IProps> = ({ node }) => {
  return (
    <li>
      <h2>
        <TitleLink to={node.frontmatter.path}>{node.frontmatter.title}</TitleLink>
      </h2>
      <Description>{node.excerpt}</Description>
      <Date>{node.frontmatter.date}</Date>
    </li>
  );
};

export default PostCard;
