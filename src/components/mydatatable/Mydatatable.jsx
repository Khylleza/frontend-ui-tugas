import "./mydatatable.scss";

import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import {useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "name", headerName: "Name", width: 130 },
// ];

// const rows = [
//   { id: 1, name: "Coffe" },
//   { id: 2, name: "Non Coffe" },
//   { id: 3, name: "Cake" },
//   { id: 4, name: "Pastry" },
//   { id: 5, name: "Cookie" },
//   { id: 6, name: "Matcha" },
//   { id: 7, name: "Expresso" },
//   { id: 8, name: "Thai Tea" },
//   { id: 9, name: "Astor" },
//   { id: 10, name: "Cromboloni" },
// ];

const Mydatatable = ({columns}) => {
  const location = useLocation();
  const type = location.pathname.split("/")[1];

  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, type),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [type]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, type, id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <span>
              <Link to={"/" + type + "/" + params.row.id} style={{ textDecoration: "none" }}>
              <span className="viewButton">View</span>
            </Link>
              <span className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                Delete
              </span>
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mydatatable">
      <div className="mydatatableTitle">
        {type.toUpperCase()}
        <Link to={"/" + type + "/new"} className="link">
          Add New
        </Link>
      </div>

      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Mydatatable;
