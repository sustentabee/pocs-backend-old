const connection = require("../../database/connection");
const bcrypt = require("bcryptjs");

module.exports = {

    async index(req, res) {
        const users = await connection('users').select('*');
        return res.json(users);
    },
    async show(req, res) {
        const { id } = req.params;
        const user = await connection('users').where('id', id).select('*').first();
        return res.json(user);
    },
    async store(req, res) {
        const { name, email, password, status = "active" } = req.body;

        const user = await connection('users').where('email', email).select('email').first();
        if (user) {
            return res.status(400).json({ error: "E-mail already registered" });
        }

        const password_hash = await bcrypt.hash(password, 10);

        await connection('users').insert({
            name,
            email,
            password: password_hash,
            status
        });

        return res.status(201).send();
    },
    async update(req, res) {
        const { id } = req.params;
        const { name, email, status } = req.body;
        await connection('users').where('id', id).update({
            name,
            email,
            status
        });
        return res.send();
    },
    async destroy(req, res) {
        const { id } = req.params;
        const user = await connection('users').where('id', id).select('id').first();
        if (user) {
            await connection('users').where('id', id).delete();
        }
        return res.status(204).send();
    }

}