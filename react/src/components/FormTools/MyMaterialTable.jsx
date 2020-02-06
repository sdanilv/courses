import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo(props) {

    return (
        <MaterialTable
            title="Students"
            columns={props.columns}
            data={props.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            props.addData(newData);
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                           // console.log(newData, oldData)
                            props.changeData(newData);
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            props.removeData(oldData._id);
                        }, 600);
                    }),
            }}
        />
    );
};