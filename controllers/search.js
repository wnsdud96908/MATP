const {stores} = require("../models");
const {Op} = require("sequelize");
exports.renderSearch = async(req, res, next) =>{
    try{
        const PAGE_SIZE = 12;
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const offset = (page - 1) * PAGE_SIZE;

        const {query} = req.query;

        const count = await stores.count({
            where: {
                [Op.or]: [
                    {
                        store_nm: {
                            [Op.like]: `%${query}%`,
                        },
                    },
                    {
                        rgn_no: {
                            [Op.like]: `${query}`,
                        },
                    },
                ],
            },
        });

        const totalPages = Math.ceil(count / PAGE_SIZE);

        const search = await stores.findAll({
            nest: true,
            raw : true,
            order: [
                ["store_no", "DESC"]
            ],
            offset,
            limit: PAGE_SIZE,
            where:{
                [Op.or]: [
                    {
                        store_nm: {
                            [Op.like]: `%${query}%`
                        }
                    },{
                        rgn_no: {
                            [Op.like]: `${query}`
                        }
                    }
                ]
            }
        });
        res.render("search",
            {
                store:search,
                totalPages,
                currentPage: page,
                query,
            });
    } catch(error){
        console.error(error);
        next(error);
    }
}

exports.renderCreate = async(req, res) => {
    const {rgn_no, store_nm, store_addr, store_detail_addr, store_tel, store_content, store_wkd_time, store_wknd_time, store_break_time} = req.body;

    try{
        const files = [];
        for(const file of req.files){
            files.push({ filename: file.filename, url: `/img/${file.filename}` });
        }
        const upload = await stores.create({
            rgn_no: rgn_no,
            store_nm: store_nm,
            store_addr: store_addr,
            store_detail_addr: store_detail_addr,
            store_tel: store_tel,
            store_content: store_content,
            store_wkd_time: store_wkd_time,
            store_wknd_time: store_wknd_time,
            store_break_time: store_break_time,
            store_del: 1,
            img: files,
        });
        if(upload === null){
            console.log("게시물 등록 에러!");
            res.status(400).json({"msg":"uploadError"});
        }else{
            console.log("게시물 등록!");
            res.status(200).json({"msg":"uploadSuccess"});
        };
    }catch (error){
        console.error(error);
        res.status(500).json({"msg":error});
    };
}