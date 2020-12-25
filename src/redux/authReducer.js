import { initialUsersState } from "./userBaseReducer"
import { initialPostState } from "./postBaseReducer"
import { userAPI } from './../API';


const USER_LOG_IN = "USER_LOG_IN"
const USER_LOG_OUT = "USER_LOG_OUT"
const SET_USER_DATA = "SET_USER_DATA"
const AUTHORIZATION = "AUTHORIZATION"
const CREATE_NEW_USER = "CREATE_NEW_USER"


export let initialAuthState = {
	email: null,
	userId: null,
	login: null,
	isAuthorized: false,
	currentUserId: null || localStorage.getItem("currentUserId")
}

let date
let newUserId
let newUserModel
const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				email: action.userData.data.email,
				login: action.userData.data.login,
				isAuthorized: true
			}
		//======================================================================================================================================
		case AUTHORIZATION:
			localStorage.setItem("currentUserId", action.userId)
			console.log("logged in", action.userId)
			return {
				...state,
				userId: action.userId,
				isAuthorized: true
			}
		//======================================================================================================================================
		case CREATE_NEW_USER:
			date = new Date().toLocaleDateString()
			newUserId = "id0" + ++Object.keys(initialUsersState.userBase).length
			newUserModel = {
				"userId": newUserId,
				"name": action.userData.userName,
				"birthDate": action.userData.userdateOfbirth,
				"city": action.userData.userCity,
				"login": action.userData.userEmail,
				"password": action.userData.userPassword,
				"webSite": action.userData.userWebsite,
				"registerDate": `${date}`,
				"statusText": "my statusText",
				"voutedLike": [],
				"voutedDislike": [],
				"isOnline": true,
				"avatarUrl": action.userData.userAvatar,
				"contacts": []
			}
			for (let i = 0; i < initialUsersState.userBase.length; i++) {
				if (initialUsersState.userBase[i].login === action.userData.userEmail) {
					state.isUserExist = true
					break
				} else {
					state.isUserExist = false
				}
			}
			console.log("reducer", state.isUserExist)
			if (state.isUserExist) {
				console.log("Such user already exist")
				return {
					...state,
					isUserExist: true
				}
			} else if (!state.isUserExist) {
				//initialUsersState.userBase[newUserId] = newUserModel
				initialUsersState.userBase.push(newUserModel)
				initialPostState.postsBase[newUserId] = []
				localStorage.setItem("currentUserId", newUserId)
				console.log(`User:  ${newUserId} isOnline:  ${newUserModel.isOnline}`)
				return { ...state, currentUserId: newUserId, isAuthorized: true }
			}
			break

		//======================================================================================================================================
		case USER_LOG_IN:
			let result = ''
			if (action.inputLogin && action.inputPassword) {
				for (let i = 0; i < initialUsersState.userBase.length; i++) {
					if (initialUsersState.userBase[i].login === action.inputLogin) {
						if (initialUsersState.userBase[i].password === action.inputPassword) {
							localStorage.setItem("currentUserId", initialUsersState.userBase[i].userId)
							initialUsersState.userBase[i].isOnline = true
							result = `User:  ${initialUsersState.userBase[i].userId} isOnline:  ${initialUsersState.userBase[i].isOnline}`
							return {
								...state,
								currentUserId: initialUsersState.userBase[i].userId,
								isAuthorized: true
							}
						} else {
							result = "Wrong login or password"
							break
						}
					} else {
						result = "Such user was not found"
						continue
					}
				}
				console.log(result)
			} else {
				console.log("You need to enter data")
			}
			break;
		//======================================================================================================================================
		case USER_LOG_OUT:
			localStorage.removeItem("currentUserId")//resetting of user ID
			return {
				...state,
				currentUserId: null,// set user ID as null to send us to authorization page
				isAuthorized: false
			}
		default: return {
			...state
		}
	}
	return state
}
export default authReducer

//================ACTIONS=====================================================================================
export const SET_USER_DATA_actionCreator = (data) => {
	return {
		type: SET_USER_DATA,
		userData: data
	}
}
export const USER_LOG_INactionCreator = (event) => {
	return {
		type: USER_LOG_IN,
		inputLogin: event.target[0].value,
		inputPassword: event.target[1].value,
	}
}
export const USER_LOG_OUTactionCreator = () => {
	return {
		type: USER_LOG_OUT,
	}
}
export const CREATE_NEW_USERactionCreator = (userData) => {
	return {
		type: CREATE_NEW_USER,
		userData: userData
	}
}
export const AUTHORIZATION_actionCreator = (userId) => {
	return {
		type: AUTHORIZATION,
		userId: userId
	}
}
//================ACTIONS END==================================================================================

//==============THUNKS========================================================================
export const LogInThunkCreator = () => (dispatch) => {
	userAPI.logIn().then(data => {//start API request, and after response...
		dispatch(SET_USER_DATA_actionCreator(data))// put data to store
	})
}
export const AuthorizationThunkCreator = (email, password, rememberMe) => (dispatch) => {
	userAPI.authorization(email, password, rememberMe).then(response => {//start API request, and after response...
		if (response.data.resultCode === 0) {//if server allow authorization...
			dispatch(AUTHORIZATION_actionCreator(response.data.data.userId))// put data to store
			userAPI.logIn(response.data.data.userId).then(data => {//start API request, and after response...
				dispatch(SET_USER_DATA_actionCreator(data))// put data to store
			})
		} else {
			console.log(response.data.messages[0])
		}
	})
}
//=============THUNKS END=====================================================================