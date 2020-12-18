import { initialPostState } from "./postBaseReducer"

const CREATE_NEW_USER = "CREATE_NEW_USER"
const USER_LOG_IN = "USER_LOG_IN"
const USER_LOG_OUT = "USER_LOG_OUT"
const FOLLOW = "FOLLOW"
const CHAT = "CHAT"
const SET_USERS = "SET_USERS"
const CHANGE_PAGE = "CHANGE_PAGE"


export let initialUsersState = {
	userBase: [
		{
			"login": "AAA@111.cc",
			"password": "aaa111aaa",
			"userId": "id0001",
			"name": "Name MAIN FIRST",
			"birthDate": "00.11.22",
			"city": "some town",
			"education": "some education",
			"webSite": "some webSite",
			"registerDate": "33.33.33",
			"voutedLike": [],
			"voutedDislike": [],
			"isOnline": false,
			"avatarUrl": "https://i.pinimg.com/originals/15/b2/1a/15b21a20631cede3f16bb02759215b09.jpg",
			"contacts": ["id0003", "id0002", "id0006", "id0005"]
		},
		{
			"login": "BB@B111",
			"password": "bbb111bbb",
			"userId": "id0002",
			"name": "Name Two",
			"birthDate": "11.22.33",
			"city": "some town",
			"education": "some education",
			"webSite": "some webSite",
			"voutedLike": [],
			"voutedDislike": [],
			"registerDate": "44.44.44",
			"isOnline": true,
			"avatarUrl": "https://scontent.fiev13-1.fna.fbcdn.net/v/t1.0-9/944993_737146193094013_5672080899067667646_n.jpg?_nc_cat=107&cb=846ca55b-ee17756f&ccb=2&_nc_sid=09cbfe&_nc_ohc=SyPoRklCbqAAX9Iyd7J&_nc_ht=scontent.fiev13-1.fna&oh=c7b2cd2853d192f8a2d0de8baefb17e7&oe=5FEA9D29",
			"contacts": ["id0001", "id0003"]
		}, {
			"login": "CCC@111",
			"password": "ccc111ccc",
			"userId": "id0003",
			"name": "Name Three",
			"birthDate": "00.11.33",
			"city": "some town",
			"education": "some education",
			"webSite": "some webSite",
			"voutedLike": [],
			"voutedDislike": [],
			"registerDate": "44.44.44",
			"isOnline": false,
			"avatarUrl": "https://i.pinimg.com/236x/df/02/f2/df02f287609f6f06224622be9e3a588c--second-life-life-photography.jpg",
			"contacts": ["id0002", "id0006"]
		}, {
			"login": "DDD@111",
			"password": "ddd111ddd",
			"userId": "id0004",
			"name": "Name Four",
			"birthDate": "00.11.44",
			"city": "some town",
			"education": "some education",
			"webSite": "some webSite",
			"voutedLike": [],
			"voutedDislike": [],
			"registerDate": "55.55.55",
			"isOnline": true,
			"avatarUrl": "https://i.pinimg.com/originals/41/83/04/418304673aa2ab05fd39640c99e71828.jpg",
			"contacts": ["id0003"]
		}, {
			"login": "EEE@111",
			"password": "eee111eee",
			"userId": "id0005",
			"name": "Name Five",
			"birthDate": "00.11.55",
			"city": "some town",
			"education": "some education",
			"webSite": "some webSite",
			"voutedLike": [],
			"voutedDislike": [],
			"registerDate": "55.55.55",
			"isOnline": false,
			"avatarUrl": "https://avatarfiles.alphacoders.com/257/thumb-257122.jpg",
			"contacts": ["id0003", "id0001"]
		}, {
			"login": "FFF@111",
			"password": "fff111fff",
			"userId": "id0006",
			"name": "Name Six",
			"birthDate": "00.11.66",
			"city": "some town",
			"voutedLike": [],
			"voutedDislike": [],
			"education": "some education",
			"webSite": "some webSite",
			"registerDate": "66.66.66",
			"avatarUrl": "https://i.pinimg.com/originals/ba/ef/fc/baeffcbd32fbbb407584195f5d7bde23.jpg",
			"isOnline": false,
			"contacts": ["id0001", "id0002"]
		}
	],
	isUserExist: false,
	currentUserId: localStorage.getItem("currentUserId"),//<<<==  USER
	displayedUsers: 4,
	totalUsersCount: 0,
	currentUsersPage: +localStorage.getItem("currentUserPage")
}


