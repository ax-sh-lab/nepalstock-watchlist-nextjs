import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signin, signout } from "next-auth/client";
import styled from "styled-components";
import axios from "axios";

const Button = styled.button`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	margin: 0 1em;
	padding: 0.25em 1em;
`;

const Img = styled.img`
	height: 50px;
	width: 50px;
	vertical-align: middle;
`;

const SignInButton = () => {
	return (
		<Button className="signin" onClick={() => signin("google_sheets")}>
			Connect With Your GoogleSheets
		</Button>
	);
};

const LoggedInUser = ({ user }) => {
	console.log("LoggedInUser -> user", user);
	return (
		<>
			<Img src={user.image} />
			<span> Hi! {user.name}</span>
			<button onClick={() => signout("google_sheets")}>Sign out</button>
			<p className={styles.description}>
				Welcome <code className={styles.code}>pages/index.js</code>
			</p>
		</>
	);
};

const Home = (props) => {
	console.log("Home -> props", props);
	const [session, loading] = useSession();
	return (
		<div className={styles.container}>
			<Head>
				<title>Nepalstock Watchlist</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{!loading && session ? <LoggedInUser user={session.user} /> : <SignInButton />}

			<main className={styles.main}>
				{props.companies.map((i) => (
					<h1>{i}</h1>
				))}
			</main>

			{/* <footer className={styles.footer}>
				<a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
					Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
				</a>
			</footer> */}
		</div>
	);
};

Home.getInitialProps = async (ctx) => {
	console.log("Home.getInitialProps -> ctx", ctx);
	const res = await axios.get("http://localhost:3000/api/companies");
	const json = await res.data;
	return { companies: json };
};
export default Home;
