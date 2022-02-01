let mobileMenu = document.querySelector('.open-menu');
let wrapper = document.querySelector('.wrapper');
let out = document.querySelector('.out-block');
mobileMenu.addEventListener('click',function(){
	wrapper.classList.toggle('wrapper--open-menu');
  out.classList.toggle('active');
});


    
   
const instr = new Swiper('.instrument2', {
    slidesPerView: 4,
        centeredSlides: false,
        spaceBetween: 30,
        grabCursor: true,
    	navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          425: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
});


