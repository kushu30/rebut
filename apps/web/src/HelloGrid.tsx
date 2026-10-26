import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Row {
  caseId: string;
  amount: number;
}

const columnDefs: ColDef<Row>[] = [
  { field: 'caseId', headerName: 'Case' },
  { field: 'amount', headerName: 'Amount' },
];

const rowData: Row[] = [{ caseId: 'PP-D-1001', amount: 48 }];

export function HelloGrid() {
  return (
    <div style={{ height: 240, width: 480 }}>
      <AgGridReact<Row> columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
}
