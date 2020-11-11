import styles from '../../styles/Photo.module.css';
import type { Photo } from '../../models';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import useSWR from 'swr';
import { photoAlbumApi } from '../../models/env';

const fetcher = async (url: string) => {
	const res = await fetch(`${photoAlbumApi}${url}`);
	const photo: Photo = await res.json();
	return photo;
};

const addTagToPhoto = async (photoId: number, tag: string) => {
	const res = await fetch(`${photoAlbumApi}/api/photos/${photoId}/tag/${tag}`, {
		method: 'POST',
	});
	const photo: Photo = await res.json();
	return photo;
};

const removeTagFromPhoto = async (photoId: number, tag: string) => {
	const res = await fetch(`${photoAlbumApi}/api/photos/${photoId}/tag/${tag}`, {
		method: 'DELETE',
	});
	const photo: Photo = await res.json();
	return photo;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const { params } = context;

	let photo: Photo | undefined = undefined;

	if (params) {
		const { id } = params as { id: number | undefined };

		if (id) {
			photo = await fetcher(`/api/photos/${encodeURIComponent(id)}`);
		}
	}

	return {
		props: {
			photo,
		},
	};
};

const PhotoPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const { id } = router.query as { id: string };

	const shouldFetch = !!id;
	const { data: photo, mutate } = useSWR(
		shouldFetch ? `/api/photos/${encodeURIComponent(id)}` : null,
		fetcher,
		{ initialData: props.photo }
	);

	const [newTag, setNewTag] = useState('');

	const onNewTagChanged = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setNewTag(value);
	};

	const onKeyUpChanged = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (photo && e.key === 'Enter') {
			const updatedPhoto = await addTagToPhoto(photo.id, newTag);
			mutate(updatedPhoto);
			setNewTag('');
		}
	};

	const onRemoveTagClicked = async (tag: string) => {
		if (photo && tag) {
			const updatedPhoto = await removeTagFromPhoto(photo.id, tag);
			mutate(updatedPhoto);
		}
	};

	if (!photo) {
		return (
			<div className={styles.container}>
				<Head>
					<title>Photo Album - Photo not found</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<h4>Photo not found...</h4>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Photo Album - Photo #{id}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h4>Photo #{id}</h4>

			<div className={styles.image}>
				<Image src={photo.url} alt="" width={300} height={400} />
			</div>

			<div id="tags" className={styles.tagsContainer}>
				{photo.tags.map((tag) => {
					return (
						<div key={tag} className={styles.tagContainer}>
							<div className={styles.tag}>{tag}</div>
							<div
								className={styles.tagRemove}
								onClick={async () => await onRemoveTagClicked(tag)}
								role="presentation"
							>
								<img src="/clear.svg" alt="remove tag" />
							</div>
						</div>
					);
				})}

				<input
					type="text"
					className={styles.addTagInput}
					placeholder="Add a tag"
					value={newTag}
					onChange={(e) => onNewTagChanged(e)}
					onKeyUp={async (e) => await onKeyUpChanged(e)}
				/>
			</div>
		</div>
	);
};

export default PhotoPage;
