class ClassService {
    constructor(classModel) {
        this.classModel = classModel;
    }

    getAll() {
        const classAll = this.classModel.find({});

        return classAll;
    }

    getById(id) {
        const classOne = this.classModel.findById(id);

        return classOne;
    }

    create(data) {
        const classNew = this.classModel(data);

        return classNew.save();
    }


}

module.exports = ClassService;