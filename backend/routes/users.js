var express = require('express');
var router = express.Router();
var models = require('../models')
const Sequelize = require("sequelize");
var { Response } = require('../helpers/utils');
const e = require('express');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const { name, phone, page } = req.query

    const Op = Sequelize.Op;

    const params = []

    if (name) {
      const limit = 3
      const offset = (page - 1) * limit

      const total = await models.User.count()
      const pages = Math.ceil(total / limit)

      let users = await models.User.findAll({
        limit,
        offset,
        where: {
          name: {
            [Op.like]: `%${name}%`
          },
        }
      });
      params.push({
        users,
        page: Number(page),
        pages
      })
    }

    if (phone) {
      const limit = 3
      const offset = (page - 1) * limit

      const total = await models.User.count()
      const pages = Math.ceil(total / limit)

      let users = await models.User.findAll({
        limit,
        offset,
        where: {
          phone: {
            [Op.like]: `%${phone}%`
          },
        }
      });
      params.push({
        users,
        page: Number(page),
        pages
      })
    }

    if (!name, !phone) {

      const limit = 3
      const offset = (page - 1) * limit

      const total = await models.User.count()
      const pages = Math.ceil(total / limit)

      const users = await models.User.findAll({
        limit,
        offset,
      })
      params.push({
        users,
        page: Number(page),
        pages
      })
    }
    res.json(new Response(params[0]))
  } catch (err) {
    res.json(new Response(err, false))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const user = await models.User.create(req.body)
    res.json(new Response(user))
  } catch (err) {
    res.json(new Response(err, false))
  }
});


router.put('/:id', async function (req, res, next) {
  try {
    const user = await models.User.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    res.json(new Response(user[1]))
  } catch (err) {
    res.json(new Response(err, false))
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await models.User.destroy({
      where: {
        id: req.params.id
      },
    })
    res.json(new Response(user))
  } catch (err) {
    res.json(new Response(err, false))
  }
});

module.exports = router;
