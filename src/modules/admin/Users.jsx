import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import AxiosClient from '../../config/axiosconfig/http-config';
import { AlertHelper } from '../../components/alertas/AlertHelper';
import AgregarUserModal from '../../components/modales/AgregarUserModal';
import { set } from 'react-hook-form';
import ConfirmDialog from '../../components/confirmacion/ConfirmDialog';
import EditarCuentaModal from '../../components/modales/EditarCuentaModal';

function Users() {
    const [idUsuario, setIdUsuario] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modaleditarVisible, setModalEditarVisible] = useState(false);
    
    const [userList, setUserList] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    //console.log("Contenido actual del localStorage:", localStorage);
    
  
    const eliminarusuario = async (id) => {
      try {
        const response = await AxiosClient({
          method: "DELETE",
          url: `api/cuentas/${id}/`,
          headers: {
            "Content-Type": "application/json"
          },
        });
        console.log(response);
        getUsuarios();
        AlertHelper.showAlert("Cuenta eliminada", "success");
  
      } catch (error) {
  
      }
    }
    const getUsuarios = async () => {
      try {
        const response = await AxiosClient({
          method: "GET",
          url: "api/user/get/",
          headers: {
            "Content-Type": "application/json"
          },
        });
        console.log(response);
  
        if (response !== null) {
  
            setUserList(response.data.data);
        }
      } catch (error) {
        AlertHelper.showAlert(error.message, "error");
      }
    };
  
    useEffect(() => {
      getUsuarios();
    }, [modaleditarVisible]);
    useEffect(() => {
      getUsuarios();
    }, [modalVisible]);
  
    const onGlobalFilterChange = (e) => {
      setGlobalFilterValue(e.target.value);
    };
  
    // Función para manejar el cambio de favorito
    const onFavoritoChange = (rowData, value) => {
      const updatedAccounts = accounts.map(account =>
        account.id === rowData.id ? { ...account, favorito: value } : account
      );
      setAccounts(updatedAccounts);
    };
  
    const renderHeader = () => {
      return (
        <div className="flex justify-content-between align-items-center bg-primary">
          <IconField iconPosition="left" className="w-6">
            <InputIcon className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar..."
            />
          </IconField>
        </div>
      );
    };
    
    const mamadas = (id) => {
      setIdUsuario(id);
      setConfirm(true);
    }
    const editar = (id) => {
      setIdUsuario(id);
      setModalEditarVisible(true);
    }
  
    // Acciones de edición y eliminación
    const accionesBodyTemplate = (rowData) => {
  
      return (
        <div className="flex gap-2">
          <Button icon="pi pi-pencil" onClick={() => editar(rowData.id)} className="p-button-rounded p-button-text" />
          <Button icon="pi pi-trash" onClick={() => mamadas(rowData.id)} className="p-button-rounded p-button-text p-button-danger" />
        </div>
      );
    };

  
    const paginatorTemplate = {
      layout: 'RowsPerPageDropdown CurrentPageReport',
      'RowsPerPageDropdown': (options) => {
        const dropdownOptions = [
          { label: '5', value: 5 },
          { label: '10', value: 10 },
          { label: '20', value: 20 },
          { label: '100', value: 100 },
        ];
  
        return ( 
          <div className="flex align-items-center gap-2">
              <span className='ml-4'>Filas por página</span>
            
            <Dropdown
              value={options.value}
              options={dropdownOptions}
              onChange={options.onChange}
              appendTo="self"
            />
          </div>
        );
      },
      'CurrentPageReport': (options) => {
        return (
          <span>
            {options.first} - {options.last} de {options.totalRecords}
          </span>
        );
      }
    };
    const nombreCompletoTemplate = (rowData) => {
        return `${rowData.nombre} ${rowData.apellidos}`;
      };

      const responsableTemplate = (rowData) => {
        if (rowData.almacenes === null) {
          return "No asignado";
        }
        return `${rowData.almacenes.identificador}`;
      }
  
    return (
      <div className='ml-2 mr-2 mt-2'>
        <div className='card color-primary'>
          <Card title={"Usuarios"} />
        </div>
        <div className='m-4 flex justify-content-end'>
          <Button label="Agregar" onClick={() => setModalVisible(true)} icon="pi pi-plus" />
        </div>
        <div className="card m-4">
          <DataTable
            value={userList}
            header={renderHeader()}
            paginator
            rows={rowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 100]}
            paginatorTemplate={paginatorTemplate}
            onPage={(e) => setRowsPerPage(e.rows)}
            globalFilter={globalFilterValue.trim()}
            emptyMessage="No se encontraron cuentas"
            className="p-datatable-sm"
          >
            <Column header="Nombre completo" body={nombreCompletoTemplate} sortable />
            <Column field="email" header="Correo" sortable />
            <Column field="almacenes" header="Almacén" body={responsableTemplate} sortable />
  
            <Column header="Acciones" body={accionesBodyTemplate} />
          </DataTable>
        </div>
        <AgregarUserModal visible={modalVisible} setVisible={setModalVisible} />
        <ConfirmDialog
          visible={confirm}
          onHide={() => setConfirm(false)}
          onConfirm={() => {
            eliminarbanco(idCuenta);
            setConfirm(false);
          }}
          title="Eliminar usuario"
          message="¿Está seguro de que desea eliminar este usuario?"
        />
      </div>
    );
}

export default Users