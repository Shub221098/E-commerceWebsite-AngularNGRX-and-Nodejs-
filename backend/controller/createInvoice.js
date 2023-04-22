const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path){
  let doc = new PDFDocument({ margin: 50 });

generateHeader(doc); // Invoke `generateHeader` function.
generateCustomerInformation(doc, invoice); // Invoke `generateCustomerInformation` function.
generateFooter(doc); // Invoke `generateFooter` function.

  doc.end();
doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}
function generateCustomerInformation(doc, invoice) {
  const shipping = invoice.shippingAddress;

  doc
  .text(`Invoice Number: ${invoice._id}`, 50, 200)
  .text(`Invoice Date: ${new Date()}`, 50, 215)
  .text(`Contact No: ${invoice.phone}`, 50, 230)
  .text(`Name : ${invoice.name}`, 50, 215)
  .text(`${shipping.address}`, 50, 250)
  .text(`${shipping.city}`, 50, 265)
  .text(`${shipping.postalCode}`, 50, 280)
  .text(`${shipping.country}`, 50, 295)
    .moveDown();
  generateInvoiceTable(doc, invoice);

  doc.moveDown();
  doc.text(`Total: ${invoice.totalPrice}`);
}
function generateTableRow(doc, y, c1, c2, c3) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 370, y, { width: 90, align: "right" })
    .text(c3, 0, y, { align: "right" });
}
function generateInvoiceTable(doc, invoice) {
  let i,
    invoiceTableTop = 330;

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.productName,
      item.totalProductQuantity,
      item.totalProductPrice
    );
  }
}
module.exports = {
	createInvoice,
};