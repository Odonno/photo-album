import styles from '../../styles/Tag.module.css';
import type { Photo } from '../../models';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import useSWR from 'swr';

const fetcher = async (url: string) => {
	const res = await fetch(`https://localhost:5001${url}`);
	const photos: Photo[] = await res.json();
	return photos;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const { params } = context;

	let photos: Photo[] = [];

	if (params) {
		const { tag } = params as { tag: string | undefined };

		if (tag) {
			photos = await fetcher(`/api/tags/${encodeURIComponent(tag)}/photos`);
		}
	}

	return {
		props: {
			photos,
		},
	};
};

const TagPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const { tag } = router.query as { tag: string };

	const shouldFetch = !!tag;
	const { data: photos } = useSWR(
		shouldFetch ? `/api/tags/${encodeURIComponent(tag)}/photos` : null,
		fetcher,
		{ initialData: props.photos }
	);

	return (
		<div>
			<Head>
				<title>Photo Album - Résultats pour &quot;{tag}&quot;</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h4>
				&quot;{tag}&quot; - {photos?.length || 0} résultats
			</h4>

			{photos &&
				photos.map((photo) => {
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
