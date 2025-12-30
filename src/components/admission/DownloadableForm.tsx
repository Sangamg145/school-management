"use client";

import { useRef } from "react";

export default function DownloadableForm() {
  const formRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = formRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Admission Form - School Management System</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .header h1 { font-size: 18px; margin-bottom: 5px; }
          .header p { font-size: 12px; color: #666; }
          .photo-box { width: 100px; height: 120px; border: 1px solid #000; float: right; display: flex; align-items: center; justify-content: center; font-size: 10px; }
          .section { margin-bottom: 15px; }
          .section-title { font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px; font-size: 14px; }
          .field-row { display: flex; gap: 15px; margin-bottom: 8px; }
          .field { flex: 1; }
          .field label { display: block; font-size: 11px; margin-bottom: 3px; }
          .field .input-line { border-bottom: 1px solid #000; height: 20px; }
          .checkbox-group { display: flex; gap: 15px; flex-wrap: wrap; }
          .checkbox-item { display: flex; align-items: center; gap: 5px; font-size: 11px; }
          .checkbox-item input { width: 12px; height: 12px; }
          .declaration { font-size: 11px; margin: 15px 0; }
          .signature-row { display: flex; justify-content: space-between; margin-top: 30px; }
          .signature-box { text-align: center; }
          .signature-line { border-top: 1px solid #000; width: 150px; margin-top: 50px; padding-top: 5px; font-size: 11px; }
          .instructions { background: #f5f5f5; padding: 10px; font-size: 10px; margin-bottom: 15px; }
          .instructions h3 { font-size: 12px; margin-bottom: 5px; }
          .instructions ul { margin-left: 15px; }
          .office-use { border: 1px solid #000; padding: 10px; margin-top: 20px; }
          .office-use h3 { font-size: 12px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Download / Print Form
        </button>
      </div>

      {/* Form Preview */}
      <div ref={formRef} className="bg-white p-8 border rounded-lg shadow-sm">
        {/* Photo Box */}
        <div className="photo-box float-right border border-black w-24 h-28 flex items-center justify-center text-xs text-gray-500">
          Paste Photo
        </div>

        {/* Header */}
        <div className="header text-center mb-6">
          <h1 className="text-xl font-bold">SCHOOL MANAGEMENT SYSTEM</h1>
          <p className="text-sm text-gray-600">Address: 123 Education Lane, Knowledge City</p>
          <p className="text-sm text-gray-600">Phone: +91 1234567890 | Email: info@school.com</p>
          <h2 className="text-lg font-semibold mt-2 underline">ADMISSION FORM</h2>
          <p className="text-xs text-gray-500">Academic Year: 2024-25</p>
        </div>

        <div className="clear-both"></div>

        {/* Instructions */}
        <div className="instructions bg-gray-100 p-3 text-xs mb-4 rounded">
          <h3 className="font-semibold mb-1">Instructions:</h3>
          <ul className="list-disc ml-4 space-y-1">
            <li>Fill all fields in CAPITAL letters using black/blue pen</li>
            <li>Attach self-attested copies of all required documents</li>
            <li>Paste recent passport size photograph</li>
            <li>Incomplete forms will not be accepted</li>
          </ul>
        </div>

        {/* Section 1: Student Information */}
        <div className="section mb-6">
          <h3 className="section-title font-bold border-b border-black pb-1 mb-3">1. STUDENT INFORMATION</h3>
          
          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">First Name</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Middle Name</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Last Name</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>

          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Date of Birth (DD/MM/YYYY)</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Gender</label>
              <div className="checkbox-group flex gap-4 mt-1">
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> Male
                </label>
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> Female
                </label>
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> Other
                </label>
              </div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Blood Group</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>

          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Aadhaar Number</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Nationality</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Religion</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>

          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Category</label>
              <div className="checkbox-group flex gap-3 mt-1">
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> General
                </label>
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> OBC
                </label>
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> SC
                </label>
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> ST
                </label>
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> EWS
                </label>
              </div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Mother Tongue</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>

          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Class Applied For</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Previous School Name</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
        </div>

        {/* Section 2: Parent/Guardian Information */}
        <div className="section mb-6">
          <h3 className="section-title font-bold border-b border-black pb-1 mb-3">2. PARENT/GUARDIAN INFORMATION</h3>
          
          <p className="text-xs font-semibold mb-2">Father&apos;s Details:</p>
          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Name</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Occupation</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Contact Number</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
          <div className="field-row flex gap-4 mb-4">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Email</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Annual Income</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>

          <p className="text-xs font-semibold mb-2">Mother&apos;s Details:</p>
          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Name</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Occupation</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Contact Number</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
          <div className="field-row flex gap-4 mb-4">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Email</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>

          <p className="text-xs font-semibold mb-2">Guardian&apos;s Details (If applicable):</p>
          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Name</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Relationship</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Contact Number</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
        </div>

        {/* Section 3: Address Information */}
        <div className="section mb-6">
          <h3 className="section-title font-bold border-b border-black pb-1 mb-3">3. ADDRESS INFORMATION</h3>
          
          <p className="text-xs font-semibold mb-2">Permanent Address:</p>
          <div className="field mb-3">
            <label className="text-xs block mb-1">Address Line 1</label>
            <div className="input-line border-b border-black h-6"></div>
          </div>
          <div className="field mb-3">
            <label className="text-xs block mb-1">Address Line 2</label>
            <div className="input-line border-b border-black h-6"></div>
          </div>
          <div className="field-row flex gap-4 mb-4">
            <div className="field flex-1">
              <label className="text-xs block mb-1">City</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">State</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">PIN Code</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <input type="checkbox" className="w-3 h-3" />
            <span className="text-xs">Same as Permanent Address</span>
          </div>

          <p className="text-xs font-semibold mb-2">Correspondence Address:</p>
          <div className="field mb-3">
            <label className="text-xs block mb-1">Address Line 1</label>
            <div className="input-line border-b border-black h-6"></div>
          </div>
          <div className="field mb-3">
            <label className="text-xs block mb-1">Address Line 2</label>
            <div className="input-line border-b border-black h-6"></div>
          </div>
          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">City</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">State</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">PIN Code</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
        </div>

        {/* Section 4: Medical Information */}
        <div className="section mb-6">
          <h3 className="section-title font-bold border-b border-black pb-1 mb-3">4. MEDICAL INFORMATION</h3>
          
          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Any Medical Condition/Allergy</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Current Medications (if any)</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Emergency Contact Name</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Emergency Contact Number</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
        </div>

        {/* Section 5: Documents Checklist */}
        <div className="section mb-6">
          <h3 className="section-title font-bold border-b border-black pb-1 mb-3">5. DOCUMENTS CHECKLIST</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Birth Certificate
            </label>
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Aadhaar Card (Student)
            </label>
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Aadhaar Card (Parent)
            </label>
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Transfer Certificate
            </label>
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Previous Mark Sheet
            </label>
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Passport Size Photos (4)
            </label>
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Caste Certificate (if applicable)
            </label>
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Income Certificate (if applicable)
            </label>
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Medical Fitness Certificate
            </label>
            <label className="checkbox-item flex items-center gap-2 text-xs">
              <input type="checkbox" className="w-3 h-3" /> Migration Certificate (if applicable)
            </label>
          </div>
        </div>

        {/* Section 6: Declaration */}
        <div className="section mb-6">
          <h3 className="section-title font-bold border-b border-black pb-1 mb-3">6. DECLARATION</h3>
          
          <p className="declaration text-xs leading-relaxed mb-4">
            I hereby declare that the information provided in this application form is true and correct to the best of my knowledge and belief. I understand that any false or misleading information may result in the cancellation of admission. I agree to abide by the rules and regulations of the school. I understand that the school reserves the right to dismiss my ward for misconduct, irregular attendance, or non-payment of fees.
          </p>

          <div className="signature-row flex justify-between mt-8">
            <div className="signature-box text-center">
              <div className="signature-line border-t border-black w-36 pt-1 text-xs">Parent/Guardian Signature</div>
            </div>
            <div className="signature-box text-center">
              <div className="signature-line border-t border-black w-36 pt-1 text-xs">Date</div>
            </div>
            <div className="signature-box text-center">
              <div className="signature-line border-t border-black w-36 pt-1 text-xs">Place</div>
            </div>
          </div>
        </div>

        {/* Office Use Only */}
        <div className="office-use border border-black p-4 mt-6">
          <h3 className="text-sm font-bold mb-3">FOR OFFICE USE ONLY</h3>
          
          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Application Number</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Date of Receipt</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Received By</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
          <div className="field-row flex gap-4 mb-3">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Admission Status</label>
              <div className="checkbox-group flex gap-4 mt-1">
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> Approved
                </label>
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> Pending
                </label>
                <label className="checkbox-item flex items-center gap-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" /> Rejected
                </label>
              </div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Admission Number (if approved)</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
          <div className="field-row flex gap-4">
            <div className="field flex-1">
              <label className="text-xs block mb-1">Class Allotted</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Section Allotted</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
            <div className="field flex-1">
              <label className="text-xs block mb-1">Principal&apos;s Signature</label>
              <div className="input-line border-b border-black h-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
