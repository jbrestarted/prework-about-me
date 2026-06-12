# C5IMP SharePoint Site Structure Reference

**DRAFT - UNCLASSIFIED - Template/placeholder content only. Not official policy.**

This file is the quick-reference build map for the C5IMP SharePoint site. The
authoritative build specification is
`06_Metadata_and_Permissions/10_SharePoint_Content_Inventory_and_Metadata_Plan.xlsx`;
the page assembly detail is `C5IMP_WebPart_Employment_Matrix.xlsx` in this folder.

## Site Pages (navigation order)

```
C5IMP Site (Communication Site recommended)
├── Home
├── Modernization Dashboard
├── Intake and Change Review
├── Configuration Baseline
├── Availability Integration
├── Risks / Issues / Actions
├── Governance and Meetings
├── Decisions and CCB                 (restricted content)
├── Readiness Assessments
├── References and Templates
└── Lessons Learned
```

## Libraries and Lists

| Container | Type | Key Controls |
|---|---|---|
| Program Documents | Library | Major versioning, check-out, content approval |
| Templates | Library | Read-only for users; owner-managed |
| Modernization Trackers | Library | Browser editing only; version history |
| Configuration Baseline | Library | CM-staff edit; Decision Record required for change |
| Decision Records | Library | Unique permissions (Restricted Decision Records Group) |
| Meeting Records | Library | Filed by series/date metadata |
| Lessons Learned | Library | Metadata-driven search |
| Intake List | List | Pairs with intake form; triage views |
| Action Items List | List | Overdue and by-organization views |
| Risk List | List | High-risk dashboard view |
| Stakeholder Directory | List | Feeds People web parts |
| Battle Rhythm Calendar | List (events) | Feeds Events web parts |

## SharePoint Folder Convention (within libraries)

Keep folder depth minimal; metadata views do the organizing. Where folders are
unavoidable (e.g., Meeting Records), use:

```
Meeting Records/
├── ESB/        └── YYYY/
├── CCB/        └── YYYY/
├── OIPT/       └── YYYY/
├── WIPT/       └── YYYY/
├── AVWG/       └── YYYY/
└── Readiness_Review/ └── YYYY/
```

## File Naming Convention

`<DocID>_<ShortTitle>_<Hull-or-Class>_<YYYYMMDD>_v<NN>.<ext>`

Example: `C5IMP-DR-2026-004_CommsUpgradeApproval_CVN-XX_20260219_v01.docx`

## Local Folder ↔ SharePoint Upload Mapping

| Local suite folder | Upload destination |
|---|---|
| 01_Word_Templates | Templates Library (blank) / Program Documents (signed) |
| 02_Excel_Tools | Modernization Trackers Library |
| 03_SharePoint_Design_Brief | Program Documents Library |
| 04_SharePoint_Architecture | Program Documents Library (site-owner reference) |
| 05_User_Guides | References and Templates page / Templates Library |
| 06_Metadata_and_Permissions | Program Documents Library (site-owner reference) |
| 07_Implementation_Roadmap | Program Documents Library |
