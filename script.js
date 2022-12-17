const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

function showModal(){
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

function hideModal(){
  modal.classList.remove('show-modal');
}

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', hideModal);
window.addEventListener('click', (e) => (e.target === modal) ? hideModal() : false);

function validateForm(nameValue, urlValue){
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if(!nameValue || !urlValue){
    alert('Please submit values for both fields');
    return false;
  }
  if (!urlValue.match(regex)){
    alert("Something is wrong with your link. Please check it again");
    return false;
  }
  return true;
}

function deleteBookmark(url){
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url){
      bookmarks.splice(i, 1);
    }
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

function buildBookmarks(){
  bookmarkContainer.textContent = '';
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    //Item
    const item = document.createElement('div');
    item.classList.add('item');
    //Close icon button
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-solid', 'fa-xmark', 'item-close-icon');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    //Info about bookmark
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    //favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'favicon');
    //url
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name; 
    //appending everything
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarkContainer.appendChild(item);
  });
}

function fetchBookmarks(){
  if (localStorage.getItem('bookmarks')){
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    bookmarks = [
      {
        name: 'My Shikimori',
        url: 'https://shikimori.one/praesidi',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

function storeBookmark(e){
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('https://') && !urlValue.includes('http://')){ 
    urlValue = `https://${urlValue}`;
  }
  if (!validateForm(nameValue, urlValue)){
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

bookmarkForm.addEventListener('submit', storeBookmark);

fetchBookmarks();
