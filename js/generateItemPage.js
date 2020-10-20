import { getData } from './getData.js';
import userData from './userData.js';

let NEW_COUNT_ITEM = 3;

const generateItemPage = () => {
    const renderCard = (data) => {
        const { category, count, description, id, img, name, price, subcategory } = data;  
        const goodImageItem = document.querySelector('.good-image__item'),
            goodItemNew = document.querySelector('.good-item__new'),
            goodItemHeader = document.querySelector('.good-item__header'),
            goodImages = document.querySelector('.good-images'),
            goodItemDesc = document.querySelector('.good-item__description'),
            goodItemPrice = document.querySelector('.good-item__price-value'),
            goodItemEmpty = document.querySelector('.good-item__empty'),
            btnGood = document.querySelector('.btn-good'),
            btnAddWishlist = document.querySelector('.btn-add-wishlist'),
            breadcrumbLink = document.querySelectorAll('.breadcrumb__link');
        
        breadcrumbLink[0].textContent = category;
        breadcrumbLink[0].href = `goods.html?cat=${category}`;
        breadcrumbLink[1].textContent = subcategory;
        breadcrumbLink[1].href = `goods.html?subcat=${subcategory}`;
        breadcrumbLink[2].textContent = name;
        breadcrumbLink[2].href = `goods.html?cat=${name}`;

        goodItemHeader.textContent = name;
        goodItemDesc.textContent = description;
        goodItemPrice.textContent = price;
        btnGood.dataset.idd = id;
        btnAddWishlist.dataset.idd = id;
        img.forEach(item => {
            goodImages.insertAdjacentHTML('afterbegin', `
                <div class="good-image__item">
					<img src="${item}" alt="${name} - ${description}">
				</div>
            `);
        });
        if (count >= NEW_COUNT_ITEM){
            goodItemNew.style.display = 'block';
        } else if(!count || count === 0) {
            goodItemEmpty.style.display = 'block';
            btnGood.style.display = 'none';
        }

        const checkWishList = () => {
            if(userData.wishList.includes(id)) {
                btnAddWishlist.classList.add('contains-wishlist');
            } else {
                btnAddWishlist.classList.remove('contains-wishlist');
            }
        }

        btnAddWishlist.addEventListener('click', () => {
            userData.wishList = id;
            checkWishList();
        })

        btnGood.addEventListener('click', () => {
            userData.cartList = id;
        })

        checkWishList();
    };
    if (location.hash && location.pathname.includes('card')) {
        getData.item(location.hash.slice(1), renderCard);
    }
};

export default generateItemPage;