class TimeService {
    constructor(TimeModel) {
        this.TimeModel = TimeModel;
    }

    getAll() {
        const timesAll = this.TimeModel.find({});
        return timesAll;
    }

    getById(id) {
        const timeById = this.TimeModel.findById(id);
        return timeById;
    }

    create(data) {
        const timeNew = this.TimeModel(data);
        return timeNew.save();
    }
}

module.exports = TimeService;