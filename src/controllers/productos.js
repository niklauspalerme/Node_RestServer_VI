/////////////////////////////////////////////////////////////
// Importaciones

const { Productos } = require("../models/producto");



/////////////////////////////////////////////////////////////
// Funciones del Comtrolador - Categoria


//#1
const obtenerProductos = async (req,res) => {


    console.log("GET /api/productos");

    const { page = '0', limit = '5', to = 0 , estado = true} = req.query

    const [total,productos] = await Promise.all([
        Productos.countDocuments({estado}),
        Productos.find({estado}).skip(to).limit(limit).populate('usuario', 'nombre').populate('categoria', 'nombre')

    ]);

    res.status(200).json({
        "Message": "GET /api/productos",
        total,
        productos
    });

}


//#2
const obtenerProducto = async (req,res) =>{

    try {

        const {id} = req.params

        const producto = await Productos.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

        res.status(200).json({
            "Message": "GET /api/productos/:id",
            producto
        });
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error"
        });

    }
}

//#3
const crearProducto = async (req,res)=>{

    try {

        const {nombre, ...body} = req.body


        const productoDB = await Productos.findOne({nombre})

        if (productoDB){
            return  res.status(400).json({
                msg: 'The Product already exists on the DB. Please try with another one.'
            })
        }

        const data = {
            nombre: nombre.toUpperCase(),
            usuario: req.usuario._id,
            ...body
        }

        const producto = new Productos (data); 
        await producto.save();

        res.status(201).json({
            msg: 'POST /api/productos',
            producto
        })

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
        
    }
}


//#4
const actualizarProducto = async (req,res) =>{

    console.log('PUT /api/pruductos/:id');

    const {id}= req.params;
    const {estado, usuario, ...data} = req.body;

    if (data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Productos.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({
        msg: "PUT /api/productos/:id",
        producto
    })



}


const borrarProducto = async (req,res) =>{

    console.log('DELETE /api/producto/:id');

    const {id}= req.params;

    const productoBorrado = await Productos.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(200).json({
        msg: "DELETE /api/productos/:id",
        productoBorrado
    })

}





/////////////////////////////////////////////////////////////
// Exportaciones


module.exports={
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}