"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JWTScopeToken = JWTScopeToken;
exports.JWTScopeTokenAsync = JWTScopeTokenAsync;
exports.JWTUserSessionToken = JWTUserSessionToken;
exports.JWTUserSessionTokenAsync = JWTUserSessionTokenAsync;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jose = require("jose");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// for a claim in jwt
function joinClaimValue(items) {
  var values = Array.isArray(items) ? items : [items];
  var claims = [];
  for (var i = 0; i < values.length; i += 1) {
    var s = values[i].trim();
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
function JWTScopeTokenAsync(_x, _x2, _x3) {
  return _JWTScopeTokenAsync.apply(this, arguments);
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
function _JWTScopeTokenAsync() {
  _JWTScopeTokenAsync = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(apiSecret, resource, action) {
    var options,
      payload,
      jwt,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
          payload = {
            resource: joinClaimValue(resource),
            action: joinClaimValue(action)
          };
          if (options.feedId) payload.feed_id = joinClaimValue(options.feedId);
          if (options.userId) payload.user_id = options.userId;
          jwt = new _jose.SignJWT(payload).setProtectedHeader({
            alg: 'HS256'
          });
          if (!options.expireTokens) {
            // Don't add timestamp claims when expireTokens is false (default behavior)
          } else {
            jwt.setIssuedAt();
          }
          _context.next = 8;
          return jwt.sign(new TextEncoder().encode(apiSecret));
        case 8:
          return _context.abrupt("return", _context.sent);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _JWTScopeTokenAsync.apply(this, arguments);
}
function JWTScopeToken(apiSecret, resource, action) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
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
function JWTUserSessionTokenAsync(_x4, _x5) {
  return _JWTUserSessionTokenAsync.apply(this, arguments);
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
function _JWTUserSessionTokenAsync() {
  _JWTUserSessionTokenAsync = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(apiSecret, userId) {
    var extraData,
      jwtOptions,
      payload,
      jwt,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          extraData = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          jwtOptions = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {};
          if (!(typeof userId !== 'string')) {
            _context2.next = 4;
            break;
          }
          throw new TypeError('userId should be a string');
        case 4:
          payload = _objectSpread({
            user_id: userId
          }, extraData);
          jwt = new _jose.SignJWT(payload).setProtectedHeader({
            alg: 'HS256'
          }); // Handle timestamp options
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
          _context2.next = 9;
          return jwt.sign(new TextEncoder().encode(apiSecret));
        case 9:
          return _context2.abrupt("return", _context2.sent);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _JWTUserSessionTokenAsync.apply(this, arguments);
}
function JWTUserSessionToken(apiSecret, userId) {
  var extraData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var jwtOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // For sync operation, throw an error with guidance to use async version
  throw new Error('JWTUserSessionToken synchronous version removed for Cloudflare Worker compatibility. Use JWTUserSessionTokenAsync instead.');
}