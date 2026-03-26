"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoicePage() {
  const [from, setFrom] = useState({ name: "", email: "", address: "" });
  const [to, setTo] = useState({ name: "", email: "", address: "" });
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: "", quantity: 1, rate: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [isGenerating, setIsGenerating] = useState(false);

  const currencySymbols: Record<string, string> = {
    USD: "$",
    GBP: "\u00A3",
    EUR: "\u20AC",
    KRW: "\u20A9",
    CAD: "C$",
    AUD: "A$",
  };
  const sym = currencySymbols[currency] || "$";

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), description: "", quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (
    id: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const safeValue =
      (field === "quantity" || field === "rate") && typeof value === "number"
        ? Math.max(0, value)
        : value;
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: safeValue } : i)));
  };

  const fmt = (n: number) =>
    `${sym}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const generatePDF = () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // --- Header ---
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 185, 129); // emerald
      doc.text("INVOICE", margin, y + 8);

      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.setFont("helvetica", "normal");
      doc.text(`#${invoiceNumber}`, margin, y + 14);

      // Date info on right
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      const dateX = pageWidth - margin;
      doc.text(`Date: ${invoiceDate}`, dateX, y + 4, { align: "right" });
      if (dueDate) {
        doc.text(`Due: ${dueDate}`, dateX, y + 10, { align: "right" });
      }

      y += 24;

      // --- Divider ---
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      // --- From / To ---
      const halfWidth = contentWidth / 2;

      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.setFont("helvetica", "bold");
      doc.text("FROM", margin, y);
      doc.text("BILL TO", margin + halfWidth + 5, y);
      y += 5;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(from.name || "Your Name", margin, y);
      doc.text(to.name || "Client Name", margin + halfWidth + 5, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);

      let yLeft = y;
      let yRight = y;

      if (from.email) {
        doc.text(from.email, margin, yLeft);
        yLeft += 4;
      }
      if (to.email) {
        doc.text(to.email, margin + halfWidth + 5, yRight);
        yRight += 4;
      }

      const fromLines = from.address
        ? doc.splitTextToSize(from.address, halfWidth - 5)
        : [];
      const toLines = to.address
        ? doc.splitTextToSize(to.address, halfWidth - 5)
        : [];

      if (fromLines.length > 0) {
        doc.text(fromLines, margin, yLeft);
      }
      if (toLines.length > 0) {
        doc.text(toLines, margin + halfWidth + 5, yRight);
      }

      y = Math.max(yLeft + fromLines.length * 4, yRight + toLines.length * 4) + 8;

      // --- Items Table ---
      // Table header
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, 8, "F");

      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 116, 139);

      const colDesc = margin + 2;
      const colQty = margin + contentWidth * 0.55;
      const colRate = margin + contentWidth * 0.7;
      const colAmt = margin + contentWidth - 2;

      doc.text("DESCRIPTION", colDesc, y + 5.5);
      doc.text("QTY", colQty, y + 5.5, { align: "right" });
      doc.text("RATE", colRate + 12, y + 5.5, { align: "right" });
      doc.text("AMOUNT", colAmt, y + 5.5, { align: "right" });

      y += 10;

      // Table rows
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      items.forEach((item) => {
        // Check if we need a new page
        if (y > 260) {
          doc.addPage();
          y = margin;
        }

        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);

        doc.setTextColor(51, 65, 85);
        const descLines = doc.splitTextToSize(
          item.description || "\u2014",
          contentWidth * 0.5
        );
        doc.text(descLines, colDesc, y + 5);

        doc.setTextColor(100, 116, 139);
        doc.text(String(item.quantity), colQty, y + 5, { align: "right" });
        doc.text(fmt(item.rate), colRate + 12, y + 5, { align: "right" });

        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(fmt(item.quantity * item.rate), colAmt, y + 5, {
          align: "right",
        });
        doc.setFont("helvetica", "normal");

        y += Math.max(descLines.length * 4, 6) + 3;
      });

      y += 4;

      // --- Totals ---
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(margin + contentWidth * 0.55, y, pageWidth - margin, y);
      y += 6;

      const totalsX = margin + contentWidth * 0.6;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text("Subtotal", totalsX, y);
      doc.setTextColor(15, 23, 42);
      doc.text(fmt(subtotal), colAmt, y, { align: "right" });
      y += 6;

      if (taxRate > 0) {
        doc.setTextColor(100, 116, 139);
        doc.text(`Tax (${taxRate}%)`, totalsX, y);
        doc.setTextColor(15, 23, 42);
        doc.text(fmt(tax), colAmt, y, { align: "right" });
        y += 6;
      }

      // Total line
      doc.setDrawColor(203, 213, 225);
      doc.line(margin + contentWidth * 0.55, y, pageWidth - margin, y);
      y += 7;

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Total", totalsX, y);
      doc.setTextColor(16, 185, 129);
      doc.text(fmt(total), colAmt, y, { align: "right" });

      y += 12;

      // --- Notes ---
      if (notes) {
        if (y > 250) {
          doc.addPage();
          y = margin;
        }
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;

        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(148, 163, 184);
        doc.text("NOTES", margin, y);
        y += 4;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        const noteLines = doc.splitTextToSize(notes, contentWidth);
        doc.text(noteLines, margin, y);
        y += noteLines.length * 4;
      }

      // --- Footer ---
      const footerY = doc.internal.pageSize.getHeight() - 12;
      doc.setFontSize(7);
      doc.setTextColor(203, 213, 225);
      doc.text(
        "Generated with FeeBreaker.com — Free Invoice Generator",
        pageWidth / 2,
        footerY,
        { align: "center" }
      );

      // Save
      const filename = `invoice-${invoiceNumber.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Invoice Generator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        Free Invoice Generator
      </h1>
      <p className="text-lg text-slate-500 max-w-2xl mb-8">
        Create professional invoices in seconds. Fill in the details below and
        download as PDF — no sign-up required.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Currency selector */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <p id="currency-label" className="block text-xs font-medium text-slate-500 mb-2">
              Currency
            </p>
            <div role="group" aria-labelledby="currency-label" className="flex flex-wrap gap-2">
              {Object.entries(currencySymbols).map(([code, symbol]) => (
                <button
                  key={code}
                  onClick={() => setCurrency(code)}
                  aria-pressed={currency === code}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition-all ${
                    currency === code
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-slate-500 hover:border-gray-300"
                  }`}
                >
                  {symbol} {code}
                </button>
              ))}
            </div>
          </div>

          {/* From / To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">
                From
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name or business"
                  aria-label="Your name or business"
                  value={from.name}
                  onChange={(e) => setFrom({ ...from, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Your email address"
                  value={from.email}
                  onChange={(e) => setFrom({ ...from, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <textarea
                  placeholder="123 Main St, City, ST 12345"
                  aria-label="Your address"
                  value={from.address}
                  onChange={(e) =>
                    setFrom({ ...from, address: e.target.value })
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">
                Bill To
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Client name or business"
                  aria-label="Client name or business"
                  value={to.name}
                  onChange={(e) => setTo({ ...to, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="email"
                  placeholder="client@email.com"
                  aria-label="Client email address"
                  value={to.email}
                  onChange={(e) => setTo({ ...to, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <textarea
                  placeholder="456 Oak Ave, City, ST 67890"
                  aria-label="Client address"
                  value={to.address}
                  onChange={(e) => setTo({ ...to, address: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Invoice details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="invoice-number" className="block text-xs font-medium text-slate-500 mb-1">
                  Invoice #
                </label>
                <input
                  id="invoice-number"
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="invoice-date" className="block text-xs font-medium text-slate-500 mb-1">
                  Invoice Date
                </label>
                <input
                  id="invoice-date"
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="due-date" className="block text-xs font-medium text-slate-500 mb-1">
                  Due Date
                </label>
                <input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Line items */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Items</h2>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-center"
                >
                  <div className="col-span-5">
                    {idx === 0 && (
                      <label className="block text-xs text-slate-400 mb-1" aria-hidden="true">
                        Description
                      </label>
                    )}
                    <input
                      type="text"
                      placeholder="Item description"
                      aria-label={`Item ${idx + 1} description`}
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="col-span-2">
                    {idx === 0 && (
                      <label className="block text-xs text-slate-400 mb-1" aria-hidden="true">
                        Qty
                      </label>
                    )}
                    <input
                      type="number"
                      aria-label={`Item ${idx + 1} quantity`}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "quantity",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      min="0"
                    />
                  </div>
                  <div className="col-span-3">
                    {idx === 0 && (
                      <label className="block text-xs text-slate-400 mb-1" aria-hidden="true">
                        Rate ({sym})
                      </label>
                    )}
                    <input
                      type="number"
                      aria-label={`Item ${idx + 1} rate in ${currency}`}
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "rate",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-span-1 text-right text-sm font-medium pt-4" aria-hidden="true">
                    {fmt(item.quantity * item.rate)}
                  </div>
                  <div className="col-span-1 pt-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-300 hover:text-red-400 text-lg"
                      aria-label={`Remove item ${idx + 1}`}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              + Add Item
            </button>
          </div>

          {/* Tax & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <label htmlFor="tax-rate" className="block text-xs font-medium text-slate-500 mb-1">
                Tax Rate (%)
              </label>
              <input
                id="tax-rate"
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                min="0"
                step="0.1"
              />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <label htmlFor="invoice-notes" className="block text-xs font-medium text-slate-500 mb-1">
                Notes
              </label>
              <textarea
                id="invoice-notes"
                placeholder="Payment terms, thank you note, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <div aria-live="polite" aria-label="Invoice preview" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="text-xs text-slate-400 mb-4">INVOICE PREVIEW</div>

              <div className="border-b border-gray-100 pb-4 mb-4">
                <h2 className="text-xl font-bold text-emerald-600">INVOICE</h2>
                <div className="text-xs text-slate-400 mt-1">
                  #{invoiceNumber}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div>
                  <div className="text-slate-400 mb-1">From</div>
                  <div className="font-semibold text-slate-900">
                    {from.name || "Your Name"}
                  </div>
                  <div className="text-slate-500">{from.email}</div>
                  <div className="text-slate-500 whitespace-pre-line">
                    {from.address}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 mb-1">Bill To</div>
                  <div className="font-semibold text-slate-900">
                    {to.name || "Client Name"}
                  </div>
                  <div className="text-slate-500">{to.email}</div>
                  <div className="text-slate-500 whitespace-pre-line">
                    {to.address}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div>
                  <span className="text-slate-400">Date: </span>
                  <span className="text-slate-700">{invoiceDate}</span>
                </div>
                <div>
                  <span className="text-slate-400">Due: </span>
                  <span className="text-slate-700">{dueDate || "\u2014"}</span>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-gray-100 pt-3">
                <div className="grid grid-cols-12 text-[10px] font-semibold text-slate-400 mb-2 uppercase">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-right">Qty</div>
                  <div className="col-span-2 text-right">Rate</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 text-xs py-1.5 border-t border-gray-50"
                  >
                    <div className="col-span-6 text-slate-700">
                      {item.description || "\u2014"}
                    </div>
                    <div className="col-span-2 text-right text-slate-500">
                      {item.quantity}
                    </div>
                    <div className="col-span-2 text-right text-slate-500">
                      {fmt(item.rate)}
                    </div>
                    <div className="col-span-2 text-right font-medium">
                      {fmt(item.quantity * item.rate)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 mt-4 pt-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium">{fmt(subtotal)}</span>
                </div>
                {taxRate > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Tax ({taxRate}%)</span>
                    <span className="font-medium">{fmt(tax)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-emerald-600">{fmt(total)}</span>
                </div>
              </div>

              {notes && (
                <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-slate-400">
                  <div className="font-medium mb-0.5">Notes</div>
                  {notes}
                </div>
              )}
            </div>

            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg
                    aria-hidden="true"
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
            <p className="text-xs text-slate-400 text-center mt-2">
              Instant PDF download — no sign-up or printing needed
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Is this invoice generator really free?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Yes, 100% free with no limitations. No account required, no
              watermarks on your invoices.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              How does the PDF download work?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Just click &quot;Download PDF&quot; and your invoice is generated
              right in your browser. Nothing is uploaded to a server — your
              data never leaves your device.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Is my data stored anywhere?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              No. Everything runs in your browser. We don&apos;t store, transmit,
              or have access to any information you enter.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Which currencies are supported?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              You can create invoices in USD, GBP, EUR, KRW, CAD, and AUD. The
              currency symbol appears on the PDF automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Related Tools</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/hourly"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Hourly Rate Calculator
          </Link>
          <Link
            href="/us/stripe"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Stripe Fee Calculator
          </Link>
          <Link
            href="/margin"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Profit Margin Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
