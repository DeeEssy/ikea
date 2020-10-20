import { getData } from './getData.js'
import userData from './userData.js';
let COUNTER = 3;
const generateGoodsPage = () => {
    const mainHeader = document.querySelector('.main-header'),
        goodsList = document.querySelector('.goods-list');
    const generateCards = (data) => {
        goodsList.textContent = '';
        if(!data.length){
            const goods = document.querySelector('.goods');
            goods.textContent = location.search === '?wishlist' ? 
            'Ваш список желаний пуст' : 'К сожалению по вашему запросу ничего не найдено';
        }
        data.forEach(item => {
            goodsList.insertAdjacentHTML('afterbegin', `
                <li class="goods-list__item">
					<a class="goods-item__link" href="card.html#${item.id}">
						<article class="goods-item">
							<div class="goods-item__img">
								<img src="${item.img}"
									 data-second-image="https://www.ikea.com/ru/ru/images/products/fabler-byorn-myagkaya-igrushka-bezhevyy__0876876_PE611263_S5.JPG" alt="ФАБЛЕР БЬЁРН">
							</div>
                            ${item.count > COUNTER ?'<p class="goods-item__new">Новинка</p>': ''}
                            ${!item.count || item.count === 0  ?'<p class="goods-item__new">Нет в наличии</p>': ''}
							<h3 class="goods-item__header">${item.name}</h3>
							<p class="goods-item__description">${item.description}</p>
							<p class="goods-item__price">
								<span class="goods-item__price-value">${item.price}</span>
								<span class="goods-item__currency"> ₽</span>
							</p>
							<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${item.id}"></button>
						</article>
					</a>
				</li>
            `);
        });
        goodsList.addEventListener('click', event => {
            const btnAddCard = event.target.closest('.btn-add-card');
            if (btnAddCard) {
                event.preventDefault();
                userData.cartList = btnAddCard.dataset.idd;
            }
        })
    }

    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search);
        const prop = search.split('=')[0].slice(1);
        const value = search.split('=')[1];
        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск по: ${value}`;
        } else if (prop === 'wishlist') {
            getData.wishList(userData.wishList, generateCards);
            mainHeader.textContent = 'Список желаний';
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    }
}
export default generateGoodsPage;