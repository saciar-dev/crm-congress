import { ref } from 'vue';
import { useGlobalesStore } from '../store/globales';

const useGlobales = useGlobalesStore();
const clientesData = ref([]);

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

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente.value)
          };
        fetch(useGlobales.urlBase+'/clientes', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    }

    const updateCliente = (cliente) => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente.value)
          };
        fetch(useGlobales.urlBase+'/clientes/'+cliente.value.id, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    }

    return {
        getAllClientes,
        clientesData,
        addCliente,
        updateCliente
    }    
}
