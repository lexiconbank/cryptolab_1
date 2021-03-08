const multer        = require('multer');
const {v1: uuidv1}  = require('uuid');
const fs            = require('fs');
 
const storage =
{
    kyc: multer.diskStorage({
        destination: function(req, file, next)
        {
            console.log('hahahah', req.body)
            const user_id   = 'idimage';
            // req.session.user_info._id;
            const path = {
                id_image    : 'id/',
            };

            // next(null, process.env.MEMBER_DIR + '/' + user_id + '/images/' +  path[file.fieldname]);
            if (!fs.existsSync('./public/')) {
                fs.mkdirSync('./public/');
            }

            // const main_path =  process.env.CHAT_FILES;
            // const chat_path = main_path + req.body.chat_id + '/'

            //     if (!fs.existsSync('./public/')) {
            //         fs.mkdirSync('./public/');
            //     }

            //     if (!fs.existsSync(main_path)) {
            //         // create directory if not
            //         console.log('create folder', main_path);
            //         fs.mkdirSync(main_path);
            //     }

            //     if (!fs.existsSync(chat_path)) {
            //         fs.mkdirSync(chat_path);
            //         fs.mkdirSync(chat_path+'documents');
            //         fs.mkdirSync(chat_path+'emoji');
            //         fs.mkdirSync(chat_path+'images');
            //     }
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
    {name: 'id_image', maxCount: 1},
    {name: 'id', maxCount: 1}
]);

