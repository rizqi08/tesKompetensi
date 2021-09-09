const http = require('http');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbConnection = require('./connection/database');
const uploadFile = require('./middlewares/uploadFile');


app.set('view engine', 'hbs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  session(
    {
      cookie: {
        maxAge: 1000 * 60 * 60 * 2,
      },
      store: new session.MemoryStore(),
      resave: false,
      saveUninitialized: true,
      secret: 'SangatRahasia',
    }
  )
);

app.use(function(req,res,next){
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

hbs.registerPartials(__dirname + '/views/partials');

var pathFile = 'http://localhost:3000/uploads/';


app.get('/', function(request,response) {
  const title = 'Home';
  response.render('index', {
    title,
   });
});

app.get('/provinsi', function(request,response) {

  const title = 'Provinsi';

  const query = `SELECT * FROM provinsi_tb`;

  dbConnection.getConnection(function (err,conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;
      const provinsi = [];

        for (var result of results) {
          provinsi.push({
            id: result.id,
            nama: result.nama,
            diresmikan: result.diresmikan,
            photo: pathFile + result.photo,
            pulau: result.pulau,
          });
        }

      response.render('provinsi', {
        title,
        provinsi,
      });
    });
  });
});

app.get('/addProvinsi', function(request,response) {
  const title = 'Add Provinsi';
  response.render('addProvinsi', {
    title,
  });
});

app.post('/addProvinsi', uploadFile('image') ,function(request,response) {
  var {nama, resmi, pulau} = request.body;
  var image = '';

  if (request.file){
    image = request.file.filename;
  }

  if (nama == '' || resmi == '' || image == '' || pulau == '') {
    request.session.message = {
      type: 'danger',
      message: 'Please insert all field!',
    };
    return response.redirect('/addProvinsi');
  }
    const query = `INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) VALUES ("${nama}","${resmi}", "${image}", "${pulau}")`;
    dbConnection.getConnection(function(err,conn){
      if(err) throw err;
        conn.query(query,function(err,result) {
          if (err) throw err;

          request.session.message = {
            type: 'success',
            message: 'Add artis has success',
          };

          response.redirect('/addProvinsi');
        });

        conn.release();
     });
});

app.get('/detailProvinsi/:id', function(request,response) {
  const title = 'Detail Provinsi';
  const id = request.params.id;

  const query = `SELECT * FROM provinsi_tb WHERE id = ${id}`;

  dbConnection.getConnection(function (err,conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;
      const provinsi = {
        id: results[0].id,
        nama: results[0].nama,
        diresmikan: results[0].diresmikan,
        photo: pathFile + results[0].photo,
        pulau: results[0].pulau,
      };

      response.render('detailProvinsi', {
        title,
        provinsi,
      });
    });
  });

});

app.get('/deleteProvinsi/:id', function(request,response) {
  const id = request.params.id;

  const query = `DELETE FROM provinsi_tb WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query(query,function(err,result) {
      if (err) throw err;

      response.redirect('/provinsi');
    });

    conn.release();
  });
  
});

app.get('/editProvinsi/:id', function(request,response) {
  const title = 'Edit Provinsi';
  const id = request.params.id;

  const query = `SELECT * FROM provinsi_tb WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
      conn.query(query,function(err,results) {
        if (err) throw err;

        const provinsi = {
          id: results[0].id,
          nama: results[0].nama,
          diresmikan: results[0].diresmikan,
          photo: pathFile + results[0].photo,
          pulau: results[0].pulau,
        };

        response.render('editProvinsi', {
          title,
          provinsi,
        });
      });

      conn.release();
   });
});

