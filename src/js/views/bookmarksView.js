import View from './View';
import icons from 'url:../../img/icons.svg';
import previwView from './previwView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet, find a nice recipe and bookmark it ;)`;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previwView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
