import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {

	const [books, setBooks] = useState([]);
	const result = useQuery(ALL_BOOKS);

	useEffect(() => {
		if (result.data) {
			setBooks(result.data.allBooks);
		}
	}, [result]);

	if (!props.show) {
		return null;
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
              author
						</th>
						<th>
              published
						</th>
					</tr>
					{books.map(a =>
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

Books.propTypes = {
	show: PropTypes.bool.isRequired,
};

export default Books;