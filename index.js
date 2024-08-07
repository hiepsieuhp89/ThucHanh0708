const express = require('express')
const path = require('path');
const app = express();
// Đường dẫn đến thư mục chứa tệp HTML của bạn
const publicDirectory = path.join(__dirname, 'public');

// Sử dụng middleware static để phục vụ các tệp tĩnh từ thư mục public
app.use(express.static(publicDirectory));


app.get('/', (request, response) => {
  //
  response.send('hello world')
})

app.get('/thoiTiet', (request, response) => {
  //
  response.sendFile(path.join(publicDirectory, 'thoiTiet/index.html'));
})
app.get('/datPhim', (request, response) => {
  //
  response.sendFile(path.join(publicDirectory, 'datPhim/index.html'));
})

app.listen(3000, () => {
  console.log('ỨNG DỤNG CHẠY TRÊN CỔNG 3000')
})

module.exports = app;
