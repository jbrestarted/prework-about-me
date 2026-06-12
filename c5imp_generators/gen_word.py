"""
Generates the 12 Word templates for the CVN C5IMP Administrative Tool Suite.

Usage: python gen_word.py <output_root>
Outputs go to 01_Word_Templates (and 05_User_Guides for the SharePoint
User Guide, 07_Implementation_Roadmap for the roadmap annex).
"""

import os
import sys

from helpers_docx import (new_document, finish_document, add_section,
                          make_table)

HULLS = "[CVN-XX], [CVN-YY], [CVN-ZZ]"
SYS_CATS = ("C2 Suite, Communications (SATCOM/LOS), Networks (Afloat "
            "Network Placeholder), Combat Systems Interfaces, ISR, "
            "Navigation, Cybersecurity Infrastructure")


# ----------------------------------------------------------------------
# 1. Program Charter
# ----------------------------------------------------------------------
def doc_charter(out):
    doc = new_document(
        "CVN C5IMP Program Charter",
        "Mission, Scope, Governance, Authorities, and Responsibilities",
        "C5IMP-CHTR-001")

    add_section(doc, "1. Purpose", [
        "This Charter establishes the Aircraft Carrier Command, Control, "
        "Communications, Computers, Combat Systems, and Intelligence (C5I) "
        "Modernization Program (C5IMP) administrative framework. It defines "
        "the mission, scope, governance structure, decision authorities, and "
        "stakeholder responsibilities required to plan, coordinate, and "
        "execute C5I modernization across the CVN class.",
        "This document is a template. It does not constitute official policy "
        "until reviewed, tailored, and signed by the designated approval "
        "authorities."])

    add_section(doc, "2. Mission", [
        "Deliver integrated, configuration-controlled C5I modernization to "
        "CVN hulls in alignment with availability schedules, fleet readiness "
        "requirements, and approved baselines, while preserving decision "
        "traceability between TYCOM, NAVSEA, PEO Carriers, and PEO C4I/PMW "
        "stakeholders."])

    add_section(doc, "3. Scope", [
        "The C5IMP administrative framework applies to the following "
        "activities for hulls " + HULLS + ":"], [
        "Shipboard C5I modernization planning and prioritization.",
        "C5I installation coordination across PIA/DPIA/CIA availabilities.",
        "Baseline configuration management for C5I systems "
        "(" + SYS_CATS + ").",
        "TYCOM readiness governance and modernization readiness assessment.",
        "NAVSEA / PEO Carriers / PEO C4I / PMW stakeholder coordination.",
        "Risk, issue, and opportunity management.",
        "Action item management and decision documentation.",
        "Availability integration planning and execution oversight.",
        "Lessons learned capture and baseline updates."])

    add_section(doc, "4. Governance Structure", [
        "C5IMP governance operates through the following forums. Membership, "
        "thresholds, and cadence are detailed in the C5IMP Governance SOP "
        "and CCB Charter."])
    make_table(doc,
        ["Forum", "Chair", "Cadence", "Primary Outputs"],
        [["C5IMP Executive Steering Board", "[TYCOM N6 / NAVSEA Flag-level "
          "Placeholder]", "Quarterly", "Strategic direction, escalated "
          "decisions, resource adjudication"],
         ["C5IMP Configuration Control Board (CCB)", "[CCB Chair Placeholder]",
          "Monthly", "Change approvals/disapprovals, baseline updates"],
         ["Overarching IPT (OIPT)", "[Program Office Lead Placeholder]",
          "Monthly", "Cross-organization integration, risk review"],
         ["Working IPTs (WIPTs)", "[WIPT Leads Placeholder]", "Bi-weekly",
          "Technical resolution, intake triage, action burn-down"],
         ["Availability Integration Working Group", "[Availability Lead "
          "Placeholder]", "Bi-weekly during planning windows",
          "Work package sequencing, access deconfliction"],
         ["Readiness Review Board", "[TYCOM N43 Placeholder]",
          "Per availability milestone", "Modernization readiness "
          "assessments, certification recommendations"]])

    add_section(doc, "5. Decision Authorities", [
        "Decision authority is tiered by impact. Thresholds below are "
        "placeholders to be tailored by the signing authorities."])
    make_table(doc,
        ["Tier", "Decision Type", "Authority", "Documentation"],
        [["1", "Class-level baseline changes; cross-hull schedule impacts",
          "Executive Steering Board", "Decision Record + CCB minutes"],
         ["2", "Single-hull configuration changes within approved baseline",
          "C5IMP CCB", "Decision Record + CCB minutes"],
         ["3", "Administrative / documentation-only changes",
          "WIPT Lead with CCB notification", "Decision Log entry"],
         ["4", "Emergent installation-period field changes",
          "[On-site Authority Placeholder] with 72-hr CCB report",
          "Decision Record (expedited)"]])

    add_section(doc, "6. Stakeholder Roles and Responsibilities", [])
    make_table(doc,
        ["Organization", "Role Summary"],
        [["TYCOM N6", "C5I requirements advocacy; readiness governance; "
          "modernization prioritization for fleet alignment"],
         ["TYCOM N43 / N4", "Maintenance and availability alignment; "
          "material readiness integration"],
         ["NAVSEA Carrier Modernization", "Ship integration engineering; "
          "alteration management; availability work package authority"],
         ["PEO Carriers", "Platform-level acquisition coordination; "
          "cross-program integration"],
         ["PEO C4I / PMW", "C5I system acquisition, fielding plans, "
          "installation requirements, ILS products"],
         ["Ship's Force C5I", "Shipboard impact assessment; crew training "
          "and operational acceptance; tag-out and access support"],
         ["RMC / Shipyard", "Installation execution; production scheduling; "
          "test support"],
         ["Program Office Action Officers", "Intake processing; tracker "
          "maintenance; action item management; meeting support"],
         ["CCB Members", "Change evaluation and disposition per CCB Charter"],
         ["Availability Planning Teams", "Integration of C5I work into "
          "availability work packages and milestones"]])

    add_section(doc, "7. Authorities and References", [], [
        "[Reference Placeholder: Fleet Modernization Program guidance]",
        "[Reference Placeholder: NAVSEA alteration management instruction]",
        "[Reference Placeholder: TYCOM C5I readiness instruction]",
        "[Reference Placeholder: Configuration management policy]",
        "[Reference Placeholder: Cybersecurity / RMF guidance]"])

    add_section(doc, "8. Charter Review and Maintenance", [
        "This Charter is reviewed annually or upon significant program "
        "change. The C5IMP administrative lead maintains the controlled copy "
        "on the C5IMP SharePoint site; printed copies are uncontrolled."])

    finish_document(doc, out)


