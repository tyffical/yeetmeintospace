let users = new Map();
let userIdMap = new Map(); // maps username to unique id
let quoteMap = new Map(); // maps username to quote

/**
 * @class Users
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
	/**
	* Create a yeetmeinto.space user.
	* @param {string} username - username for new user
	* @param {string} password - password for new user
	* @return {User} - new yeetmeinto.space user
	*/
	static createUser(username, password) {
		let user_id = uuidv4();
		const user = { id: user_id, username, password, quote: ""};
		users.set(user_id, user);
		userIdMap.set(username, user_id);
		return user;
	}

	/**
	* Check if a yeetmeinto.space username already exists.
	* @param {string} username - username we are looking for
	* @return {bool} - True if the username exists, else False
	*/
	static userExists(username) {
		return userIdMap.has(username);
	}

	/**
	* Update a yeetmeinto.space user's username.
	* @param {string} oldUsername - original username of the user
	* @param {string} newUsername - new username of the user
	* @return {User} - the updated yeetmeinto.space user
	*/
	static updateUsername(oldUsername, newUsername) {
		const user_id = userIdMap.get(oldUsername);
		const user = users.get(user_id);
		user.username = newUsername;
		userIdMap.delete(oldUsername);
		userIdMap.set(newUsername, user_id);
		return user;
	}

	/**
	* Update a yeetmeinto.space user's password.
	* @param {string} username - username of the user
	* @param {string} newPassword - new password of the user
	* @return {User} - the updated yeetmeinto.space user
	*/
	static updatePassword(username, newPassword) {
		const user = users.get(userIdMap.get(username));
		user.password = newPassword;
		return user;
	}

	/**
	* Sign In to a yeetmeinto.space user's account.
	* @param {string} username - username of the user
	* @param {string} newPassword - password of the user
	* @return {bool} - True if the username/password match the existing account, else False
	*/
	static signIn(username, password) {
		const user = users.get(userIdMap.get(username));
		return (username === user.username && password === user.password);
	}

	/**
	* Delete a yeetmeinto.space user's account.
	* @param {string} username - username of the user to be deleted
	*/
	static deleteAccount(username) {
		users.delete(userIdMap.get(username));
		userIdMap.delete(username);
	}

	/**
	 * Get a user id based on the user name.
	 * @param {string} username - the name of the user
	 * @return {string} - userId
	 */
	static getUserId(username) {
		return userIdMap.get(username);
	}

	/**
	 * Get quote based on the user name.
	 * @param {string} username - the name of the user
	 * @return {string} - user's quote
	 */
	static getQuote(username){
		return users.get(userIdMap.get(username)).quote;
	}
	
	/**
	 * "Yeet" user into space with their quote.
	 * @param {string} username - name of the user
	 * @param {string} quote - quote they want to be remembered with
	 */
	static yeet(username, quote){
		users.get(userIdMap.get(username)).quote = quote;
		quoteMap.set(username, quote);
		return users.get(userIdMap.get(username)).quote;
	}

	/**
	 * Get all users.
	 * @return {Array} - list of all usernames
	 */
	static getUsers() {
		return Array.from(quoteMap.keys());
	}
}

/**
 * Function that creates unique random ids for users, following the UUID format
 * @return {string} randomly generated UUID
 */
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
 }

module.exports = Users;
