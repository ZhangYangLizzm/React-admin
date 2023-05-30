import database from "../mysql";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";

const getFilesHandler = async (
  req: JWTRequest,
  res: Response,
  next: NextFunction
) => {
  // 分页
  //   const pageNum = +req.fields!.pageNum;
  //   const limit = 10;
  const sqlCountStr = "select count(*) from filescloud";
  //当前数据库存有文件总数量
  //   const sqlStr = `select * from files limit ${(pageNum - 1) * limit},${limit}`;

  database.query(sqlCountStr, (err, results) => {
    if (err) {
      return next(err);
    }
    const sum = results[0]["count(*)"];
    return res.status(200).send({
        status: 200,
        message: "成功",
        data: {
          sum,
        },
      });
  });

  console.log("getFilesHandler");
};
const uploadFilesHandler = () => {
  console.log("uploadFilesHandler");
};

export { getFilesHandler, uploadFilesHandler };
