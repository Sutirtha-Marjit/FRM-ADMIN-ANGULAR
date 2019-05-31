///////////////////////CAROUSEL//////////////////////

var wingsureCarouselSetup = function(){

    var js = ['https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'];
    var carouselDiv = document.querySelector('div.carousel-inner');
    var paginationBase = document.querySelector('ol.carousel-indicators');
    var CarouselData = [{
            heading: 'Insurance is the solve for all of your problems',
            description: 'Please contact us for detailed info'
        },
        {
            heading: 'Achieve a superb qaulity decision-making-skill',
            description: 'Store your data efficiently, win the future problems'
        },
        {
            heading: 'Today agribulture is a complex decision matrix',
            description: 'Find the best way to grab opportunities'
        },
        {
            heading: 'Be calm, We have isurance',
            description: 'Find the best way to grow'
        },
        {
            heading: 'Be an efficient user',
            description: 'Explore opportunities from the application'
        },
        {
            heading: 'Achieve a superb qaulity decision-making-skill',
            description: 'Store your data efficiently, win the future problems'
        },
        {
            heading: 'Insurance is the solve for all of your problems',
            description: 'Please contact us for detailed info'
        }
    ];
    var tplContent, tplBtnContent, tpl = document.getElementById('tpl'),
        tplBtn = document.getElementById('tplPagButton');
    if (tpl && tplBtn) {
        CarouselData.forEach(function(data, i) {
            var p = i + 1;
            tplContent = tpl.innerHTML;
            tplContent = tplContent.replace('[HEADING]', data.heading);
            tplContent = tplContent.replace('[DESCRIPTION]', data.description);
            tplContent = tplContent.replace('[BACKGROUND]', '0' + p + '.jpg');
            carouselDiv.insertAdjacentHTML('beforeend', tplContent);
  
            tplBtnContent = tplBtn.innerHTML;
            tplBtnContent = tplBtnContent.replace('[PAGE_NO]', i);
            paginationBase.insertAdjacentHTML('beforeend', tplBtnContent);
  
        });
        carouselDiv.querySelector('div.carousel-item').classList.add('active');
  
        for (var i = 0; i < js.length; i++) {
            if(!document.getElementById('bootstrap'+i)){
                var sc = document.createElement('script');
                sc.id = 'bootstrap'+i;
                sc.setAttribute('integrity','sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM');
                sc.setAttribute('crossorigin','anonymous');
                sc.src = js[i];
                document.body.appendChild(sc);
            }
            
        }
  
    }
  
  }