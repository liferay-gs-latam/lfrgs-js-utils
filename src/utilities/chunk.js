"use strict";

(function () {
    
    const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      exports = module.exports = chunk;
    }
    exports.chunk = chunk;
  } else {
    this.chunk = chunk;
  }
  
}.call(this));