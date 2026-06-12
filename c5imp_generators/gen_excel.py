"""
Generates the Excel workbooks for the CVN C5IMP Administrative Tool Suite.

Workbooks 1-9 -> 02_Excel_Tools
Workbook 10 (SharePoint Content Inventory and Metadata Plan)
          -> 06_Metadata_and_Permissions
Web Part Employment Matrix (Deliverable 4) -> 04_SharePoint_Architecture

Usage: python gen_excel.py <output_root>
"""

import os
import sys

from helpers_xlsx import (new_workbook, add_table_sheet,
                          add_instructions_sheet, add_overdue_rule,
                          RED_FILL, YELLOW_FILL, GREEN_FILL, ORANGE_FILL)

# Standard conditional-format rule sets keyed by header name
STATUS_RULES = [("Status", "Blocked", ORANGE_FILL),
                ("Status", "Pending Decision", YELLOW_FILL),
                ("Status", "On Hold", YELLOW_FILL),
                ("Status", "Complete", GREEN_FILL)]
PRI_RULES = [("Priority", "Critical", RED_FILL),
             ("Priority", "High", YELLOW_FILL)]
RISK_RULES = [("Risk Level", "High", RED_FILL),
              ("Risk Level", "Moderate", YELLOW_FILL),
              ("Risk Level", "Low", GREEN_FILL)]
DEC_RULES = [("Decision Status", "Pending Decision", YELLOW_FILL),
             ("Decision Status", "Approved", GREEN_FILL),
             ("Decision Status", "Disapproved", RED_FILL),
             ("Decision Status", "Deferred", ORANGE_FILL)]

V = {  # common validation mappings (header -> named range)
    "Status": "StatusList", "Priority": "PriorityList",
    "Risk Level": "RiskLevelList", "Hull": "HullList",
    "System Category": "SystemCategoryList", "Owner Org": "OrgList",
    "Lead Org": "OrgList", "Sponsor Org": "OrgList",
    "Decision Status": "DecisionStatusList", "Document Type": "DocTypeList",
    "Availability Type": "AvailTypeList", "Rating": "RatingList",
    "CCB Required": "YesNoList",
}


def _save(wb, path):
    wb.save(path)
    print(f"  [xlsx] {path}")


# ----------------------------------------------------------------------
# 1. Master Modernization Tracker
# ----------------------------------------------------------------------
def wb_master_tracker(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5IMP Master Modernization Tracker",
        "Single authoritative tracker for all CVN C5I modernization items "
        "from intake through execution closure. Feeds the Modernization "
        "Dashboard page and the monthly Modernization Status Report.",
        ["Add each new item on the Modernization Items tab using the next "
         "C5IMP-MOD-YYYY-NNN number; never reuse numbers.",
         "Record hull applicability on the Hull Applicability tab (one row "
         "per item-hull pair) and system mapping on System Applicability.",
         "Maintain availability linkage on Schedule Integration and "
         "decision posture on Decision Status.",
         "Record predecessor/successor relationships on the Dependencies "
         "tab; the dashboard 'blocked' view is driven from it.",
         "Use table filters and slicers for hull or system cuts; do not "
         "create per-hull copies of this workbook."])

    cols = ["Item ID", "Title", "Description", "Sponsor Org",
            "System Category", "Priority", "Status", "Phase",
            "Target Availability", "Need Date", "Lead Org", "Action Officer",
            "Last Updated", "Notes"]
    rows = [
        ["C5IMP-MOD-2026-001", "[Comms suite upgrade placeholder]",
         "[Replace legacy transceiver group with modernized variant]",
         "TYCOM N6", "Communications", "High", "In Progress",
         "Execution", "CVN-XX PIA FY2X", "2026-09-15", "PEO C4I/PMW",
         "[AO Name]", "2026-06-01", "[Placeholder]"],
        ["C5IMP-MOD-2026-002", "[Network backbone refresh placeholder]",
         "[Fiber backbone and switch refresh, increments 1-2]",
         "NAVSEA", "Networks", "Critical", "Pending Decision",
         "Stakeholder Review", "CVN-YY DPIA FY2X", "2026-11-01",
         "NAVSEA", "[AO Name]", "2026-06-05", "[Awaiting CCB]"],
        ["C5IMP-MOD-2026-003", "[ISR processing update placeholder]",
         "[Processor and display update for ISR node]", "PEO C4I/PMW",
         "ISR", "Medium", "Not Started", "Intake", "CVN-ZZ CIA FY2X",
         "2027-03-01", "PEO C4I/PMW", "[AO Name]", "2026-05-20",
         "[Placeholder]"]]
    ws = add_table_sheet(wb, "Modernization Items", cols, rows,
                         widths=[18, 28, 36, 14, 16, 10, 16, 16, 16, 12,
                                 14, 14, 12, 24],
                         validations=V,
                         cond_rules=STATUS_RULES + PRI_RULES)
    add_overdue_rule(ws, "Need Date", "Status", cols, len(rows) + 15)

    add_table_sheet(wb, "Hull Applicability",
        ["Item ID", "Hull", "Applicability", "Install Sequence",
         "Planned Availability", "Status", "Notes"],
        [["C5IMP-MOD-2026-001", "CVN-XX", "Applies", "1",
          "PIA FY2X", "In Progress", "[Placeholder]"],
         ["C5IMP-MOD-2026-001", "CVN-YY", "Applies", "2",
          "DPIA FY2X+1", "Not Started", "[Placeholder]"],
         ["C5IMP-MOD-2026-002", "CVN-YY", "Applies", "1",
          "DPIA FY2X", "Pending Decision", "[Placeholder]"]],
        widths=[18, 12, 14, 12, 16, 16, 30],
        validations=V, cond_rules=STATUS_RULES)

    add_table_sheet(wb, "System Applicability",
        ["Item ID", "System Category", "System Name (Placeholder)",
         "Interface Impact", "Baseline Register Ref", "Notes"],
        [["C5IMP-MOD-2026-001", "Communications", "[SATCOM Terminal A]",
          "[Antenna control, network gateway]", "[CFG-COM-001]",
          "[Placeholder]"],
         ["C5IMP-MOD-2026-002", "Networks", "[Afloat Network Backbone]",
          "[All connected enclaves]", "[CFG-NET-001]", "[Placeholder]"],
         ["C5IMP-MOD-2026-003", "ISR", "[ISR Processing Node]",
          "[C2 display interfaces]", "[CFG-ISR-001]", "[Placeholder]"]],
        widths=[18, 16, 24, 30, 18, 26], validations=V)

    add_table_sheet(wb, "Schedule Integration",
        ["Item ID", "Hull", "Availability Type", "Availability (FY)",
         "Work Package ID", "Install Start", "Install Complete",
         "Test Complete", "Status", "Schedule Risk", "Notes"],
        [["C5IMP-MOD-2026-001", "CVN-XX", "PIA", "FY2X", "[WP-1234]",
          "2026-07-01", "2026-08-15", "2026-09-10", "In Progress",
          "Low", "[Placeholder]"],
         ["C5IMP-MOD-2026-002", "CVN-YY", "DPIA", "FY2X", "[WP-2345]",
          "2026-12-01", "2027-02-15", "2027-03-15", "Pending Decision",
          "Moderate", "[Awaiting CCB approval]"]],
        widths=[18, 10, 14, 12, 14, 12, 14, 12, 16, 12, 26],
        validations={**V, "Schedule Risk": "RiskLevelList"},
        cond_rules=STATUS_RULES + [("Schedule Risk", "High", RED_FILL),
                                   ("Schedule Risk", "Moderate",
                                    YELLOW_FILL)])

    add_table_sheet(wb, "Decision Status",
        ["Item ID", "Decision Status", "Decision Forum",
         "Decision Record #", "Decision Date", "Decision Authority",
         "Conditions", "Next Decision Needed", "Need-By Date"],
        [["C5IMP-MOD-2026-001", "Approved", "CCB", "C5IMP-DR-2026-004",
          "2026-02-19", "[CCB Chair]", "[None]", "[None]", ""],
         ["C5IMP-MOD-2026-002", "Pending Decision", "CCB", "", "",
          "", "", "[Approve for DPIA FY2X]", "2026-07-17"],
         ["C5IMP-MOD-2026-003", "Submitted", "WIPT", "", "", "", "",
          "[Accept for evaluation]", "2026-06-30"]],
        widths=[18, 18, 12, 18, 12, 16, 20, 24, 12],
        validations=V, cond_rules=DEC_RULES)

    add_table_sheet(wb, "Dependencies",
        ["Item ID", "Depends On (Item/Event)", "Dependency Type",
         "Driver Org", "Need Date", "Status", "Blocked?", "Notes"],
        [["C5IMP-MOD-2026-001", "[GFE delivery - terminal group]",
          "Material", "PEO C4I/PMW", "2026-06-20", "In Progress", "No",
          "[Placeholder]"],
         ["C5IMP-MOD-2026-002", "C5IMP-MOD-2026-001",
          "Technical (shared cableway)", "NAVSEA", "2026-11-01",
          "Pending Decision", "Yes", "[Sequencing conflict]"]],
        widths=[18, 26, 18, 14, 12, 16, 10, 26],
        validations={**V, "Blocked?": "YesNoList"},
        cond_rules=STATUS_RULES + [("Blocked?", "Yes", ORANGE_FILL)])
    _save(wb, path)


