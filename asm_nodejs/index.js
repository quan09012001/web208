const exp = require("express");
const app = exp();
const port = 3000;
var db = require("./db.js");
var cors = require("cors");

app.use(cors());
app.use(exp.json());

app.get("/", (req, res) => {
  res.json("{'message': 'API NodeJS Assignment'}");
});
// API dự án
app.get("/du_an", (req, res) => {
  let sql = `SELECT id, ten_du_an, ngay_start, tien, leader, thanh_vien FROM du_an ORDER BY ngay_start desc`;
  db.query(sql, (err, data) => {
    if (err) res.json({ message: err });
    else res.json(data);
  });
});
app.get("/du_an/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id) == true) return res.json("{'message': 'Dự án không tồn tại'}");

  let sql = `SELECT id, ten_du_an, ngay_start, tien, leader, thanh_vien FROM du_an WHERE id=? ORDER BY ngay_start desc`;
  db.query(sql, id, (err, data) => {
    if (err) res.json({ message: err });
    else if (data.length == 0) res.json({ message: "Dự án không có" });
    else res.json(data[0]);
  });
});
app.post("/du_an", (rep, res) => {
  let { ten_du_an, ngay_start, tien, leader, thanh_vien } = rep.body;
  console.log(rep.body, thanh_vien.join(","));
  let sql =
    "INSERT INTO du_an SET ten_du_an=?, ngay_start=?, tien=?, leader=?, thanh_vien=?";
  db.query(
    sql,
    [ten_du_an, ngay_start, tien, leader, thanh_vien.join(",")],
    (err, d) => {
      if (err) res.json({ "Thông báo": "Lỗi khi thêm dự án: " + err });
      else res.json({ "Thông báo": "Đã thêm dự án." });
    }
  );
});
app.put("/du_an/:id", (rep, res) => {
  let data = rep.body;
  let id = rep.params.id;
  let { ten_du_an, ngay_start, tien, leader, thanh_vien } = rep.body;
  let sql =
    "UPDATE du_an SET ten_du_an=?, ngay_start=?, tien=?, leader=?, thanh_vien=? WHERE id=?";
  db.query(
    sql,
    [ten_du_an, ngay_start, tien, leader, thanh_vien.join(","), id],
    (err, d) => {
      if (err) res.json({ "Thông báo": "Lỗi khi cập nhật dự án: " + err });
      else res.json({ "Thông báo": "Đã cập nhật dự án." });
    }
  );
});
app.delete("/du_an/:id", (rep, res) => {
  let id = rep.params.id;
  let sql = "DELETE FROM du_an WHERE id=?";
  db.query(sql, id, (err, d) => {
    if (err) res.json({ "Thông báo": "Lỗi khi xóa dự án: " + err });
    else res.json({ "Thông báo": "Đã xóa dự án." });
  });
});

// API Nhân viên
app.get("/nhan_vien", (req, res) => {
  let sql = `SELECT id, ho, ten, ngay_sinh, phai, gmail, password, khu_vuc FROM nhan_vien`;
  db.query(sql, (err, data) => {
    if (err) res.json({ message: err });
    else res.json(data);
  });
});
app.get("/nhan_vien/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id) == true)
    return res.json("{'message': 'Nhân viên không tồn tại'}");

  let sql = `SELECT id, ho, ten, ngay_sinh, phai, khu_vuc FROM nhan_vien WHERE id=?`;
  db.query(sql, id, (err, data) => {
    if (err) res.json({ message: err });
    else if (data.length == 0) res.json({ message: "Nhân viên không có" });
    else res.json(data[0]);
  });
});
app.post("/nhan_vien", (rep, res) => {
  let { ho, ten, ngay_sinh, gmail, password, phai, khu_vuc } = rep.body;
  console.log(rep.body);
  let sql =
    "INSERT INTO nhan_vien SET ho=?, ten=?, ngay_sinh=?, gmail=?, password=?, phai=?, khu_vuc=?";
  db.query(
    sql,
    [ho, ten, ngay_sinh, gmail, password, phai, khu_vuc],
    (err, d) => {
      if (err) res.json({ "Thông báo": "Lỗi khi thêm nhân viên: " + err });
      else res.json({ "Thông báo": "Đã thêm nhân viên." });
    }
  );
});
app.put("/nhan_vien/:id", (rep, res) => {
  let data = rep.body;
  let id = rep.params.id;
  let { ho, ten, ngay_sinh, gmail, password, phai, khu_vuc } = rep.body;
  let sql =
    "UPDATE nhan_vien SET ho=?, ten=?, ngay_sinh=?, gmail=?, password=?, phai=?, khu_vuc=? WHERE id=?";
  db.query(
    sql,
    [ho, ten, ngay_sinh, gmail, password, phai, khu_vuc, id],
    (err, d) => {
      if (err) res.json({ "Thông báo": "Lỗi khi cập nhật nhân viên: " + err });
      else res.json({ "Thông báo": "Đã cập nhật nhân viên." });
    }
  );
});
app.delete("/nhan_vien/:id", (rep, res) => {
  let id = rep.params.id;
  let sql = "DELETE FROM nhan_vien WHERE id=?";
  db.query(sql, id, (err, d) => {
    if (err) res.json({ "Thông báo": "Lỗi khi xóa nhân viên: " + err });
    else res.json({ "Thông báo": "Đã xóa nhân viên." });
  });
});

// API task
app.get("/task", (req, res) => {
  let sql = `SELECT id, ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority FROM task`;
  db.query(sql, (err, data) => {
    if (err) res.json({ message: err });
    else res.json(data);
  });
});
app.get("/task/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id) == true) return res.json("{'message': 'Task không tồn tại'}");

  let sql = `SELECT id, ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority FROM task WHERE id=?`;
  db.query(sql, id, (err, data) => {
    if (err) res.json({ message: err });
    else if (data.length == 0) res.json({ message: "Task không có" });
    else res.json(data[0]);
  });
});
app.post("/task", (rep, res) => {
  let { ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority } = rep.body;
  let sql =
    "INSERT INTO task SET ten_task=?, du_an_id=?, nhan_vien_id=?, mo_ta=?, status=?, priority=?";
  db.query(
    sql,
    [ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority],
    (err, d) => {
      if (err) res.json({ "Thông báo": "Lỗi khi thêm task: " + err });
      else res.json({ "Thông báo": "Đã thêm task." });
    }
  );
});
app.put("/task/:id", (rep, res) => {
  let data = rep.body;
  let id = rep.params.id;
  let { ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority } = rep.body;
  let sql =
    "UPDATE task SET ten_task=?, du_an_id=?, nhan_vien_id=?, mo_ta=?, status=?, priority=? WHERE id=?";
  db.query(
    sql,
    [ten_task, du_an_id, nhan_vien_id, mo_ta, status, priority, id],
    (err, d) => {
      if (err) res.json({ "Thông báo": "Lỗi khi cập nhật task: " + err });
      else res.json({ "Thông báo": "Đã cập nhật task." });
    }
  );
});
app.delete("/task/:id", (rep, res) => {
  let id = rep.params.id;
  let sql = "DELETE FROM task WHERE id=?";
  db.query(sql, id, (err, d) => {
    if (err) res.json({ "Thông báo": "Lỗi khi xóa task: " + err });
    else res.json({ "Thông báo": "Đã xóa task." });
  });
});

app.listen(port, () => {
  console.log(`Ứng dụng đang chạy với http://localhost:${port}`);
});
