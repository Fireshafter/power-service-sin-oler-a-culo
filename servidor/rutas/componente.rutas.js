const express = require('express')
const router = express.Router()

const componente = require('../controladores/componente.controlador')


router.get('/', componente.getComponentes)

router.get('/main', componente.getMainComponentes)

router.get('/byname', componente.getComponenteByName)

router.get('/marcas', componente.getMarcas)

router.put('/:id', componente.editarComponente)

router.put('/stock/:id', componente.editarStock)

router.post('/', componente.crearComponente)

router.delete('/:id', componente.eliminarComponente)

module.exports = router