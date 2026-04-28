import multer  from "multer";
import path from "path";

// storage setup 
const storage =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },

    filename: (req,file,cb) =>{
        cb(null,Date.now()+"-" + file.originalname);
    },
});

// file filter (only pdf)
const fileFilter  = (req,file,cb)=>{
    const ext = path.extname(file.originalname);

    if(ext !== ".pdf"){
        return cb(new Error("Only PDF files are allowed"),false);
    }
    cb(null,true);
};

const upload = multer({storage,fileFilter});

export default upload;