# ----------------------------------------------------------------------
# 2. Governance SOP
# ----------------------------------------------------------------------
def doc_sop(out):
    doc = new_document(
        "CVN C5IMP Governance Standard Operating Procedure",
        "Battle Rhythm, Decision Workflow, Escalation, and Reporting",
        "C5IMP-SOP-001")

    add_section(doc, "1. Purpose", [
        "This SOP prescribes the recurring battle rhythm, decision workflow, "
        "escalation process, meeting cadence, reporting requirements, and "
        "coordination responsibilities for CVN C5IMP governance."])

    add_section(doc, "2. Battle Rhythm", [
        "The standard battle rhythm below is maintained in the Meeting "
        "Battle Rhythm Tracker on the C5IMP SharePoint site."])
    make_table(doc,
        ["Event", "Cadence", "Day/Time (Placeholder)", "Lead", "Required Inputs"],
        [["Intake Triage", "Weekly", "[Tue 0900]", "Action Officer Lead",
          "New intake forms; triage worksheet"],
         ["WIPT Sessions", "Bi-weekly", "[Wed 1300]", "WIPT Leads",
          "Action tracker; technical issue papers"],
         ["OIPT", "Monthly", "[1st Thu 1000]", "Program Office Lead",
          "WIPT rollups; risk register; schedule status"],
         ["CCB", "Monthly", "[3rd Thu 1000]", "CCB Chair",
          "Change packages; evaluation memoranda; pre-brief deck"],
         ["Readiness Review", "Per milestone", "[Per availability schedule]",
          "TYCOM N43", "Readiness assessment workbook; system status"],
         ["Executive Steering Board", "Quarterly", "[Last Wed of quarter]",
          "[Flag-level Placeholder]", "Program dashboard; escalation slate"],
         ["Modernization Status Report", "Monthly", "[5th business day]",
          "Action Officer Lead", "Master tracker; decision log"]])

    add_section(doc, "3. Decision Workflow", [
        "All proposed C5I changes follow the standard lifecycle:"], [
        "Step 1 - Intake: Sponsor submits C5I Modernization Intake Form via "
        "the SharePoint intake library/list.",
        "Step 2 - Triage: Action officers validate completeness, assign a "
        "tracking number, and route to the cognizant WIPT within 5 business "
        "days.",
        "Step 3 - Stakeholder Review: WIPT coordinates the Change Evaluation "
        "Memorandum across technical, schedule, cost, manpower, training, "
        "cybersecurity, logistics, and documentation reviewers.",
        "Step 4 - CCB / Decision: CCB dispositions the change per the CCB "
        "Charter; the decision is captured in a Decision Record.",
        "Step 5 - Schedule Integration: Approved changes are integrated into "
        "the Availability Integration Tracker and availability work packages.",
        "Step 6 - Execution: Installation and test activities tracked through "
        "the Master Modernization Tracker.",
        "Step 7 - Readiness Assessment: Modernization Readiness Assessment "
        "completed prior to operational turnover.",
        "Step 8 - Lessons Learned: After Action Report filed; baseline "
        "registers updated."])

    add_section(doc, "4. Escalation Process", [
        "Issues unresolved at a given tier escalate as follows. Escalation "
        "packages must include a one-page issue summary, options, and a "
        "recommended course of action."])
    make_table(doc,
        ["Trigger", "From", "To", "Timeline"],
        [["Technical disagreement unresolved after two WIPT cycles",
          "WIPT", "OIPT", "Next OIPT or within 10 business days"],
         ["Cross-program resource or schedule conflict", "OIPT",
          "Executive Steering Board", "Next ESB or out-of-cycle if "
          "availability-critical"],
         ["Decision overdue beyond agreed need date", "Action Officer",
          "CCB Chair", "Within 5 business days of breach"],
         ["Safety or cybersecurity stop-work condition", "Any stakeholder",
          "[Designated Authority Placeholder]", "Immediate"]])

    add_section(doc, "5. Reporting Requirements", [], [
        "Monthly Modernization Status Report: rollup of tracker status, "
        "decisions, risks, and upcoming milestones; posted to the SharePoint "
        "Modernization Dashboard.",
        "CCB Minutes: published within 5 business days of each CCB.",
        "Action Item Report: auto-generated views from the Action Item "
        "Tracker, reviewed at every WIPT/OIPT.",
        "Readiness Assessment Summary: published at each availability "
        "milestone gate.",
        "Quarterly Executive Dashboard: prepared for the Executive Steering "
        "Board."])

    add_section(doc, "6. Coordination Responsibilities", [
        "Action officers maintain trackers within 2 business days of any "
        "governance event. WIPT leads confirm agenda inputs no later than 3 "
        "business days before each session. The SharePoint site is the "
        "single authoritative location for all governance artifacts; email "
        "attachments are non-authoritative working copies."])

    add_section(doc, "7. Records Management", [
        "All minutes, decision records, and assessment products are filed in "
        "the designated SharePoint libraries with required metadata (Hull, "
        "System Category, Status, Decision Authority, Review Date). Records "
        "disposition follows [Records Schedule Placeholder]."])

    finish_document(doc, out)


