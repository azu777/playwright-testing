import * as nodeFetch from 'node-fetch';

interface IApiLogin {
  userName: string;
  password: string;
}

export const getLoginToken = async (data: IApiLogin) => {
  const resp = await nodeFetch('http://localhost:2221/api/login', {
    method: 'POST',
    body: JSON.stringify({ "username": data.userName, "password": data.password }),
  });

  if (resp.status !== 200) {
    throw new Error('Failed request to retrieve Token ');
  }

  const body = await resp.json();

  return body.token;
}
