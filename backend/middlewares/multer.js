const multer        = require('multer');
const {v1: uuidv1}  = require('uuid');
const fs            = require('fs');
 
const storage =
{
    kyc: multer.diskStorage({
        destination: function(req, file, next)
        {
            const user_id   = 'idimage';
            const path = {
                id_image_files        : 'id/',
                selfie_image_files    : 'selfie/'
            };
            const main_path =  process.env.MEMBER_DIR;
            const kyc_path = main_path + req.body.id + '/'

            if (!fs.existsSync('./public/')) {
                fs.mkdirSync('./public/');
            }

            if (!fs.existsSync('./public/files/')){
                fs.mkdirSync('./public/files/');
            }
            // .public/files/members/
            if (!fs.existsSync(main_path)){
                fs.mkdirSync(main_path);
            }
            
            if (!fs.existsSync(kyc_path)){
                fs.mkdirSync(kyc_path);
            }

            if (!fs.existsSync(kyc_path + 'images/')){
                fs.mkdirSync(kyc_path + 'images/');
            }

            if (!fs.existsSync(kyc_path + 'images/' + 'id/')){
                fs.mkdirSync(kyc_path + 'images/' + 'id/');
            }

            if (!fs.existsSync(kyc_path + 'images/' + 'selfie/')){
                fs.mkdirSync(kyc_path + 'images/' + 'selfie/');
            }

            next(null, process.env.MEMBER_DIR + req.body.id + '/images/' + path[file.fieldname]);
        },
        filename: function(req, file, next)
        {
            let ext_str             = "";
            const mime_types_obj    = {
              "image/jpg"   : "jpg",
              "image/jpeg"  : "jpeg",
              "image/png"   : "png",
            };

            if(mime_types_obj.hasOwnProperty(file.mimetype))
            {
                ext_str = mime_types_obj[file.mimetype];
            }
            // changes the name of file uploaded
            file.fieldname = uuidv1();
            next(null, file.fieldname + "." + ext_str)
        }
    })
}
// ------------------------------------  Item Image uploading------------------------------------
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
    {
        cb(null, true);
    }
    else
    {
        cb(null, false);
    }
}
    
// ------------------------------------  End of Item Image uploading------------------------------------

// ------------------------------------  End of File uploading reviews------------------------------------



module.exports.kyc_upload = multer({storage: storage.kyc}).fields([
    {name: 'id_image_files', maxCount: 1},
    {name: 'selfie_image_files', maxCount: 1}
]);

