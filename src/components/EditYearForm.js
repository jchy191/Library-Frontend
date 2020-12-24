import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries';


const EditYearForm = ({ authors }) => {

	const [selectedAuthor, setSelectedAuthor] = useState(null);
	const [year, setYear] = useState('');
	const options = authors.map(author => ({ value: `${author.name}`, label: `${author.name}` }));

	const [updateYear] = useMutation(EDIT_BIRTHYEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }]
	});

	const submit = async (event) => {
		event.preventDefault();
		updateYear({ variables: { name: selectedAuthor.value, setBornTo: parseInt(year) } });
		setSelectedAuthor('');
		setYear('');
	};

	return (
		<div>
			<h3>Set birthyear</h3>
			<form onSubmit={submit}>
				<div>
          name
					<Select
						value={selectedAuthor}
						onChange={setSelectedAuthor}
						options={options}
					/>
				</div>
				<div>
          born
					<input
						value={year}
						onChange={({ target }) => setYear(target.value)}
					/>
				</div>
				<button type='submit'>update author</button>
			</form>
		</div>
	);
};

EditYearForm.propTypes = {
	authors: PropTypes.array,
};

export default EditYearForm;