class WSCDCService {
    constructor(wscdcModel) {
        this.wscdcModel = wscdcModel;
    }

    create(data) {
        try {
            let wscdcNew = this.wscdcModel(data);
            return wscdcNew.save();
        } catch (err) {
            return err.message;
        }
    }

    findByIdAndUpdate(data) {
        try {
            return this.wscdcModel.findByIdAndUpdate(data._id, data);
        } catch (err) {
            return err.message;
        }

    }

}

module.exports = WSCDCService;