# ----------------------------------------------------------------------
# 3. Intake Form
# ----------------------------------------------------------------------
def doc_intake(out):
    doc = new_document(
        "CVN C5I Modernization Intake Form",
        "Proposed Change Capture and Routing",
        "C5IMP-FORM-001")

    add_section(doc, "1. Instructions", [
        "Complete all fields. Enter 'N/A' where not applicable. Submit via "
        "the C5IMP SharePoint Intake list. Incomplete submissions will be "
        "returned by the triage team. Do not include classified detail; use "
        "approved references and placeholders."])

    add_section(doc, "2. Submission Summary", [])
    make_table(doc, ["Field", "Entry"],
        [["Intake Tracking Number", "[Assigned by triage: C5IMP-INT-YYYY-NNN]"],
         ["Date Submitted", "[DD MMM YYYY]"],
         ["Title of Proposed Change", "[Short descriptive title]"],
         ["Sponsor (Org / Name / Contact)", "[Organization / Name / Email / "
          "Phone]"],
         ["Originating Organization", "[TYCOM / NAVSEA / PEO / PMW / Ship / "
          "RMC / Other]"],
         ["Priority (Sponsor Assessment)", "[Critical / High / Medium / Low]"]],
        widths=[2.5, 4.0])

    add_section(doc, "3. Proposed Change Description", [])
    make_table(doc, ["Field", "Entry"],
        [["Description of Change", "[Describe the proposed modernization, "
          "alteration, or configuration change]"],
         ["Affected Systems / Categories", "[" + SYS_CATS + "]"],
         ["Affected Hulls", "[" + HULLS + " / Class-wide]"],
         ["Affected Spaces / Compartments", "[Compartment placeholders]"],
         ["Interfacing Systems", "[List interfaces affected]"]],
        widths=[2.5, 4.0])

    add_section(doc, "4. Operational Need and Drivers", [])
    make_table(doc, ["Field", "Entry"],
        [["Operational Need Statement", "[Capability gap or compliance "
          "driver]"],
         ["Schedule Driver", "[Availability window / fielding directive / "
          "obsolescence date]"],
         ["Required Need Date", "[DD MMM YYYY]"],
         ["Consequence If Not Implemented", "[Operational / readiness / "
          "compliance impact]"],
         ["Related Directives or References", "[Reference placeholders]"]],
        widths=[2.5, 4.0])

    add_section(doc, "5. Preliminary Impact Assessment (Sponsor)", [])
    make_table(doc, ["Area", "Sponsor Assessment"],
        [["Ship Impact (space, weight, power, cooling, access)",
          "[Describe]"],
         ["Schedule Impact", "[Describe]"],
         ["Cost / Funding Source", "[ROM and funding line placeholder]"],
         ["Manpower / Watchstander Impact", "[Describe]"],
         ["Training Impact", "[Describe]"],
         ["Cybersecurity / Authorization Impact", "[RMF/ATO impact "
          "placeholder]"],
         ["Logistics / ILS Impact", "[Spares, support equipment, manuals]"],
         ["Known Risks", "[Describe]"]],
        widths=[2.8, 3.7])

    add_section(doc, "6. Decision Requested", [])
    make_table(doc, ["Field", "Entry"],
        [["Decision Requested", "[Approve for evaluation / approve for "
          "specific availability / other]"],
         ["Requested Decision Forum", "[WIPT / CCB / ESB]"],
         ["Requested Decision Date", "[DD MMM YYYY]"]],
        widths=[2.5, 4.0])

    add_section(doc, "7. Triage Section (Action Officer Use Only)", [])
    make_table(doc, ["Field", "Entry"],
        [["Triage Date", "[DD MMM YYYY]"],
         ["Completeness Check", "[Complete / Returned - reason]"],
         ["Assigned WIPT", "[WIPT name placeholder]"],
         ["Assigned Evaluator", "[Name / Code]"],
         ["Target Evaluation Complete Date", "[DD MMM YYYY]"],
         ["Tracker Entry Confirmed", "[Yes / No - Master Tracker ID]"]],
        widths=[2.5, 4.0])

    finish_document(doc, out,
        ["Sponsor", "Triage Action Officer", "WIPT Lead"])


# ----------------------------------------------------------------------
# 4. Change Evaluation Memorandum
# ----------------------------------------------------------------------
def doc_eval_memo(out):
    doc = new_document(
        "C5IMP Change Evaluation Memorandum",
        "Structured Multi-Discipline Evaluation of Proposed C5I Changes",
        "C5IMP-MEMO-001")

    add_section(doc, "1. Administrative Data", [])
    make_table(doc, ["Field", "Entry"],
        [["Memorandum Number", "[C5IMP-CEM-YYYY-NNN]"],
         ["Related Intake Number", "[C5IMP-INT-YYYY-NNN]"],
         ["Change Title", "[Title]"],
         ["Evaluating WIPT", "[WIPT placeholder]"],
         ["Evaluation Lead", "[Name / Code]"],
         ["Date of Evaluation", "[DD MMM YYYY]"],
         ["Target Decision Forum / Date", "[CCB / DD MMM YYYY]"]],
        widths=[2.5, 4.0])

    add_section(doc, "2. Summary of Proposed Change", [
        "[One-paragraph summary of the proposed change, affected hulls "
        "(" + HULLS + "), affected systems, and the sponsor's stated "
        "operational need.]"])

    add_section(doc, "3. Evaluation by Discipline", [
        "Each discipline evaluator completes their row and provides a "
        "recommendation of Concur, Concur with Comment, or Non-Concur. "
        "Non-concurrences require a written rationale and proposed "
        "resolution path."])
    make_table(doc,
        ["Discipline", "Evaluator (Name/Code)", "Findings",
         "Recommendation"],
        [[d, "[Name / Code]", "[Findings placeholder]",
          "[Concur / Concur w/ Comment / Non-Concur]"]
         for d in ("Operational", "Technical / Engineering", "Schedule",
                   "Cost", "Manpower", "Training", "Cybersecurity",
                   "Logistics / ILS", "Documentation / Configuration")])

    add_section(doc, "4. Alternatives Considered", [], [
        "Alternative 1: [Description, pros, cons]",
        "Alternative 2: [Description, pros, cons]",
        "No-action alternative: [Consequence of deferral]"])

    add_section(doc, "5. Risk Summary", [])
    make_table(doc,
        ["Risk ID", "Risk Statement", "Likelihood", "Consequence",
         "Mitigation"],
        [["[RSK-NNN]", "[If/then risk statement]", "[1-5]", "[1-5]",
          "[Mitigation placeholder]"],
         ["", "", "", "", ""]])

    add_section(doc, "6. Integrated Recommendation", [
        "[Evaluation lead's consolidated recommendation, including proposed "
        "availability window, hull sequencing, funding posture, and any "
        "conditions of approval.]"])

    add_section(doc, "7. Decision Authority Action", [])
    make_table(doc, ["Field", "Entry"],
        [["Decision", "[Approved / Approved with Conditions / Disapproved / "
          "Deferred]"],
         ["Decision Authority", "[Name / Title / Forum]"],
         ["Decision Date", "[DD MMM YYYY]"],
         ["Decision Record Number", "[C5IMP-DR-YYYY-NNN]"],
         ["Conditions / Direction", "[Entry]"]],
        widths=[2.5, 4.0])

    finish_document(doc, out,
        ["Evaluation Lead", "WIPT Lead", "CCB Chair"])


