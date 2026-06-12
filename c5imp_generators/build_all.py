"""
Builds the complete CVN C5IMP Administrative Tool Suite.

Creates the folder structure, runs the Word, Excel, and PowerPoint
generators, validates that every expected file exists, and prints a
final inventory.

Usage: python build_all.py [output_root]
Default output root: ../CVN_C5IMP_Admin_Tool_Suite
"""

import os
import sys

import gen_word
import gen_excel
import gen_pptx

FOLDERS = [
    "01_Word_Templates",
    "02_Excel_Tools",
    "03_SharePoint_Design_Brief",
    "04_SharePoint_Architecture",
    "05_User_Guides",
    "06_Metadata_and_Permissions",
    "07_Implementation_Roadmap",
]

EXPECTED = [
    "README.md",
    "01_Word_Templates/01_CVN_C5IMP_Program_Charter.docx",
    "01_Word_Templates/02_CVN_C5IMP_Governance_SOP.docx",
    "01_Word_Templates/03_CVN_C5I_Modernization_Intake_Form.docx",
    "01_Word_Templates/04_C5IMP_Change_Evaluation_Memorandum.docx",
    "01_Word_Templates/05_CVN_C5IMP_CCB_Charter.docx",
    "01_Word_Templates/06_Modernization_Readiness_Assessment.docx",
    "01_Word_Templates/07_Availability_Integration_Planning_Guide.docx",
    "01_Word_Templates/08_Stakeholder_Engagement_Plan.docx",
    "01_Word_Templates/09_C5IMP_Meeting_Minutes_Template.docx",
    "01_Word_Templates/10_Decision_Record_Template.docx",
    "01_Word_Templates/11_After_Action_Report_Template.docx",
    "02_Excel_Tools/01_C5IMP_Master_Modernization_Tracker.xlsx",
    "02_Excel_Tools/02_CVN_C5I_Baseline_Configuration_Register.xlsx",
    "02_Excel_Tools/03_C5IMP_Risk_Issue_Opportunity_Register.xlsx",
    "02_Excel_Tools/04_C5IMP_Action_Item_Tracker.xlsx",
    "02_Excel_Tools/05_Stakeholder_RACI_Matrix.xlsx",
    "02_Excel_Tools/06_C5IMP_Decision_Log.xlsx",
    "02_Excel_Tools/07_Availability_Integration_Tracker.xlsx",
    "02_Excel_Tools/08_C5I_Readiness_Assessment_Workbook.xlsx",
    "02_Excel_Tools/09_Meeting_Battle_Rhythm_Tracker.xlsx",
    "03_SharePoint_Design_Brief/CVN_C5IMP_SharePoint_Design_Brief.pptx",
    "04_SharePoint_Architecture/C5IMP_WebPart_Employment_Matrix.xlsx",
    "04_SharePoint_Architecture/SharePoint_Site_Structure.md",
    "05_User_Guides/12_C5IMP_SharePoint_User_Guide.docx",
    "06_Metadata_and_Permissions/"
    "10_SharePoint_Content_Inventory_and_Metadata_Plan.xlsx",
    "07_Implementation_Roadmap/C5IMP_Implementation_Roadmap.docx",
]


def main(root):
    root = os.path.abspath(root)
    print(f"Building CVN C5IMP Administrative Tool Suite -> {root}\n")
    for f in FOLDERS:
        os.makedirs(os.path.join(root, f), exist_ok=True)

    print("Word templates:")
    gen_word.build_all(root)
    print("\nExcel workbooks:")
    gen_excel.build_all(root)
    print("\nPowerPoint brief:")
    gen_pptx.build_all(root)

    print("\nValidation:")
    missing = []
    inventory = []
    for rel in EXPECTED:
        path = os.path.join(root, rel)
        if os.path.isfile(path):
            inventory.append((rel, os.path.getsize(path)))
        else:
            missing.append(rel)

    print(f"\nFinal inventory ({len(inventory)} files):")
    for rel, size in inventory:
        print(f"  {size:>9,} bytes  {rel}")

    if missing:
        print(f"\nMISSING ({len(missing)}):")
        for rel in missing:
            print(f"  {rel}")
        sys.exit(1)
    print("\nAll expected files present. Build complete.")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else
         os.path.join(os.path.dirname(__file__), "..",
                      "CVN_C5IMP_Admin_Tool_Suite"))
