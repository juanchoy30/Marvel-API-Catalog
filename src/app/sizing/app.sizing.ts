export function changeSizePagination(arg: any) {
    let size: any;
    let maxNumber: any;
    if (arg <= 375) { 
        size = 'sm';
        maxNumber = 5;
      } else if (arg <= 425) {
        size = 'md';
        maxNumber = 5;
      } else if (arg <= 768) {
        size = 'md';
        maxNumber = 10;
      } else if (arg <= 1024) {
        size = 'md';
        maxNumber = 15;
      } else if (arg <= 1440) {
        size = 'md';
        maxNumber = 20;
      }
      let results = [size, maxNumber];
      return results
}

export function changeSizeCarousel( arg:any, counter:any) {
    let carouselClass: any;
    let shownNumber: any;
    let forNumber: any;

    if (arg <= 767) {   //Screen Size
        carouselClass = 'card-container d-flex justify-content-around col-12';
        shownNumber = 1;
        forNumber = 0;
      } else {
        if (counter === 2) {
          if (arg <= 1440 || arg > 1400) {
            carouselClass = 'card-container d-flex justify-content-around col-6';
            shownNumber = counter
            forNumber = counter-1;
          }
        } else if (counter === 3) {
          if (arg <= 991) {
            carouselClass = 'card-container d-flex justify-content-around col-6';
            shownNumber = counter-1;
            forNumber = counter-2;
          } else if (arg <= 1199 || arg > 1199) {
            carouselClass = 'card-container d-flex justify-content-around col-md-4';
            shownNumber = counter;
            forNumber = counter-1;
          }
        } else {
          if (arg <= 991) {
            carouselClass = 'card-container d-flex justify-content-around col-6';
            shownNumber = 2;
            forNumber = 1;
          } else if (arg <= 1199) {
            carouselClass = 'card-container d-flex justify-content-around col-4';
            shownNumber = 3;
            forNumber = 2;
          }else if (arg <= 1440 || arg > 1400) {
            carouselClass = 'card-container d-flex justify-content-around col-3';
            shownNumber = 4;
            forNumber = 3;
           }
        }
    }
    let results = [carouselClass, shownNumber, forNumber];
    return results;
}