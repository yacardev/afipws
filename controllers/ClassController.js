const e = require("express");

class ClassController {
    constructor(classService) {
        this.classService = classService;
    }

    async getAll(req, res) {
        try {
            const classAll = await this.classService.getAll();

            if (classAll) {
                return res.status(201).json(classAll);
            }
            return res.sendStatus(400);
        } catch (e) {
            return res.status(400).json({ "error": e.message });
        }
    }

    async getById(req, res) {
        try {
            const classOne = await this.classService.getById(req.body.id);
            if (classOne) {
                return res.status(201).json(classOne);
            }
            return res.sendStatus(400);
        } catch (e) {
            return res.status(400).json({ "error": e.message });
        }
    }

    async create(req, res) {
        const { body } = req;
        try {
            const classNew = await this.classService.create(body);
            if (classNew) {
                return res.status(201).json(classNew);
            }
            return res.sendStatus(400);

        } catch (e) {
            return res.status(400).json({ "error": e.message });
        }
    }
}


module.exports = ClassController;