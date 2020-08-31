// https://www.googleapis.com/auth/spreadsheets.readonly	Allows read-only access to the user's sheets and their properties.
// https://www.googleapis.com/auth/spreadsheets	Allows read/write access to the user's sheets and their properties.
// https://www.googleapis.com/auth/drive.readonly	Allows read-only access to the user's file metadata and file content.
// https://www.googleapis.com/auth/drive.file	Per-file access to files created or opened by the app.
// https://www.googleapis.com/auth/drive	Full, permissive scope to access all of a user's files. Request this scope only when it is strictly necessary.

const GoogleSheetsProvider = {
	id: "google_sheets",
	name: "Google Sheets",
	type: "oauth",
	version: "2.0",
	scope:
		"https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
	params: { grant_type: "authorization_code" },
	accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
	requestTokenUrl: "https://accounts.google.com/o/oauth2/auth",
	authorizationUrl: "https://accounts.google.com/o/oauth2/auth?response_type=code",
	profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
	profile: (profile) => {
		return {
			id: profile.id,
			name: profile.name,
			email: profile.email,
			image: profile.picture,
		};
	},
	clientId: process.env.GOOGLE_ID,
	clientSecret: process.env.GOOGLE_SECRET,
};

export default GoogleSheetsProvider;
