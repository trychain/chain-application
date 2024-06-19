// helpers
import * as applicationStore from "./storage.helper";

export default async function apiRequestHelper({ endpoint, method, body, headers }) {
  return new Promise(async function (resolve, reject) {
    const _url = new URL(endpoint, "https://chain-server.onrender.com/");
    const _method = method ?? "GET";
    const _body = JSON.stringify(body);
    var _headers = {
      "content-type": "application/json",
    };

    const authorization = await applicationStore.fetchAuthorization();

    if (authorization) {
      _headers = {
        ..._headers,
        ...headers,
        authorization: "Bearer " + authorization,
      };
    }

    fetch(_url, {
      method: _method,
      headers: _headers,
      body: _body,
    })
      .then(async function (response) {
        const responseData = await response.json();

        if (!response.ok) {
          reject(responseData);
          return;
        }

        resolve(responseData);
      })
      .catch(function () {
        reject({
          status: 0,
          success: false,
          message: "server not response",
        });
      });
  });
}
