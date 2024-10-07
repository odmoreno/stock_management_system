import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    try {
        // findOne se usa cuando hay un  where
        const products = await Product.findAll({
            order: [
                ['id', 'DESC']
            ]
            //, attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
            //,limit : 2
        })
        res.json({ data: products })
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                "error": "Producto no encontrado"
            })
        }

        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {
    //validacion se puede anidar condiciones
    //await check('name')
    //    .notEmpty().withMessage("EL nombre del producto no puede ir vacio")
    //    .run(req)
    //await check('price')
    //    .isNumeric().withMessage('Valor no valido')
    //    .notEmpty().withMessage("EL precio del producto no puede ir vacio")
    //    .custom(value => value > 0).withMessage("Precio no valido")
    //    .run(req)
    try {
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    // Actualizar
    await product.update(req.body)
    await product.save()
    res.json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    // Actualizar
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    //console.log('delete:', product)
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    await product.destroy()
    res.json({ data: 'Producto Eliminado' })
}
