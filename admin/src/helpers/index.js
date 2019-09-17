
export function getMissingItemsFrom(data, property = '') {
    let result = [];
    Object.keys(data).map(key => {
        if(data[key].type === 1 && data[key].ready === false){
            result.push(property + '.' + key);
        }
    });
    return result;
}

export function getLanguagesFromStorage(Storage){
    return new Promise((resolve, reject) => {
        try{
            Storage.set('_app:language:data', JSON.stringify({
                keywords,
                languages,
                current,
                date: Date.now()
            }));
            resolve();
        }catch(error){
            reject(error);                
        }
    })
}