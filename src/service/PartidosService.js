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

    const getPartidosPorProvincia = (idProvincia) =>{
        loadingPartidos.value =true;
        partidosDataXProvincia.value =[];
        fetch(useGlobales.urlBase+'/partidos/provincia/'+idProvincia)
        .then(response => response.json())
        .then(data => {data["hydra:member"].forEach(partido => {                
                if(partido.activo)
                    partidosDataXProvincia.value.push(partido);
            })
        })
        .finally(()=>loadingPartidos.value =false)
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