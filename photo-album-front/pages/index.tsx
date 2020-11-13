import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import type { Photo } from '../models';
import { ChangeEvent } from 'react';
import type { InferGetStaticPropsType } from 'next';
import useSWR from 'swr';
import { photoAlbumApi } from '../models/env';

const fetcher = async () => {
	const res = await fetch(`${photoAlbumApi}/api/photos`);
	const photos: Photo[] = await res.json();
	return photos;
};

const uploadPhoto = async (file: File) => {
	const data = new FormData();
	data.append('file', file);

	const res = await fetch(`${photoAlbumApi}/api/photos`, {
		method: 'POST',
		body: data,
	});
	const photo: Photo = await res.json();
	return photo;
};

export const getStaticProps = async () => {
	const photos = await fetcher();

	return {
		props: {
			photos,
		},
		revalidate: 1,
	};
};

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { data: photos, mutate } = useSWR('/api/photos', fetcher, { initialData: props.photos });

	const onFileChanged = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		const selectedFile = files && files[0];

		if (selectedFile) {
			const photo = await uploadPhoto(selectedFile);
			mutate([photo, ...(photos || [])]);
		}
	};

	return (
		<>
			<div id="add-photo" className={styles.addPhotoContainer}>
				<input
					type="file"
					id="file"
					accept="image/*"
					className={styles.addPhotoInput}
					onChange={async (e) => await onFileChanged(e)}
				/>

				<label htmlFor="file" className={styles.addPhotoLabel}>
					<img src="/upload.svg" alt="Upload" />
				</label>
			</div>

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
		</>
	);
};

export default HomePage;
