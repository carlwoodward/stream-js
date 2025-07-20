import { SignJWT } from 'jose';

// for a claim in jwt
function joinClaimValue(items: string | string[]): string {
  const values = Array.isArray(items) ? items : [items];
  const claims = [];
  for (let i = 0; i < values.length; i += 1) {
    const s = values[i].trim();
    if (s === '*') return s;
    claims.push(s);
  }
  return claims.join(',');
}

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
export async function JWTScopeTokenAsync(
  apiSecret: string,
  resource: string | string[],
  action: string | string[],
  options: { expireTokens?: boolean; feedId?: string | string[]; userId?: string } = {},
): Promise<string> {
  const payload: { action: string; resource: string; feed_id?: string; user_id?: string } = {
    resource: joinClaimValue(resource),
    action: joinClaimValue(action),
  };
  if (options.feedId) payload.feed_id = joinClaimValue(options.feedId);
  if (options.userId) payload.user_id = options.userId;

  const jwt = new SignJWT(payload).setProtectedHeader({ alg: 'HS256' });
  
  if (!options.expireTokens) {
    // Don't add timestamp claims when expireTokens is false (default behavior)
  } else {
    jwt.setIssuedAt();
  }

  return await jwt.sign(new TextEncoder().encode(apiSecret));
}

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
export function JWTScopeToken(
  apiSecret: string,
  resource: string | string[],
  action: string | string[],
  options: { expireTokens?: boolean; feedId?: string | string[]; userId?: string } = {},
): string {
  // For sync operation, throw an error with guidance to use async version
  throw new Error('JWTScopeToken synchronous version removed for Cloudflare Worker compatibility. Use JWTScopeTokenAsync instead.');
}

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
export async function JWTUserSessionTokenAsync(
  apiSecret: string,
  userId: string,
  extraData: Record<string, unknown> = {},
  jwtOptions: { exp?: number; iat?: number; nbf?: number; noTimestamp?: boolean } = {},
): Promise<string> {
  if (typeof userId !== 'string') {
    throw new TypeError('userId should be a string');
  }

  const payload = { user_id: userId, ...extraData };

  const jwt = new SignJWT(payload).setProtectedHeader({ alg: 'HS256' });
  
  // Handle timestamp options
  if (!jwtOptions.noTimestamp) {
    if (jwtOptions.iat !== undefined) {
      jwt.setIssuedAt(jwtOptions.iat);
    }
    if (jwtOptions.exp !== undefined) {
      jwt.setExpirationTime(jwtOptions.exp);
    }
    if (jwtOptions.nbf !== undefined) {
      jwt.setNotBefore(jwtOptions.nbf);
    }
  }

  return await jwt.sign(new TextEncoder().encode(apiSecret));
}

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
export function JWTUserSessionToken(
  apiSecret: string,
  userId: string,
  extraData: Record<string, unknown> = {},
  jwtOptions: { exp?: number; iat?: number; nbf?: number; noTimestamp?: boolean } = {},
): string {
  // For sync operation, throw an error with guidance to use async version
  throw new Error('JWTUserSessionToken synchronous version removed for Cloudflare Worker compatibility. Use JWTUserSessionTokenAsync instead.');
}
