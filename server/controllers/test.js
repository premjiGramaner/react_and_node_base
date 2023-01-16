const { Test } = require("../models");

const getApi = async (req, res, next) => {
    try {
        const data = await Test.getSampleData()
        res.status(200).send({ data: data, message: 'Welcome to Sample App API' })
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    const { id, name } = req.body;
    try {
        const data = await Test.updateSampleData(id, name)
        res.send({ updated: data, message: 'Welcome to Sample Post API' })
    } catch (e) {
        next(e);
    }
};

const create = async (req, res, next) => {
    const { name } = req.body;
    try {
        const data = await Test.addSampleData(name)
        res.send({ created: data, message: 'Welcome to Sample Post API' })
    } catch (e) {
        next(e);
    }
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    console.log('req', req, res);
    try {
        const data = await Test.deleteSampleData(id)
        res.send({ deleted: data, message: 'Welcome to Sample Post API' })
    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports = {
    create,
    update,
    getApi,
    deleteUser
};