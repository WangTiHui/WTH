import XLSX from "xlsx";
import FileSaver from "file-saver";
import ExportJsonExcel from "js-export-excel";

export const table2Excel = function(tableid, tablename = "数据表格") {
  var wb = XLSX.utils.table_to_book(document.querySelector("#" + tableid));
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      tablename + ".xlsx"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
  return wbout;
};

export const json2Excel = function({ data, name, columns, header, width }) {
  console.log(data, name, columns, header, width);
  var option = {};

  option.fileName = name ? name : "sheet";
  option.datas = [
    {
      sheetData: data,
      sheetName: name ? name : "sheet",
      sheetFilter: columns ? columns : Object.keys(data[0]),
      sheetHeader: header ? header : Object.keys(data[0]),
      columnWidths: width ? width : new Array(data.length).fill(8)
    }
  ];
  var toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
};

export const export2Json = function(data, name = "data") {
  try {
    FileSaver.saveAs(
      new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
      }),
      name + ".json"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e);
  }
};