# ----------------------------------------------------------------------
# 5. CCB Charter
# ----------------------------------------------------------------------
def doc_ccb_charter(out):
    doc = new_document(
        "CVN C5IMP Configuration Control Board Charter",
        "Membership, Thresholds, Agenda, and Action Management",
        "C5IMP-CCB-001")

    add_section(doc, "1. Purpose", [
        "This Charter establishes the CVN C5IMP Configuration Control Board "
        "(CCB) as the decision forum for disposition of proposed C5I "
        "configuration changes within delegated thresholds, and defines its "
        "membership, procedures, and records."])

    add_section(doc, "2. Authority", [
        "The CCB operates under authority delegated by [Delegating Authority "
        "Placeholder] per the CVN C5IMP Program Charter. Decisions exceeding "
        "CCB thresholds are escalated to the Executive Steering Board."])

    add_section(doc, "3. Membership", [])
    make_table(doc, ["Role", "Organization", "Voting Status"],
        [["Chair", "[CCB Chair Org Placeholder]", "Voting (tie-break)"],
         ["TYCOM N6 Representative", "TYCOM N6", "Voting"],
         ["TYCOM N43 Representative", "TYCOM N43", "Voting"],
         ["NAVSEA Carrier Modernization Representative",
          "NAVSEA [Code Placeholder]", "Voting"],
         ["PEO Carriers Representative", "PEO Carriers", "Voting"],
         ["PEO C4I / PMW Representative(s)", "PEO C4I / [PMW Placeholder]",
          "Voting"],
         ["Cybersecurity Representative", "[Org Placeholder]", "Voting"],
         ["Ship's Force C5I Representative", "[CVN-XX]", "Non-voting advisor"],
         ["RMC / Shipyard Representative", "[RMC Placeholder]",
          "Non-voting advisor"],
         ["ILS / Logistics Representative", "[Org Placeholder]",
          "Non-voting advisor"],
         ["Recorder / Secretariat", "Program Office Action Officer",
          "Non-voting"]])

    add_section(doc, "4. Quorum and Decision Thresholds", [], [
        "Quorum: Chair (or alternate) plus at least [4] voting members "
        "including TYCOM and NAVSEA representation.",
        "Decisions are by majority of voting members present; the Chair "
        "breaks ties and may withhold any item for higher-level decision.",
        "Within CCB authority: single-hull and class-applicable C5I changes "
        "within approved baseline cost/schedule thresholds "
        "[Threshold Placeholder].",
        "Escalation required: changes affecting availability critical path, "
        "cross-program funding, or class baseline architecture."])

    add_section(doc, "5. Pre-Brief Requirements", [], [
        "Change packages (intake form + Change Evaluation Memorandum) posted "
        "to the SharePoint CCB library no later than 5 business days before "
        "the board.",
        "Read-aheads distributed via SharePoint link only; the posted "
        "package is the package of record.",
        "Items without a completed evaluation memorandum are not boarded "
        "except for documented emergent cases approved by the Chair.",
        "Non-concurrences must be coordinated before the board or briefed "
        "as open dissent."])

    add_section(doc, "6. Standard Agenda Format", [], [
        "1. Roll call, quorum confirmation, prior minutes approval.",
        "2. Action item review (from Action Item Tracker view).",
        "3. Decision items: each presented with evaluation summary, "
        "discipline positions, and recommendation.",
        "4. Information / upcoming items pipeline.",
        "5. Risk register review (CCB-relevant risks).",
        "6. Round-table and Chair's closing direction."])

    add_section(doc, "7. Minutes and Action Tracking", [
        "The Recorder publishes minutes using the C5IMP Meeting Minutes "
        "Template within 5 business days, files them in the Meeting Records "
        "library with metadata, records each disposition in a Decision "
        "Record, and enters all actions into the Action Item Tracker with "
        "owner and due date."])

    add_section(doc, "8. Charter Review", [
        "This Charter is reviewed annually by the Chair and re-approved by "
        "the delegating authority upon significant change."])

    finish_document(doc, out,
        ["Delegating Authority [Placeholder]", "CCB Chair",
         "TYCOM N6 Representative", "NAVSEA Representative"])


# ----------------------------------------------------------------------
# 6. Modernization Readiness Assessment
# ----------------------------------------------------------------------
def doc_readiness(out):
    doc = new_document(
        "CVN Modernization Readiness Assessment",
        "Hull Readiness to Receive, Integrate, Test, Train, and Sustain a "
        "C5I Modernization Package",
        "C5IMP-MRA-001")

    add_section(doc, "1. Assessment Overview", [])
    make_table(doc, ["Field", "Entry"],
        [["Hull", "[CVN-XX]"],
         ["Modernization Package", "[Package title / Master Tracker IDs]"],
         ["Associated Availability", "[PIA / DPIA / CIA - FY placeholder]"],
         ["Assessment Type", "[Initial / Mid-planning / Pre-installation / "
          "Pre-turnover]"],
         ["Assessment Lead", "[Name / Code]"],
         ["Assessment Date", "[DD MMM YYYY]"]],
        widths=[2.5, 4.0])

    add_section(doc, "2. Readiness Rating Scale", [], [
        "GREEN - Ready: criterion fully satisfied; no action required.",
        "YELLOW - Conditionally ready: shortfalls identified with funded, "
        "scheduled corrective actions.",
        "RED - Not ready: criterion unsatisfied; corrective path undefined "
        "or unachievable within schedule.",
        "GRAY - Not assessed / not applicable."])

    areas = [
        ("3. Receive", [
            "Space, weight, power, and cooling margins confirmed",
            "Material receipt, staging, and storage plan in place",
            "Shipboard access routes and rip-out plan validated",
            "Government-furnished equipment delivery schedule confirmed"]),
        ("4. Integrate", [
            "Interface control documentation current and approved",
            "Installation drawings issued and ship-checked",
            "Cableway, foundation, and HVAC work scoped in availability",
            "Cross-system integration dependencies deconflicted"]),
        ("5. Test", [
            "Test program (SOVT or equivalent placeholder) approved",
            "Test equipment and personnel scheduled",
            "Shipboard services available for test windows",
            "Cyber/authorization testing requirements scheduled"]),
        ("6. Train", [
            "Crew training plan approved and funded",
            "Training quotas scheduled before turnover",
            "Watchstation/operator documentation available",
            "Maintenance training identified for Ship's Force"]),
        ("7. Sustain", [
            "ILS products (spares, manuals, support equipment) on track",
            "Maintenance plan and PMS placeholder updated",
            "Distance support / fleet support agreements in place",
            "Configuration data updated in baseline register"])]

    for heading, criteria in areas:
        add_section(doc, heading + " Readiness", [])
        make_table(doc,
            ["Criterion", "Rating (G/Y/R/Gray)", "Evidence / Reference",
             "Corrective Action / Owner / Due"],
            [[c, "[ ]", "[Reference placeholder]", "[If Y/R]"]
             for c in criteria])

    add_section(doc, "8. Overall Assessment and Recommendation", [
        "[Overall rating and narrative. State whether the hull is ready to "
        "proceed to the next milestone, with conditions if any.]"])
    make_table(doc, ["Field", "Entry"],
        [["Overall Rating", "[GREEN / YELLOW / RED]"],
         ["Recommendation", "[Proceed / Proceed with conditions / Hold]"],
         ["Conditions", "[Entry]"],
         ["Next Assessment Date", "[DD MMM YYYY]"]],
        widths=[2.5, 4.0])

    finish_document(doc, out,
        ["Assessment Lead", "Ship's Force C5I Representative",
         "TYCOM N43 Representative", "Readiness Review Board Chair"])


