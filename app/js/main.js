!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);


document.addEventListener('DOMContentLoaded', function() {

   //Modal
   var modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay      = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');

   modalButtons.forEach(function(item){

      /* Назначаем каждой кнопке обработчик клика */
      item.addEventListener('click', function(e) {

         /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
         e.preventDefault();

         /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
         var modalId = this.getAttribute('data-modal'),
             modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');


         /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
         modalElem.classList.add('active');
         overlay.classList.add('active');
      }); // end click

   }); 

   closeButtons.forEach(function(item){

      item.addEventListener('click', function(e) {
         var parentModal = this.closest('.modal');

         parentModal.classList.remove('active');
         overlay.classList.remove('active');
      });

   }); 

    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;

        if (key == 27) {

            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);


    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });

   // Якоря
   const anchors = document.querySelectorAll('a.scroll-to');

   for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const blockID = anchor.getAttribute('href');
      
      document.querySelector(blockID).scrollIntoView({
         behavior: 'smooth',
         block: 'start'
      });
      });
   }
   //Mobile-menu
   const burger = document.querySelector('.header__menu_burger');
   const menu = document.querySelector('.header__list');

   burger.addEventListener('click', function(e){
      e.preventDefault;
      burger.classList.toggle('active');
      menu.classList.toggle('open');  
   });

   //slider-skills
   const swiper = new Swiper('.swiper', {
            slidesPerView: 1,
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
         breakpoints: {
            640: {
            slidesPerView: 2,
            },
            768: {
            slidesPerView: 2,
            },
            1024: {
            slidesPerView: 3,
            },
         },
      
   });

   //Ajax-send

   const ajaxSend = async (formData) => {
      const fetchResp = await fetch('/mail.php', {
          method: 'POST',
          body: formData
      });
      if (!fetchResp.ok) {
          throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
      }
      return await fetchResp.text();
  };

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
      form.addEventListener('submit', function (e) {
          e.preventDefault();
          const formData = new FormData(this);

          ajaxSend(formData)
              .then((response) => {
                  console.log(response);
                  form.reset(); // очищаем поля формы 
              })
              .catch((err) => console.error(err))
      });
  });

}); // end ready


 