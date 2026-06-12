# CVN C5IMP Administrative Tool Suite

**DRAFT - UNCLASSIFIED - Template/placeholder content only. Not official policy.**

A complete administrative tool suite for managing Aircraft Carrier C5I
Modernization Program (C5IMP) activities from both a NAVSEA and TYCOM
perspective: Word governance templates, Excel trackers, a SharePoint design
brief, and the architecture products needed to stand up and operate the C5IMP
SharePoint site.

All hulls, systems, stakeholders, schedules, and program names are fictional
placeholders (e.g., `[CVN-XX]`, `[SATCOM Terminal A]`, `[PMW Placeholder]`).
Replace placeholders and obtain proper review before operational use.

## Purpose

- Centralize modernization control: one master tracker, one baseline register,
  one action list, one decision log.
- Enforce governance discipline: charters, SOP, CCB process, battle rhythm,
  standardized minutes and decision records.
- Provide decision traceability from intake through baseline update.
- Align TYCOM readiness governance with NAVSEA/PEO/PMW acquisition execution.

## Folder Contents

| Folder | Contents |
|---|---|
| `01_Word_Templates` | 11 governance templates: Program Charter, Governance SOP, Intake Form, Change Evaluation Memorandum, CCB Charter, Modernization Readiness Assessment, Availability Integration Planning Guide, Stakeholder Engagement Plan, Meeting Minutes, Decision Record, After Action Report |
| `02_Excel_Tools` | 9 trackers: Master Modernization Tracker, Baseline Configuration Register, Risk/Issue/Opportunity Register, Action Item Tracker, Stakeholder RACI Matrix, Decision Log, Availability Integration Tracker, Readiness Assessment Workbook, Battle Rhythm Tracker |
| `03_SharePoint_Design_Brief` | `CVN_C5IMP_SharePoint_Design_Brief.pptx` - 16-slide brief for leadership/site-owner approval |
| `04_SharePoint_Architecture` | Web Part Employment Matrix (page-by-page build sheet) and the site structure reference |
| `05_User_Guides` | SharePoint User Guide (site organization, trackers, intake, views, dashboards) |
| `06_Metadata_and_Permissions` | SharePoint Content Inventory and Metadata Plan workbook (libraries, lists, columns, views, permission groups, web parts, page mapping) |
| `07_Implementation_Roadmap` | Phased implementation roadmap document |

Every Word template carries consistent styles, headers/footers, a document
control table, revision history, and an approval table. Every workbook uses
Excel tables, freeze panes, dropdown data validation backed by named ranges,
conditional formatting (overdue, high-risk, blocked, pending decision,
complete), example placeholder rows, and an Instructions tab. No macros are
used.

## How to Upload to SharePoint

1. Build the site per the Design Brief and the Content Inventory workbook
   (pages, libraries, lists, metadata, permission groups) **before** uploading.
2. Upload in this order:
   1. `06` Content Inventory workbook and `04` architecture products → Program
      Documents Library (site-owner working set).
   2. `01` Word templates and `05` User Guide → Templates Library (blank,
      read-only for users).
   3. `02` Excel trackers → Modernization Trackers Library (these become the
      live, authoritative trackers - edit in browser only).
   4. `03` Design Brief and `07` Roadmap → Program Documents Library.
3. Apply required metadata at upload (Document Type, Owner, Status, Review
   Date; Hull/System Category where applicable).
4. Configure the named views from the Content Inventory `Views` tab, then
   assemble pages per the Web Part Employment Matrix.

## Recommended Document Libraries

Program Documents, Templates, Modernization Trackers, Configuration Baseline,
Decision Records (unique permissions), Meeting Records, Lessons Learned, plus
lists: Intake, Action Items, Risk, Stakeholder Directory, Battle Rhythm
Calendar. Full specifications are in the Content Inventory workbook.

## Recommended Metadata

Hull, System Category, Program Office, Document Type, Status, Decision
Authority, Availability, Fiscal Year, Classification/Handling Caveat
(placeholder - tailor per command guidance), Owner, Review Date, Last Updated,
CCB Required, Readiness Impact.

## Recommended Web Parts

Hero (Home navigation), Quick Links (workflows/templates), Document Library
(named views only), List (actions/risks/decisions), Highlighted Content
(recent/high-priority), News, Events (battle rhythm), People (POCs), Text
(process guidance), Embed/Power BI placeholder, Forms placeholder (tenant
policy permitting). Page-by-page employment is in
`04_SharePoint_Architecture/C5IMP_WebPart_Employment_Matrix.xlsx`.

## Recommended Governance Rhythm

| Forum | Cadence |
|---|---|
| Intake Triage | Weekly |
| WIPTs | Bi-weekly |
| OIPT | Monthly |
| CCB | Monthly |
| Availability Integration WG | Bi-weekly (weekly in execution) |
| Readiness Review | Per availability milestone |
| Executive Steering Board | Quarterly |
| Modernization Status Report | Monthly |

Trackers are updated within 2 business days of any governance event; minutes
and decision records are filed within 5 business days.

## Assumptions

- SharePoint Online (or comparable on-premises version) with modern pages and
  the standard web part set is available.
- Tenant policy on Forms and Power BI web parts is undetermined; both are
  treated as placeholders with list-based and Excel-based fallbacks.
- The Excel trackers are the system of record initially; SharePoint lists
  mirror selected data for web part views. Programs may later migrate tracker
  data fully into lists.
- Users edit trackers in Excel for the web to avoid conflicting copies.

## Limitations

- Templates are drafts requiring command tailoring, legal/security review, and
  signature before use; they do not implement or imply official policy.
- No classified or CUI content is included; classification/handling fields are
  placeholders only. Confirm the hosting environment is approved for the
  intended data before populating.
- Workbooks contain no macros; cross-tab automation (e.g., rollup counts) is
  illustrative and maintained manually or via simple formulas.
- Example rows are fictional and must be deleted before live use.

## Next Steps

1. Approve the Design Brief; designate 2-3 site owners.
2. Confirm tenant policy for Forms/Power BI web parts.
3. Execute Roadmap Phases 1-6 (site shell → web parts).
4. Pilot with one CVN availability ([CVN-XX] [PIA FY2X placeholder]); run one
   full intake-to-decision-to-execution cycle on the site.
5. Hold a pilot After Action Review; refine SOP/CCB Charter; expand fleet-wide.

## Regenerating the Suite

The suite is generated by Python scripts in `../c5imp_generators/`
(python-docx, openpyxl, python-pptx):

```bash
pip install python-docx openpyxl python-pptx
python c5imp_generators/build_all.py CVN_C5IMP_Admin_Tool_Suite
```

`build_all.py` rebuilds all artifacts, validates the full manifest, and prints
the file inventory.
