"use client";

import { useParams } from "next/navigation";
import { ProjectGate } from "@/components/ProjectGate";
import { HardwareRoutingPlanner } from "@/components/HardwareRoutingPlanner";
import { SectionHeading } from "@/components/ui";

export default function HardwarePage() {
  const params = useParams<{ id: string }>();
  return (
    <ProjectGate id={params.id}>
      {(project) => (
        <div>
          <SectionHeading
            title="Hardware workflow planner"
            subtitle="MPC Live III as master clock & arranger · Rytm + A4 as synced instruments"
          />
          <HardwareRoutingPlanner project={project} />
        </div>
      )}
    </ProjectGate>
  );
}
