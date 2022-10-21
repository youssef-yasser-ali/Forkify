import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
//
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from './config.js';

// import { search } from 'core-js/fn/symbol';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // 0) update  result to mark  selected search result
    resultView.update(model.getSearchResultPage());
    // 1)  Updating bookmarks view to mark seleced bookmark
    bookmarksView.render(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErorr();
  }
};

const controlSearchResult = async function () {
  try {
    // 1 ) get search query

    resultView.renderSpinner();
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;

    //  2 ) Load search results
    await model.loadSearchResults(query);

    // 3 ) render the result

    resultView.render(model.getSearchResultPage());

    // 4) render the inittial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultView.renderErorr();
  }
};

const controlPagination = function (goToPage) {
  // render new results
  resultView.render(model.getSearchResultPage(goToPage));
  // render  pagination btn
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state )

  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);

  //
};

const controlAddBookMark = function () {
  // 1 ) add  / remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //  2) Update recipe view

  recipeView.update(model.state.recipe);

  // 3 )  Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookMarks = function () {
  //  3 ) render the book marks
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // up load Recipe

    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // sucsses message

    addRecipeView.renderMessage();

    // Render book mark view
    bookmarksView.render(model.state.bookmarks);

    // Change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //  close form window

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderErorr(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookMark);
  searchView.addHandelerSearch(controlSearchResult);
  paginationView.addHandelerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookMarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
