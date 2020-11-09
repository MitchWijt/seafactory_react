export const parseArrayToSelectValues = (array, specificKeyValueDoc = null, specificValueDoc = null) => {
    return array.map((value) => {
        let keyValue = specificKeyValueDoc ? value[specificKeyValueDoc] : value;
        let dataValue = specificValueDoc ? value[specificValueDoc] : value;

        let selectObject = {};
        selectObject[keyValue] = dataValue;
        return selectObject;
    })
}