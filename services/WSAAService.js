class WSAAService {
    constructor(wsaaModel) {
        this.wsaaModel = wsaaModel;
    }

    findOne() {
        //Se obtiene el token/sign activo
        try {
            const token = this.wsaaModel.findOne({ active: true }, 'expiration_time', ); //unique_id token sign 
            //console.log('token findOne()', token.expiration_time);
            return token;
        } catch (e) {
            //console.log('token findOne() error.', e);
            return e.Error;
        }
    }

    create(data) {
        //antes de grabar el nuevo Token se inactiva el anterior
        try { //AndUpdate
            const wsaaNew = this.wsaaModel(data);
            return wsaaNew.save();
        } catch (e) {
            return e.Error;
        }
    }

    updateMany() {
        try {
            //Se inactivan el/los ticket vencidos antes de insertar el nuevo
            const wsaaUpd = this.wsaaModel.updateMany({ active: true }, { active: false });
            return wsaaUpd;
        } catch (e) {
            return e.Error;
        }
    }




}

module.exports = WSAAService;