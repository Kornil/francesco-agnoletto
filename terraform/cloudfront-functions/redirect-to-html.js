function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (
        uri !== '/' &&
        !uri.match(/\.[a-zA-Z0-9]+$/)
    ) {
        request.uri += '.html';
    }

    return request;
}