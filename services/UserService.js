class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    getAll() {
        const users = this.userModel.find({});
        return users;
    }

    getById(id) {
        const user = this.userModel.findById(id);
        return user;
    }

    create(data) {
        //console.log("data", data);
        const user = new this.userModel(data);

        return user.save();
    }
}

module.exports = UserService;