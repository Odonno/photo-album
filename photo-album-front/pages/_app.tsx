import '../styles/globals.css';
import styles from '../styles/Layout.module.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Photo Album</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<div id="content" className={styles.content}>
				<Component {...pageProps} />
			</div>
		</div>
	);
};

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