# ----------------------------------------------------------------------
# 2. Baseline Configuration Register
# ----------------------------------------------------------------------
def wb_baseline(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "CVN C5I Baseline Configuration Register",
        "Authoritative register of the approved C5I configuration baseline "
        "by system and hull, with approved and pending changes and known "
        "configuration gaps. Updated only on direction of a Decision "
        "Record.",
        ["System Baseline holds the class-level approved configuration; "
         "Hull Baseline holds per-hull installed state.",
         "Move items from Pending Changes to Approved Changes only with a "
         "Decision Record number; then update the affected baseline rows.",
         "Log discrepancies between documented and installed configuration "
         "on Configuration Gaps with an owner and closure plan.",
         "Documentation References maps each baseline entry to drawings, "
         "ICDs, and certification artifacts (placeholders)."],
        ["Edit access restricted to configuration management staff; all "
         "others read-only.",
         "Every change to this register cites a Decision Record number in "
         "the row.",
         "Do not enter classified configuration detail; reference "
         "controlled documents instead."])

    add_table_sheet(wb, "System Baseline",
        ["Config ID", "System Category", "System Name (Placeholder)",
         "Baseline Version", "Approved By (DR #)", "Approval Date",
         "Status", "Notes"],
        [["CFG-COM-001", "Communications", "[SATCOM Terminal A]",
          "[v3.2]", "C5IMP-DR-2025-011", "2025-10-02", "Complete",
          "[Class baseline]"],
         ["CFG-NET-001", "Networks", "[Afloat Network Backbone]",
          "[Incr 1]", "C5IMP-DR-2025-014", "2025-11-12", "Complete",
          "[Placeholder]"],
         ["CFG-ISR-001", "ISR", "[ISR Processing Node]", "[v1.0]",
          "C5IMP-DR-2024-021", "2024-08-30", "Complete", "[Placeholder]"]],
        widths=[14, 16, 26, 14, 18, 12, 14, 28], validations=V,
        cond_rules=STATUS_RULES)

    add_table_sheet(wb, "Hull Baseline",
        ["Hull", "Config ID", "Installed Version", "Install Date",
         "Variance from Class Baseline", "Status", "Notes"],
        [["CVN-XX", "CFG-COM-001", "[v3.2]", "2025-12-10", "[None]",
          "Complete", "[Placeholder]"],
         ["CVN-YY", "CFG-COM-001", "[v3.1]", "2024-06-05",
          "[One version behind - upgrade in DPIA FY2X]", "In Progress",
          "[Placeholder]"],
         ["CVN-ZZ", "CFG-NET-001", "[Legacy]", "2022-04-15",
          "[Backbone refresh not yet installed]", "Not Started",
          "[Planned CIA FY2X+1]"]],
        widths=[10, 14, 14, 12, 32, 14, 26], validations=V,
        cond_rules=STATUS_RULES)

    add_table_sheet(wb, "Approved Changes",
        ["Change ID", "Config ID", "Hull", "Change Summary",
         "Decision Record #", "Approval Date", "Target Availability",
         "Status", "Notes"],
        [["CHG-2026-001", "CFG-COM-001", "CVN-YY",
          "[Upgrade terminal to v3.2]", "C5IMP-DR-2026-004", "2026-02-19",
          "DPIA FY2X", "In Progress", "[Placeholder]"]],
        widths=[14, 14, 10, 30, 18, 12, 16, 14, 24], validations=V,
        cond_rules=STATUS_RULES)

    add_table_sheet(wb, "Pending Changes",
        ["Change ID", "Config ID", "Hull", "Change Summary",
         "Intake #", "Decision Status", "Target Decision Forum",
         "Need-By Date", "Notes"],
        [["CHG-2026-002", "CFG-NET-001", "CVN-YY",
          "[Backbone refresh increment 2]", "C5IMP-INT-2026-008",
          "Pending Decision", "CCB", "2026-07-17", "[Placeholder]"],
         ["CHG-2026-003", "CFG-ISR-001", "Class-Wide",
          "[Processor update]", "C5IMP-INT-2026-011", "In Evaluation",
          "WIPT", "2026-08-15", "[Placeholder]"]],
        widths=[14, 14, 12, 30, 18, 18, 18, 12, 24], validations=V,
        cond_rules=DEC_RULES)

    add_table_sheet(wb, "Documentation References",
        ["Config ID", "Document Type", "Document Title (Placeholder)",
         "Document Number", "Revision", "Location", "Current?"],
        [["CFG-COM-001", "Plan", "[Installation Control Drawing set]",
          "[ICD-PLACEHOLDER-001]", "[C]", "[Controlled repository link]",
          "Yes"],
         ["CFG-NET-001", "Guide", "[Interface Design Document]",
          "[IDD-PLACEHOLDER-002]", "[B]", "[Controlled repository link]",
          "No"]],
        widths=[14, 14, 30, 22, 10, 26, 10],
        validations={**V, "Current?": "YesNoList"},
        cond_rules=[("Current?", "No", YELLOW_FILL)])

    add_table_sheet(wb, "Configuration Gaps",
        ["Gap ID", "Hull", "Config ID", "Gap Description", "Risk Level",
         "Discovered Date", "Owner Org", "Closure Plan", "Target Closure",
         "Status"],
        [["GAP-2026-001", "CVN-ZZ", "CFG-NET-001",
          "[Installed switch firmware differs from documented baseline]",
          "Moderate", "2026-04-02", "NAVSEA",
          "[Verify and update during CIA]", "2027-06-30", "In Progress"]],
        widths=[14, 10, 14, 34, 12, 13, 14, 28, 13, 14],
        validations=V, cond_rules=STATUS_RULES + RISK_RULES)
    _save(wb, path)


