import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../redux/auth/selectors.js';
import { addContact } from '../../redux/contacts/operations.js';
import {
	selectIsLoading,
	selectSuccessfullyAdded,
} from '../../redux/contacts/selectors.js';
import AddIcon from '../AddIcon/AddIcon.jsx';
import Loader from '../Loader/Loader.jsx';

import styles from './ContactForm.module.css';

const INIT_CONTACT_FORM = {
	contactName: '',
	contactNumber: '',
};

const contactValidationScheme = Yup.object({
	contactName: Yup.string()
		.min(3, 'Too short')
		.max(50, 'Too long')
		.required('Required'),
	contactNumber: Yup.string()
		.min(3, 'Too short')
		.max(50, 'Too long')
		.required('Required'),
});

const ContactForm = () => {
	const dispatch = useDispatch();
	const token = useSelector(selectToken);
	const isLoading = useSelector(selectIsLoading);
	const [showForm, setShowForm] = useState(false);
	const ref = useRef(null);
	const isSuccessfullyAdded = useSelector(selectSuccessfullyAdded);

	const handleSubmit = (formValues, actions) => {
		const newContact = {
			name: formValues.contactName,
			number: formValues.contactNumber,
		};
		dispatch(addContact({ token, newContact }));
		actions.resetForm();
	};

	const onShowForm = () => {
		setShowForm(true);
	};

	useEffect(() => {
		const handleClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				if (e.target.name === 'showForm' && showForm === false) {
					return;
				}
				setShowForm(false);
			}
		};
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);

	useEffect(() => {
		if (isSuccessfullyAdded) {
			setShowForm(false);
		}
	}, [isSuccessfullyAdded]);

	return (
		<>
			{showForm === false && (
				<button
					className={styles.contactFormShowButton}
					name="showForm"
					type="button"
					onClick={onShowForm}
				>
					{<AddIcon />}
				</button>
			)}
			{showForm === true && (
				<Formik
					initialValues={INIT_CONTACT_FORM}
					validationSchema={contactValidationScheme}
					onSubmit={handleSubmit}
				>
					<Form ref={ref} className={styles.contactForm}>
						<label className={styles.contactLabel}>
							{'Name'}
							<Field
								className={styles.contactFormInput}
								type="text"
								name="contactName"
							/>
							<ErrorMessage
								className={styles.contactValidationError}
								component="p"
								name="contactName"
							/>
						</label>
						<label className={styles.contactLabel}>
							{'Number'}
							<Field
								className={styles.contactFormInput}
								type="tel"
								name="contactNumber"
							/>
							<ErrorMessage
								className={styles.contactValidationError}
								component="p"
								name="contactNumber"
							/>
						</label>
						{!isLoading ? (
							<button className={styles.contactFormSubmitButton} type="submit">
								Add new contact
							</button>
						) : (
							<Loader />
						)}
					</Form>
				</Formik>
			)}
		</>
	);
};

export default ContactForm;
