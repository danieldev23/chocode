/* tslint:disable */
/* eslint-disable */
/**
 * API For My Production
 * My Production API: https://chodev.dangquochuy.id.vn/swagger/json
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { Configuration } from "../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
import { UploadAvatarBody } from "../models";
/**
 * UploadApi - axios parameter creator
 * @export
 */
export const UploadApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {UploadAvatarBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    uploadControllerUploadAvatar: async (
      body: UploadAvatarBody,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          "body",
          "Required parameter body was null or undefined when calling uploadControllerUploadAvatar."
        );
      }
      const localVarPath = `/api/upload/avatar`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required

      localVarHeaderParameter["Content-Type"] = "application/json";

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const needsSerialization =
        typeof body !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || "";

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    uploadControllerUploadImage: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/upload/image`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * UploadApi - functional programming interface
 * @export
 */
export const UploadApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @param {UploadAvatarBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadControllerUploadAvatar(
      body: UploadAvatarBody,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await UploadApiAxiosParamCreator(
        configuration
      ).uploadControllerUploadAvatar(body, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadControllerUploadImage(
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await UploadApiAxiosParamCreator(
        configuration
      ).uploadControllerUploadImage(options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * UploadApi - factory interface
 * @export
 */
export const UploadApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     *
     * @param {UploadAvatarBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadControllerUploadAvatar(
      body: UploadAvatarBody,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return UploadApiFp(configuration)
        .uploadControllerUploadAvatar(body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async uploadControllerUploadImage(
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return UploadApiFp(configuration)
        .uploadControllerUploadImage(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * UploadApi - object-oriented interface
 * @export
 * @class UploadApi
 * @extends {BaseAPI}
 */
export class UploadApi extends BaseAPI {
  /**
   *
   * @param {UploadAvatarBody} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadApi
   */
  public async uploadControllerUploadAvatar(
    body: UploadAvatarBody,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return UploadApiFp(this.configuration)
      .uploadControllerUploadAvatar(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UploadApi
   */
  public async uploadControllerUploadImage(
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return UploadApiFp(this.configuration)
      .uploadControllerUploadImage(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
