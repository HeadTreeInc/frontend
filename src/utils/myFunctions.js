import jsPDF from "jspdf";
import cryptoJs from "crypto-js";
import React from 'react'
import call from "../service";
import { getUserDataFromCookie } from "./cookieHelper";
import { NewInput, NewSelect } from "./newInput";
import { Lcdetailsdata } from "../components/lcV2/applyforLimit/components/lcdiscountingcard";
import html2canvas from "html2canvas";
import { mergePDF, createPDF, pdfArrayToBlob } from "pdf-actions";
import XLSX from 'sheetjs-style';
import * as FileSaver from 'file-saver'
let secretKey = "5N-LzDy;LcKYHYgp^d]2Q59,}rR=|V&=3/Me,ugIuw]92<7cX@uEmE):+%|/#mA"


export const is_valid = (data) => {
  if (data && data.length) return true
  return false
}

// export const validate_number_field = str => {
//   return str.replace(/[^0-9\.]/g, "").replace(/(?<=\..*)\./g, '')
// }

export const validate_text_field = str => {
  return str.replace(/^\s?/, '')
}

const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};

const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

const imageDimensionsOnA4 = (dimensions) => {
  const isLandscapeImage = dimensions.width >= dimensions.height;
  // If the image is in landscape, the full width of A4 is used.
  if (isLandscapeImage) {
    return {
      width: A4_PAPER_DIMENSIONS.width,
      height:
        A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
    };
  }
  // If the image is in portrait and the full height of A4 would skew
  // the image ratio, we scale the image dimensions.
  const imageRatio = dimensions.width / dimensions.height;
  if (imageRatio > A4_PAPER_RATIO) {
    const imageScaleFactor =
      (A4_PAPER_RATIO * dimensions.height) / dimensions.width;
    const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;
    return {
      height: scaledImageHeight,
      width: scaledImageHeight * imageRatio,
    };
  }
  // The full height of A4 can be used without skewing the image ratio.
  return {
    width: A4_PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
    height: A4_PAPER_DIMENSIONS.height,
  };
};

