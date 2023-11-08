const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

const arguments = yargs
  .option("filename", {
    type: "string",
  })
  .check((argv) => {
    if (!argv.filename) {
      return "filename is reduired field";
    }
    return true;
  })
  .help().argv;

let isFileExist = (fileList, fileName) => {
  return new Promise((resolve, reject) => {
    if (fileList.indexOf(fileName) != -1) {
      reject("File already exist, Enter new file name");
    } else {
      fileList.push(fileName);
      fs.writeFile(`filenameList.json`, JSON.stringify(fileList), (err) => {
        if (err) {
          reject("Error:" + err);
        } else {
          console.log("File List updated");
          resolve("Not not Exist");
        }
      });
    }
  });
};
let createNewFile = (fileName) => {
  fs.writeFile(`Files-Data/${fileName}.txt`, "You are awesome", (err) => {
    if (err) {
      console.log("Error:" + err);
      return false;
    }
    console.log(`${fileName} file created successfully`);
  });
};

if (arguments["filename"] != "") {
  let fileName = arguments["filename"];
  let fileList = [];
  fileList = JSON.parse(fs.readFileSync("./filenameList.json", "utf-8"));
  if (fileList.length != 0) {
    isFileExist(fileList, fileName)
      .then(() => {
        createNewFile(fileName);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  } else {
    isFileExist(fileList, fileName)
      .then(() => {
        createNewFile(fileName);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }
} else {
  console.log("Please Enter Filename");
}