# ----------------------------------------------------------------------
# 3. Risk, Issue, and Opportunity Register
# ----------------------------------------------------------------------
def wb_rio(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5IMP Risk, Issue, and Opportunity Register",
        "Consolidated register of program risks (future uncertain events), "
        "issues (realized problems), and opportunities, with mitigation "
        "plans and a 5x5 scoring matrix. Reviewed at every OIPT and CCB.",
        ["Write risks as 'If <condition>, then <consequence>' statements.",
         "Score Likelihood and Consequence 1-5; Risk Score is calculated "
         "as L x C and Risk Level derives from the Risk Matrix tab bands "
         "(1-6 Low, 8-12 Moderate, 15-25 High).",
         "Promote a risk to the Issues tab when it is realized; retain the "
         "risk row and cross-reference the Issue ID.",
         "Every High risk requires an active row on Mitigation Plans with "
         "funded actions and an owner."])

    cols = ["Risk ID", "Risk Statement (If/Then)", "Hull",
            "System Category", "Likelihood (1-5)", "Consequence (1-5)",
            "Risk Score", "Risk Level", "Owner Org", "Mitigation Ref",
            "Review Date", "Status"]
    rows = [
        ["RSK-2026-001", "[If GFE terminal delivery slips, then CVN-XX "
         "PIA install window is missed]", "CVN-XX", "Communications",
         4, 4, "=E2*F2", "High", "PEO C4I/PMW", "MIT-001", "2026-06-20",
         "In Progress"],
        ["RSK-2026-002", "[If cableway survey reveals interference, then "
         "backbone routing requires redesign]", "CVN-YY", "Networks",
         3, 3, "=E3*F3", "Moderate", "NAVSEA", "MIT-002", "2026-07-01",
         "In Progress"],
        ["RSK-2026-003", "[If crew training quotas are unavailable, then "
         "turnover is delayed]", "CVN-XX", "Communications", 2, 3,
         "=E4*F4", "Low", "TYCOM N6", "", "2026-08-01", "Not Started"]]
    add_table_sheet(wb, "Risks", cols, rows,
        widths=[14, 40, 10, 16, 12, 13, 10, 11, 14, 13, 12, 14],
        validations={**V, "Likelihood (1-5)": "ScoreList",
                     "Consequence (1-5)": "ScoreList"},
        cond_rules=STATUS_RULES + RISK_RULES)

    add_table_sheet(wb, "Issues",
        ["Issue ID", "Issue Statement", "Source Risk ID", "Hull",
         "System Category", "Priority", "Owner Org", "Resolution Plan",
         "Need Date", "Status"],
        [["ISS-2026-001", "[Shipyard crane availability conflict during "
          "antenna removal window]", "", "CVN-XX", "Communications",
          "High", "RMC", "[Re-sequence with shipyard scheduler]",
          "2026-06-25", "In Progress"]],
        widths=[14, 38, 13, 10, 16, 10, 14, 30, 12, 14],
        validations=V, cond_rules=STATUS_RULES + PRI_RULES)

    add_table_sheet(wb, "Opportunities",
        ["Opp ID", "Opportunity Statement", "Hull", "System Category",
         "Potential Benefit", "Owner Org", "Pursue?", "Plan", "Status"],
        [["OPP-2026-001", "[Combine ISR and C2 display refresh into one "
          "install team visit]", "CVN-ZZ", "ISR",
          "[Reduced ship disruption; cost avoidance placeholder]",
          "Program Office", "Yes", "[Joint work package study]",
          "In Progress"]],
        widths=[14, 36, 10, 16, 30, 14, 10, 26, 14],
        validations={**V, "Pursue?": "YesNoList"},
        cond_rules=STATUS_RULES)

    add_table_sheet(wb, "Mitigation Plans",
        ["Mitigation ID", "Risk ID", "Mitigation Action", "Owner Org",
         "Due Date", "Status", "Residual Likelihood", "Residual "
         "Consequence", "Notes"],
        [["MIT-001", "RSK-2026-001", "[Weekly delivery telecon with "
          "vendor; identify alternate install window]", "PEO C4I/PMW",
          "2026-06-30", "In Progress", "2", "4", "[Placeholder]"],
         ["MIT-002", "RSK-2026-002", "[Early ship check of cableway "
          "route]", "NAVSEA", "2026-07-15", "Not Started", "2", "3",
          "[Placeholder]"]],
        widths=[14, 14, 36, 14, 12, 14, 14, 14, 24],
        validations={**V, "Residual Likelihood": "ScoreList",
                     "Residual Consequence": "ScoreList"},
        cond_rules=STATUS_RULES)

    # 5x5 risk matrix tab
    ws = wb.create_sheet("Risk Matrix")
    ws["A1"] = "C5IMP 5x5 Risk Matrix (Score = Likelihood x Consequence)"
    from helpers_xlsx import TITLE_FONT, BODY_FONT
    ws["A1"].font = TITLE_FONT
    ws["B3"] = "Consequence ->"
    for c in range(1, 6):
        ws.cell(row=4, column=2 + c, value=c).font = BODY_FONT
    for l in range(5, 0, -1):
        r = 5 + (5 - l)
        ws.cell(row=r, column=2, value=f"Likelihood {l}").font = BODY_FONT
        for c in range(1, 6):
            score = l * c
            cell = ws.cell(row=r, column=2 + c, value=score)
            cell.fill = (RED_FILL if score >= 15 else
                         YELLOW_FILL if score >= 8 else GREEN_FILL)
    ws["A12"] = ("Bands: 1-6 Low (green), 8-12 Moderate (yellow), "
                 "15-25 High (red). Tailor bands per program direction.")
    ws["A12"].font = BODY_FONT
    ws.column_dimensions["B"].width = 14
    _save(wb, path)


# ----------------------------------------------------------------------
# 4. Action Item Tracker
# ----------------------------------------------------------------------
def wb_actions(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5IMP Action Item Tracker",
        "Single tracker for all action items from C5IMP governance forums. "
        "The Open, Overdue, by-Organization, and by-Meeting tabs are "
        "working views of the same data set; Open Actions is the master "
        "entry point.",
        ["Enter every new action on Open Actions within 2 business days of "
         "the assigning meeting, using ID format C5IMP-AI-YYYY-NNN.",
         "Days Open is calculated automatically; rows highlight red when "
         "the due date passes without Complete status.",
         "On closure, set Status to Complete and cut the row to Closed "
         "Actions with the completion date and closure evidence.",
         "Overdue Actions, Actions by Organization, and Actions by Meeting "
         "are filtered/pivot views - refresh or re-filter rather than "
         "re-keying data."])

    cols = ["Action ID", "Action Statement", "Source Meeting",
            "Date Assigned", "Owner Org", "Owner Name", "Due Date",
            "Status", "Priority", "Days Open", "Latest Update"]
    rows = [
        ["C5IMP-AI-2026-014", "[Provide GFE delivery recovery schedule]",
         "CCB-2026-05", "2026-05-15", "PEO C4I/PMW", "[Name]",
         "2026-06-05", "In Progress", "High",
         "=IF(D2=\"\",\"\",TODAY()-D2)", "[Vendor telecon held]"],
        ["C5IMP-AI-2026-015", "[Confirm crane window with shipyard]",
         "AVWG-2026-09", "2026-05-20", "RMC", "[Name]", "2026-06-10",
         "Blocked", "Critical", "=IF(D3=\"\",\"\",TODAY()-D3)",
         "[Awaiting shipyard response]"],
        ["C5IMP-AI-2026-016", "[Draft evaluation memo for INT-2026-011]",
         "WIPT-2026-11", "2026-06-01", "Program Office", "[Name]",
         "2026-06-20", "In Progress", "Medium",
         "=IF(D4=\"\",\"\",TODAY()-D4)", "[In coordination]"]]
    ws = add_table_sheet(wb, "Open Actions", cols, rows,
        widths=[16, 36, 14, 12, 14, 12, 12, 14, 10, 10, 28],
        validations=V, cond_rules=STATUS_RULES + PRI_RULES)
    add_overdue_rule(ws, "Due Date", "Status", cols, len(rows) + 15)

    add_table_sheet(wb, "Closed Actions",
        cols[:9] + ["Date Closed", "Closure Evidence"],
        [["C5IMP-AI-2026-009", "[Publish CCB-2026-04 minutes]",
          "CCB-2026-04", "2026-04-17", "Program Office", "[Name]",
          "2026-04-24", "Complete", "Medium", "2026-04-22",
          "[Minutes posted to Meeting Records library]"]],
        widths=[16, 36, 14, 12, 14, 12, 12, 14, 10, 12, 30],
        validations=V, cond_rules=STATUS_RULES)

    add_table_sheet(wb, "Overdue Actions",
        cols[:9] + ["Days Overdue", "Escalation Status"],
        [["C5IMP-AI-2026-015", "[Confirm crane window with shipyard]",
          "AVWG-2026-09", "2026-05-20", "RMC", "[Name]", "2026-06-10",
          "Blocked", "Critical", "=IF(G2=\"\",\"\",TODAY()-G2)",
          "[Escalated to OIPT]"]],
        widths=[16, 36, 14, 12, 14, 12, 12, 14, 10, 12, 24],
        validations=V, cond_rules=STATUS_RULES + PRI_RULES)

    add_table_sheet(wb, "Actions by Organization",
        ["Owner Org", "Open Count", "Overdue Count", "Oldest Due Date",
         "Notes"],
        [["PEO C4I/PMW", 1, 0, "2026-06-05", "[Placeholder]"],
         ["RMC", 1, 1, "2026-06-10", "[Escalated]"],
         ["Program Office", 1, 0, "2026-06-20", "[Placeholder]"]],
        widths=[16, 12, 14, 16, 30], validations={"Owner Org": "OrgList"})

    add_table_sheet(wb, "Actions by Meeting",
        ["Source Meeting", "Meeting Date", "Actions Assigned",
         "Actions Open", "Actions Overdue", "Notes"],
        [["CCB-2026-05", "2026-05-15", 6, 1, 0, "[Placeholder]"],
         ["AVWG-2026-09", "2026-05-20", 4, 1, 1, "[Placeholder]"],
         ["WIPT-2026-11", "2026-06-01", 3, 1, 0, "[Placeholder]"]],
        widths=[16, 13, 16, 13, 15, 30])
    _save(wb, path)