export async function convertImageToPdf(imgDataUrl, imgFileName) {
  return new Promise((resolve, reject) => {
    try {
      let pdfFileName = imgFileName.split(".")[0] + ".pdf"
      let image = new Image();
      image.src = imgDataUrl;
      image.onload = function () {
        const doc = new jsPDF();
        doc.deletePage(1);
        const imageDimensions = imageDimensionsOnA4({
          width: image.width,
          height: image.height,
        });
        doc.addPage();
        doc.addImage(
          image.src,
          // Images are vertically and horizontally centered on the page.
          (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
          (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
          imageDimensions.width,
          imageDimensions.height,
          "",
          "FAST"
        );
        // To view pdf in new tab
        // const test = doc.output('bloburl')
        // window.open(test, "_blank");
        const pdfBlob = doc.output('blob');
        resolve(
          {
            "file": new File([pdfBlob], pdfFileName, { type: pdfBlob["type"], lastModified: new Date() }),
            "dataUrl": doc.output('datauristring', { filename: pdfFileName })
          }
        );
      };
    }
    catch (error) {
      reject(false)
    }
  })
}

export const GetCache = (key) => {
  return JSON.parse(localStorage.getItem(key)) || {}
}

export const SetCache = (key, data_obj) => {
  localStorage.setItem(key, JSON.stringify({ ...GetCache(key), ...data_obj }))
}

export const ClearCache = (key) => {
  localStorage.removeItem(key)
}

export const encryptData = (strData) => {
  return cryptoJs.AES.encrypt(strData, secretKey).toString()
}

export const decryptData = (encStrData) => {
  let bytes = cryptoJs.AES.decrypt(encStrData, secretKey)
  return bytes.toString(cryptoJs.enc.Utf8)
}

export const cargoTypeDD = [
  { "name": "Break Bulk" },
  { "name": "Bulk Cargo" },
  { "name": "Oversize Load" },
  { "name": "Liquid Cargo" },
  { "name": "Gas" },
  { "name": "Wheeled Carg" }
]

export const containerTypeDD = [
  { "name": "20 Standard" },
  { "name": "40 Standard" },
  { "name": "40 High Cube" },
  { "name": "45 High Cube" },
  { "name": "20 Open Top" },
  { "name": "40 Open Top" },
  { "name": "20 Flatrack" },
  { "name": "40 Flatrack" },
  { "name": "20 Refrigerate" }
]

export const vesselTypeDD = [
  { "name": "General Cargo" },
  { "name": "Bulk Carriers" },
  { "name": "Containership" },
  { "name": "Tanker Market" },
  { "name": "Specialized" }
]

export function calcHaversineDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function toRad(Value) {
  return Value * Math.PI / 180;
}

export const modifi_currencies = [
  { id: 2, name: "Dollars", code: "USD", symbol: "$" },
  { id: 11, name: "Euro", code: "EUR", symbol: "€" },
  { id: 19, name: "Pounds", code: "GBP", symbol: "£" },
  { id: 22, name: "Dollars", code: "CAD", symbol: "$" },
  { "id": 25, "name": "Yuan Renminbi", "code": "CNY", "symbol": "¥" }
]

export const most_used_currencies = [
  { id: 47, name: "Rupees", code: "INR", symbol: "₹" },
  { id: 2, name: "Dollars", code: "USD", symbol: "$" },
  { id: 11, name: "Euro", code: "EUR", symbol: "€" },
  { id: 19, name: "Pounds", code: "GBP", symbol: "£" },
  // { id: 44, name: "Dollars", code: "HKD", symbol: "$" },
  // { id: 22, name: "Dollars", code: "CAD", symbol: "$" },
  // { id: 6, name: "Dollars", code: "AUD", symbol: "$" },
  // { id: 63, name: "Switzerland Francs", code: "CHF", symbol: "CHF" },
  // { id: 95, name: "Rand", code: "ZAR", symbol: "R" },
  // { id: 74, name: "Dollars", code: "NZD", symbol: "$" }
]

export function toolTip(msg) {
  return (
    <span className="error-icon" flow="right" tooltip={msg}>i</span>
  )
}

export const astrix = <span className="required-field text-danger">*</span>

export async function getDocDetails(id, fileHash, isEximBank) {
  return new Promise((resolve, reject) => {
    try {
      let userTokenDetails = getUserDataFromCookie()
      call('POST', 'getDoc', { id, fileHash, typeId: userTokenDetails.type_id, isEximBank }).then((result) => {
        console.log("getDoc fileResult-->", result)
        if (result) {
          result["fromDb"] = true
          resolve(result)
        }
        else {
          resolve({})
        }
      }).catch(err => {
        resolve({})
      })
    } catch (error) {
      resolve({})
    }
  })
}

export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export const LCTypesObject = {
  "sight_lc": "Sight LC",
  "usance_lc": "Usance LC",
  "b2bank_lc": "Back to back LC",
  "green_clause_lc": "Green Clause LC",
  "red_clause_lc": "Red Clause LC",
  "transferable_lc": "Transferable LC"
}

export const LCPurposeObject = {
  "lc_discounting": "LC discounting",
  "lc_confirmation": "LC confirmation",
  "sblc": "SBLC"
}

export function getInvoiceTotalOtherCharges(chargeArr) {
  let totalCharges = 0
  let referenceAmount = 50000
  if (chargeArr && chargeArr.length) {
    for (let index = 0; index < chargeArr.length; index++) {
      const element = chargeArr[index];
      if (element.amount && element.unit != "%") {
        totalCharges += (element.amount / 1)
      }
      else if (element.amount) {
        totalCharges += ((element.amount / 100) * referenceAmount) / 12
      }
    }
  }
  return totalCharges
}

export function getInvoiceTotalCharges(item) {
  let totalCharges = 0
  let referenceAmount = 50000
  if (item.factoringFeesCurrency === "%") {
    totalCharges += ((item.factoringFees / 100) * referenceAmount) / 12
  }
  else {
    totalCharges += item.factoringFees / 1
  }
  totalCharges += ((item.interestRate / 100) * referenceAmount) / 12
  if (item.setupFeesCurrency === "%") {
    totalCharges += ((item.setupFees / 100) * referenceAmount) / 12
  }
  else {
    totalCharges += item.setupFees / 1
  }
  totalCharges += getInvoiceTotalOtherCharges(item.otherCharges)
  return totalCharges
}

export function getTotalOtherCharges(chargeArr) {
  let totalCharges = 0
  let referenceAmount = 50000
  for (let index = 0; index < chargeArr.length; index++) {
    const element = chargeArr[index];
    if (element.amount && element.unit != "%") {
      totalCharges += (element.amount / 1)
    }
    else if (element.amount) {
      totalCharges += ((element.amount / 100) * referenceAmount) / 12
    }
  }
  return totalCharges
}

export function getTotalCharges(item) {
  let totalCharges = 0
  let referenceAmount = 50000
  if (item.giveConfirmationFees) {
    totalCharges += ((item.confirmationFees / 100) * referenceAmount) / 12
  }
  if (item.giveDiscountingRate) {
    totalCharges += ((item.discountingRate / 100) * referenceAmount) / 12
  }
  totalCharges += item.setupFees / 1
  totalCharges += getTotalOtherCharges(item.otherCharges)
  return totalCharges
}

export let LcFieldsMaster = {
  "lcNo": {
    "title": "LC Number",
    "component": NewInput,
    "type": "text",
    "name": "lcNo",
    "value": "lcNo",
    "error": "lcNo"
  },
  "lcTenor": {
    "title": "LC Tenor",
    "component": NewInput,
    "type": "text",
    "name": "lcTenor",
    "value": "lcTenor",
    "error": "lcTenor"
  },
  "lcType": {
    "title": "LC Type",
    "component": NewSelect,
    "selectData": Lcdetailsdata,
    "name": "lcType",
    "value": "lcType",
    "error": "lcType",
    "optionLabel": "name",
    "optionValue": 'value',
  },
  "shipmentFromCountry": {
    "title": "Shipment from Country",
    "component": NewSelect,
    "selectData": [],
    "name": "shipmentFromCountry",
    "value": "shipmentFromCountry",
    "error": "shipmentFromCountry",
    "optionLabel": "name",
    "optionValue": 'sortname'
  },
  "shipmentToCountry": {
    "title": "Shipment to Country",
    component: NewSelect,
    selectData: [],
    "name": "shipmentToCountry",
    "value": "shipmentToCountry",
    "error": "shipmentToCountry",
    "optionLabel": "name",
    "optionValue": 'sortname'
  },
  "portOfLoading": {
    "title": "Port of Loading",
    component: NewSelect,
    selectData: [],
    "name": "portOfLoading",
    "value": "portOfLoading",
    "error": "portOfLoading",
    "optionLabel": "port_name",
    "optionValue": 'id'
  },
  "portOfDischarge": {
    "title": "Port of Discharge",
    component: NewSelect,
    selectData: [],
    "name": "portOfDischarge",
    "value": "portOfDischarge",
    "error": "portOfDischarge",
    "optionLabel": "port_name",
    "optionValue": 'id'
  },
  "commodity": {
    "title": "Commodity",
    component: NewInput,
    type: "text",
    "name": "commodity",
    "value": "commodity",
    "error": "commodity"
  },
  "expectedDateOfShipment": {
    "title": "Expected date of shipment",
    component: NewInput,
    type: "date",
    "name": "expectedDateOfShipment",
    "value": "expectedDateOfShipment",
    "error": "expectedDateOfShipment"
  },
  "lcIssuingBankAddress": {
    "title": "LC issuing bank address",
    component: NewInput,
    "type": "text",
    "name": "lcIssuingBankAddress",
    "value": "lcIssuingBankAddress",
    "error": "lcIssuingBankAddress"
  },
  "lcIssuingBankSwiftCode": {
    "title": "LC issuing bank SWIFT code",
    component: NewInput,
    "type": "text",
    "name": "lcIssuingBankSwiftCode",
    "value": "lcIssuingBankSwiftCode",
    "error": "lcIssuingBankSwiftCode"
  },
  "countryOfOrigin": {
    "title": "Country of origin",
    component: NewSelect,
    selectData: [],
    "name": "countryOfOrigin",
    "value": "countryOfOrigin",
    "error": "countryOfOrigin",
    optionLabel: "name",
    optionValue: 'sortname'
  },
  "confirmingBankName": {
    "title": "Confirming bank name",
    component: NewInput,
    type: "text",
    "name": "confirmingBankName",
    "value": "confirmingBankName",
    "error": "confirmingBankName"
  },
  "confirmingBankAddress": {
    "title": "Confirming bank address",
    component: NewInput,
    type: "text",
    "name": "confirmingBankAddress",
    "value": "confirmingBankAddress",
    "error": "confirmingBankAddress"
  },
  "confirmingBankSwiftCode": {
    "title": "Confirming bank SWIFT code",
    component: NewInput,
    type: "text",
    "name": "confirmingBankSwiftCode",
    "value": "confirmingBankSwiftCode",
    "error": "confirmingBankSwiftCode"
  }
}

export const printDiv = (divName, Filename, pdfArr) => {

  let printContents = document.getElementById(divName)
  window.scrollTo(0, 0);
  let w = printContents.clientWidth;
  let h = printContents.clientHeight;


  html2canvas(printContents, {
    width: w,
    height: h,
    scrollX: 0,
    scrollY: -window.scrollY,
    allowTaint: true,
    useCORS: true
    // foreignObjectRendering: true
  }).then(async (canvas) => {
    // canvas.crossOrigin = 'Anonymous';
    // window.open().document.write('<img src="' + canvas.toDataURL() + '" />');
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      compress: true
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    let filedataUI = new File([pdf.output('blob')], `${Filename}.pdf`, {
      type: pdf.output('blob').type,
      lastModified: pdf.output('blob').lastModified,
    });
    try {
      let filedataPDF = await createPDF.PDFDocumentFromFile(filedataUI)
      const allpdf = [filedataPDF, ...pdfArr]
      const pdfDoc = await mergePDF(allpdf)
      const u8intarr = await pdfDoc.save()
      const blobdata = pdfArrayToBlob(u8intarr)
      let filedata = new File([blobdata], `${Filename}.pdf`, {
        type: blobdata.type,
      });
      let reader = new FileReader();
      let fileObj
      reader.readAsDataURL(filedata);
      reader.onerror = (e) => {
        console.log('Error in pdf download', e)
      }
      reader.onloadend = async (e) => {
        fileObj = filedata
        let fileDataUrl = e.target.result
        fileObj["filebase64"] = fileDataUrl
        console.log('PDF Downloaded succesfully')
        downloadTheFile(fileObj)
      }
    } catch (e) {
      console.log('error', e)
    }

  }).catch(e => { });
}

function downloadTheFile(result) {
  if (result.filebase64.includes("base64,")) {
    result["filebase64"] = result.filebase64.split("base64,")[1]
  }
  if (result.name.split(".").pop() === "png" || result.name.split(".").pop() === "PNG") {
    console.log(result.name);
    let link = document.createElement("a");
    console.log(link);
    link.download = result.name.split(".")[0] + ".png";
    link.href = 'data:application/png;base64,' + encodeURI(result.filebase64);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (result.name.split(".").pop() === "jpg" || result.name.split(".").pop() === "JPG") {
    let link = document.createElement("a");
    link.download = result.name.split(".")[0] + ".jpeg";
    link.href = 'data:application/jpeg;base64,' + encodeURI(result.filebase64);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (result.name.split(".").pop() === "pdf" || result.name.split(".").pop() === "PDF") {
    let link = document.createElement("a");
    link.download = result.name.split(".")[0] + ".PDF";
    link.href = 'data:application/pdf;base64,' + encodeURI(result.filebase64);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const getPDFFromFile = async (file) => {
  console.log('Filebase64', file)
  if (file.filebase64) {
    const filedata = await fetch('data:application/pdf;base64,' + file.filebase64)
    const blob = await filedata.blob();
    const fileObj = new File([blob], file.name, { type: blob.type });
    const pdfFile = await createPDF.PDFDocumentFromFile(fileObj)
    return pdfFile
  }
}
export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true
}

export const ExportExcel = (data, filename) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset-UTF-8'
  const fileExtension = '.xlsx'
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
  const excelbuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const finaldata = new Blob([excelbuffer], { type: fileType })
  FileSaver.saveAs(finaldata, filename + fileExtension)
}
export const industryTypesObj = {
  apparelTextile: "Apparels & Textile",
  industrialMech: "Industrial & Mechanical",
  foodBeverage: "Food & Beverage",
  electronicConsumer: "Electronics & Consumer Goods",
  eCommerce: "E-Commerce",
  gamingMedia: "Gaming & Media",
  fmcg: "FMCG",
  medicalPharma: "Medical & Pharmaceutical",
  auto: "Auto",
  frozenFood: "Frozen Foods",
  ITStaffing: "IT Staffing",
  argo: "AGRO",
  govtEntity: "Buyer/Supplier Government Entity",
  oilGas: "Oil/Gas",
  diamond: "Diamond",
  preciousStone: "Precious Stone",
  gold: "Gold",
  others: "Others",
}