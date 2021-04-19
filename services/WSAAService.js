class WSAAService {
    constructor(wsaaModel) {
        this.wsaaModel = wsaaModel;
    }

    findOne() {
        //Se obtiene el token/sign activo
        try {
            const token = this.wsaaModel.findOne({ active: true }, 'token sign expiration_time', );
            //console.log('token findOne()', token.expiration_time);
            return token;
        } catch (err) {
            //console.log('token findOne() error.', e);
            return err.message;
        }
    }

    create(data) {
        //antes de grabar el nuevo Token se inactiva el anterior
        try {
            const wsaaNew = this.wsaaModel(data);
            return wsaaNew.save();
        } catch (err) {
            return err.message;
        }
    }

    updateMany() {
        try {
            //Se inactivan el/los ticket vencidos antes de insertar el nuevo
            const wsaaUpd = this.wsaaModel.updateMany({ active: true }, { active: false });
            return wsaaUpd;
        } catch (err) {
            return err.message;
        }
    }




}

module.exports = WSAAService;