# ----------------------------------------------------------------------
# 5. Stakeholder RACI Matrix
# ----------------------------------------------------------------------
def wb_raci(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5IMP Stakeholder RACI Matrix",
        "Defines Responsible, Accountable, Consulted, and Informed "
        "assignments for every major C5IMP process step, with a stakeholder "
        "directory and engagement cadence.",
        ["Exactly one A (Accountable) per process row; validate before "
         "publishing changes.",
         "Use dropdown values R, A, C, I, or R/A only.",
         "Keep the Stakeholder Directory current - it feeds the People web "
         "parts on the SharePoint site.",
         "Engagement Cadence aligns with the Meeting Battle Rhythm "
         "Tracker; change cadence there first, then mirror here."])

    orgs = ["TYCOM N6", "TYCOM N43/N4", "NAVSEA", "PEO Carriers",
            "PEO C4I/PMW", "Ship's Force", "RMC/Shipyard",
            "Program Office"]
    raci_v = {o: "RACIList" for o in orgs}
    raci_rules = ([(o, "A", GREEN_FILL) for o in orgs] +
                  [(o, "R/A", GREEN_FILL) for o in orgs] +
                  [(o, "R", YELLOW_FILL) for o in orgs])
    add_table_sheet(wb, "RACI Matrix",
        ["Process Step"] + orgs,
        [["Intake submission & sponsorship", "C", "I", "C", "I", "C",
          "R", "I", "A"],
         ["Triage & routing", "C", "I", "C", "I", "C", "I", "I", "R/A"],
         ["Change evaluation (multi-discipline)", "C", "C", "R", "C",
          "R", "C", "C", "A"],
         ["CCB disposition", "R", "C", "R", "C", "R", "I", "I", "A"],
         ["Baseline register update", "I", "I", "R", "I", "C", "I", "I",
          "A"],
         ["Availability work package integration", "C", "R", "R/A", "C",
          "C", "C", "R", "C"],
         ["Installation execution oversight", "I", "C", "A", "I", "C",
          "C", "R", "C"],
         ["Test & certification coordination", "C", "C", "R", "I", "R",
          "C", "C", "A"],
         ["Readiness assessment", "R", "R/A", "C", "I", "C", "R", "I",
          "C"],
         ["Lessons learned & AAR", "C", "C", "C", "C", "C", "C", "C",
          "R/A"]],
        widths=[34] + [12] * len(orgs), validations=raci_v,
        cond_rules=raci_rules)

    add_table_sheet(wb, "Stakeholder Directory",
        ["Name", "Organization", "Code/Office", "Role", "Email",
         "Phone", "SharePoint Group", "Alternate"],
        [["[Name]", "TYCOM N6", "[N6X]", "C5I Modernization Lead",
          "[name@placeholder.mil]", "[XXX-XXX-XXXX]", "TYCOM Editors",
          "[Alt name]"],
         ["[Name]", "NAVSEA", "[Code Placeholder]",
          "Carrier Modernization Lead", "[name@placeholder.mil]",
          "[XXX-XXX-XXXX]", "NAVSEA Editors", "[Alt name]"],
         ["[Name]", "PEO C4I/PMW", "[PMW Placeholder]",
          "Fielding Coordinator", "[name@placeholder.mil]",
          "[XXX-XXX-XXXX]", "PEO/PMW Contributors", "[Alt name]"]],
        widths=[16, 16, 14, 24, 24, 14, 20, 14],
        validations={"Organization": "OrgList"})

    add_table_sheet(wb, "Organization Roles",
        ["Organization", "Program Role Summary", "Decision Authorities "
         "Held", "Primary Forums"],
        [["TYCOM N6", "[C5I requirements advocacy and readiness "
          "governance]", "[Readiness acceptance placeholder]",
          "ESB, CCB, Readiness Review"],
         ["NAVSEA", "[Ship integration engineering and alteration "
          "management]", "[Alteration approval placeholder]",
          "CCB, OIPT, Availability WG"],
         ["PEO C4I/PMW", "[System acquisition, fielding, ILS]",
          "[Fielding plan placeholder]", "CCB, WIPTs"]],
        widths=[16, 38, 30, 24], validations={"Organization": "OrgList"})

    add_table_sheet(wb, "Engagement Cadence",
        ["Organization", "Forum", "Cadence", "Representative Required",
         "Notes"],
        [["TYCOM N6", "CCB", "Monthly", "Voting member", "[Placeholder]"],
         ["RMC/Shipyard", "Availability WG", "Bi-weekly planning / "
          "weekly execution", "Production scheduler", "[Placeholder]"],
         ["Ship's Force", "WIPTs", "Bi-weekly", "C5I representative",
          "[Placeholder]"]],
        widths=[16, 18, 26, 22, 26])
    _save(wb, path)


# ----------------------------------------------------------------------
# 6. Decision Log
# ----------------------------------------------------------------------
def wb_decisions(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5IMP Decision Log",
        "Index of all program decisions and pending decisions, with the "
        "authority matrix and standard decision criteria. Each row links "
        "to a full Decision Record in the Decision Records library.",
        ["Add a row to Decisions within 2 business days of any decision, "
         "citing the Decision Record number.",
         "Track upcoming required decisions on Pending Decisions with a "
         "need-by date; overdue pending decisions highlight automatically.",
         "Decision Authorities mirrors the tier table in the Program "
         "Charter; change the Charter first, then this tab.",
         "Decision Criteria lists the standard evaluation gates applied "
         "by the CCB."])

    cols = ["Decision Record #", "Decision Title", "Decision Status",
            "Decision Date", "Decision Authority", "Forum", "Hull",
            "System Category", "Related Item IDs", "Follow-on Actions",
            "Record Link"]
    add_table_sheet(wb, "Decisions", cols,
        [["C5IMP-DR-2026-004", "[Approve comms upgrade for CVN-XX PIA]",
          "Approved", "2026-02-19", "[CCB Chair]", "CCB", "CVN-XX",
          "Communications", "C5IMP-MOD-2026-001", "C5IMP-AI-2026-010",
          "[SharePoint link]"],
         ["C5IMP-DR-2026-005", "[Defer ISR display refresh to FY2X+1]",
          "Deferred", "2026-03-19", "[CCB Chair]", "CCB", "CVN-ZZ",
          "ISR", "C5IMP-MOD-2026-003", "[None]", "[SharePoint link]"]],
        widths=[18, 32, 16, 12, 16, 10, 10, 16, 18, 18, 18],
        validations=V, cond_rules=DEC_RULES)

    cols_p = ["Pending Decision", "Related Item ID", "Decision Status",
              "Target Forum", "Need-By Date", "Owner Org",
              "Package Status", "Notes"]
    ws = add_table_sheet(wb, "Pending Decisions", cols_p,
        [["[Approve backbone refresh for CVN-YY DPIA]",
          "C5IMP-MOD-2026-002", "Pending Decision", "CCB", "2026-07-17",
          "NAVSEA", "[Evaluation memo in coordination]", "[Placeholder]"],
         ["[Accept ISR processor update for evaluation]",
          "C5IMP-MOD-2026-003", "Submitted", "WIPT", "2026-06-30",
          "PEO C4I/PMW", "[Intake triaged]", "[Placeholder]"]],
        widths=[34, 18, 16, 12, 12, 14, 26, 22],
        validations=V, cond_rules=DEC_RULES)
    add_overdue_rule(ws, "Need-By Date", "Decision Status", cols_p, 17)

    add_table_sheet(wb, "Decision Authorities",
        ["Tier", "Decision Type", "Authority", "Forum",
         "Documentation Required"],
        [["1", "[Class baseline / cross-hull schedule]",
          "[ESB Chair placeholder]", "ESB", "Decision Record + minutes"],
         ["2", "[Single-hull change within baseline]", "[CCB Chair]",
          "CCB", "Decision Record + minutes"],
         ["3", "[Administrative/documentation change]", "[WIPT Lead]",
          "WIPT", "Decision Log entry"],
         ["4", "[Emergent field change]", "[On-site authority "
          "placeholder]", "Expedited", "Decision Record within 72 hrs"]],
        widths=[8, 34, 22, 12, 28])

    add_table_sheet(wb, "Decision Criteria",
        ["Criterion", "Description", "Applies To"],
        [["Operational need validated", "[Capability gap or compliance "
          "driver confirmed by TYCOM]", "All changes"],
         ["Technical feasibility", "[Engineering assessment complete; "
          "interfaces dispositioned]", "All changes"],
         ["Schedule executability", "[Fits availability window with "
          "margin]", "Availability-linked changes"],
         ["Funding identified", "[Funding line confirmed]", "All changes"],
         ["Cyber/authorization path", "[RMF impact assessed; path to "
          "authorization defined]", "Network-connected changes"],
         ["ILS supportability", "[Spares, training, documentation "
          "planned]", "All hardware changes"]],
        widths=[26, 44, 24])
    _save(wb, path)


