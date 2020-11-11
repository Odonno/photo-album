import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import type { Photo } from '../models';
import { ChangeEvent } from 'react';

const photos: Photo[] = [
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
		id: 3,
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
	{
		id: 6,
		url:
			'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
		tags: [],
	},
];

const HomePage = () => {
	// TODO : call to get photos from API

	const onFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		const selectedFile = files && files[0];

		// TODO : call to upload photo using API
		console.log(selectedFile);
	};

	return (
		<>
			<div id="add-photo" className={styles.addPhotoContainer}>
				<input
					type="file"
					id="file"
					className={styles.addPhotoInput}
					onChange={(e) => onFileChanged(e)}
				/>

				<label htmlFor="file" className={styles.addPhotoLabel}>
					<img src="/upload.svg" alt="Upload" />
				</label>
			</div>

			{photos.map((photo) => {
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
