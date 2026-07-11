import axiosInstance from '../utils/axiosInstance.js';

export const loginUser = async(password, email) => {
    try {
        const {data} = await axiosInstance.post('/api/auth/login', { password, email });
        return data;
    } catch (error) {
        throw error.response?.data || new Error(error.message || 'Login failed. Please try again.');
    }
};

export const registerUser = async(name,password, email) => {
    try {
        const {data} = await axiosInstance.post('/api/auth/register', { name, email, password });
        return data;
    } catch (error) {
        throw error.response?.data || new Error(error.message || 'Registration failed. Please try again.');
    }
};


export const logoutUser = async() => {
    try {
        const {data} = await axiosInstance.get('/api/auth/logout');
        return data;
    } catch (error) {
        throw error.response?.data || new Error(error.message || 'Logout failed. Please try again.');
    }
};