# ----------------------------------------------------------------------
# 7. Availability Integration Tracker
# ----------------------------------------------------------------------
def wb_avail(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5IMP Availability Integration Tracker",
        "Tracks integration of C5I modernization work into CVN "
        "availabilities: events, work packages, ship access needs, test "
        "milestones, dependencies, and turnover items.",
        ["One row per availability on Availability Events; all other tabs "
         "key to the Availability ID.",
         "Work Packages maps each modernization item to its availability "
         "work package with install windows.",
         "Log compartment/aloft/service access needs on Ship Access "
         "Requirements before the integration lock milestone.",
         "Testing Milestones must cover every installed item; turnover "
         "discrepancies go to Turnover Items with owners and due dates."])

    add_table_sheet(wb, "Availability Events",
        ["Availability ID", "Hull", "Availability Type", "Fiscal Year",
         "Start Date", "End Date", "Phase", "C5IMP Integration Lead",
         "Status", "Notes"],
        [["AV-2026-01", "CVN-XX", "PIA", "FY2X", "2026-07-01",
          "2026-12-15", "Execution", "[Name]", "In Progress",
          "[Placeholder]"],
         ["AV-2027-01", "CVN-YY", "DPIA", "FY2X", "2026-12-01",
          "2027-08-30", "Planning", "[Name]", "In Progress",
          "[Placeholder]"]],
        widths=[14, 10, 14, 10, 12, 12, 12, 18, 14, 24],
        validations=V, cond_rules=STATUS_RULES)

    add_table_sheet(wb, "Work Packages",
        ["Work Package ID", "Availability ID", "Item ID", "Title",
         "Executing Org", "Install Start", "Install Complete", "Status",
         "Critical Path?", "Notes"],
        [["[WP-1234]", "AV-2026-01", "C5IMP-MOD-2026-001",
          "[Comms suite upgrade]", "RMC", "2026-07-15", "2026-08-15",
          "In Progress", "Yes", "[Placeholder]"],
         ["[WP-2345]", "AV-2027-01", "C5IMP-MOD-2026-002",
          "[Backbone refresh incr 1]", "Shipyard", "2026-12-15",
          "2027-02-15", "Pending Decision", "No", "[Awaiting CCB]"]],
        widths=[14, 14, 18, 26, 14, 12, 14, 16, 12, 22],
        validations={**V, "Critical Path?": "YesNoList",
                     "Executing Org": "OrgList"},
        cond_rules=STATUS_RULES + [("Critical Path?", "Yes", YELLOW_FILL)])

    add_table_sheet(wb, "Ship Access Requirements",
        ["Req ID", "Availability ID", "Work Package ID",
         "Space/Compartment (Placeholder)", "Access Type",
         "Window Needed", "Conflicts With", "Coordinated With Shipyard?",
         "Status"],
        [["ACC-001", "AV-2026-01", "[WP-1234]", "[Comm center "
          "placeholder]", "[Rip-out + install]", "2026-07-15 to "
          "2026-08-15", "[Concurrent vent work]", "Yes", "In Progress"],
         ["ACC-002", "AV-2026-01", "[WP-1234]", "[Mast/antenna "
          "platform]", "[Aloft work + crane]", "2026-07-20 to "
          "2026-07-30", "[Radar silence windows]", "No", "Blocked"]],
        widths=[10, 14, 14, 22, 18, 20, 20, 18, 14],
        validations={**V, "Coordinated With Shipyard?": "YesNoList"},
        cond_rules=STATUS_RULES)

    cols_t = ["Milestone ID", "Availability ID", "Item ID",
              "Test Event (Placeholder)", "Planned Date", "Actual Date",
              "Result", "Status", "Discrepancies -> Turnover ID", "Notes"]
    ws = add_table_sheet(wb, "Testing Milestones", cols_t,
        [["TST-001", "AV-2026-01", "C5IMP-MOD-2026-001",
          "[SOVT placeholder - terminal group]", "2026-09-01", "",
          "", "Not Started", "", "[Placeholder]"]],
        widths=[12, 14, 18, 26, 12, 12, 12, 14, 20, 20],
        validations=V, cond_rules=STATUS_RULES)
    add_overdue_rule(ws, "Planned Date", "Status", cols_t, 16)

    add_table_sheet(wb, "Dependencies",
        ["Dependency ID", "Availability ID", "Predecessor", "Successor",
         "Type", "Need Date", "Status", "Blocked?", "Notes"],
        [["DEP-001", "AV-2026-01", "[Cableway rip-out WP-1230]",
          "[WP-1234 install]", "Finish-to-Start", "2026-07-14",
          "In Progress", "No", "[Placeholder]"]],
        widths=[12, 14, 24, 24, 14, 12, 14, 10, 20],
        validations={**V, "Blocked?": "YesNoList"},
        cond_rules=STATUS_RULES + [("Blocked?", "Yes", ORANGE_FILL)])

    cols_to = ["Turnover ID", "Availability ID", "Item ID", "Description",
               "Owner Org", "Due Date", "Status", "Accepted by Ship?",
               "Notes"]
    ws = add_table_sheet(wb, "Turnover Items", cols_to,
        [["TO-001", "AV-2026-01", "C5IMP-MOD-2026-001",
          "[Outstanding label plate corrections]", "RMC", "2026-12-01",
          "Not Started", "No", "[Placeholder]"]],
        widths=[12, 14, 18, 30, 12, 12, 14, 14, 20],
        validations={**V, "Accepted by Ship?": "YesNoList"},
        cond_rules=STATUS_RULES)
    add_overdue_rule(ws, "Due Date", "Status", cols_to, 16)
    _save(wb, path)


# ----------------------------------------------------------------------
# 8. Readiness Assessment Workbook
# ----------------------------------------------------------------------
def wb_readiness(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5I Readiness Assessment Workbook",
        "Scores hull readiness to receive, integrate, test, train, and "
        "sustain a C5I modernization package. Companion to the Word "
        "Modernization Readiness Assessment template; this workbook holds "
        "the criteria bank and scoring.",
        ["Readiness Criteria is the controlled criteria bank; add or "
         "retire criteria only via Decision Record.",
         "Score each criterion Green/Yellow/Red/Gray on the assessment "
         "tabs; numeric equivalents (G=3, Y=2, R=1, Gray excluded) drive "
         "Score Summary.",
         "Complete one column set per assessment event (initial, "
         "mid-planning, pre-installation, pre-turnover).",
         "Any Red requires a corrective action row with owner and date in "
         "the Action Item Tracker."])

    add_table_sheet(wb, "Readiness Criteria",
        ["Criterion ID", "Area", "Criterion", "Evidence Expected",
         "Owner Org"],
        [["RC-REC-01", "Receive", "[Space/weight/power/cooling margins "
          "confirmed]", "[Ship check report]", "NAVSEA"],
         ["RC-INT-01", "Integrate", "[Installation drawings issued and "
          "ship-checked]", "[Drawing set placeholder]", "NAVSEA"],
         ["RC-TST-01", "Test", "[Test program approved; windows "
          "scheduled]", "[Test plan placeholder]", "PEO C4I/PMW"],
         ["RC-TRN-01", "Train", "[Crew training quotas scheduled before "
          "turnover]", "[Quota confirmations]", "TYCOM N6"],
         ["RC-SUS-01", "Sustain", "[ILS products on track]",
          "[ILS status report]", "PEO C4I/PMW"]],
        widths=[12, 12, 38, 24, 14],
        validations={"Owner Org": "OrgList"})

    rating_rules = [("Rating", "Red", RED_FILL),
                    ("Rating", "Yellow", YELLOW_FILL),
                    ("Rating", "Green", GREEN_FILL)]

    add_table_sheet(wb, "Hull Assessment",
        ["Hull", "Package", "Assessment Type", "Criterion ID", "Rating",
         "Evidence/Reference", "Corrective Action", "Owner Org",
         "Due Date"],
        [["CVN-XX", "[Comms upgrade pkg]", "[Pre-installation]",
          "RC-REC-01", "Green", "[Ship check 2026-03]", "", "", ""],
         ["CVN-XX", "[Comms upgrade pkg]", "[Pre-installation]",
          "RC-TRN-01", "Yellow", "[2 of 4 quotas confirmed]",
          "[Confirm remaining quotas]", "TYCOM N6", "2026-06-30"]],
        widths=[10, 18, 16, 12, 10, 24, 26, 12, 12],
        validations=V, cond_rules=rating_rules)

    add_table_sheet(wb, "System Assessment",
        ["System Category", "System (Placeholder)", "Hull",
         "Criterion ID", "Rating", "Findings", "Owner Org"],
        [["Communications", "[SATCOM Terminal A]", "CVN-XX", "RC-INT-01",
          "Green", "[Drawings issued Rev C]", "NAVSEA"]],
        widths=[16, 22, 10, 12, 10, 30, 14],
        validations=V, cond_rules=rating_rules)

    add_table_sheet(wb, "Training Readiness",
        ["Hull", "Course/Quota (Placeholder)", "Required Seats",
         "Confirmed Seats", "Completion Due", "Rating", "Notes"],
        [["CVN-XX", "[Operator course placeholder]", 4, 2, "2026-08-15",
          "Yellow", "[Quotas pending]"]],
        widths=[10, 26, 13, 14, 13, 10, 26],
        validations=V, cond_rules=rating_rules)

    add_table_sheet(wb, "Documentation Readiness",
        ["Hull", "Document (Placeholder)", "Type", "Required By",
         "Status", "Rating", "Notes"],
        [["CVN-XX", "[Operator manual placeholder]", "Guide",
          "2026-09-01", "In Progress", "Yellow", "[Draft in review]"]],
        widths=[10, 28, 12, 12, 14, 10, 26],
        validations={**V, "Type": "DocTypeList"},
        cond_rules=rating_rules + STATUS_RULES)

    add_table_sheet(wb, "Sustainment Readiness",
        ["Hull", "ILS Element (Placeholder)", "Status", "Rating",
         "Owner Org", "Notes"],
        [["CVN-XX", "[Onboard spares package]", "In Progress", "Yellow",
          "PEO C4I/PMW", "[Partial delivery]"]],
        widths=[10, 28, 14, 10, 14, 28],
        validations=V, cond_rules=rating_rules + STATUS_RULES)

    add_table_sheet(wb, "Score Summary",
        ["Hull", "Package", "Assessment Type", "Assessment Date",
         "Green Count", "Yellow Count", "Red Count", "Score (%)",
         "Overall Rating", "Recommendation"],
        [["CVN-XX", "[Comms upgrade pkg]", "[Pre-installation]",
          "2026-06-01", 8, 3, 0, "=ROUND((E2*3+F2*2+G2*1)/((E2+F2+G2)*3)"
          "*100,0)", "Yellow", "[Proceed with conditions]"]],
        widths=[10, 18, 16, 14, 12, 13, 10, 10, 13, 26],
        validations={"Overall Rating": "RatingList"},
        cond_rules=[("Overall Rating", "Red", RED_FILL),
                    ("Overall Rating", "Yellow", YELLOW_FILL),
                    ("Overall Rating", "Green", GREEN_FILL)])
    _save(wb, path)


