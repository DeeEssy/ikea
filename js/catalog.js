import { getData } from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

export const catalog = () => {
    const updateSubCatalog = generateSubCatalog();
    const btnBurger = document.querySelector('.btn-burger'),
        catalog = document.querySelector('.catalog'),
        btnCLose = document.querySelector('.btn-close'),
        subCatalog = document.querySelector('.subcatalog'),
        catalogList = document.querySelector('.catalog-list'),
        subCatalogHeader = document.querySelector('.subcatalog-header'),
        btnReturn = document.querySelector('.btn-return');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.insertAdjacentElement('beforeend', overlay);

    const closeMenu = () => {
        catalog.classList.remove('open');
        overlay.classList.remove('active');
        subCatalog.classList.remove('subopen');
    }
    const handlerCatalog = event => {
        const itemList = event.target.closest('.catalog-list__item');
        const target = event.target;
        event.preventDefault();
        if (itemList) {
            getData.subCatalog(target.textContent, (data) => {
                updateSubCatalog(target.textContent, data);
                subCatalog.classList.add('subopen');
            } );
        }
    }
    const closeSubCatalog = () => {
        subCatalog.classList.remove('subopen');
    }
    btnBurger.addEventListener('click', () => {
        catalog.classList.add('open');
        overlay.classList.add('active');
        if (catalog.classList.contains('open')) {
            overlay.addEventListener('click', event => {
                const target = event.target;
                if (target === overlay) {
                    closeMenu();
                }
            })
            document.addEventListener('keyup', event => {
                if (event.code === 'Escape') {
                    closeMenu();
                }
            })
        }
    })
    btnCLose.addEventListener('click', closeMenu);
    catalogList.addEventListener('click', handlerCatalog);
    subCatalog.addEventListener('click', (event) => {
        const returnBtn = event.target.closest('.btn-return');
        if(btnBurger) {
            closeSubCatalog();
        }
    })
}

