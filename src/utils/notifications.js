import {store as notify} from "react-notifications-component"

export function showSuccessNotification(message) {
	showNotification("Success", message, "success")
}

export function showInfoNotification(message) {
	showNotification(message, " ", "info")
}

export function showErrorNotification(message) {
	showNotification("Error", message, "danger")
}

function showNotification(title, message, type) {
	notify.addNotification({
		title: title,
		message: message,
		type: type,
		container: "bottom-center",
		insert: "bottom",
		animationIn: ["animated", 'fadeIn'],
		animationOut: ["animated", 'fadeOut'],
		dismiss: {
			duration: 3000,
			click: true,
			onScreen: true
		}
	})
}