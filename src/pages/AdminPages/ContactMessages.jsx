import React, { useEffect, useState } from "react";
import useContactMessageStore from "../../store/useContactMessageStore";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ITEMS_PER_PAGE = 10;

const ContactMessages = () => {
  const { messages, fetchAllMessages, deleteMessage, loading, error } = useContactMessageStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" }); // success | error

// Auto-hide toast after 3 seconds
useEffect(() => {
  if (toast.show) {
    const timer = setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [toast]);

  // Modal state
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with selected message
  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  // Close modal on ESC or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) closeModal();
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  useEffect(() => {
    fetchAllMessages();
  }, [fetchAllMessages]);

  // Filter messages by search term
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMessages = filteredMessages.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredMessages.map((msg) => ({
        Name: msg.name,
        Email: msg.email,
        Message: msg.message,
        "Submitted At": new Date(msg.createdAt).toLocaleString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Messages");
    XLSX.writeFile(workbook, "contact-messages.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Contact Messages Report", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);

    doc.autoTable({
      head: [["Name", "Email", "Message", "Submitted At"]],
      body: filteredMessages.map((msg) => [
        msg.name,
        msg.email,
        msg.message.length > 50 ? msg.message.substring(0, 50) + "..." : msg.message,
        new Date(msg.createdAt).toLocaleString(),
      ]),
      startY: 30,
      theme: "grid",
      styles: { font: "helvetica", fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] }, // blue-600
    });

    doc.save("contact-messages.pdf");
  };

  if (loading && currentPage === 1) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-6xl mx-auto text-center"
      >
        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-800">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Failed to load messages</h3>
          <p className="text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={() => fetchAllMessages()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Contact Messages ({filteredMessages.length})
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2">
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6H7v2h6V6zm0 4H7v2h6v-2zm0 4H7v2h6v-2z" />
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v12a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1-1zm1 2h12v12H4V5z"
                  clipRule="evenodd"
                />
              </svg>
              Excel
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center border border-gray-200 dark:border-gray-700">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No messages found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {searchTerm ? "Try adjusting your search." : "Messages you receive will appear here."}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Message Preview
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Submitted At
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {currentMessages.map((msg) => (
                    <tr key={msg._id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {msg.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {msg.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                        <div className="max-w-md line-clamp-2">{msg.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(msg.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openModal(msg)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
                        >
                          View Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(startIndex + ITEMS_PER_PAGE, filteredMessages.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredMessages.length}</span> results
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border ${
                      currentPage === 1
                        ? "border-gray-300 text-gray-400 cursor-not-allowed dark:border-gray-600 dark:text-gray-500"
                        : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
                    }`}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded border ${
                            currentPage === page
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 py-1 text-gray-500 dark:text-gray-400">...</span>;
                    }
                    return null;
                  })}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded border ${
                      currentPage === totalPages
                        ? "border-gray-300 text-gray-400 cursor-not-allowed dark:border-gray-600 dark:text-gray-500"
                        : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Detail Modal */}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Message Details</h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{selectedMessage.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                <p className="mt-1 text-lg font-mono text-gray-800 dark:text-gray-200 break-all">
                  {selectedMessage.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Submitted At</label>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {new Date(selectedMessage.createdAt).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Full Message</label>
                <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>

          {/* Footer */}
<div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 flex justify-between border-t border-gray-200 dark:border-gray-700">
<button
  onClick={async () => {
    if (window.confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
      await deleteMessage(selectedMessage._id);
      
      // Show toast based on store state
      if (!error) {
        setToast({
          show: true,
          message: "Message deleted successfully",
          type: "success",
        });
      } else {
        setToast({
          show: true,
          message: error,
          type: "error",
        });
      }

      closeModal();
    }
  }}
  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition flex items-center gap-2"
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
  Delete Message
</button>

  <button
    onClick={closeModal}
    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  >
    Close
  </button>
</div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ContactMessages;