# ----------------------------------------------------------------------
# 9. Meeting Battle Rhythm Tracker
# ----------------------------------------------------------------------
def wb_battle_rhythm(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5IMP Meeting Battle Rhythm Tracker",
        "Controls the recurring governance battle rhythm: meetings, "
        "required outputs, agenda pipeline, attendance requirements, and "
        "the reporting calendar. Feeds the Events web part on the "
        "SharePoint Home and Governance pages.",
        ["Recurring Meetings is the master schedule; changes require "
         "chair approval and update to the SharePoint calendar.",
         "Log each meeting's required products on Meeting Outputs and "
         "verify filing within 5 business days.",
         "Queue future agenda items on Agenda Pipeline with a target "
         "session; the chair locks agendas 3 business days out.",
         "Reporting Calendar lists recurring reports, owners, and due "
         "days."])

    add_table_sheet(wb, "Recurring Meetings",
        ["Meeting", "Series ID", "Cadence", "Day/Time (Placeholder)",
         "Chair", "Recorder", "Location/Dial-in", "Status", "Notes"],
        [["Intake Triage", "TRI", "Weekly", "[Tue 0900]",
          "[AO Lead]", "[AO]", "[Placeholder]", "In Progress", ""],
         ["WIPT", "WIPT", "Bi-weekly", "[Wed 1300]", "[WIPT Lead]",
          "[AO]", "[Placeholder]", "In Progress", ""],
         ["OIPT", "OIPT", "Monthly", "[1st Thu 1000]",
          "[Program Office Lead]", "[AO]", "[Placeholder]",
          "In Progress", ""],
         ["CCB", "CCB", "Monthly", "[3rd Thu 1000]", "[CCB Chair]",
          "[Secretariat]", "[Placeholder]", "In Progress", ""],
         ["Availability Integration WG", "AVWG", "Bi-weekly",
          "[Thu 1400]", "[Availability Lead]", "[AO]", "[Placeholder]",
          "In Progress", ""],
         ["Readiness Review", "RRB", "Per milestone", "[Per schedule]",
          "[TYCOM N43]", "[AO]", "[Placeholder]", "In Progress", ""],
         ["Executive Steering Board", "ESB", "Quarterly",
          "[Last Wed of qtr]", "[Flag placeholder]", "[Secretariat]",
          "[Placeholder]", "In Progress", ""]],
        widths=[24, 10, 12, 16, 18, 14, 16, 14, 18],
        validations=V, cond_rules=STATUS_RULES)

    add_table_sheet(wb, "Meeting Outputs",
        ["Series ID", "Meeting Date", "Required Output", "Owner",
         "Due Date", "Status", "Filed Location"],
        [["CCB", "2026-05-15", "[Minutes + decision records]",
          "[Secretariat]", "2026-05-22", "Complete",
          "[Meeting Records library]"],
         ["OIPT", "2026-06-04", "[Risk register update]", "[AO Lead]",
          "2026-06-06", "In Progress", "[Risk register workbook]"]],
        widths=[10, 13, 28, 14, 12, 14, 26],
        validations=V, cond_rules=STATUS_RULES)

    add_table_sheet(wb, "Agenda Pipeline",
        ["Item", "Requested By", "Target Series", "Target Date",
         "Read-ahead Status", "Priority", "Status", "Notes"],
        [["[Backbone refresh decision brief]", "NAVSEA", "CCB",
          "2026-07-17", "[Evaluation memo in coordination]", "High",
          "In Progress", "[Placeholder]"],
         ["[FY2X+1 availability candidate review]", "TYCOM N6", "OIPT",
          "2026-08-06", "[Not started]", "Medium", "Not Started",
          "[Placeholder]"]],
        widths=[30, 14, 12, 12, 24, 10, 14, 20],
        validations={**V, "Requested By": "OrgList"},
        cond_rules=STATUS_RULES + PRI_RULES)

    add_table_sheet(wb, "Required Attendees",
        ["Series ID", "Organization", "Role", "Attendance Type",
         "Named POC", "Alternate"],
        [["CCB", "TYCOM N6", "Voting member", "Required", "[Name]",
          "[Name]"],
         ["CCB", "Ship's Force", "Advisor", "As required", "[Name]",
          "[Name]"],
         ["AVWG", "RMC", "Production scheduler", "Required", "[Name]",
          "[Name]"]],
        widths=[10, 16, 20, 14, 14, 14],
        validations={"Organization": "OrgList"})

    cols_r = ["Report", "Owner", "Frequency", "Due", "Audience",
              "Posted To", "Status"]
    add_table_sheet(wb, "Reporting Calendar", cols_r,
        [["Modernization Status Report", "[AO Lead]", "Monthly",
          "[5th business day]", "All stakeholders",
          "[Dashboard page]", "In Progress"],
         ["Executive Dashboard", "[Program Office Lead]", "Quarterly",
          "[1 week before ESB]", "Leadership", "[Home page]",
          "Not Started"],
         ["CCB Minutes", "[Secretariat]", "Per CCB", "[CCB + 5 days]",
          "CCB members", "[Meeting Records library]", "Complete"]],
        widths=[26, 16, 12, 16, 18, 20, 14],
        validations=V, cond_rules=STATUS_RULES)
    _save(wb, path)


