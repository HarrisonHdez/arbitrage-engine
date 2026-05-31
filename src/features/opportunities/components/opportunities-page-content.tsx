import { OpportunitiesSidebar } from "./opportunities-sidebar";
import { OpportunitiesTable } from "./opportunities-table";
import { OpportunityDetails } from "./opportunity-details";

export function OpportunitiesPageContent() {
  return (
    <div className="grid gap-4 md:grid-cols-12">
      <div className="md:col-span-2">
        <OpportunitiesSidebar />
      </div>

      <div className="md:col-span-7">
        <OpportunitiesTable />
      </div>

      <div className="md:col-span-3">
        <OpportunityDetails />
      </div>
    </div>
  );
}