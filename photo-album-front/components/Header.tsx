import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../styles/Layout.module.css';
import Link from 'next/link';

const tags = ['hello', 'world', 'océaN', 'victoire', 'pluie'];

const Header = () => {
	const [hasSearchFocus, setHasSearchFocus] = useState(false);
	const [search, setSearch] = useState('');
	const [tagsSearched, setTagsSearched] = useState<string[]>([]);

	// TODO : call to search tags from API

	useEffect(() => {
		const searchLower = search.toLowerCase();
		setTagsSearched(tags.filter((t) => t.toLowerCase().startsWith(searchLower)));
	}, [search, setTagsSearched]);

	const onSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const onSearchFocused = () => {
		setHasSearchFocus(true);
	};

	const onSearchBlurred = () => {
		setHasSearchFocus(false);
	};

	return (
		<div id="header" className={styles.header}>
			<div>
				<input
					id="searchbar"
					type="text"
					className={styles.searchbar}
					placeholder="Search pictures by tag"
					value={search}
					onChange={(e) => onSearchChanged(e)}
					onFocus={() => onSearchFocused()}
					onBlur={() => onSearchBlurred()}
				/>

				<div
					className={
						hasSearchFocus ? styles.searchedTagsDisplayed : styles.searchedTagsHidden
					}
				>
					{tagsSearched.map((tag) => {
						return (
							<div key={tag} className={styles.searchedTagItem}>
								<Link href={`/tags/${encodeURIComponent(tag)}`}>{tag}</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Header;