# ----------------------------------------------------------------------
# 7. Availability Integration Planning Guide
# ----------------------------------------------------------------------
def doc_avail_guide(out):
    doc = new_document(
        "CVN C5IMP Availability Integration Planning Guide",
        "PIA / DPIA / CIA Work Package Integration for C5I Modernization",
        "C5IMP-AIPG-001")

    add_section(doc, "1. Purpose", [
        "This guide standardizes how C5I modernization work is integrated "
        "into CVN availabilities (PIA, DPIA, CIA, and emergent windows). It "
        "addresses work package sequencing, dependencies, access "
        "constraints, shipyard coordination, testing, and turnover."])

    add_section(doc, "2. Planning Horizon and Milestones", [
        "Planning milestones below are placeholders keyed to the "
        "availability start date (A-date); tailor to the governing "
        "availability planning process."])
    make_table(doc,
        ["Milestone", "Timing", "C5IMP Actions"],
        [["Initial work package identification", "[A-720 days]",
          "Candidate items locked in Master Tracker; intake cutoff "
          "published"],
         ["Change decision cutoff", "[A-360 days]",
          "CCB dispositions all items for the availability"],
         ["Work package integration lock", "[A-270 days]",
          "Availability Integration Tracker baselined; dependencies mapped"],
         ["Ship check completion", "[A-180 days]",
          "Drawings validated; access constraints documented"],
         ["Material readiness review", "[A-120 days]",
          "Long-lead and GFE status confirmed"],
         ["Pre-installation readiness assessment", "[A-60 days]",
          "Modernization Readiness Assessment (pre-installation) complete"],
         ["Availability execution", "[A-day to completion]",
          "Weekly integration sync; field change control per SOP"],
         ["Test and turnover", "[Per production schedule]",
          "SOVT placeholder execution; turnover items logged"]])

    add_section(doc, "3. Work Package Sequencing Principles", [], [
        "Sequence rip-out, cable, foundation, and structural work ahead of "
        "equipment installation; reflect predecessor/successor links in the "
        "Dependencies tab of the Availability Integration Tracker.",
        "Group work by compartment and access path to minimize repeated "
        "closures of the same spaces.",
        "Protect integrated test windows; do not schedule conflicting hot "
        "work or power interruptions during system test.",
        "Identify single-point resources (cranes, shore services, drydock "
        "access) and deconflict early with the shipyard."])

    add_section(doc, "4. Access Constraints", [], [
        "Compartment access conflicts with concurrent maintenance work "
        "[Compartment placeholders].",
        "Mast / antenna access requiring aloft permits and radar silence "
        "windows.",
        "Security and escort requirements for restricted spaces "
        "[Placeholder].",
        "Tag-out coordination for power, cooling, and RF systems.",
        "Berth/drydock services availability windows."])

    add_section(doc, "5. Shipyard and RMC Coordination", [], [
        "Designate a C5IMP availability integration lead as the single "
        "point of contact to the shipyard scheduler.",
        "Conduct bi-weekly Availability Integration Working Group sessions "
        "during planning, weekly during execution.",
        "Document emergent field changes per the expedited decision path in "
        "the Governance SOP (72-hour CCB report).",
        "Maintain integration status in the Availability Integration "
        "Tracker; the SharePoint copy is authoritative."])

    add_section(doc, "6. Testing Integration", [], [
        "Map every installed item to a test milestone in the Testing "
        "Milestones tab.",
        "Schedule shipboard services (power, cooling, network) for each "
        "test window.",
        "Sequence cyber/authorization events ahead of operational test "
        "where required [RMF placeholder].",
        "Record test discrepancies as turnover items with owners and due "
        "dates."])

    add_section(doc, "7. Turnover", [], [
        "Complete pre-turnover Modernization Readiness Assessment.",
        "Deliver ILS products and updated configuration data to Ship's "
        "Force.",
        "Conduct crew familiarization and document training completion.",
        "Transfer open items to the Turnover Items tab with owners and "
        "target closure dates.",
        "File the availability After Action Report within 30 days of "
        "completion."])

    finish_document(doc, out)


# ----------------------------------------------------------------------
# 8. Stakeholder Engagement Plan
# ----------------------------------------------------------------------
def doc_stakeholder(out):
    doc = new_document(
        "CVN C5IMP Stakeholder Engagement Plan",
        "Stakeholder Mapping, Responsibilities, and Engagement Rhythm",
        "C5IMP-SEP-001")

    add_section(doc, "1. Purpose", [
        "This plan maps C5IMP stakeholders to responsibilities and a "
        "deliberate engagement rhythm so that modernization planning, "
        "decisions, and execution remain synchronized across TYCOM, NAVSEA, "
        "PEO, PMW, ship, shipyard, RMC, Fleet, and installation "
        "communities."])

    add_section(doc, "2. Stakeholder Map", [])
    make_table(doc,
        ["Stakeholder", "Primary Interest", "Primary Forums",
         "Engagement Rhythm", "POC (Placeholder)"],
        [["TYCOM N6", "C5I capability and readiness", "ESB, CCB, Readiness "
          "Review", "Monthly + milestone", "[Name/Code]"],
         ["TYCOM N43 / N4", "Maintenance and material readiness",
          "Readiness Review, OIPT", "Monthly", "[Name/Code]"],
         ["NAVSEA Carrier Modernization", "Ship integration and alteration "
          "management", "CCB, OIPT, Availability WG", "Bi-weekly to monthly",
          "[Name/Code]"],
         ["PEO Carriers", "Platform acquisition coordination", "ESB, OIPT",
          "Monthly", "[Name/Code]"],
         ["PEO C4I / PMW", "System fielding and ILS", "CCB, WIPTs",
          "Bi-weekly", "[Name/Code]"],
         ["Ship's Force C5I", "Operational acceptance, crew impact",
          "WIPTs, Readiness Review, Availability WG", "Bi-weekly during "
          "planning/execution", "[Name/Code]"],
         ["RMC / Shipyard", "Production execution", "Availability WG",
          "Bi-weekly planning / weekly execution", "[Name/Code]"],
         ["Fleet Staff [Placeholder]", "Operational schedule alignment",
          "ESB (as required)", "Quarterly", "[Name/Code]"],
         ["Installation Teams / AITs", "Install and test execution",
          "Availability WG, WIPTs", "Weekly during execution",
          "[Name/Code]"]])

    add_section(doc, "3. Engagement Principles", [], [
        "Single source of truth: all engagement artifacts posted to the "
        "C5IMP SharePoint site; meetings reference live trackers, not "
        "emailed copies.",
        "No surprises: non-concurrences and emerging issues are socialized "
        "before boards, not first raised at them.",
        "Decisions in writing: every decision affecting a stakeholder is "
        "captured in a Decision Record and visible in the Decision Log.",
        "Ship's Force burden management: consolidate data calls and ship "
        "checks; route shipboard requests through the designated ship "
        "coordinator."])

    add_section(doc, "4. Communication Products", [])
    make_table(doc, ["Product", "Audience", "Frequency", "Owner",
                     "Location"],
        [["Modernization Status Report", "All stakeholders", "Monthly",
          "Action Officer Lead", "SharePoint Dashboard page"],
         ["CCB Read-ahead Package", "CCB members", "Per CCB",
          "CCB Secretariat", "Decisions and CCB page"],
         ["Availability Integration Status", "Availability stakeholders",
          "Bi-weekly/weekly", "Availability Integration Lead",
          "Availability Integration page"],
         ["Executive Dashboard", "Flag/SES leadership", "Quarterly",
          "Program Office Lead", "Home / Dashboard page"],
         ["News Updates", "All site users", "As events occur",
          "Site Owners", "SharePoint News web part"]])

    add_section(doc, "5. Plan Maintenance", [
        "The Stakeholder Directory and RACI workbook on SharePoint are the "
        "living records of stakeholder assignments; this plan is reviewed "
        "semi-annually."])

    finish_document(doc, out)


