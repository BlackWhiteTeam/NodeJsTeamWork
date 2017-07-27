const getIdByUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
};

module.exports = { getIdByUrl };
