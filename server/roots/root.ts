import Router from "express";
import crudController from "../controllers/crudController.js"

const router = Router()

router.get('/users', (req, res) => {
    res.end("Hello world")
})

router.get('/user/:id')

router.post('/', (req, res) => {

})

router.put('/', (req, res) => {

})

router.delete('/user/:id')

export default router
