const ping = async (req, res, next) => {
    try {
        res.send('API Active');
    } catch (e) {
        next(e);
    }
}

export default {
    ping
}
