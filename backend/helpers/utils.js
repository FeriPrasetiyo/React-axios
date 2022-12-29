class Response {
    constructor(data, success = 'success') {
        this.success = success
        this.data = data
    }
}



module.exports = {
    Response
}