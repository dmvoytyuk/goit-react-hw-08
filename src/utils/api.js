import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'https://connections-api.herokuapp.com/',
});

export const apiRegisterUser = async (user) => {
	axiosInstance.defaults.headers.common['Authorization'] = ``;
	const response = await axiosInstance
		.post('/users/signup', user)
		.then((response) => {
			return response;
		});

	return response.data;
};

export const apiLoginUser = async (user) => {
	axiosInstance.defaults.headers.common['Authorization'] = ``;
	const response = await axiosInstance.post('/users/login', user);
	return response.data;
};

export const apiRefreshUser = async (token) => {
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const response = await axiosInstance.get('/users/current');
	return response.data;
};

export const apiLogout = async (token) => {
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const response = await axiosInstance.post('/users/logout');
	return response.data;
};

export const apiGetContacts = async (token) => {
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const response = await axiosInstance.get('/contacts');
	return response.data;
};

export const apiAddContact = async (token, contact) => {
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const response = await axiosInstance.post('/contacts', contact);
	return response.data;
};

export const apiDeleteContact = async (token, contactId) => {
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const response = await axiosInstance.delete(`/contacts/${contactId}`);
	return response.data;
};
