const getResource = async(url) => {
    const responce = await fetch(url);
    if(!responce.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${responce.status}`);
    }
    return await responce.json();
};
const sendData = async(url, data) => {
    const responce = await fetch(url, {
        method: 'POST',
        body: data,
    });
    if(!responce.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${responce.status}`);
    }
    return await responce.json();
}