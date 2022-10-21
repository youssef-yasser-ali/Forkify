import View from './View';
import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandelerClick(hundler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTopage = +btn.dataset.goto;
      hundler(goTopage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.result.length / RES_PER_PAGE);
    let currentPage = this._data.page;
    // Page 1, and there other pages

    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupNext(currentPage);
    }
    // Last page

    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupPrev(currentPage);
    }
    // other pages
    if (this._data.page < numPages) {
      const markup =
        this._generateMarkupPrev(currentPage) +
        this._generateMarkupNext(currentPage);

      return markup;
    }
    // Page 1, and there are No other pages
    return ` `;
  }

  _generateMarkupNext(currentPage) {
    return `         <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button> `;
  }
  _generateMarkupPrev(currentPage) {
    return `<button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
  }
}

export default new PaginationView();
