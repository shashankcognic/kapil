import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import moment, { now } from "moment";
import { view } from "@risingstack/react-easy-state";
import SearchBar from "material-ui-search-bar";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { findParentElementFromClassName } from "@mui/x-data-grid-pro/internals";
import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from "react";


import { ThemeProvider, createTheme } from '@mui/material'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import SyncLoader from "react-spinners/SyncLoader";
import MaterialTable from "material-table";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'

const ViewChequeSlip = () => {
  const [loading, setloading] = useState(false);
  const [dataa, setdataa] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchtext, setsearchtext] = useState();
  let [color, setColor] = useState("#6dd5ed");


  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  const token = localStorage.getItem("token");
  console.log(token);
  const searchbydate = async () => {
    console.log("hi from search");
    if (startDate && endDate) {
      let result = await fetch("http://localhost:8000/searchbydate", {
        method: "post",
        body: JSON.stringify({ startDate, endDate }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      result = await result.json();
      console.log("hahahahahahha", result);
      setdataa(result);
    } else return;
  };

  const searchbytext = async () => {
    console.log("hi from search");
    if (searchtext) {
      let result = await fetch("http://localhost:8000/searchbyword", {
        method: "post",
        body: JSON.stringify({ searchtext }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      result = await result.json();
      console.log("hahahahahahha", result);
      setdataa(result);
    } else return;
  };

  const onGridReady = async () => {
    let result = await fetch("http://localhost:8000/getchequeslips", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    result = await result.json();
    console.log(result);
    let data = [];
    result.Chequeslips.chequeslips.forEach((element) => {
      data.push(element);
    });
    setdataa(data);
    console.log(dataa);
  };

  const columns=[{title:"Firm Name",field:"firmname"},
  {title:"Party Name",field:"partyname"},
  {title:"Account No",field:"accountno"},
  {title:"Cheque No",field:"chequeno"},
  {title:"Amount",field:"amount"},
  {title:"Status",field:"status", render:(rowData)=><div >{rowData.status==='true'?( <Button variant="outline-danger"  disabled>Printed</Button>):(<Button variant="outline-success" disabled>Not Printed</Button>)}</div>},
  {title:"Doc Date",field:"docdate",render:(rowData)=><div>{new Date(rowData.docdate).toISOString().split('T')[0].replace(/-/g, '/')}</div>},
  {title:"Deposit Date",field:"depositdate" ,render:(rowData)=><div>{new Date(rowData.docdate).toISOString().split('T')[0].replace(/-/g, '/')}</div>},
  {title:"Button",field:'', render:(rowData)=><div>{rowData.status==="true"?(  <Button variant="outline-danger" disabled>Print</Button>):( <Button variant="outline-success">Print</Button>)}</div>}]
 

  console.log(startDate);
  console.log(endDate);
  useEffect(() => {

    setloading(true)
    onGridReady();

    setTimeout(()=>{
      setloading(false)
    },2000)
  }, []);

  return (
    <>
      <Header />
      <div className="viewchequeslip">
  {loading?(
       <div className="loader">
       <SyncLoader
      color={color}
      loading={loading}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    </div>
      ):(   <div >
        <div className="dt-5">
      <Form.Control
        type="date"
        name="datepic"
        placeholder="DateRange"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      /> 
      <small>to</small>
      <Form.Control
        type="date"
        name="datepic"
        placeholder="DateRange"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={searchbydate}>Search</button>
      </div>
      <div>
      <MaterialTable
       icons={tableIcons}
       columns={columns}
       data={dataa}
       options={{
        sorting: true, search: true,
        searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
        filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
        paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "bottom", exportButton: true,
        exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1, selection: true,
        showSelectAllCheckbox: true, showTextRowsSelected: true, selectionProps: rowData => ({
          disabled: rowData.age == null,
        rowStyle : {
          fontWeight: 'bold',
        }
          // color:"primary"
        }),
        grouping: false, columnsButton: true,
        rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
         headerStyle: { background: "#01BAEF",color:"#fff"}
      }}
       
     
       />


       
      </div>
      </div>)}
      </div>
    </>
  );
};

export default ViewChequeSlip;
