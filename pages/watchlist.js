import axios from "axios";

const Page = ({ rows }) => {
	return (
		<table>
			<th>
				<td>symbol</td>
				<td>cost</td>
				<td>amount</td>
				<td>date</td>
			</th>
			{rows.map((i) => (
				<tr>
					<td>{i.symbol}</td>
					<td>{i.cost}</td>
					<td>{i.amount}</td>
					<td>{i.date}</td>
				</tr>
			))}
		</table>
	);
};
Page.getInitialProps = async ({ req }) => {
	const res = await axios.get("http://localhost:3000/api/sheet", { headers: req ? { cookie: req.headers.cookie } : undefined });
	const json = await res.data;
	return json;
};
export default Page;
