import { ref } from 'vue';
import { useGlobalesStore } from '../store/globales';

const useGlobales = useGlobalesStore();
const clientesData = ref([]);
let clientesError = ref(null);

export const useClienteService = () =>{
    
    const getAllClientes = () =>{
        fetch(useGlobales.urlBase+'/clientes')
        .then(response => response.json())
        .then(data => {
            clientesData.value = data["hydra:member"]
        })        
        .catch(error => console.log(error))
    }

    const addCliente = (cliente) => {
        cliente.value.condicionIva = '/api/condicion_ivas/'+cliente.value.condicionIva.id;
        cliente.value.pais         = '/api/pais/'+cliente.value.pais.id;
        cliente.value.provincia    = '/api/provincias/'+cliente.value.provincia.id;
        cliente.value.partido      = '/api/partidos/'+cliente.value.partido.id;
        cliente.value.localidad    = '/api/localidads/'+cliente.value.localidad.id;
        cliente.value.contactos    = [];

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente.value)
          };
        fetch(useGlobales.urlBase+'/clientes', requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data["@type"] == "Cliente")
                clientesData.value.push(data)
        })
        .catch(error => clientesError.value = "Error al grabar el nuevo cliente");
    }

    const updateCliente = (cliente) => {
        cliente.value.condicionIva = '/api/condicion_ivas/'+cliente.value.condicionIva.id;
        cliente.value.pais         = '/api/pais/'+cliente.value.pais.id;
        cliente.value.provincia    = '/api/provincias/'+cliente.value.provincia.id;
        cliente.value.partido      = '/api/partidos/'+cliente.value.partido.id;
        cliente.value.localidad    = '/api/localidads/'+cliente.value.localidad.id;
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente.value)
          };
        fetch(useGlobales.urlBase+'/clientes/'+cliente.value.id, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => clientesError.value = "Error al actualizar el cliente");
    }

    const deleteCliente = (cliente) => {
        const id = cliente.value.id;
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente.value)
          };
        fetch(useGlobales.urlBase+'/clientes/'+cliente.value.id, requestOptions)
        .then(response => {
            clientesData.value = clientesData.value.filter(val => val.id !== id);
            return response.json()})
        .then(data => {

        })
        .catch(error => clientesError.value = "Error al borrar el cliente");
    }

    return {
        getAllClientes,
        clientesData,
        addCliente,
        updateCliente,
        deleteCliente,
        clientesError
    }    
}
