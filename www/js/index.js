var index = {};

index.db = false;

index.loadComponents = function(){
    index.btnNew = $('#btnNew');
    index.btnList = $('#btnList');
    index.btnExit = $('#btnExit');
    index.divNewBook = $('#newBook');
    index.divBookList = $('#bookList');
    index.btnSave = $('#btnSave');
    index.btnCancel = $('#btnCancel');
    index.bookForm = $('#bookForm');
    
    index.bookAuthor = $('#author');
    index.bookBook = $('#book');
    index.bookEditor = $('#editor');
    index.bookPages = $('#pages');
};

index.init = function() {
    index.loadComponents();
    index.btnNew.on('click', index.newBook);
    index.btnList.on('click', index.bookList);
    index.btnExit.on('click', index.exit);
    
    index.btnSave.on('click', index.bookSave);
    index.btnCancel.on('click', index.bookCancel);
};

index.newBook = function(){
    index.divNewBook.attr('hidden', false);
    index.divBookList.attr('hidden', 'hidden');
};

index.bookSave = function(){
    
    var book = { "author":index.bookAuthor.val()
                ,"book":index.bookBook.val()
                ,"editor":index.bookEditor.val()
                ,"pages":index.bookPages.val() };
    
    sgdb.insert(book);
    index.bookCancel();
};

index.bookCancel = function(){
    index.bookForm[0].reset();
};

index.bookList = function(){
    index.divNewBook.attr('hidden', 'hidden');
    index.divBookList.attr('hidden', false);
    sgdb.selRows();
};

index.exit = function(){
    navigator.app.exitApp();
};

$( document ).ready(function() {
    if(sgdb.getopenDb()) {
        sgdb.db = sgdb.createTable();
        index.init();
    } else {
        alert('No database connection');
        index.exit();
    }
});