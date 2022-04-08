'use strict';
window.addEventListener(`DOMContentLoaded`, () => {

    let tabs = document.querySelectorAll(`.tabheader__item`),
        tabsContent = document.querySelectorAll(`.tabcontent`),
        tabsParent = document.querySelector(`.tabheader__items`);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = `none`;
        });

        tabs.forEach(item => {
            item.classList.remove(`tabheader__item_active`);

        });


    };

    function showTabContent(i = 0) {
        tabsContent[i].style.display = `block`;
        tabs[i].classList.add(`tabheader__item_active`);
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener(`click`, (event) => {
        let target = event.target;

        if (target && target.classList.contains(`tabheader__item`)) {

            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                    console.log(`done1`);
                }
            });

        };
    })

    //timer

    const deadline = `2022-05-11`;

    function getTimeRemaining(endtime) {
        const
            t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,

        };
    };

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num
        };

    };

    function setCloack(selector, endtime) {
        let
            timer = document.querySelector(selector),
            days = timer.querySelector(`#days`),
            hours = timer.querySelector(`#hours`),
            minutes = timer.querySelector(`#minutes`),
            seconds = timer.querySelector(`#seconds`),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);


            if (t.total <= 0) {
                clearInterval(timeInterval);
            };

        };

    };

    setCloack(`.timer`, deadline);

    //modal

    const modalTrigger = document.querySelectorAll(`[data-modal]`),
        modal = document.querySelector(`.modal`);

    function openModal() {
        modal.classList.add(`show`);
        modal.classList.remove(`hide`);
        document.body.style.overflow = `hidden`;
        clearInterval(modalTimerId);
    };

    modalTrigger.forEach(btn => {
        btn.addEventListener(`click`, () => {
            // modal.classList.add(`show`);
            // modal.classList.remove(`hide`);
            modal.classList.toggle(`show`);
            document.body.style.overflow = `hidden`;

        });

    });

    function closeModal() {
        modal.classList.toggle(`show`);
        document.body.style.overflow = ``;

    }




    modal.addEventListener(`click`, (e) => {
        if (e.target === modal || e.target.getAttribute(`data-close`) == ``) {
            closeModal();
        }
    })

    document.addEventListener(`keydown`, (e) => {
        if (e.code === `Escape` && modal.classList.contains(`show`)) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.clientHeight);
        openModal();
        window.removeEventListener(`scroll`, showModalByScroll);
    }






    //ЗДЕСЬ С ПОМОЩЬЮ КЛАССОВ СДЕЛАННЫЕ КАРТОЧКИ 


    class Card {
        constructor(src, alt, title, descripthion, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descripthion = descripthion;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
        }

        changeToUAH() {
            this.price = this.price * this.transfer;

        }
        render() {
            let element = document.createElement(`div`);
            element.innerHTML = `<div class="menu__item">
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descripthion}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    </div>`;
            this.parent.append(element)

        }

    }

    new Card(`img/tabs/vegy.jpg`,
        `Меню "Фитнес"`,
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
 овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
 ценой и высоким качеством!`,
        `20`, `.menu .container`).render();

    new Card(`img/tabs/elite.jpg`,
        `elite`,
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но
 и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
 в ресторан!`,
        `5`, `.menu .container`).render();

    new Card(`img/tabs/post.jpg`,
        `post`,
        `Меню "Постное"`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
 продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
 количество белков за счет тофу и импортных вегетарианских стейков.`,
        `6`, `.menu .container`).render();


    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы скоро свяжемся с вами...',
        failure: 'Что-то пошло не так'

    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessege = document.createElement('div');
            statusMessege.classList.add('status');
            statusMessege.textContent = message.loading;
            form.append(statusMessege);


            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');


            const formData = new FormData(form);


            request.send(formData);
            console.log(formData);
            console.log(request.status);
            console.log(request);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });



            const json = JSON.stringify(object);

            request.open(json);

            request.send(json);

            request.addEventListener(`load`, () => {
                console.log(request.status);

                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessege.remove();
                    console.log(request.status);

                } else {
                    showThanksModal(message.failure);
                    console.log(request.status);

                }
            })
        });
    }

    function showThanksModal(message) {
        const prevModaldialog = document.querySelector(`.modal__dialog`);

        prevModaldialog.classList.add(`hide`);
        openModal();

        const thanksModal = document.createElement(`div`);
        thanksModal.classList.add(`modal__dialog`);
        thanksModal.innerHTML = `
                <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
                </div>`;

        document.querySelector(`.modal`).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModaldialog.classList.add(`show`);
            prevModaldialog.classList.remove(`hide`);
            closeModal();
        }, 4000);

    }
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json));
    //slider

    const slides = document.querySelectorAll(`.offer__slide`),
        prev = document.querySelector(`.offer__slider-prev`),
        next = document.querySelector(`.offer__slider-next`);
    let slideIndex = 1;

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = `none`);

        slides[slideIndex - 1].style.display = `block`;
    };

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener(`click`, ()=>{
        plusSlides(1);
    });
});