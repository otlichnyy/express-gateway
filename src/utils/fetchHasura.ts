import fetch from 'cross-fetch';

const fetchHasura = async (
  bearerToken: string,
  query: string,
  variables: Record<string, any>
) => {
  const response = await fetch(process.env.HASURA_GRAPHQL_URL, {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  const data = await response.json();
  return data;
};

export { fetchHasura };
