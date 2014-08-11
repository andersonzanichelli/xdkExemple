var sgdb = {};

sgdb.db = false;

sgdb.getopenDb = function() {
    try {
        if (window.openDatabase) {                    
            return window.openDatabase;                    
        } else {
            alert('No HTML5 support');
            return undefined;
        }
    }
    catch (e) {
        alert(e);
        return undefined;
    }            
};

sgdb.createTable = function() {
    var openDB = sgdb.getopenDb();
    if(!openDB) {
        return;
    } else {
        sgdb.db = openDB('database', '1.0', 'mydb', 2*1024*1024);
        sgdb.db.transaction(function (t) {
            t.executeSql('CREATE TABLE IF NOT EXISTS myTable('
                         + '  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT'
                         + ', author TEXT NOT NULL'
                         + ', book TEXT NOT NULL'
                         + ', editor TEXT NOT NULL'
                         + ', pages INT NOT NULL);', [], null, null);
        });
        
        sgdb.selRows();
        return sgdb.db;
    }            
};

sgdb.selRows = function() {
    
    var q = "select * from myTable";
    
    sgdb.db.transaction(function (t) {
        t.executeSql(q, null, function (t, data) {
            //console.log(data);
            var html = "<table>"
                            +"<thead>"
                                + "<tr>"
                                    +"<td style='display:none'>ID</td>"
                                    +"<td>Author</td>"
                                    +"<td>Book</td>"
                                    +"<td>Editor</td>"
                                    +"<td>Pages</td>"
                                +"</tr>"
                        +"</thead>"
                        +"<tbody>";
            
            for (var i = 0; i < data.rows.length; i++) {
                var line = '';
                if((i % 2) === 0) {
                    line = 'even';
                } else {
                    line = 'odd';
                }

                  html += "<tr class='"+line+"'><td style='display:none'>" + 
                  data.rows.item(i).id + "</td><td>" +
                  data.rows.item(i).author + "</td><td>" +
                  data.rows.item(i).book + "</td><td>" +
                  data.rows.item(i).editor + "</td><td  style='align-text: right'>" +
                  data.rows.item(i).pages + "</td></tr>";
            }
            html += "<tbody></table>";
            var bookList = $('#bookList');
            bookList.html(html);
        });
    });
}

sgdb.insert = function(params) {
    if(!sgdb.db) {                
        return;                
    }
    var author = params.author;
    var book = params.book;
    var editor = params.editor;
    var pages = parseInt(params.pages);
    
    console.log(author + "," + book + "," + editor + "," + pages);

    sgdb.db.transaction(function (t) { 
        var result = t.executeSql("INSERT INTO myTable('author','book', editor, pages) values('" + author + "','" + book + "','" + editor + "','" + pages + "')", [], null, null);
        sgdb.selRows();
    });
}