const Webview = {
    sendMessageToHost(message) {
        chrome?.webview?.postMessage(message);
    },
    getMessageFromHost(callback) {
        chrome?.webview?.addEventListener("message", callback);
    }
}

export default Webview