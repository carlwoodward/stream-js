/**
 * Creates the JWT token for feedId, resource and action using the apiSecret (async version for Cloudflare Workers)
 * @method JWTScopeTokenAsync
 * @memberof signing
 * @private
 * @param {string} apiSecret - API Secret key
 * @param {string | string[]} resource - JWT payload resource
 * @param {string | string[]} action - JWT payload action
 * @param {object} [options] - Optional additional options
 * @param {string | string[]} [options.feedId] - JWT payload feed identifier
 * @param {string} [options.userId] - JWT payload user identifier
 * @param {boolean} [options.expireTokens] - JWT noTimestamp
 * @return {Promise<string>} JWT Token
 */
export declare function JWTScopeTokenAsync(apiSecret: string, resource: string | string[], action: string | string[], options?: {
    expireTokens?: boolean;
    feedId?: string | string[];
    userId?: string;
}): Promise<string>;
/**
 * Creates the JWT token for feedId, resource and action using the apiSecret (synchronous version - fallback to jsonwebtoken for compatibility)
 * @method JWTScopeToken
 * @memberof signing
 * @private
 * @param {string} apiSecret - API Secret key
 * @param {string | string[]} resource - JWT payload resource
 * @param {string | string[]} action - JWT payload action
 * @param {object} [options] - Optional additional options
 * @param {string | string[]} [options.feedId] - JWT payload feed identifier
 * @param {string} [options.userId] - JWT payload user identifier
 * @param {boolean} [options.expireTokens] - JWT noTimestamp
 * @return {string} JWT Token
 */
export declare function JWTScopeToken(apiSecret: string, resource: string | string[], action: string | string[], options?: {
    expireTokens?: boolean;
    feedId?: string | string[];
    userId?: string;
}): string;
/**
 * Creates the JWT token that can be used for a UserSession (async version for Cloudflare Workers)
 * @method JWTUserSessionTokenAsync
 * @memberof signing
 * @private
 * @param {string} apiSecret - API Secret key
 * @param {string} userId - The user_id key in the JWT payload
 * @param {object} [extraData] - Extra that should be part of the JWT token
 * @param {object} [jwtOptions] - Options for JWT signing
 * @return {Promise<string>} JWT Token
 */
export declare function JWTUserSessionTokenAsync(apiSecret: string, userId: string, extraData?: Record<string, unknown>, jwtOptions?: {
    exp?: number;
    iat?: number;
    nbf?: number;
    noTimestamp?: boolean;
}): Promise<string>;
/**
 * Creates the JWT token that can be used for a UserSession (synchronous version - throws error)
 * @method JWTUserSessionToken
 * @memberof signing
 * @private
 * @param {string} apiSecret - API Secret key
 * @param {string} userId - The user_id key in the JWT payload
 * @param {object} [extraData] - Extra that should be part of the JWT token
 * @param {object} [jwtOptions] - Options for JWT signing
 * @return {string} JWT Token
 */
export declare function JWTUserSessionToken(apiSecret: string, userId: string, extraData?: Record<string, unknown>, jwtOptions?: {
    exp?: number;
    iat?: number;
    nbf?: number;
    noTimestamp?: boolean;
}): string;
//# sourceMappingURL=signing.d.ts.map