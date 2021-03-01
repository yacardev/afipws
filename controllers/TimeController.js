const e = require("express");

class TimeController {
    constructor(TimeService) {
        this.TimeService = TimeService;
    }

    async getAll(req, res) {
        try {
            const timeAll = await this.TimeService.getAll();
            if (timeAll) {
                return res.status(201).json(timeAll);
            }
            return res.sendStatus(400);

        } catch (e) {
            console.log('catch getAll', e.errors.name);
            return res.status(400).json({ "error": e.message });
        }

    }

    async getById(req, res) {
        try {
            const timeOne = await this.TimeService.getById(req.body.id);
            if (timeOne) {
                return res.status(201).json(timeOne);
            }
            return res.sendStatus(400);
        } catch (e) {
            console.log('catch getById', e.errors.name);
            return res.status(400).json({ "error": e.message });
        }
    }

    async create(req, res) {
        const { body } = req;
        try {
            const timeNew = await this.TimeService.create(body);
            if (timeNew) {
                return res.status(201).json(timeNew);
            }
            return res.sendStatus(400);

        } catch (e) {
            console.log('catch create', e.errors.name);
            return res.status(400).json({ "error": e.message });
        }

    }



}

module.exports = TimeController;