# ----------------------------------------------------------------------
# 10. SharePoint Content Inventory and Metadata Plan
# ----------------------------------------------------------------------
def wb_sp_inventory(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5IMP SharePoint Content Inventory and Metadata Plan",
        "Build specification for the C5IMP SharePoint site: every library, "
        "list, metadata column, view, permission group, web part, and "
        "page mapping the site owners must create. Used during Phases 1-6 "
        "of the Implementation Roadmap and audited monthly thereafter.",
        ["Build the site to match these tabs exactly; record any approved "
         "deviation in the Notes column.",
         "Create site columns from Metadata Columns first, then bind them "
         "to libraries/lists per Document Libraries and Lists tabs.",
         "Create views per the Views tab before adding web parts.",
         "Permissions Groups defines group composition and access level; "
         "the Restricted Decision Records Group uses unique permissions.",
         "Web Parts and Page Mapping mirror the Web Part Employment "
         "Matrix in 04_SharePoint_Architecture."])

    inv_rules = [("Build Status", "Complete", GREEN_FILL),
                 ("Build Status", "Blocked", ORANGE_FILL)]
    inv_v = {"Build Status": "StatusList"}

    def _bs(rows, pos):
        """Insert a 'Not Started' Build Status value at column pos."""
        return [r[:pos] + ["Not Started"] + r[pos:] for r in rows]

    add_table_sheet(wb, "Document Libraries",
        ["Library", "Purpose", "Content Types", "Required Metadata",
         "Versioning", "Approval Required?", "Build Status", "Notes"],
        _bs([["Program Documents", "Controlled charters, SOPs, plans",
          "Charter; SOP; Plan", "Document Type; Status; Owner; Review "
          "Date", "Major (check-out required)", "Yes", ""],
         ["Templates", "Blank templates only", "All template types",
          "Document Type; Last Updated", "Major", "Yes", "[Read-only "
          "for most users]"],
         ["Modernization Trackers", "Authoritative Excel trackers",
          "Tracker", "Document Type; Owner; Last Updated",
          "Major+minor", "No", "[Edit in browser only]"],
         ["Configuration Baseline", "Baseline register + references",
          "Tracker; Plan", "Hull; System Category; Status; Owner",
          "Major (check-out required)", "Yes", "[CM staff edit only]"],
         ["Decision Records", "Completed decision records",
          "Decision Record", "Hull; System Category; Decision "
          "Authority; Status", "Major", "Yes", "[Restricted group]"],
         ["Meeting Records", "Agendas, read-aheads, minutes",
          "Minutes", "Meeting Series; Hull; Status", "Major", "No", ""],
         ["Lessons Learned", "After Action Reports", "AAR",
          "Hull; Availability; System Category", "Major", "No", ""]], 6),
        widths=[20, 28, 20, 30, 20, 14, 13, 20],
        validations=inv_v, cond_rules=inv_rules)

    add_table_sheet(wb, "Lists",
        ["List", "Purpose", "Key Columns", "Source of Truth For",
         "Build Status", "Notes"],
        _bs([["Intake List", "Modernization intake submissions",
          "Title; Sponsor Org; Hull; System Category; Priority; Status",
          "Intake pipeline", "[Pairs with intake form template]"],
         ["Action Items List", "Mirror of action tracker for web part "
          "views", "Action; Owner Org; Due Date; Status; Priority",
          "Action dashboards", "[Sync from workbook or use list as "
          "master - choose one]"],
         ["Risk List", "Top risks surfaced on dashboard",
          "Risk; Hull; Risk Level; Owner Org; Review Date",
          "Dashboard risk view", ""],
         ["Stakeholder Directory", "POC roster", "Name; Org; Role; "
          "Email; SharePoint Group", "People web parts", ""],
         ["Battle Rhythm Calendar", "Events calendar",
          "Event; Series; Date; Location", "Events web parts", ""]], 4),
        widths=[18, 26, 36, 22, 13, 26],
        validations=inv_v, cond_rules=inv_rules)

    add_table_sheet(wb, "Metadata Columns",
        ["Column", "Type", "Values/Source", "Required On", "Notes"],
        [["Hull", "Choice", "CVN-XX; CVN-YY; CVN-ZZ; Class-Wide",
          "Most libraries/lists", "[Extend per fleet]"],
         ["System Category", "Choice", "C2 Suite; Communications; "
          "Networks; Combat Systems I/F; ISR; Navigation; Cyber "
          "Infrastructure", "Most libraries/lists", ""],
         ["Program Office", "Choice", "TYCOM; NAVSEA; PEO Carriers; "
          "PEO C4I/PMW; Other", "Program Documents; Decision Records",
          ""],
         ["Document Type", "Choice", "Charter; SOP; Form; Memorandum; "
          "Assessment; Plan; Minutes; Decision Record; AAR; Guide; "
          "Tracker", "All libraries", ""],
         ["Status", "Choice", "Draft; In Review; Approved; Superseded",
          "All libraries", "[Document status, not item status]"],
         ["Decision Authority", "Choice", "ESB; CCB; WIPT; Expedited",
          "Decision Records", ""],
         ["Availability", "Choice", "[PIA FY2X; DPIA FY2X; CIA FY2X+1; "
          "N/A]", "Trackers; AARs", ""],
         ["Fiscal Year", "Choice", "[FY2X; FY2X+1; FY2X+2]", "Trackers",
          ""],
         ["Handling Caveat", "Choice", "[Placeholder caveat values per "
          "command guidance]", "All libraries", "[Classification/"
          "handling placeholder - tailor before use]"],
         ["Owner", "Person", "Site directory", "All libraries", ""],
         ["Review Date", "Date", "-", "Program Documents", ""],
         ["Last Updated", "Date (auto)", "Modified", "All", "[Use "
          "built-in Modified where possible]"],
         ["CCB Required", "Yes/No", "-", "Intake List", ""],
         ["Readiness Impact", "Choice", "High; Moderate; Low; None",
          "Intake List; Risk List", ""]],
        widths=[18, 12, 40, 26, 28])

    add_table_sheet(wb, "Views",
        ["Library/List", "View Name", "Filter/Sort", "Audience",
         "Used On Page", "Build Status"],
        _bs([["Intake List", "Triage Queue", "Status=Submitted, sort by "
          "date", "Action officers", "Intake and Change Review"],
         ["Intake List", "My Submissions", "Created By = [Me]",
          "Sponsors", "Intake and Change Review"],
         ["Action Items List", "Overdue", "Due<today AND Status<>"
          "Complete", "All", "Risks/Issues/Actions; Dashboard"],
         ["Action Items List", "By Organization", "Group by Owner Org",
          "Leads", "Risks/Issues/Actions"],
         ["Risk List", "High Risks", "Risk Level=High", "Leadership",
          "Dashboard"],
         ["Decision Records", "Pending Decisions", "Status=Pending",
          "CCB members", "Decisions and CCB"],
         ["Meeting Records", "By Series", "Group by Meeting Series",
          "All", "Governance and Meetings"],
         ["Program Documents", "By Hull", "Group by Hull", "All",
          "Multiple"]], 5),
        widths=[20, 18, 32, 16, 26, 13],
        validations=inv_v, cond_rules=inv_rules)

    add_table_sheet(wb, "Permissions Groups",
        ["Group", "Access Level", "Membership (Placeholder)",
         "Build Status", "Scope Notes"],
        _bs([["Site Owners", "Full Control", "[2-3 named site owners]",
          "Structure, permissions, views"],
         ["TYCOM Editors", "Edit", "[TYCOM N6/N43/N4 staff]",
          "All except Decision Records edit"],
         ["NAVSEA Editors", "Edit", "[NAVSEA modernization staff]",
          "All except Decision Records edit"],
         ["PEO/PMW Contributors", "Contribute", "[PEO/PMW reps]",
          "Trackers, intake, meeting records"],
         ["Ship Viewers", "Read", "[Ship's Force C5I]",
          "Read all unrestricted content"],
         ["Shipyard/RMC Contributors", "Contribute (scoped)",
          "[RMC/shipyard planners]", "Availability content only"],
         ["Read-Only Leadership", "Read", "[Flag/SES staff]",
          "All unrestricted content"],
         ["Restricted Decision Records Group", "Edit (unique perms)",
          "[CCB secretariat + chair]", "Decision Records library "
          "only"]], 3),
        widths=[26, 18, 28, 13, 32],
        validations=inv_v, cond_rules=inv_rules)

    add_table_sheet(wb, "Web Parts",
        ["Web Part", "Primary Use", "Configuration Notes"],
        [["Hero", "Major navigation on Home", "[5-tile layout to top "
          "pages]"],
         ["Quick Links", "Key workflows and templates", "[Button "
          "layout; link to intake, trackers, templates]"],
         ["Document Library", "Controlled document access",
          "[Point at specific view, not whole library]"],
         ["List", "Actions, risks, decisions", "[Use filtered views; "
          "enable inline edit only for contributors]"],
         ["Highlighted Content", "Recently updated / high priority",
          "[Filter by metadata: Priority=High or Modified last 14 "
          "days]"],
         ["News", "Modernization updates", "[Post from Home; audience "
          "targeting optional]"],
         ["Events", "Battle rhythm and CCB events", "[Bind to Battle "
          "Rhythm Calendar list]"],
         ["People", "Key POCs", "[Bind to Stakeholder Directory "
          "entries]"],
         ["Text", "Process guidance blocks", "[Short guidance only; "
          "link to documents for detail]"],
         ["Embed / Power BI", "Future dashboard integration",
          "[Placeholder pending tenant approval]"],
         ["Forms placeholder", "Intake workflow", "[If tenant policy "
          "allows; else use list new-item form]"]],
        widths=[20, 28, 50])

    add_table_sheet(wb, "Page Mapping",
        ["Page", "Purpose", "Web Parts", "Sources", "Build Status"],
        _bs([["Home", "Orientation and navigation", "Hero; News; Events; "
          "Quick Links; People", "News; Battle Rhythm Calendar; "
          "Stakeholder Directory"],
         ["Modernization Dashboard", "Status rollup", "Highlighted "
          "Content; List (risks, actions); Embed placeholder",
          "Trackers; Risk List; Action Items List"],
         ["Intake and Change Review", "Intake pipeline", "Quick Links; "
          "List (Intake views); Text", "Intake List; Templates"],
         ["Configuration Baseline", "Baseline visibility", "Document "
          "Library; Text", "Configuration Baseline library"],
         ["Availability Integration", "Availability work", "Document "
          "Library; List; Events", "Trackers; Battle Rhythm Calendar"],
         ["Risks / Issues / Actions", "Burn-down", "List x3 (views); "
          "Highlighted Content", "Risk List; Action Items List"],
         ["Governance and Meetings", "Battle rhythm", "Events; Document "
          "Library; Quick Links", "Meeting Records; Calendar"],
         ["Decisions and CCB", "Decision traceability", "List (Decision "
          "log views); Document Library", "Decision Records"],
         ["Readiness Assessments", "Readiness visibility", "Document "
          "Library; Highlighted Content", "Readiness workbook + "
          "reports"],
         ["References and Templates", "Self-service", "Document Library "
          "(Templates view); Quick Links; Text", "Templates library"],
         ["Lessons Learned", "Knowledge capture", "Document Library; "
          "Highlighted Content", "Lessons Learned library"]], 4),
        widths=[22, 22, 40, 34, 13],
        validations=inv_v, cond_rules=inv_rules)
    _save(wb, path)


