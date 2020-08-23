export const handleError = (res, e) => {
    if (e.isJoi) {
        res.status(422).json({message: e.message});
    } else {
        res.status(500).json({message: e.message});
    }
};

export const getLoginMatch = (store, login) => (Object.values(store).find(item => item.login === login));

