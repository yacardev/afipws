const e = require("express");

class UserController {
    constructor(userService) {
        this.userService = userService;

    }

    async getAll(req, res) {
        try {
            const getAll = await this.userService.getAll();
            if (getAll) {
                return res.status(201).json(getAll);
            }
            return res.sendStatus(400);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ "error": e.message });
        }
    }

    async getById(req, res) {
        try {
            const userById = await this.userService.getById(req.body.id);
            if (userById) {
                return res.status(201).json(userById);
            }
            return res.sendStatus(400);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ "error": e.message });
        }
    }

    async create(req, res) {

        const { body } = req;
        try {
            const created = await this.userService.create(body);
            if (created) {
                return res.status(201).json(created);
            }
            console.log('try:', e);
            return res.sendStatus(400);
        } catch (e) {
            console.log('catch', e.errors.name);
            return res.status(400).json({ "error": e.message });
        }
    }
}

module.exports = UserController;