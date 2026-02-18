"""
Systems Analysis Document Generator — FastAPI Application

Run with:  uvicorn app:app --reload --port 8000
"""

from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from datetime import date

from doc_generator import generate_document

app = FastAPI(title="Systems Analysis Document Generator")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    """Render the main form page."""
    return templates.TemplateResponse("index.html", {
        "request": request,
        "today": date.today().isoformat(),
    })


@app.post("/generate")
async def generate(
    project_name: str = Form(""),
    author: str = Form(""),
    organization: str = Form(""),
    document_date: str = Form(""),
    version: str = Form("1.0"),
    executive_summary: str = Form(""),
    purpose: str = Form(""),
    scope: str = Form(""),
    definitions: str = Form(""),
    current_system_description: str = Form(""),
    current_system_limitations: str = Form(""),
    proposed_system_overview: str = Form(""),
    system_goals: str = Form(""),
    functional_requirements: str = Form(""),
    nonfunctional_requirements: str = Form(""),
    architecture_overview: str = Form(""),
    technology_stack: str = Form(""),
    data_flow: str = Form(""),
    integration_points: str = Form(""),
    data_entities: str = Form(""),
    data_storage: str = Form(""),
    ui_requirements: str = Form(""),
    security_requirements: str = Form(""),
    stakeholders: str = Form(""),
    risks: str = Form(""),
    estimated_costs: str = Form(""),
    expected_benefits: str = Form(""),
    timeline: str = Form(""),
    testing_strategy: str = Form(""),
    assumptions: str = Form(""),
    constraints: str = Form(""),
    recommendations: str = Form(""),
    appendices: str = Form(""),
):
    """Generate and download the Word document."""
    data = {
        "project_name": project_name,
        "author": author,
        "organization": organization,
        "document_date": document_date or date.today().isoformat(),
        "version": version,
        "executive_summary": executive_summary,
        "purpose": purpose,
        "scope": scope,
        "definitions": definitions,
        "current_system_description": current_system_description,
        "current_system_limitations": current_system_limitations,
        "proposed_system_overview": proposed_system_overview,
        "system_goals": system_goals,
        "functional_requirements": functional_requirements,
        "nonfunctional_requirements": nonfunctional_requirements,
        "architecture_overview": architecture_overview,
        "technology_stack": technology_stack,
        "data_flow": data_flow,
        "integration_points": integration_points,
        "data_entities": data_entities,
        "data_storage": data_storage,
        "ui_requirements": ui_requirements,
        "security_requirements": security_requirements,
        "stakeholders": stakeholders,
        "risks": risks,
        "estimated_costs": estimated_costs,
        "expected_benefits": expected_benefits,
        "timeline": timeline,
        "testing_strategy": testing_strategy,
        "assumptions": assumptions,
        "constraints": constraints,
        "recommendations": recommendations,
        "appendices": appendices,
    }

    buffer = generate_document(data)
    filename = f"systems_analysis_{project_name.replace(' ', '_') or 'document'}.docx"

    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
