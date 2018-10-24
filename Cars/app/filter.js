'use strict';

app.filter('madeBy', function () {
    return function (x, selectedCar) {
        let xFiltered=[];

        x.forEach((elem)=> {
            if(elem.make===selectedCar){
                xFiltered.push(elem)}
                if(selectedCar===''){
                    xFiltered = x;
                }


        });
        return xFiltered
    }
});