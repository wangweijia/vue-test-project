import env from '../const/env';

const hosts = {
  dev: {
    host: 'http://127.0.0.1:9901/',
  },
  pro: {
    host: 'http://118.190.162.218:9901/',
  }
}
const { host } = hosts[env];

export default class Request {
  static formatUrl(url, params = {}, method = 'get') {
    const keys = Object.keys(params);
    let newUrl = host + url;

    if (method === 'get') {
      for (let index = 0; index < keys.length; index++) {
        const aKey = keys[index];
        const aValue = params[aKey];
        const n = index === 0 ? '?' : '&';
        newUrl = `${newUrl}${n}${aKey}=${aValue}`;
      }
    }

    return newUrl;
  }

  static post(url, params) {
    const headers = {
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
    const newUrl = this.formatUrl(url, params, 'post');
    return fetch(newUrl, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { ...headers },
    })
    .then(res => res.json());
  }

  static get(url, params) {
    const newUrl = this.formatUrl(url, params);
    return fetch(newUrl)
    .then(res => res.json());
  }
}