# ----------------------------------------------------------------------
# 9. Meeting Minutes Template
# ----------------------------------------------------------------------
def doc_minutes(out):
    doc = new_document(
        "C5IMP Meeting Minutes",
        "Standard Minutes for Governance Meetings, WIPTs, OIPTs, CCBs, and "
        "Reviews",
        "C5IMP-MIN-001")

    add_section(doc, "1. Meeting Identification", [])
    make_table(doc, ["Field", "Entry"],
        [["Meeting Type", "[ESB / OIPT / WIPT / CCB / Readiness Review / "
          "Availability WG / Other]"],
         ["Meeting Number", "[Series-YYYY-NN]"],
         ["Date / Time", "[DD MMM YYYY / HHMM-HHMM]"],
         ["Location / Dial-in", "[Location placeholder]"],
         ["Chair", "[Name / Code]"],
         ["Recorder", "[Name / Code]"],
         ["Classification of Discussion", "[UNCLASSIFIED placeholder]"]],
        widths=[2.5, 4.0])

    add_section(doc, "2. Attendance", [])
    make_table(doc, ["Name", "Organization / Code", "Role",
                     "Present (Y/N)"],
        [["[Name]", "[Org/Code]", "[Member / Advisor / Guest]", "[Y/N]"],
         ["", "", "", ""], ["", "", "", ""]])

    add_section(doc, "3. Agenda Items and Discussion", [])
    make_table(doc, ["Item #", "Topic", "Summary of Discussion",
                     "Outcome / Disposition"],
        [["1", "[Topic]", "[Key points only - decisions and rationale; "
          "avoid verbatim transcription]", "[Decision / Info / Deferred]"],
         ["2", "", "", ""], ["3", "", "", ""]])

    add_section(doc, "4. Decisions Made", [
        "Each decision below must also be entered as a Decision Record and "
        "logged in the Decision Log."])
    make_table(doc, ["Decision #", "Decision", "Authority",
                     "Decision Record #"],
        [["[D-1]", "[Decision statement]", "[Forum/Authority]",
          "[C5IMP-DR-YYYY-NNN]"], ["", "", "", ""]])

    add_section(doc, "5. Action Items Assigned", [
        "Each action below must be entered in the Action Item Tracker "
        "within 2 business days."])
    make_table(doc, ["Action #", "Action", "Owner (Org/Name)", "Due Date",
                     "Tracker ID"],
        [["[A-1]", "[Action statement]", "[Org/Name]", "[DD MMM YYYY]",
          "[C5IMP-AI-YYYY-NNN]"], ["", "", "", "", ""]])

    add_section(doc, "6. Next Meeting", [])
    make_table(doc, ["Field", "Entry"],
        [["Date / Time", "[DD MMM YYYY / HHMM]"],
         ["Planned Agenda Highlights", "[Entry]"],
         ["Read-ahead Due", "[DD MMM YYYY]"]],
        widths=[2.5, 4.0])

    finish_document(doc, out, ["Recorder", "Chair"])


# ----------------------------------------------------------------------
# 10. Decision Record
# ----------------------------------------------------------------------
def doc_decision(out):
    doc = new_document(
        "C5IMP Decision Record",
        "Formal Documentation of Modernization Decisions",
        "C5IMP-DR-001")

    add_section(doc, "1. Decision Identification", [])
    make_table(doc, ["Field", "Entry"],
        [["Decision Record Number", "[C5IMP-DR-YYYY-NNN]"],
         ["Decision Title", "[Short title]"],
         ["Decision Date", "[DD MMM YYYY]"],
         ["Decision Authority", "[Name / Title / Forum]"],
         ["Decision Forum", "[CCB / ESB / OIPT / Out-of-board]"],
         ["Related Intake / Memo Numbers", "[C5IMP-INT-... / "
          "C5IMP-CEM-...]"],
         ["Related Meeting Minutes", "[Series-YYYY-NN]"]],
        widths=[2.5, 4.0])

    add_section(doc, "2. Decision Statement", [
        "[Precise statement of the decision, including what is approved, "
        "disapproved, or deferred, and any conditions.]"])

    add_section(doc, "3. Applicability", [])
    make_table(doc, ["Field", "Entry"],
        [["Affected Hulls", "[" + HULLS + " / Class-wide]"],
         ["Affected Systems / Categories", "[" + SYS_CATS + "]"],
         ["Affected Availabilities", "[PIA/DPIA/CIA - FY placeholder]"],
         ["Baseline Impact", "[Baseline register entries affected]"]],
        widths=[2.5, 4.0])

    add_section(doc, "4. Rationale", [
        "[Why this decision was made: operational need, evaluation "
        "findings, schedule and cost considerations.]"])

    add_section(doc, "5. Alternatives Considered", [], [
        "Alternative 1: [Description and reason not selected]",
        "Alternative 2: [Description and reason not selected]",
        "No-action: [Consequence considered]"])

    add_section(doc, "6. Risks Accepted", [])
    make_table(doc, ["Risk ID", "Risk Statement", "Accepted By",
                     "Monitoring Plan"],
        [["[RSK-NNN]", "[Residual risk accepted with this decision]",
          "[Authority]", "[How tracked]"], ["", "", "", ""]])

    add_section(doc, "7. Required Follow-on Actions", [])
    make_table(doc, ["Action", "Owner", "Due Date", "Tracker ID"],
        [["[Update baseline register]", "[Org/Name]", "[DD MMM YYYY]",
          "[C5IMP-AI-...]"],
         ["[Update availability tracker]", "[Org/Name]", "[DD MMM YYYY]",
          "[C5IMP-AI-...]"], ["", "", "", ""]])

    add_section(doc, "8. Distribution and Filing", [
        "File this record in the Decision Records library with metadata "
        "(Hull, System Category, Decision Authority, Status). Update the "
        "Decision Log within 2 business days."])

    finish_document(doc, out, ["Recorder", "Decision Authority"])


