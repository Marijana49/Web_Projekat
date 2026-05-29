function SaveValueByKey(key, value){
    try{
        localStorage.setItem(key, value);
        return true;
    } catch(error){
        console.error(`Greška pri čuvanju u localStorage za ključ: ${key}`, error);
        return false;
    }
}

function GetValueByKey(key){
    try{
        return localStorage.getItem(key);
    } catch(error){
        console.error(`Greška pri čitanju iz localStorage za ključ: ${key}`, error);
        return null;
    }
}

function DeleteValueByKey(key){
    try{
        localStorage.removeItem(key);
        return true;
    } catch(error){
        console.error(`Greška pri brisanju iz localStorage za ključ: ${key}`, error);
        return false;
    }
}

export { SaveValueByKey, GetValueByKey, DeleteValueByKey}