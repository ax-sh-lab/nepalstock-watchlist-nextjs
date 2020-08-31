import jwt from "next-auth/jwt";
import GoogleSheetsApi from "../../core/google-sheets-api";

const secret = process.env.SECRET;

const defaultSheetProps = {
	properties: {
		title: "stock-watchlist.nepse",
	},
	sheets: [
		{
			properties: {
				sheetId: 1,
				title: "main",
			},
			data: [
				{
					startRow: 0,
					startColumn: 0,
					rowData: [
						{
							values: [
								{
									userEnteredValue: {
										stringValue: "symbol",
									},
								},
								{
									userEnteredValue: {
										stringValue: "amount",
									},
								},
								{
									userEnteredValue: {
										stringValue: "cost",
									},
								},
								{
									userEnteredValue: {
										stringValue: "date",
									},
								},
							],
						},
					],
				},
			],
		},
	],
};

const fetchSheet = async (token) => {
	const api = new GoogleSheetsApi(token.auth.accessToken);
	const appCreatedSheets = await api.getAppCreatedSheets();
	if (appCreatedSheets.files.length > 1) {
		return { data: appCreatedSheets, error: "TOO MANY SHEETS. The sheet shouldnt exist more than once" };
	}
	if (appCreatedSheets.files.length === 0) {
		res.statusCode = 200;
		const createdSheet = await api.createSheet(defaultSheetProps);
		return createdSheet;
	}
	const sheetFile = appCreatedSheets.files[0];
	const doc = await api.spreadsheet(sheetFile.id);
	const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
	const rows = await sheet.getRows(); // can pass in { limit, offset }
	const results = rows.map((i) => ({
		symbol: i.symbol,
		cost: i.cost || 0,
		amount: i.amount || 0,
		date: i.date || 0,
	}));

	return { sheet_id: sheetFile.id, filename: doc.title, rows: results };
};

export default async (req, res) => {
	const token = await jwt.getToken({ req, secret });
	if (token) {
		try {
			const json = await fetchSheet(token);
			res.json(json);
		} catch (e) {
			res.json({ error: e.message });
		}
	} else {
		res.status(401);
	}
	res.end();
};
