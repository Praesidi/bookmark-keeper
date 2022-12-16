const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmarks-container');

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
}

bookmarkForm.addEventListener('submit', storeBookmark);
