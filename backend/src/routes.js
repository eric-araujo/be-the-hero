/*
* Comando app.use(express.json()):
*
* Informa a aplicação que o header da requisição será um objeto JSON 
*/


/*
* Rota / Recurso
*/

/*
* Métodos HTTP:
*
* GET: Buscar/listar uma informação do back-end
* POST: Criar informação do back-end
* PUT: Alterar uma informação no back-end
* DELETE: Deletar uma informação do servidor
*/

/*
* Tipos de parâmetros:
*
* Query: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação).
* Ex: /users?name=Eric&aula=X
* 
* Route Params: Parâmetros utilizados para identificar recursos.
* Ex: /users/:id
* 
* Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create);

routes.get('/incident', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}),IncidentController.index);

routes.post('/incident', IncidentController.create);

routes.delete('/incident/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}),IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

module.exports = routes;