app.post('/editProvinsi', uploadFile('image'), function(request,response) {
  const {id, nama, diresmikan, oldCover , pulau} = request.body;

  var image = oldCover.replace(pathFile, '');
  if (request.file) {
    image = request.file.filename;
  }

  const query = `UPDATE provinsi_tb SET photo = "${image}", nama = "${nama}", diresmikan = "${diresmikan}", pulau = "${pulau}" WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
      conn.query(query,function(err,results) {
        if (err) throw err;

        response.redirect(`/detailProvinsi/${id}`);
      });

      conn.release();
   });
});

app.get('/kabupaten', function(request,response) {

  const title = 'Kabupaten';

  const query = `SELECT * FROM kabupaten_tb`;

  dbConnection.getConnection(function (err,conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;
      const kabupaten = [];

        for (var result of results) {
          kabupaten.push({
            id: result.id,
            nama: result.nama,
            diresmikan: result.diresmikan,
            photo: pathFile + result.photo,
          });
        }

      response.render('kabupaten', {
        title,
        kabupaten,
      });
    });
  });
});

app.get('/addKabupaten', function(request,response) {
  const query = `SELECT id, nama from provinsi_tb`;
  dbConnection.getConnection(function (err,conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;
      const provinsi = [];

      for (var result of results) {
        provinsi.push({
          id: result.id,
          nama: result.nama,
        });
      }
    
  const title = 'Add Kabupaten';
  response.render('addKabupaten', {
    title,
    provinsi,
  });
});
});
});

app.post('/addKabupaten', uploadFile('image') ,function(request,response) {
  var {nama, resmi, provinsi} = request.body;
  var image = '';

  if (request.file){
    image = request.file.filename;
  }

  if (nama == '' || resmi == '' || image == '' || provinsi == '') {
    request.session.message = {
      type: 'danger',
      message: 'Please insert all field!',
    };
    return response.redirect('/addKabupaten');
  }
    const query = `INSERT INTO kabupaten_tb (nama, diresmikan, photo, provinsi_id) VALUES ("${nama}","${resmi}", "${image}", "${provinsi}")`;
    dbConnection.getConnection(function(err,conn){
      if(err) throw err;
        conn.query(query,function(err,result) {
          if (err) throw err;

          request.session.message = {
            type: 'success',
            message: 'Add artis has success',
          };

          response.redirect('/addKabupaten');
        });

        conn.release();
     });
});

app.get('/detailKabupaten/:id', function(request,response) {
  const title = 'Detail Kabupaten';
  const id = request.params.id;

  const query = `SELECT * FROM kabupaten_tb WHERE id = ${id}`;

  dbConnection.getConnection(function (err,conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;
      const kabupaten = {
        id: results[0].id,
        nama: results[0].nama,
        diresmikan: results[0].diresmikan,
        photo: pathFile + results[0].photo,
        provinsi_id: results[0].provinsi_id,
      };

      response.render('detailKabupaten', {
        title,
        kabupaten,
      });
    });
  });

});

app.get('/deleteKabupaten/:id', function(request,response) {
  const id = request.params.id;

  const query = `DELETE FROM kabupaten_tb WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query(query,function(err,result) {
      if (err) throw err;

      response.redirect('/kabupaten');
    });

    conn.release();
  });
  
});

app.get('/editKabupaten/:id', function(request,response) {
  const title = 'Edit Kabupaten';
  const id = request.params.id;

  const query = `SELECT * FROM kabupaten_tb WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
      conn.query(query,function(err,results) {
        if (err) throw err;

        const kabupaten = {
          id: results[0].id,
          nama: results[0].nama,
          diresmikan: results[0].diresmikan,
          photo: pathFile + results[0].photo,
        };

        response.render('editKabupaten', {
          title,
          kabupaten,
        });
      });

      conn.release();
   });
});

app.post('/editKabupaten', uploadFile('image'), function(request,response) {
  const {id, nama, diresmikan, oldCover } = request.body;

  var image = oldCover.replace(pathFile, '');
  if (request.file) {
    image = request.file.filename;
  }

  const query = `UPDATE kabupaten_tb SET photo = "${image}", nama = "${nama}", diresmikan = "${diresmikan}" WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
      conn.query(query,function(err,results) {
        if (err) throw err;

        response.redirect(`/detailKabupaten/${id}`);
      });

      conn.release();
   });
});


const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.debug(`Server listening on port ${port}`);
