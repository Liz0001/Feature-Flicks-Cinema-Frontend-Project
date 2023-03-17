

export function kebabify(str) {

  return str
    .toLowerCase()
    .normalize("NFD")         // convert 
    .replace(/\p{Diacritic}/gu, "")  // remove diacritics
    .replace(/\s/g, "-")
    .replace(/[^\w-]/g, "")
}