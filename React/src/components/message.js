import { useSelector } from "react-redux";

function Message() {
	const message = useSelector((state) => state.message.text)

	return (
		<p id="message">{message}</p>
	)
}

export default Message;