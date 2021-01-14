import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MarkdownRemark } from '../graphql-types';
import { mainColor } from '../const';

interface IProps {
  node: MarkdownRemark;
}

const Title = styled.h2`
  border-bottom: 0px;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: ${mainColor};
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
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
  const linkto = node.frontmatter.category + '/' + node.frontmatter.path;

  return (
    <li>
      <Title>
        <TitleLink to={linkto}>{node.frontmatter.title}</TitleLink>
      </Title>
      <Description>{node.excerpt}</Description>
      <Date>{node.frontmatter.date}</Date>
      <hr />
    </li>
  );
};

export default PostCard;
