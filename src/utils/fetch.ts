import axios from 'axios';

export const fetch = axios.create({
  baseURL: 'https://api.github.com/repos',
  headers: {
    Authorization: `token ${process.env.GATSBY_GITHUB_TOKEN}`,
  },
});
