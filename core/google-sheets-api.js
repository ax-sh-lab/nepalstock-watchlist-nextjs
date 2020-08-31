import axios from "axios";
import { GoogleSpreadsheet } from "google-spreadsheet";

class GoogleSheetsApi {
	constructor(accessToken) {
		this.accessToken = accessToken;
		this.api = axios.create({
			// timeout: 1000,
			headers: { Authorization: "Bearer " + accessToken },
		});
	}
	async getAppCreatedSheets() {
		const res = await this.api.get("https://www.googleapis.com/drive/v3/files");
		const json = await res.data;
		return json;
	}
	async createSheet(data) {
		// 	data =	{
		// 			properties: {
		// 				title: title,
		// 			},
		// 		}
		const res = await this.api.post("https://sheets.googleapis.com/v4/spreadsheets", data);
		const json = await res.data;
		return json;
	}
	async spreadsheet(sheetId) {
		const doc = new GoogleSpreadsheet(sheetId);
		doc.useRawAccessToken(this.accessToken);
		await doc.loadInfo();
		return doc;
	}
}
export default GoogleSheetsApi;
