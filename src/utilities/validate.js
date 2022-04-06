export const isNamespaceValueInvalid = (v) => {
  if (!v) {
    return true;
  }
  return (v.length < 3 || v.length > 20) ? true : null;
}

export const isKeyValueInvalid = (v) => {
  if (!v) {
    return true;
  }
  return (v.length < 3 || v.length > 30) ? true : null;
}

export const isDescriptionInvalid = (v) => {
  if (v && v.length > 255) {
    return true
  }
  return null
}

export const isRequired = (v) => {
  if (!v) {
    return true
  }
  return null
}

export const isURL = (v) => {
  return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(v) ? true : null
}