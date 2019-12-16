(function(exports) { 
   
    function test (input) {
        if (input == "none") {
            return "noneReturned"
        } else if (input == "one") {
            return "oneReturned"
        }
    }
   
    exports.test = test; 
       
})(typeof exports === 'undefined'?  
            this['testexports']={}: exports); 