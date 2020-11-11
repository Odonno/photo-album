import styles from '../../styles/Tag.module.css';
import type { Photo } from '../../models';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const results: Photo[] = [
	{
		id: 1,
		url:
			'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
		tags: [],
	},
	{
		id: 2,
		url:
			'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
		tags: [],
	},
	{
		id: 4,
		url:
			'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
		tags: [],
	},
	{
		id: 5,
		url:
			'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
		tags: [],
	},
];

const TagPage = () => {
	const router = useRouter();
	const { tag } = router.query;

	// TODO : call to get photos from tag, from API

	return (
		<div>
			<Head>
				<title>Photo Album - Résultats pour &quot;{tag}&quot;</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h4>
				&quot;{tag}&quot; - {results.length} résultats
			</h4>

			{results.map((photo) => {
				return (
					<div key={photo.id} className={styles.imageContainer}>
						<Link href={`/photos/${encodeURIComponent(photo.id)}`}>
							<Image
								src={photo.url}
								alt=""
								width={150}
								height={250}
								className={styles.image}
							/>
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default TagPage;
