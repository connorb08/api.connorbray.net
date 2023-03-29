import { Env } from "..";


export const GitHubData = async (env: Env) => {

  const OWNER = 'connorb08';
  const REPO = 'connorbray.net';
  const GH_TOKEN = env.GH_TOKEN;

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/actions/runs?branch=main&event=push`,
    {
      headers: {
        'User-Agent': 'connorb08',
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GH_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  const data = await res.json();
  return data;
  
};
