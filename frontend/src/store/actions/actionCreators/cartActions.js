import axiosInstance from '../../../axiosInstance';
import {
	ADD_ITEM_TO_CART,
	REMOVE_FROM_CART,
	CLEAR_CART,
} from '../actionConstants/cartConstants';

export const getUserCartAction = () => async (dispatch) => {
	try {
		dispatch({
			type: 'GET_CART_START',
		});
		const _token = localStorage.getItem('__JWT_TOKEN__');
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.get('/users/cart', config);

		dispatch({ type: 'GET_CART_SUCCESS', payload: data?.cart });
	} catch (error) {
		console.log(error);
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: 'GET_CART_FAIL', payload });
	}
};

export const addToCartAction =
	({ id, quantity, history }) =>
	async (dispatch) => {
		try {
			const _token = localStorage.getItem('__JWT_TOKEN__');
			if (!_token) return history.push(`/login?redirect=product/${id}`);
			dispatch({
				type: 'ADD_CART_START',
			});
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${_token}`,
				},
			};
			const { data } = await axiosInstance.post(
				'/users/cart',
				{ id, quantity },
				config
			);

			dispatch({ type: 'ADD_CART_SUCCESS', payload: data?.cart });
		} catch (error) {
			console.log(error);
			const { response, message } = error;
			const { data } = response;
			const payload = data.message ? data.message : message;

			dispatch({ type: 'ADD_CART_FAIL', payload });
		}
	};

export const removeFromCart = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ADD_CART_START',
		});
		const _token = localStorage.getItem('__JWT_TOKEN__');
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.delete(`/users/cart/${id}`, config);

		dispatch({ type: 'ADD_CART_SUCCESS', payload: data?.cart });
	} catch (error) {
		console.log(error);
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: 'ADD_CART_FAIL', payload });
	}
};

export const clearCart = () => async (dispatch) => {
	try {
		dispatch({
			type: 'ADD_CART_START',
		});
		const _token = localStorage.getItem('__JWT_TOKEN__');
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.delete(`/users/cart`, config);

		dispatch({ type: 'ADD_CART_SUCCESS', payload: data?.cart });
	} catch (error) {
		console.log(error);
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: 'ADD_CART_FAIL', payload });
	}
};

export const createPaymentorder = (reqBody) => async (dispatch) => {
	// console.log(reqBody)
	try {
		dispatch({
			type: 'GET_CART_START',
		});
		const _token = localStorage.getItem('__JWT_TOKEN__');
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${_token}`,
			},
		};
		const { data } = await axiosInstance.post('/payment/order', reqBody, config);

		// console.log(data);

		dispatch({ type: 'GET_CART_SUCCESS', payload: [] });
	} catch (error) {
		console.log(error);
		const { response, message } = error;
		const { data } = response;
		const payload = data.message ? data.message : message;

		dispatch({ type: 'GET_CART_FAIL', payload });
	}
}