# ----------------------------------------------------------------------
# 11. After Action Report
# ----------------------------------------------------------------------
def doc_aar(out):
    doc = new_document(
        "C5IMP After Action Report",
        "Lessons Learned from Modernization Events and Processes",
        "C5IMP-AAR-001")

    add_section(doc, "1. Event Identification", [])
    make_table(doc, ["Field", "Entry"],
        [["Event Type", "[Installation period / Test event / CCB cycle / "
          "Readiness review / SharePoint process / Other]"],
         ["Event Title", "[Title]"],
         ["Hull / Availability", "[CVN-XX / PIA FYxx placeholder]"],
         ["Event Dates", "[DD MMM YYYY - DD MMM YYYY]"],
         ["Report Author", "[Name / Code]"],
         ["Report Date", "[DD MMM YYYY]"]],
        widths=[2.5, 4.0])

    add_section(doc, "2. Executive Summary", [
        "[Three to five sentences: what occurred, what went well, top "
        "issues, and the most important recommendation.]"])

    add_section(doc, "3. What Was Planned vs. What Occurred", [])
    make_table(doc, ["Area", "Planned", "Actual", "Variance / Cause"],
        [["Scope", "[Entry]", "[Entry]", "[Entry]"],
         ["Schedule", "[Entry]", "[Entry]", "[Entry]"],
         ["Resources", "[Entry]", "[Entry]", "[Entry]"],
         ["Test results", "[Entry]", "[Entry]", "[Entry]"]])

    add_section(doc, "4. Observations and Lessons Learned", [
        "Classify each observation as Sustain (keep doing) or Improve "
        "(change required)."])
    make_table(doc,
        ["#", "Observation", "Sustain / Improve", "Root Cause",
         "Recommendation", "Recommended Owner"],
        [["1", "[Observation]", "[Sustain/Improve]", "[Cause]",
          "[Recommendation]", "[Org]"],
         ["2", "", "", "", "", ""], ["3", "", "", "", "", ""]])

    add_section(doc, "5. Recommended Process or Baseline Changes", [], [
        "[Change to Governance SOP, CCB Charter, trackers, or SharePoint "
        "structure]",
        "[Change to availability integration practice]",
        "[Change to readiness assessment criteria]"])

    add_section(doc, "6. Action Items Generated", [
        "Enter all approved actions in the Action Item Tracker; file this "
        "report in the Lessons Learned library with metadata."])
    make_table(doc, ["Action", "Owner", "Due Date", "Tracker ID"],
        [["[Action]", "[Org/Name]", "[DD MMM YYYY]", "[C5IMP-AI-...]"],
         ["", "", "", ""]])

    finish_document(doc, out, ["Report Author", "Reviewing Authority"])


# ----------------------------------------------------------------------
# 12. SharePoint User Guide
# ----------------------------------------------------------------------
def doc_sp_guide(out):
    doc = new_document(
        "C5IMP SharePoint User Guide",
        "Site Organization, Trackers, Intake, Views, and Dashboards",
        "C5IMP-UG-001")

    add_section(doc, "1. Purpose", [
        "This guide explains how the CVN C5IMP SharePoint site is "
        "organized, where documents live, how to update trackers, how to "
        "submit intake items, and how to use views and dashboards. It is "
        "written for all site users; site owners should also consult the "
        "Content Inventory and Metadata Plan workbook."])

    add_section(doc, "2. Site Map", [
        "The site contains the following pages. Navigation is provided by "
        "the Hero web part on Home and the global navigation bar."])
    make_table(doc, ["Page", "What You Will Find There"],
        [["Home", "Program overview, news, key links, upcoming battle "
          "rhythm events, key POCs"],
         ["Modernization Dashboard", "Master tracker views, status rollups, "
          "highlighted high-priority items, Power BI placeholder"],
         ["Intake and Change Review", "Intake form/list, triage status, "
          "evaluation memoranda in progress"],
         ["Configuration Baseline", "Baseline register workbook, approved/"
          "pending changes views, configuration gap list"],
         ["Availability Integration", "Availability tracker, work package "
          "views, testing milestones, turnover items"],
         ["Risks / Issues / Actions", "Risk register views, action item "
          "lists, overdue dashboards"],
         ["Governance and Meetings", "Battle rhythm calendar, agendas, "
          "minutes, meeting records library"],
         ["Decisions and CCB", "Decision log, decision records library, "
          "CCB packages and minutes (restricted group)"],
         ["Readiness Assessments", "Readiness workbook, assessment reports "
          "by hull and milestone"],
         ["References and Templates", "All Word/Excel templates, program "
          "references, this guide"],
         ["Lessons Learned", "After Action Reports, searchable lessons "
          "library"]])

    add_section(doc, "3. Where Documents Live", [], [
        "Program Documents Library: charters, SOPs, plans (controlled "
        "documents; check out before editing).",
        "Templates Library: blank templates only - do not save completed "
        "forms here.",
        "Modernization Tracker Library: the authoritative Excel trackers; "
        "edit in the browser (Excel for the web) so changes save in place.",
        "Decision Records Library: completed decision records (restricted "
        "edit access).",
        "Meeting Records Library: agendas, read-aheads, and minutes filed "
        "by forum and date.",
        "Lessons Learned Library: completed After Action Reports."])

    add_section(doc, "4. How to Submit an Intake Item", [], [
        "Step 1: Go to the Intake and Change Review page.",
        "Step 2: Select 'Submit New Intake' (Quick Links). If the tenant "
        "form solution is unavailable, download the Intake Form template, "
        "complete it, and upload it to the Intake library.",
        "Step 3: Complete all required metadata when prompted (Hull, "
        "System Category, Priority, Sponsor Organization).",
        "Step 4: The triage team assigns a tracking number within 5 "
        "business days and the item appears in the 'My Submissions' view.",
        "Step 5: Track status via the Intake Status view; contact the "
        "Action Officer Lead [POC placeholder] with questions."])

    add_section(doc, "5. How to Update Trackers", [], [
        "Open trackers from their library link and edit in the browser; do "
        "not download, edit, and re-upload (this creates conflicting "
        "copies).",
        "Update only rows you own; use dropdowns rather than free text in "
        "status, priority, and risk columns.",
        "Conditional formatting flags overdue (red), at-risk (yellow), and "
        "complete (green) items automatically.",
        "Update trackers within 2 business days of any governance event "
        "per the Governance SOP.",
        "If a tracker is locked, another user has it in an exclusive "
        "session; coordinate via the page POC rather than saving a copy."])

    add_section(doc, "6. Using Views and Dashboards", [], [
        "List and library views filter by metadata: use 'By Hull', 'By "
        "System Category', 'Overdue', and 'Pending Decision' views before "
        "building anything custom.",
        "The Modernization Dashboard page surfaces highlighted content "
        "(recently changed, high priority) automatically from metadata - "
        "keeping metadata current is what keeps dashboards accurate.",
        "The Events web part on Home reflects the battle rhythm calendar; "
        "add it to your Outlook via the calendar sync option.",
        "Power BI dashboard integration is a placeholder pending tenant "
        "approval; interim rollups use Excel chart views."])

    add_section(doc, "7. Permissions Summary", [
        "Access is granted via the permission groups defined in the "
        "Metadata and Permissions plan (Site Owners, TYCOM Editors, NAVSEA "
        "Editors, PEO/PMW Contributors, Ship Viewers, Shipyard/RMC "
        "Contributors, Read-Only Leadership, Restricted Decision Records "
        "Group). Request access through the site's access request feature "
        "or the Site Owners listed on the Home page."])

    add_section(doc, "8. Getting Help", [], [
        "Site Owners: [Name placeholders] - structure, permissions, new "
        "views.",
        "Action Officer Lead: [Name placeholder] - trackers, intake, "
        "actions.",
        "CCB Secretariat: [Name placeholder] - decision records, CCB "
        "packages."])

    finish_document(doc, out, ["Site Owner", "Program Office Lead"])


