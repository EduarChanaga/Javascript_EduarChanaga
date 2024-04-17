var replaceWords = function(dictionary, sentence) {
    // Divide la oración en un arreglo de palabras
    sentence = sentence.split(" ");

    // Itera a través de cada palabra en la oración
    for (let x = 0; x < sentence.length; x++) {
        // Itera a través de cada raíz en el diccionario
        for (let word of dictionary) {
            // Verifica si la palabra actual empieza con la raíz
            if (word === sentence[x].slice(0, word.length)) {
                // Reemplaza la palabra con la raíz
                sentence[x] = word;
            }
        }
    }

    // Une las palabras modificadas de nuevo en una oración
    return sentence.join(" ");
};