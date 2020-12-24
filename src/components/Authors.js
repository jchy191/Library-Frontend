
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ALL_AUTHORS } from '../queries';
import EditYearForm from './EditYearForm';

const Authors = (props) => {

	const [authors, setAuthors] = useState([]);

	const result = useQuery(ALL_AUTHORS);

	useEffect(() => {
		if (result.data) {
			setAuthors(result.data.allAuthors);
		}
	}, [result]);

	if (!props.show) {
		return null;
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
              born
						</th>
						<th>
              books
						</th>
					</tr>
					{authors.map(a =>
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					)}
				</tbody>
			</table>
			<EditYearForm authors={authors} />
		</div>
	);
};

Authors.propTypes = {
	show: PropTypes.bool.isRequired,
};

export default Authors;
