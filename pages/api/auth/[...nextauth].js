import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import GoogleSheetsProvider from "../../../core/google-sheets-provider";
// https://next-auth.js.org/configuration/providers
const options = {
	site: process.env.SITE || "http://localhost:3000",
	providers: [
		// Providers.Google({
		// 	clientId: process.env.GOOGLE_ID,
		// 	clientSecret: process.env.GOOGLE_SECRET,
		// }),
		GoogleSheetsProvider,
	],
	// Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
	// https://next-auth.js.org/configuration/database
	//
	// Notes:
	// * You must to install an appropriate node_module for your database
	// * The Email provider requires a database (OAuth providers do not)
	// database: process.env.DATABASE_URL,
	// session: {
	// 	// Use JSON Web Tokens for session instead of database sessions.
	// 	// This option can be used with or without a database for users/accounts.
	// 	// Note: `jwt` is automatically set to `true` if no database is specified.
	// 	jwt: true,

	// 	// Seconds - How long until an idle session expires and is no longer valid.
	// 	// maxAge: 30 * 24 * 60 * 60, // 30 days

	// 	// Seconds - Throttle how frequently to write to database to extend a session.
	// 	// Use it to limit write operations. Set to 0 to always update the database.
	// 	// Note: This option is ignored if using JSON Web Tokens
	// 	// updateAge: 24 * 60 * 60, // 24 hours
	// // },
	// // JSON Web tokens are only used for sessions if the `jwt: true` session
	// // option is set - or by default if no database is specified.
	// // https://next-auth.js.org/configuration/options#jwt
	// jwt: {
	// 	// A secret to use for key generation (you should set this explicitly)
	// 	// secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
	// 	// Set to true to use encryption (default: false)
	// 	// encryption: true,
	// 	// You can define your own encode/decode functions for signing and encryption
	// 	// if you want to override the default behaviour.
	// 	// encode: async ({ secret, token, maxAge }) => {},
	// 	// decode: async ({ secret, token, maxAge }) => {},
	// },

	// // You can define custom pages to override the built-in pages.
	// // The routes shown here are the default URLs that will be used when a custom
	// // pages is not specified for that route.
	// // https://next-auth.js.org/configuration/pages
	// pages: {
	// 	// signIn: '/api/auth/signin',  // Displays signin buttons
	// 	// signOut: '/api/auth/signout', // Displays form with sign out button
	// 	// error: '/api/auth/error', // Error code passed in query string as ?error=
	// 	// verifyRequest: '/api/auth/verify-request', // Used for check email page
	// 	// newUser: null // If set, new users will be directed here on first sign in
	// },

	// // Events are useful for logging
	// // https://next-auth.js.org/configuration/events
	// events: {},
	secret: process.env.SECRET,

	debug: !true,
	// Callbacks are asynchronous functions you can use to control what happens
	// when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		/**
		 * @param  {object} session      Session object
		 * @param  {object} user         User object    (if using database sessions)
		 *                               JSON Web Token (if not using database sessions)
		 * @return {object}              Session that will be returned to the client
		 */
		session: async (session, user, sessionToken) => {
			// session.auth = user.auth; // Add property to session
			// sessionToken.auth = user.auth;
			// console.log("sessionToken", sessionToken);

			return Promise.resolve(session);
		},
		/**
		 * @param  {object}  token     Decrypted JSON Web Token
		 * @param  {object}  user      User object      (only available on sign in)
		 * @param  {object}  account   Provider account (only available on sign in)
		 * @param  {object}  profile   Provider profile (only available on sign in)
		 * @param  {boolean} isNewUser True if new user (only available on sign in)
		 * @return {object}            JSON Web Token that will be saved
		 */
		jwt: async (token, user, account, profile, isNewUser) => {
			const isSignIn = user ? true : false;
			if (isSignIn) {
				token.auth = account;
			}
			return Promise.resolve(token);
		},
	},
};

export default (req, res) => NextAuth(req, res, options);
