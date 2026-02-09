This PCF control allows users to view PDF attachments stored on Email records directly within a model-driven form in Dynamics 365. It provides a seamless experience for users to view multiple PDF attachments without the need to download any files.

**Key Features:**
- Automatically loads the PDF associated with the email record
- Next / Previous buttons to navigate between multiple attachments on the same email
- Search functionality to find words within the PDF, with Next / Previous buttons for search results
- Paging support for multi-page PDFs
- Works entirely within the form — no need to navigate away or download files
- Improves productivity by giving instant access to important attachments

## Installation

### Import Solution
1. You can download the managed solution directly using the link below:
   [Download the PDF Viewer Control Solution](<https://github.com/Zahab-Ifisol/pdf-viewer-email-pcf/blob/main/SolutionZahab_1_3_managed.zip>)
2. Go to the Power Apps Maker Portal.
3. Select the correct environment from the top right corner.
4. Navigate to **Solutions** in the left sidebar.
5. Click **Import solution** in the top header.
6. Click **Browse** and select the downloaded solution zip file.
7. Click **Next** and follow the on-screen instructions to finish the import.

### Add to Model-Driven App
1. Open the target form for the Email entity in editing mode.
2. Select the field (file column) where the PDF Viewer will be applied.
3. Choose **Control** 
4. Configure any control properties if required.
5. Save and publish the form.

## Usage
- Open any Email record with PDF attachments.
- The PDF Viewer control will automatically load the first attachment.
- Use the **Next / Previous buttons** to navigate between multiple attachments.
- Use the **search functionality** to find specific words within the PDF with **Next / Previous buttons**.
- Page through large PDFs using the built-in paging support.
- View attachments directly in the form without downloading or leaving the page.

## Creator
Zahab Imran

## License
This project is licensed under the MIT License.


