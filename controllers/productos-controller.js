const { body } = require("express-validator");
const Producto = require("../models/producto");


//Get categorias paginado -total -populate TODO
const productosGet = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;//Para ponerle limite de getters
    const queryEstado = { estado: true };//Solo retorno lo que tenga estado true

    const [total, productos] = await Promise.all([ //Desestructuro lo que me vanga del promise.all
        Producto.countDocuments(queryEstado),//1er elemento del array desestructurado
        Producto.find(queryEstado)//2do elemento del array desestructurado
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}

//Get categoria - TODO populate regresa el objeto de la categoria

const productosGetById = async (req, res) => {

    const _id = req.params.id;
    const productos = await Producto.findById({ _id })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json({
        productos
    });
}

const productosPost = async (req, res) => {//necesito enviarle el id de categoria para popoularlo


    const {estado, usuario, ...resto} = req.body;
    const productoDB = await Producto.findOne({ nombre: resto.nombre });

    //validar que la categoria no exista
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    };


    //Generar la data a guardar
    const data = {
        ...resto,
        nombre: resto.nombre.toUpperCase(),
        usuario: req.usuario._id //este id es para popularlo
    }

    //Guardar en DB
    const productos = new Producto(data);
    await productos.save();// aca gaurdo en la base

    res.status(201).json({

        productos//recibo lo que mando el cliente

    });
}


// Put categoria
const productosPut = async (req, res) => {

    const _id = req.params.id;
    const { estado, usuario, ...resto } = req.body;// recibo lo que me pase por el url  com parametr( despues del"?")

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id; //traigo el nombre del usuario que realizo el cambio

    const productos = await Producto.findByIdAndUpdate(_id, resto, { new: true });//1er arg el id, 2do lo que quiero actualizar y 3ero que el nuevo archivo sea mostrado


    res.json({
        productos
    });
}


// Delete categoria
const productosDelete = async (req, res) => {

    const _id = req.params.id;

    const productos = await Producto.findByIdAndUpdate(_id, { estado: false }, { new: true });


    res.json({
        productos
    });
}


module.exports = {
    productosPost,
    productosGet,
    productosGetById,
    productosPut,
    productosDelete
};