Object.defineProperty(global, 'oomsArray', {
    get: function() { 
        delete roomsArray;
    }
});