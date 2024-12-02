import path from "path";
import multer from "multer";
import { error } from "console";



const storage = multer.diskStorage({
    destination:function (req, file, cb){
        return cb(null, '../uploads')
    },
        filename:function (req, file, cb){
            return cb(null, file.originalname)
        },
    })
    
    const upload = multer({storage:storage});

//   dest: "uploads/",
//   limits: { fileSize: 50 * 1024 * 1024 },
//   storage: multer.diskStorage({
//     destination: "./uploads",
//     filename: (_req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   }),
//   fileFilter: (_req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (
//       ext !== ".jpg" &&
//       ext !== ".png" &&
//       ext !== ".jpeg" &&
//       ext !== ".mp4" &&
//       ext !== ".webp"
//     ) {

//     return  cb(new error("unsupported file type!", ext), false);
 
//     }
//    return cb(null, true);
//   },


export default upload