# ----------------------------------------------------------------------
# Bonus: Implementation Roadmap annex (07 folder)
# ----------------------------------------------------------------------
def doc_roadmap(out):
    doc = new_document(
        "C5IMP SharePoint Implementation Roadmap",
        "Phased Build, Pilot, and Fleet Expansion Plan",
        "C5IMP-RDMP-001")

    add_section(doc, "1. Purpose", [
        "This roadmap sequences the build-out of the C5IMP SharePoint "
        "administrative tool suite from site shell through fleet-level "
        "adoption."])

    add_section(doc, "2. Phases", [])
    make_table(doc,
        ["Phase", "Scope", "Exit Criteria", "Owner", "Target "
         "(Placeholder)"],
        [["1. Build site shell", "Site, pages, navigation, permission "
          "groups created", "All 11 pages exist; groups populated",
          "Site Owners", "[Week 1-2]"],
         ["2. Create libraries/lists", "All libraries and lists from the "
          "Content Inventory created", "Inventory tab matches site",
          "Site Owners", "[Week 2-3]"],
         ["3. Apply metadata", "Site columns and content types applied",
          "Required columns enforced on all libraries", "Site Owners",
          "[Week 3-4]"],
         ["4. Upload templates", "Word/Excel suite uploaded to Templates "
          "and Tracker libraries", "All files present with metadata",
          "Action Officer Lead", "[Week 4]"],
         ["5. Configure views", "Standard views (By Hull, Overdue, Pending "
          "Decision, etc.) built", "Views verified by user reps",
          "Site Owners", "[Week 5]"],
         ["6. Add web parts", "Pages assembled per Web Part Employment "
          "Matrix", "Page-by-page checklist complete", "Site Owners",
          "[Week 5-6]"],
         ["7. Pilot", "One hull or one availability run end-to-end on the "
          "site", "Pilot AAR complete; punch list dispositioned",
          "Program Office Lead", "[Week 7-18]"],
         ["8. Refine governance", "SOP/CCB Charter updates from pilot "
          "lessons", "Updated documents approved", "Program Office Lead",
          "[Week 18-20]"],
         ["9. Expand to fleet-level use", "Remaining hulls onboarded; "
          "training delivered", "All hulls reporting via site",
          "TYCOM N6 / NAVSEA Leads", "[Week 20+]"]])

    add_section(doc, "3. Pilot Recommendation", [
        "Pilot with a single CVN availability ([CVN-XX] [PIA FYxx "
        "placeholder]) entering its planning window: run intake, triage, "
        "CCB, availability integration, and one readiness assessment cycle "
        "entirely on the site before fleet expansion."])

    add_section(doc, "4. Risks to Implementation", [], [
        "Tenant policy may restrict Forms or Power BI web parts - confirm "
        "early (mitigation: list-based intake and Excel rollups).",
        "Tracker adoption may lag if email habits persist - mitigation: "
        "chairs refuse non-SharePoint read-aheads after Phase 6.",
        "Metadata discipline erodes without enforcement - mitigation: "
        "required columns plus monthly content audit by site owners."])

    finish_document(doc, out, ["Program Office Lead", "TYCOM N6 "
                               "Representative", "Site Owner"])


# ----------------------------------------------------------------------
def build_all(root):
    w = os.path.join(root, "01_Word_Templates")
    g = os.path.join(root, "05_User_Guides")
    r = os.path.join(root, "07_Implementation_Roadmap")
    for d in (w, g, r):
        os.makedirs(d, exist_ok=True)

    jobs = [
        (doc_charter, os.path.join(w, "01_CVN_C5IMP_Program_Charter.docx")),
        (doc_sop, os.path.join(w, "02_CVN_C5IMP_Governance_SOP.docx")),
        (doc_intake, os.path.join(w, "03_CVN_C5I_Modernization_Intake_Form.docx")),
        (doc_eval_memo, os.path.join(w, "04_C5IMP_Change_Evaluation_Memorandum.docx")),
        (doc_ccb_charter, os.path.join(w, "05_CVN_C5IMP_CCB_Charter.docx")),
        (doc_readiness, os.path.join(w, "06_Modernization_Readiness_Assessment.docx")),
        (doc_avail_guide, os.path.join(w, "07_Availability_Integration_Planning_Guide.docx")),
        (doc_stakeholder, os.path.join(w, "08_Stakeholder_Engagement_Plan.docx")),
        (doc_minutes, os.path.join(w, "09_C5IMP_Meeting_Minutes_Template.docx")),
        (doc_decision, os.path.join(w, "10_Decision_Record_Template.docx")),
        (doc_aar, os.path.join(w, "11_After_Action_Report_Template.docx")),
        (doc_sp_guide, os.path.join(g, "12_C5IMP_SharePoint_User_Guide.docx")),
        (doc_roadmap, os.path.join(r, "C5IMP_Implementation_Roadmap.docx")),
    ]
    created = []
    for fn, path in jobs:
        fn(path)
        created.append(path)
        print(f"  [docx] {os.path.relpath(path, root)}")
    return created


if __name__ == "__main__":
    build_all(sys.argv[1] if len(sys.argv) > 1 else
              "CVN_C5IMP_Admin_Tool_Suite")
