// import multer from "multer";
// console.log(multer);
// import path from "path"
// const storage = multer.diskStorage({
//     // destination: function (req,file,cb){
//     //     cb(null, "temp")
//     // },
//     // this is for the creating filename
//     filename:function(req,file,cb){
//         console.log("sbhbskj",file.originalname);
//         cb(null, file.originalname+"_" + Date.now()+ path.extname(file.originalname))
//     }
// })
// console.log(storage.getFilename,"hghdgjs");
// const uploads = multer({storage:storage});
// export default uploads;

import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //     cb(null, 'tmp')
  //   },
  //this is for the creating filename
  filename: function (req, file, cb) {
    console.log(path, " i am path");
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploads = multer({ storage: storage });
export default uploads;
