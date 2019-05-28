(function() {
  var AUTH_PATH = 'http://ec2-18-236-104-250.us-west-2.compute.amazonaws.com:8080/wingsure_dashboard-0.0.1/oauth/token';
  var EL = {
      LOGIN_FORM: document.querySelector('form[data-action="login-form"]'),
      LOGIN_BUTTON: document.querySelector('button[data-action="loginpost"]'),
      USERNAME: document.querySelector('input[data-action="username"]'),
      PASSWORD: document.querySelector('input[data-action="password"]')
  };

  var showError = function(errorDetails) {
      $('#errDesc').html(errorDetails);
      $('.alert').alert();
  };

  var formSubmission = function() {
      var loginData = new FormData();
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = function() {
          if (this.readyState === 4) {
              if (this.status === 200 || this.status === 204) {

              } else {
                  showError(this.status + ' Error: Please put proper credentials');
              }
          }
      };
      xhr.open('POST', AUTH_PATH, true);

      loginData.append('grant_type', 'password');
      loginData.append('username', EL.USERNAME.value);
      loginData.append('password', EL.PASSWORD.value);
      xhr.send(loginData);
  };

  EL.LOGIN_BUTTON.addEventListener('click', function(e) {
      e.preventDefault();
      formSubmission();

  })
  EL.LOGIN_FORM.addEventListener('submit', function(submitEvent) {

      submitEvent.preventDefault();
      formSubmission();

  });
  console.log(EL.LOGIN_FORM)



})();


///////////////////////CAROUSEL//////////////////////

(function() {

  var js = ['resources/bootstrap.min.js'];
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
          var sc = document.createElement('script')
          sc.src = js[i];
          document.body.appendChild(sc);
      }

  }

})();