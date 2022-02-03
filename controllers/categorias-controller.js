const Categoria = require("../models/categoria");


//Get categorias paginado -total -populate TODO
const categoriasGet = async (req , res ) => {

    const { limite = 5, desde = 0 } = req.query;//Para ponerle limite de getters
    const queryEstado = { estado: true };//Solo retorno lo que tenga estado true

    const [total, categorias] = await Promise.all([ //Desestructuro lo que me vanga del promise.all
        Categoria.countDocuments(queryEstado),//1er elemento del array desestructurado
        Categoria.find(queryEstado)//2do elemento del array desestructurado
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });
}

//Get categoria - TODO populate regresa el objeto de la categoria

const categoriasGetById = async (req , res ) => {

    const _id = req.params.id;
    const categoria = await Categoria.findById({_id}).populate('usuario', 'nombre')

    res.json({
        categoria
    });
}

const categoriasPost = async (req, res ) => {


    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});

    //validar que la categoria no exista
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    };


    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    //Guardar en DB
    const categoria = new Categoria(data);
    await categoria.save();// aca gaurdo en la base

    res.status(201).json({

        categoria//recibo lo que mando el cliente

    });
}


// Put categoria
const categoriasPut = async (req, res) => {

    const _id = req.params.id;
    const { estado, usuario, ...resto } = req.body;// recibo lo que me pase por el url  com parametr( despues del"?")
    
    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id; //traigo el nombre del usuario que realizo el cambio

    const categoria = await Categoria.findByIdAndUpdate(_id, resto, {new:true});//1er arg el id, 2do lo que quiero actualizar y 3ero que el nuevo archivo sea mostrado


    res.json({
        categoria
    });
}


// Delete categoria
const categoriasDelete = async (req, res) => {

    const _id = req.params.id;

    const categoria = await Categoria.findByIdAndUpdate(_id, { estado: false }, {new:true} );


    res.json({
        categoria
    });
}


module.exports = {
    categoriasPost,
    categoriasGet,
    categoriasGetById,
    categoriasPut,
    categoriasDelete
};