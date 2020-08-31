export const handleError = (res, e) => {
    if (e.isJoi) {
        res.status(400).json({ message: e.message });
    } else {
        res.status(500).json({ message: e.message });
    }
};

export const getStoreMatch = (store, value, key) => store.find(item => item[key] === value);

export const getIndexStoreMatch = (store, value, key) => store.findIndex(item => item[key] === value);