let userId
let date
let user
let newUserId
let newUserModel
const userBaseReducer = (state = initialUsersState, action) => {
	switch (action.type) {
		case CREATE_NEW_USER:
			date = new Date().toLocaleDateString()
			newUserId = "id0" + ++Object.keys(state.userBase).length
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
			for (let i = 0; i < state.userBase.length; i++) {
				if (state.userBase[i].login === action.userData.userEmail) {
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
				state.userBase[newUserId] = newUserModel
				state.userBase.push(newUserModel)
				initialPostState.postsBase[newUserId] = []
				localStorage.setItem("currentUserId", newUserId)
				state.currentUserId = localStorage.getItem("currentUserId")
				console.log(`User:  ${newUserId} isOnline:  ${newUserModel.isOnline}`)
				return { ...state }
			}
			break
		//======================================================================================================================================
		case USER_LOG_IN:
			let logIn = (action) => {
				let result = ''
				if (action.inputLogin && action.inputPassword) {
					for (let i = 0; i < state.userBase.length; i++) {
						if (state.userBase[i].login === action.inputLogin) {
							if (state.userBase[i].password === action.inputPassword) {
								localStorage.setItem("currentUserId", state.userBase[i].userId)
								//state.currentUserId = localStorage.getItem("currentUserId")
								//state.userBase[i].isOnline = true
								result = `User:  ${state.userBase[i].userId} isOnline:  ${state.userBase[i].isOnline}`
								return {
									userBase: {
										...state.userBase[i].isOnline = true,
									},
									currentUserId: localStorage.getItem("currentUserId"),
									...state
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

			}
			logIn(action)
			break;
		//======================================================================================================================================
		case USER_LOG_OUT:
			userId = localStorage.getItem("currentUserId")
			user = state.userBase.filter(item => item.userId === localStorage.getItem("currentUserId"))
			//debugger
			if (user[0]) {
				user[0].isOnline = false
				localStorage.removeItem("currentUserId")//resetting of user ID
				console.log(`User:  ${userId} isOnline:  ${user[0].isOnline}`)
				return {
					...state,
					currentUserId: localStorage.getItem("currentUserId")// set user ID as null to send us to authorization page
				}
			} else {
				localStorage.removeItem("currentUserId")
				return null
			}
		//======================================================================================================================================
		case FOLLOW:
			let followId = action.event.target.offsetParent.childNodes[0].childNodes[1].textContent
			user = action.userBase.filter(item => item.userId === action.currentUserId)[0]
			action.event.target.classList.toggle("is-flipped")
			if (action.event.target.classList.contains("is-flipped")) {
				action.event.target.textContent = "Unfollow"
				return {
					userBase: {
						...state.userBase.filter(item => item.userId === action.currentUserId)[0].contacts = [
							...state.userBase.filter(item => item.userId === action.currentUserId)[0].contacts,
							followId
						]
					},
					...state
				}
				//user.contacts.push(followId)
			} else {
				action.event.target.textContent = "Follow"
				return {
					userBase: {
						...state.userBase.filter(item => item.userId === action.currentUserId)[0].contacts = [
							...state.userBase.filter(item => item.userId === action.currentUserId)[0].contacts.pop(followId)
						]
					},
					...state
				}
			}
		//======================================================================================================================================
		case CHAT:
			console.log("CHAT")
			return {
				...state
			}
		//======================================================================================================================================
		case SET_USERS:
			console.log("SET_USERS", action.newUsers)
			return {
				...state,
				userBase: [...action.newUsers, ...state.userBase],
				totalUsersCount: action.totalCount
			}
		//======================================================================================================================================
		case CHANGE_PAGE:
			let lastPage = Math.ceil(state.totalUsersCount / state.displayedUsers)
			if (action.event.target.textContent === "prev" && state.currentUsersPage > 1) {
				localStorage.setItem("currentUserPage", state.currentUsersPage - 1)
				return {
					...state,
					currentUsersPage: --state.currentUsersPage,
				}
			} else if (action.event.target.textContent === "next" && state.currentUsersPage < lastPage) {
				localStorage.setItem("currentUserPage", state.currentUsersPage + 1)
				return {
					...state,
					currentUsersPage: ++state.currentUsersPage,
				}
			} else if (action.event.target.attributes.name) {
				localStorage.setItem("currentUserPage", +action.event.target.attributes.name.value)
				return {
					...state,
					currentUsersPage: +action.event.target.attributes.name.value,
				}
			} else {
				return { ...state }
			}
		//======================================================================================================================================
		default: return state
	}
}
export default userBaseReducer
//reducer getting state from store and action from UI. Don't need subscriber. It will return renewed state.

//action creators
export const CREATE_NEW_USERactionCreator = (userData) => {
	return {
		type: CREATE_NEW_USER,
		userData: userData
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
export const FOLLOW_actionCreator = (event, currentUserId, userBase) => {
	return {
		type: FOLLOW,
		event: event,
		currentUserId: currentUserId,
		userBase: userBase
	}
}
export const CHAT_actionCreator = (event) => {
	return {
		type: CHAT,
		event: event

	}
}
export const SET_USERS_actionCreator = (newUsers, totalCount) => {
	return {
		type: SET_USERS,
		newUsers: newUsers,
		totalCount: totalCount

	}
}
export const CHANGE_PAGE_actionCreator = (event) => {
	return {
		type: CHANGE_PAGE,
		event: event
	}
}