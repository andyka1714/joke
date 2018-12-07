import axios from 'axios'

const baseUrl = 'https://api.chucknorris.io/jokes';

export const searchRandomJoke = () => (dispatch) => {
	return axios.get(`${baseUrl}/random`)
		.then(res => {
			dispatch({
				type: SET_RANDOM_JOKE,
				jokeList: res.data
			})
		})
}

export const searchCategories = () => (dispatch) => {
	return axios.get(`${baseUrl}/categories`)
		.then(res => {
			dispatch({
				type: SET_CATEGORIES,
				categories: res.data
			})
		})
}

export const searchJoke = (query) => (dispatch) => {
	const localData = JSON.parse(localStorage.getItem(query))
	if(localData) {
		return dispatch({
				type: SET_JOKE,
				jokeList: localData
			})
	}else{
		return axios.get(`${baseUrl}/search?query=${query}`)
			.then(res => {
				if(res.data.result.length !== 0) {
					localStorage.setItem(query, JSON.stringify(res.data.result))
					dispatch({
						type: SET_JOKE,
						jokeList: res.data.result
					})
				}else{
					alert("Can't find any joke~")
				}
			})
	}
}

export const SET_RANDOM_JOKE = 'SET_RANDOM_JOKE'
export const SET_JOKE = 'SET_JOKE'
export const SET_CATEGORIES = 'SET_CATEGORIES'