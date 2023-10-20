import { IAbstractRecord } from '../models';
import { clearUserToken, getUserToken } from '../utils/userUtils';

export default class DataService {
  private static baseUrl = '';

  private static defaultTimeout = 300000;

  public static async setBaseUrl(baseUrl: string) {
    if (!this.baseUrl) {
      this.baseUrl = baseUrl;
    }
  }

  public static get getBaseUrl() {
    return this.baseUrl;
  }

  public static async get(
    apirUrl: string,
    init?: RequestInit,
    secure = true,
    controller?: AbortController,
  ): Promise<Response> {
    return this.fetch(
      !apirUrl.startsWith('http') && !apirUrl.includes('prx')
        ? this.baseUrl + apirUrl
        : apirUrl,
      {
        method: 'GET',
        ...init,
      },
      secure,
      controller,
    );
  }

  public static async post(
    apirUrl: string,
    body: IAbstractRecord,
    init?: RequestInit,
    secure = true,
    controller?: AbortController,
    jwtToken?: string,
  ): Promise<Response> {
    return this.fetch(
      this.baseUrl + apirUrl,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        ...init,
      },
      secure,
      controller,
      jwtToken,
    );
  }

  public static async postForm(
    apirUrl: string,
    formData: FormData,
    init?: RequestInit,
    secure?: boolean,
  ): Promise<Response> {
    return this.fetch(
      this.baseUrl + apirUrl,
      {
        method: 'POST',
        body: formData,
        ...init,
      },
      secure,
    );
  }

  public static async putForm(
    apirUrl: string,
    formData: FormData,
    init?: RequestInit,
    secure?: boolean,
  ): Promise<Response> {
    return this.fetch(
      this.baseUrl + apirUrl,
      {
        method: 'PUT',
        body: formData,
        ...init,
      },
      secure,
    );
  }

  public static async put(
    apirUrl: string,

    body: any,
    init?: RequestInit,
  ): Promise<Response> {
    return this.fetch(this.baseUrl + apirUrl, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      ...init,
    });
  }

  public static async delete(
    apirUrl: string,
    init?: RequestInit,
    secure = true,
    controller?: AbortController,
  ): Promise<Response> {
    return this.fetch(
      this.baseUrl + apirUrl,
      {
        method: 'DELETE',
        ...init,
      },
      secure,
      controller,
    );
  }

  public static async fetch(
    input: RequestInfo,
    init: RequestInit,
    secure = true,
    controller?: AbortController,
    jwtToken?: string,
  ): Promise<Response> {
    const options = { timeout: this.defaultTimeout };
    const abortController = controller || new AbortController();
    const id = setTimeout(() => abortController.abort(), this.defaultTimeout);
    const preInit = await this.preProcess(secure, jwtToken);
    const response = await fetch(input, {
      ...options,
      ...preInit,
      ...init,
      headers: { ...preInit.headers, ...init.headers },
    });
    clearTimeout(id);
    // await this.postProcess();

    if (secure && response.status === 401) {
      clearUserToken();
      // clearLastActiveTime();
      if (!window.location.href.includes('/login')) {
        let redirect = '';
        if (window.location.pathname !== '/') {
          redirect = encodeURIComponent(window.location.pathname);
        }
        window.location.href = `/login${redirect ? `/${redirect}` : ''}`;
      }
    }
    return response;
  }

  public static async postUrlEncoded(
    apirUrl: string,
    body: URLSearchParams,
    init?: RequestInit,
    secure = true,
    controller?: AbortController,
    jwtToken?: string,
  ): Promise<Response> {
    return this.fetch(
      this.baseUrl + apirUrl,
      {
        method: 'POST',
        body: body.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...init,
      },
      secure,
      controller,
      jwtToken,
    );
  }

  private static preProcess(secure = true, jwtToken?: string): RequestInit {
    if (secure) {
      const token = jwtToken || getUserToken();
      if (token) {
        return {
          headers: { Authorization: `Bearer ${token}` },
        };
      }
    }
    return {};
  }

  // private static postProcess() {
  //   return null;
  // }

  // private encodeParameters(parameters: [string, string][]): string {
  //   let result = '';

  //   for (const entry of parameters) {
  //     if (result !== '') {
  //       result += '&';
  //     }

  //     result += `${encodeURIComponent(entry['0'])}=${encodeURIComponent(
  //       entry['1'],
  //     )}`;
  //   }

  //   return result;
  // }

  // https://shipmentshare-services-ap-uae-01.azurewebsites.net/swagger/index.html
}
