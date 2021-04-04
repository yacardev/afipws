class WSCDCService {
    constructor(wscdcModel) {
        this.wscdcModel = wscdcModel;
    }

    create(data) {
        try {
            const wscdcNew = this.wscdcModel(data);
            return wscdcNew.save();
        } catch (e) {
            return e.Error;
        }
    }

    findByIdAndUpdate(data) {
        //console.log('findByIdAndUpdate()', data);
        try {
            const WSCDCUpd = this.wscdcModel.findByIdAndUpdate(data._id, data);
            return WSCDCUpd;

        } catch (e) {
            return e.Error;

        }

    }

}

module.exports = WSCDCService;