import { ChangeEvent, useState } from 'react';
import styles from '../styles/Layout.module.css';
import Link from 'next/link';
import useSWR from 'swr';

const Header = () => {
	const [hasSearchFocus, setHasSearchFocus] = useState(false);
	const [search, setSearch] = useState('');

	const shouldFetch = !!search;
	const { data: tags } = useSWR<string[]>(
		shouldFetch ? `https://localhost:5001/api/tags/search/${search}` : null
	);

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
						tags && hasSearchFocus
							? styles.searchedTagsDisplayed
							: styles.searchedTagsHidden
					}
				>
					{tags &&
						tags.map((tag) => {
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
