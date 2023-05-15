import { ref } from 'vue';
import { useGlobalesStore } from '../store/globales';

const useGlobales = useGlobalesStore();

const partidosData = ref(null);
let partidosDataXProvincia = ref([]);
let loadingPartidos = ref(true);

export const usePartidosService =()=>{

    const getPartidos = () => {

        fetch(useGlobales.urlBase+'/partidos')
        .then(response => response.json())
        .then(data => partidosData.value = data["hydra:member"])
        .catch(error => console.log(error))
    } 

    const getPartidosPorProvincia2 = (idProvincia) =>{
        partidosDataXProvincia.value =[];
        fetch(useGlobales.urlBase+'/partidos')
        .then(response => response.json())
        .then(data => {
            partidosData.value = data["hydra:member"];
            console.log(data["hydra:totalItems"]);
            const dataPartido = partidosData.value.map( p =>{
                p.provincia == ('/api/provincias/'+idProvincia)

            })
            console.log(partidosData.value);
            partidosDataXProvincia.value.push(dataPartido);
        })
        .catch(error => console.log(error))
    }

    const getPartidosPorProvincia = (idProvincia) =>{
        loadingPartidos.value =true;
        partidosDataXProvincia.value =[];
        fetch(useGlobales.urlBase+'/provincias/'+idProvincia)
        .then(response => response.json())
        .then(data => {    
            data.partidos.forEach(partido => {                
                fetch('https://crm.votame.info'+partido)
                .then(response => response.json())
                .then(dataPartido => {
                    if(dataPartido.activo){
                        partidosDataXProvincia.value.push(dataPartido);
                    }
                })
                .catch(error => console.log(error+" "+partido))
                .finally(()=>loadingPartidos.value =false)
            });
        })
        .catch(error => console.log(error))
        
    }

    return {
        getPartidos,
        partidosData,
        getPartidosPorProvincia,
        partidosDataXProvincia,
        loadingPartidos
    }
}