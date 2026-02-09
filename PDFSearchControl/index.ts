import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class EmailPdfViewer implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container!: HTMLDivElement;
    private _context!: ComponentFramework.Context<IInputs>;
    private _accountId?: string;
    
    // State for multiple attachments
    private _attachments: { blob: Blob, fileName: string }[] = [];
    private _currentIndex: number = 0;

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._context = context;
        this._container = container;
        // Use the context entity ID
        this._accountId = (context.mode as any).contextInfo?.entityId;

        this.loadPdf();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const newId = (context.mode as any).contextInfo?.entityId;
        if (newId !== this._accountId) {
            this._accountId = newId;
            this.loadPdf();
        }
    }

    private async loadPdf(): Promise<void> {
        if (!this._accountId) {
            this._container.innerHTML = `<div style="padding:20px; color:red;">No Record ID found.</div>`;
            return;
        }

        this._container.innerHTML = `<div style="padding:20px; color:#666;">Searching for PDF attachments...</div>`;

        try {
            this._attachments = await this.fetchAllEmailAttachments(this._accountId);

            if (this._attachments.length === 0) {
                this._container.innerHTML = `<div style="padding:20px; color:#a00;">No PDF attachments found on this record.</div>`;
                return;
            }

            this._currentIndex = 0;
            this.renderLayout();
        } catch (e) {
            this._container.innerHTML = `<div style="padding:20px; color:red;">Error: ${String(e)}</div>`;
        }
    }

    private async fetchAllEmailAttachments(emailId: string): Promise<{ blob: Blob, fileName: string }[]> {
        // Query attachments related to the object (email) where type is PDF
        const filter = `?$filter=_objectid_value eq ${emailId} and mimetype eq 'application/pdf'&$select=body,filename`;
        const result = await this._context.webAPI.retrieveMultipleRecords("activitymimeattachment", filter);

        return result.entities.map(attachment => {
            const byteCharacters = atob(attachment.body);
            const byteNumbers = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            return {
                blob: new Blob([byteNumbers], { type: "application/pdf" }),
                fileName: attachment.filename || "attachment.pdf"
            };
        });
    }

    private renderLayout(): void {
        this._container.innerHTML = "";
        this._container.style.display = "flex";
        this._container.style.flexDirection = "column";
        this._container.style.height = "700px"; 
        this._container.style.border = "1px solid #d2d0ce";

        // --- 1. SMART HEADER ---
        const header = document.createElement("div");
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";
        header.style.padding = "8px 16px";
        header.style.backgroundColor = "#f3f2f1"; 
        header.style.borderBottom = "1px solid #d2d0ce";
        header.style.fontFamily = "'Segoe UI', sans-serif";

        const title = document.createElement("div");
        title.innerHTML = `<span style="font-weight:600; font-size:14px; color:#323130;">Ifisol PDF Viewer</span> 
                           <span style="margin-left:10px; color:#605e5c; font-size:12px;">(${this._attachments[this._currentIndex].fileName})</span>`;

        const navGroup = document.createElement("div");
        navGroup.style.display = "flex";
        navGroup.style.alignItems = "center";
        navGroup.style.gap = "8px";

        const statusText = document.createElement("span");
        statusText.style.fontSize = "12px";
        statusText.innerText = `${this._currentIndex + 1} of ${this._attachments.length}`;

        const btnBase = "padding:4px 12px; font-size:12px; cursor:pointer; border:1px solid #8a8886; background:#fff; border-radius:2px;";
        
        const prevBtn = document.createElement("button");
        prevBtn.innerText = "Previous";
        prevBtn.setAttribute("style", btnBase);
        prevBtn.disabled = this._currentIndex === 0;
        prevBtn.onclick = () => { this._currentIndex--; this.renderLayout(); };

        const nextBtn = document.createElement("button");
        nextBtn.innerText = "Next";
        nextBtn.setAttribute("style", btnBase);
        nextBtn.disabled = this._currentIndex === this._attachments.length - 1;
        nextBtn.onclick = () => { this._currentIndex++; this.renderLayout(); };

        navGroup.appendChild(statusText);
        navGroup.appendChild(prevBtn);
        navGroup.appendChild(nextBtn);

        header.appendChild(title);
        header.appendChild(navGroup);
        this._container.appendChild(header);

        // --- 2. VIEWER AREA (IFRAME) ---
        const viewerContainer = document.createElement("div");
        viewerContainer.style.flex = "1"; 
        viewerContainer.style.position = "relative";
        this._container.appendChild(viewerContainer);

        this.injectIframe(viewerContainer, this._attachments[this._currentIndex].blob);
    }

    private injectIframe(parent: HTMLDivElement, blob: Blob): void {
        const base = Xrm.Utility.getGlobalContext().getClientUrl();
        const blobUrl = URL.createObjectURL(blob);
        const workerUrl  = `${base}/WebResources/ifi_pdfjs/pdf.worker.min.js`;
        const displayUrl = `${base}/WebResources/ifi_pdfjs/pdf.min.js`;

        const viewerUrl = `${base}/WebResources/ifi_viewer` + 
            `?file=${encodeURIComponent(blobUrl)}` +
            `&worker=${encodeURIComponent(workerUrl)}` +
            `&display=${encodeURIComponent(displayUrl)}`;

        const iframe = document.createElement("iframe");
        iframe.src = viewerUrl;
        iframe.style.width = "100%";
        iframe.style.height = "100%"; 
        iframe.style.border = "none";
        
        iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
        
        parent.appendChild(iframe);
    }

    public getOutputs(): IOutputs { return {}; }
    public destroy(): void {}
}