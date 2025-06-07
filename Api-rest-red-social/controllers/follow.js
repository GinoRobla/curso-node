const Follow = require('../models/follow');
const User = require('../models/user');

const seguir = async (req, res) => {
    const params = req.body;
    const userId = req.user.id;

    try {
        // Validar que el usuario a seguir no sea el mismo
        if (userId === params.followed) {
            return res.status(400).json({
                message: 'No puedes seguirte a ti mismo.'
            });
        }

        // Crear un nuevo seguimiento
        const follow = new Follow({
            user: userId,
            followed: params.followed
        });

        // Guardar el seguimiento en la base de datos
        const followStored = await follow.save();

        // Devolver una respuesta exitosa
        return res.status(200).json({
            message: 'Ahora sigues a este usuario.',
            follow: followStored
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al seguir al usuario.',
            error: error.message
        });
    }
}

const unfollow = async (req, res) => {
    const userId = req.user.id;
    const followedId = req.params.id;

    try {
        // Validar que el usuario a dejar de seguir no sea el mismo
        if (userId === followedId) {
            return res.status(400).json({
                message: 'No puedes dejar de seguirte a ti mismo.'
            });
        }

        // Buscar y eliminar el seguimiento
        const followRemoved = await Follow.findOneAndDelete({
            user: userId,
            followed: followedId
        });

        // Verificar si se encontró y eliminó el seguimiento
        if (!followRemoved) {
            return res.status(404).json({
                message: 'No estabas siguiendo a este usuario.'
            });
        }

        // Devolver una respuesta exitosa
        return res.status(200).json({
            message: 'Has dejado de seguir a este usuario.',
            follow: followRemoved
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al dejar de seguir al usuario.',
            error: error.message
        });
    }
}

module.exports = {
    seguir,
    unfollow
};