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
/**
 *
 * @export
 * @interface UpdateUserInfoDto
 */
export interface UpdateUserInfoDto {
  /**
   * Họ tên người dùng
   * @type {string}
   * @memberof UpdateUserInfoDto
   */
  fullName: string;
  /**
   * Giới thiệu ngắn (bio)
   * @type {string}
   * @memberof UpdateUserInfoDto
   */
  bio: string;
  /**
   * Địa chỉ người dùng
   * @type {string}
   * @memberof UpdateUserInfoDto
   */
  address: string;
  /**
   * Nghề nghiệp hoặc vị trí công việc
   * @type {string}
   * @memberof UpdateUserInfoDto
   */
  job: string;
}