# ----------------------------------------------------------------------
# Deliverable 4: Web Part Employment Matrix
# ----------------------------------------------------------------------
def wb_webpart_matrix(path):
    wb = new_workbook()
    add_instructions_sheet(
        wb, "C5IMP SharePoint Web Part Employment Matrix",
        "Page-by-page build sheet mapping every SharePoint page to its "
        "purpose, audience, web parts, source libraries/lists, displayed "
        "documents and trackers, required views, update owner, and "
        "refresh frequency. Used with the SharePoint Design Brief and the "
        "Content Inventory workbook during site build (Roadmap Phase 6).",
        ["Build each page top-to-bottom per its row; check off in the "
         "Build Status column.",
         "Point Document Library and List web parts at the named view, "
         "never the unfiltered default.",
         "Update owners listed here are accountable for content currency "
         "at the stated refresh frequency."])

    cols = ["SharePoint Page", "Purpose", "Primary Audience",
            "Recommended Web Parts", "Source Library/List",
            "Documents/Trackers Displayed", "Metadata/View Required",
            "Update Owner", "Refresh Frequency", "Build Status"]
    rows = [
        ["Home", "Program orientation, navigation, news, battle rhythm",
         "All users",
         "Hero; News; Events; Quick Links; People",
         "News; Battle Rhythm Calendar; Stakeholder Directory",
         "Program Charter (link); SharePoint User Guide",
         "Events: next 30 days view; People: key POC filter",
         "Site Owners", "Weekly (news) / auto (events)", "Not Started"],
        ["Modernization Dashboard",
         "Single-glance modernization status and hot items",
         "Leadership; action officers",
         "Highlighted Content; List (risks, overdue actions); Text; "
         "Embed/Power BI placeholder",
         "Modernization Trackers; Risk List; Action Items List",
         "Master Modernization Tracker; Risk Register",
         "Priority=High filter; Overdue view; Modified<14d",
         "Action Officer Lead", "Within 2 business days of events",
         "Not Started"],
        ["Intake and Change Review",
         "Submit and track proposed changes",
         "Sponsors; triage team",
         "Quick Links (Submit New Intake); List (Triage Queue, My "
         "Submissions); Text; Forms placeholder",
         "Intake List; Templates Library",
         "Intake Form template; Change Evaluation Memorandum template",
         "Triage Queue view; My Submissions view; CCB Required column",
         "Action Officer Lead", "Daily during triage cycle",
         "Not Started"],
        ["Configuration Baseline",
         "Baseline visibility and change posture",
         "CM staff; engineers; CCB members",
         "Document Library (register view); List (pending changes); "
         "Text",
         "Configuration Baseline Library",
         "Baseline Configuration Register; documentation references",
         "By Hull view; Pending Changes view; Hull + System Category "
         "metadata",
         "Configuration Manager", "On Decision Record execution",
         "Not Started"],
        ["Availability Integration",
         "Availability planning and execution status",
         "Availability teams; RMC/shipyard",
         "Document Library; List (work packages); Events (milestones)",
         "Modernization Trackers; Battle Rhythm Calendar",
         "Availability Integration Tracker; Availability Integration "
         "Planning Guide",
         "By Availability view; Critical Path filter",
         "Availability Integration Lead",
         "Bi-weekly planning / weekly execution", "Not Started"],
        ["Risks / Issues / Actions",
         "Risk and action burn-down",
         "All stakeholders",
         "List (High Risks); List (Overdue actions); List (By "
         "Organization); Highlighted Content",
         "Risk List; Action Items List",
         "Risk Register workbook; Action Item Tracker",
         "High Risks view; Overdue view; By Organization view",
         "Action Officer Lead", "Within 2 business days of events",
         "Not Started"],
        ["Governance and Meetings",
         "Battle rhythm, agendas, minutes",
         "All stakeholders",
         "Events; Document Library (By Series view); Quick Links "
         "(minutes template)",
         "Meeting Records Library; Battle Rhythm Calendar",
         "Meeting Minutes template; Battle Rhythm Tracker",
         "By Series view; Meeting Series metadata",
         "Secretariat / Recorders", "Within 5 business days of each "
         "meeting", "Not Started"],
        ["Decisions and CCB",
         "Decision traceability and CCB operations",
         "CCB members; leadership",
         "List (Decision Log views); Document Library (CCB packages); "
         "Text (thresholds)",
         "Decision Records Library; Decision Log",
         "Decision Log workbook; Decision Record template; CCB Charter",
         "Pending Decisions view; Decision Authority metadata; "
         "restricted permissions",
         "CCB Secretariat", "Within 2 business days of each decision",
         "Not Started"],
        ["Readiness Assessments",
         "Hull/system readiness visibility",
         "TYCOM; Ship's Force; readiness board",
         "Document Library; Highlighted Content (latest assessments)",
         "Program Documents Library; Modernization Trackers",
         "Readiness Assessment workbook; assessment reports",
         "By Hull view; Assessment Type metadata",
         "Readiness Assessment Lead", "Per milestone gate",
         "Not Started"],
        ["References and Templates",
         "Self-service templates and references",
         "All users",
         "Document Library (Templates view); Quick Links; Text "
         "(how-to)",
         "Templates Library",
         "All 12 Word templates; all Excel tools",
         "Document Type metadata; read-only enforcement",
         "Site Owners", "On template revision", "Not Started"],
        ["Lessons Learned",
         "AAR capture and discovery",
         "All stakeholders",
         "Document Library; Highlighted Content (recent AARs)",
         "Lessons Learned Library",
         "After Action Report template; filed AARs",
         "By Hull and By Availability views",
         "Program Office Lead", "Within 30 days of each event",
         "Not Started"]]
    add_table_sheet(wb, "Web Part Employment Matrix", cols, rows,
        widths=[20, 26, 18, 32, 26, 28, 28, 18, 20, 12],
        validations={"Build Status": "StatusList"},
        cond_rules=[("Build Status", "Complete", GREEN_FILL),
                    ("Build Status", "Blocked", ORANGE_FILL)])
    _save(wb, path)


# ----------------------------------------------------------------------
def build_all(root):
    e = os.path.join(root, "02_Excel_Tools")
    m = os.path.join(root, "06_Metadata_and_Permissions")
    a = os.path.join(root, "04_SharePoint_Architecture")
    for d in (e, m, a):
        os.makedirs(d, exist_ok=True)

    wb_master_tracker(os.path.join(e, "01_C5IMP_Master_Modernization_Tracker.xlsx"))
    wb_baseline(os.path.join(e, "02_CVN_C5I_Baseline_Configuration_Register.xlsx"))
    wb_rio(os.path.join(e, "03_C5IMP_Risk_Issue_Opportunity_Register.xlsx"))
    wb_actions(os.path.join(e, "04_C5IMP_Action_Item_Tracker.xlsx"))
    wb_raci(os.path.join(e, "05_Stakeholder_RACI_Matrix.xlsx"))
    wb_decisions(os.path.join(e, "06_C5IMP_Decision_Log.xlsx"))
    wb_avail(os.path.join(e, "07_Availability_Integration_Tracker.xlsx"))
    wb_readiness(os.path.join(e, "08_C5I_Readiness_Assessment_Workbook.xlsx"))
    wb_battle_rhythm(os.path.join(e, "09_Meeting_Battle_Rhythm_Tracker.xlsx"))
    wb_sp_inventory(os.path.join(
        m, "10_SharePoint_Content_Inventory_and_Metadata_Plan.xlsx"))
    wb_webpart_matrix(os.path.join(
        a, "C5IMP_WebPart_Employment_Matrix.xlsx"))


if __name__ == "__main__":
    build_all(sys.argv[1] if len(sys.argv) > 1 else
              "CVN_C5IMP_Admin_Tool_Suite")
