import styles from '../../styles/Photo.module.css';
import type { Photo } from '../../models';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useState, KeyboardEvent } from 'react';

const photo: Photo = {
	id: 4,
	url:
		'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
	tags: ['pluie', 'océan'],
};

const PhotoPage = () => {
	const router = useRouter();
	const { id } = router.query;

	// TODO : call to get photo from API

	const [newTag, setNewTag] = useState('');

	const onNewTagChanged = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setNewTag(value);
	};

	const onKeyUpChanged = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			// TODO : call to add tag to the photo
		}
	};

	const onRemoveTagClicked = (tag: string) => {
		if (tag) {
			// TODO : call to remove tag from the photo
		}
	};

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
								onClick={() => onRemoveTagClicked(tag)}
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
					onKeyUp={(e) => onKeyUpChanged(e)}
				/>
			</div>
		</div>
	);
};

export default PhotoPage;
