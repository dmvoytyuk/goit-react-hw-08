import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	selectIsLoggedIn,
	selectUserData,
} from '../../redux/auth/selectors.js';
import styles from './HomePage.module.css';

const HomePage = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUserData);
	return (
		<div className={styles.homePage}>
			{isLoggedIn ? (
				<p>
					Welcome, {user.name}, manage your contacts{' '}
					<Link to="/contacts">here</Link>
				</p>
			) : (
				<p>
					Welcome to Contacts Manager App, <Link to="/login">Login</Link> or{' '}
					<Link to="/register">Register</Link> to start managing your contacts.
				</p>
			)}
		</div>
	);
};

export default HomePage;
