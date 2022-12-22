"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_auth_1 = __importDefault(require("next-auth"));
const auth0_1 = __importDefault(require("next-auth/providers/auth0"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
let useMockProvider = process.env.NODE_ENV === 'test';
const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_ISSUER, NODE_ENV, APP_ENV, } = process.env;
if ((NODE_ENV !== 'production' || APP_ENV === 'test') &&
    !(AUTH0_CLIENT_ID && AUTH0_CLIENT_SECRET && AUTH0_ISSUER)) {
    console.log('⚠️ Using mocked GitHub auth correct credentials were not added');
    useMockProvider = true;
}
const providers = [];
if (useMockProvider) {
    providers.push((0, credentials_1.default)({
        id: 'github',
        name: 'Mocked GitHub',
        async authorize(credentials) {
            if (credentials) {
                const user = {
                    id: credentials.name,
                    name: credentials.name,
                    email: credentials.name,
                };
                return user;
            }
            return null;
        },
        credentials: {
            name: { type: 'test' },
        },
    }));
}
else {
    if (!(AUTH0_CLIENT_ID && AUTH0_CLIENT_SECRET && AUTH0_ISSUER)) {
        throw new Error('Provider secrets must be set');
    }
    providers.push((0, auth0_1.default)({
        clientId: AUTH0_CLIENT_ID,
        clientSecret: AUTH0_CLIENT_SECRET,
        issuer: AUTH0_ISSUER,
        profile(profile) {
            return {
                id: profile.sid,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
            };
        },
    }));
}
exports.default = (0, next_auth_1.default)({
    // Configure one or more authentication providers
    providers,
});
