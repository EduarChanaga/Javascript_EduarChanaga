
var longestCommonPrefix = function(strs) {
    // Verifica si el arreglo de cadenas está vacío
    if (strs.length === 0) {
        return '';
    }

    // Inicializa una variable para almacenar el prefijo común más largo
    let prefix = strs[0];

    // Itera a través de las demás cadenas en el arreglo
    for (let x = 1; x < strs.length; x++) {
        // Mientras no se encuentre el prefijo común en la cadena actual
        while (strs[x].indexOf(prefix) !== 0) {
            // Reduce el tamaño del prefijo eliminando el último caracter
            prefix = prefix.substring(0, prefix.length - 1);

            // Si el prefijo se reduce a una cadena vacía, no hay prefijo común
            if (prefix === '') {
                return '';
            }
        }
    }

    // Devuelve el prefijo común más largo encontrado
    return prefix;
};
