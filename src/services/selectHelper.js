export const parseArrayToSelectValues = (array, specificKeyValueDoc = null, specificValueDoc = null) => {
  return array.map((value) => {
    const keyValue = specificKeyValueDoc ? value[specificKeyValueDoc] : value
    const dataValue = specificValueDoc ? value[specificValueDoc] : value

    const selectObject = {}
    selectObject[keyValue] = dataValue
    return selectObject
  })
}
