/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./PDFSearchControl/index.ts":
/*!***********************************!*\
  !*** ./PDFSearchControl/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EmailPdfViewer: () => (/* binding */ EmailPdfViewer)\n/* harmony export */ });\nvar __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\nclass EmailPdfViewer {\n  constructor() {\n    // State for multiple attachments\n    this._attachments = [];\n    this._currentIndex = 0;\n  }\n  init(context, notifyOutputChanged, state, container) {\n    var _a;\n    this._context = context;\n    this._container = container;\n    // Use the context entity ID\n    this._accountId = (_a = context.mode.contextInfo) === null || _a === void 0 ? void 0 : _a.entityId;\n    this.loadPdf();\n  }\n  updateView(context) {\n    var _a;\n    var newId = (_a = context.mode.contextInfo) === null || _a === void 0 ? void 0 : _a.entityId;\n    if (newId !== this._accountId) {\n      this._accountId = newId;\n      this.loadPdf();\n    }\n  }\n  loadPdf() {\n    return __awaiter(this, void 0, void 0, function* () {\n      if (!this._accountId) {\n        this._container.innerHTML = \"<div style=\\\"padding:20px; color:red;\\\">No Record ID found.</div>\";\n        return;\n      }\n      this._container.innerHTML = \"<div style=\\\"padding:20px; color:#666;\\\">Searching for PDF attachments...</div>\";\n      try {\n        this._attachments = yield this.fetchAllEmailAttachments(this._accountId);\n        if (this._attachments.length === 0) {\n          this._container.innerHTML = \"<div style=\\\"padding:20px; color:#a00;\\\">No PDF attachments found on this record.</div>\";\n          return;\n        }\n        this._currentIndex = 0;\n        this.renderLayout();\n      } catch (e) {\n        this._container.innerHTML = \"<div style=\\\"padding:20px; color:red;\\\">Error: \".concat(String(e), \"</div>\");\n      }\n    });\n  }\n  fetchAllEmailAttachments(emailId) {\n    return __awaiter(this, void 0, void 0, function* () {\n      // Query attachments related to the object (email) where type is PDF\n      var filter = \"?$filter=_objectid_value eq \".concat(emailId, \" and mimetype eq 'application/pdf'&$select=body,filename\");\n      var result = yield this._context.webAPI.retrieveMultipleRecords(\"activitymimeattachment\", filter);\n      return result.entities.map(attachment => {\n        var byteCharacters = atob(attachment.body);\n        var byteNumbers = new Uint8Array(byteCharacters.length);\n        for (var i = 0; i < byteCharacters.length; i++) {\n          byteNumbers[i] = byteCharacters.charCodeAt(i);\n        }\n        return {\n          blob: new Blob([byteNumbers], {\n            type: \"application/pdf\"\n          }),\n          fileName: attachment.filename || \"attachment.pdf\"\n        };\n      });\n    });\n  }\n  renderLayout() {\n    this._container.innerHTML = \"\";\n    this._container.style.display = \"flex\";\n    this._container.style.flexDirection = \"column\";\n    this._container.style.height = \"700px\";\n    this._container.style.border = \"1px solid #d2d0ce\";\n    // --- 1. SMART HEADER ---\n    var header = document.createElement(\"div\");\n    header.style.display = \"flex\";\n    header.style.justifyContent = \"space-between\";\n    header.style.alignItems = \"center\";\n    header.style.padding = \"8px 16px\";\n    header.style.backgroundColor = \"#f3f2f1\";\n    header.style.borderBottom = \"1px solid #d2d0ce\";\n    header.style.fontFamily = \"'Segoe UI', sans-serif\";\n    var title = document.createElement(\"div\");\n    title.innerHTML = \"<span style=\\\"font-weight:600; font-size:14px; color:#323130;\\\">Ifisol PDF Viewer</span> \\n                           <span style=\\\"margin-left:10px; color:#605e5c; font-size:12px;\\\">(\".concat(this._attachments[this._currentIndex].fileName, \")</span>\");\n    var navGroup = document.createElement(\"div\");\n    navGroup.style.display = \"flex\";\n    navGroup.style.alignItems = \"center\";\n    navGroup.style.gap = \"8px\";\n    var statusText = document.createElement(\"span\");\n    statusText.style.fontSize = \"12px\";\n    statusText.innerText = \"\".concat(this._currentIndex + 1, \" of \").concat(this._attachments.length);\n    var btnBase = \"padding:4px 12px; font-size:12px; cursor:pointer; border:1px solid #8a8886; background:#fff; border-radius:2px;\";\n    var prevBtn = document.createElement(\"button\");\n    prevBtn.innerText = \"Previous\";\n    prevBtn.setAttribute(\"style\", btnBase);\n    prevBtn.disabled = this._currentIndex === 0;\n    prevBtn.onclick = () => {\n      this._currentIndex--;\n      this.renderLayout();\n    };\n    var nextBtn = document.createElement(\"button\");\n    nextBtn.innerText = \"Next\";\n    nextBtn.setAttribute(\"style\", btnBase);\n    nextBtn.disabled = this._currentIndex === this._attachments.length - 1;\n    nextBtn.onclick = () => {\n      this._currentIndex++;\n      this.renderLayout();\n    };\n    navGroup.appendChild(statusText);\n    navGroup.appendChild(prevBtn);\n    navGroup.appendChild(nextBtn);\n    header.appendChild(title);\n    header.appendChild(navGroup);\n    this._container.appendChild(header);\n    // --- 2. VIEWER AREA (IFRAME) ---\n    var viewerContainer = document.createElement(\"div\");\n    viewerContainer.style.flex = \"1\";\n    viewerContainer.style.position = \"relative\";\n    this._container.appendChild(viewerContainer);\n    this.injectIframe(viewerContainer, this._attachments[this._currentIndex].blob);\n  }\n  injectIframe(parent, blob) {\n    var base = Xrm.Utility.getGlobalContext().getClientUrl();\n    var blobUrl = URL.createObjectURL(blob);\n    var workerUrl = \"\".concat(base, \"/WebResources/ifi_pdfjs/pdf.worker.min.js\");\n    var displayUrl = \"\".concat(base, \"/WebResources/ifi_pdfjs/pdf.min.js\");\n    var viewerUrl = \"\".concat(base, \"/WebResources/ifi_viewer\") + \"?file=\".concat(encodeURIComponent(blobUrl)) + \"&worker=\".concat(encodeURIComponent(workerUrl)) + \"&display=\".concat(encodeURIComponent(displayUrl));\n    var iframe = document.createElement(\"iframe\");\n    iframe.src = viewerUrl;\n    iframe.style.width = \"100%\";\n    iframe.style.height = \"100%\";\n    iframe.style.border = \"none\";\n    iframe.setAttribute(\"sandbox\", \"allow-scripts allow-same-origin\");\n    parent.appendChild(iframe);\n  }\n  getOutputs() {\n    return {};\n  }\n  destroy() {}\n}\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./PDFSearchControl/index.ts?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./PDFSearchControl/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = __webpack_exports__;
/******/ 	
/******/ })()
;
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('Ifisol.EmailPdfViewer', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.EmailPdfViewer);
} else {
	var Ifisol = Ifisol || {};
	Ifisol.EmailPdfViewer = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.EmailPdfViewer;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}