const chunk = function(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, 
        function(v, i) {
            return arr.slice(i * size, i * size + size);
        }
    );
}

export default chunk;