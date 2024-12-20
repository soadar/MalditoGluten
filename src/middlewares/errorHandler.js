export const errorHandler = (error, req, res, next) => {
    console.log(`${error.message}`);
    const status = error.status || 404
    res.status(status).send(error.message)
}

export const isAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    else {
        console.log('Intento de acceso no autorizado')
        res.render('login', { msg: 'Iniciar sesion.', alert: 'danger' });
    }
};