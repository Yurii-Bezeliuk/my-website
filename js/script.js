"use strict"

window.addEventListener('load', load)

function load() {
   /* Перевірка мобільного браузера */
   const isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
   /* Додавання класу touch для HTML, якщо браузер мобільний */
   function addTouchAttr() {
      // Додавання data-fls-touch для HTML, якщо браузер мобільний
      if (isMobile.any()) document.documentElement.setAttribute('data-fls-touch', '')
   }

   addTouchAttr()
   document.addEventListener('click', documentActions)
   function documentActions(e) {
      const targetElement = e.target;
      if (isMobile.any()) {
         if (targetElement.closest('.menu-action')) {
            // Додаємо атрибут всьому документу
            document.documentElement.toggleAttribute('data-menu-open');
         }
      }
   }

   const accordion = document.getElementById('accordion');

   document.addEventListener('click', function (e) {
      const targetElement = e.target; // Тепер targetElement визначений через подію
      const footerTitle = targetElement.closest('.up-footer__title');

      if (footerTitle) {
         const curentElement = footerTitle.nextElementSibling;

         if (window.innerWidth <= 577) {
            curentElement.toggleAttribute('data-footer-menu-open');
            footerTitle.toggleAttribute('data-open')
            if (curentElement.hasAttribute('data-footer-menu-open')) {
               // ВІДКРИТТЯ:
               curentElement.style.height = 'auto';
               const curentElementHeight = curentElement.offsetHeight;

               curentElement.style.height = '0px';
               curentElement.offsetHeight;

               curentElement.style.height = `${curentElementHeight}px`;
            } else {
               // ЗАКРИТТЯ:
               curentElement.style.height = '0px';
            }
         }
      }
   });
   // --- КІНЕЦЬ БЛОКУ КЛІКУ ---

   function initFooterMenus() {
      const footerMenus = document.querySelectorAll('.up-footer__list')
      if (footerMenus.length) {
         const matchMedia = window.matchMedia(`(width <=34.375em)`)

         // Виправлено: передаємо стан у функцію
         matchMedia.addEventListener('change', function () {
            setFooterMenus(matchMedia.matches)
         })

         function setFooterMenus(isMatches) {
            footerMenus.forEach(footerMenu => {
               if (isMatches) {
                  footerMenu.style.cssText = `height:0; overflow:hidden;`
               } else {
                  footerMenu.style.cssText = ``
               }
            })
         }
         setFooterMenus(matchMedia.matches)
      }
   }
   initFooterMenus()


}


