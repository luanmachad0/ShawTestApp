import {Request, Response } from 'express';
import { UserInstance, UserAttributes } from '../model';
import { Op } from 'sequelize';

const fs = require("fs");
const csv = require("fast-csv");


const upload = async (req: Request, res: Response) => {
  try {
    console.log(req.file)
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let users: any[] = [];
    let path = __basedir + "/src/resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true, discardUnmappedColumns: true }))
      .on("error", (error: { message: any; }) => {
        throw error.message;
      })
      .on("data", (row: any) => {
        console.log(row)
        users.push(row);
      })
      .on("end", () => {
        UserInstance.bulkCreate(users)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file?.originalname,
            });
          })
          .catch((error: { message: any; }) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file?.originalname,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
    if (req)
    {
        UserInstance.findAll({
            where: {
                [Op.or]: [
                    {
                    name: {
                        [Op.like]: '%' + req + '%'
                    }},
                    {
                    city: {
                        [Op.like]: '%' + req + '%'
                    }},
                    {
                    country: {
                        [Op.like]: '%' + req + '%'
                    }},
                    {
                    favorite_sport: {
                        [Op.like]: '%' + req + '%'
                    }}
                ]
            }
        })
        .then((data: any) => {
          res.send(data);
        })
        .catch((err: { message: any; }) => {
         console.log(err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users.",
          });
        });
    } else {
        UserInstance.findAll()
        .then((data: any) => {
        res.send(data);
        })
        .catch((err: { message: any; }) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving users.",
        });
        });
    }
};

module.exports = {
  upload,
  getUsers
};