import { ref } from 'vue';
import { useGlobalesStore } from '../store/globales';

const useGlobales = useGlobalesStore();

const localidadesData = ref(null);
let localidadesDataXPartido = ref([]);
let loadingLocalidades = ref(true);

export const useLocalidadesService =()=>{

    const getLocalidades = () => {

        fetch(useGlobales.urlBase+'/localidads')
        .then(response => response.json())
        .then(data => localidadesData.value = data["hydra:member"])
        .catch(error => console.log(error))
    } 

    const getLocalidadesPorPartido = (idPartido) =>{
        loadingLocalidades.value =true;
        localidadesDataXPartido.value =[];
        fetch(useGlobales.urlBase+'/partidos/'+idPartido)
        .then(response => response.json())
        .then(data => {            
            data.localidads.forEach(localidad => {                
                fetch('https://crm.votame.info'+localidad)
                .then(response => response.json())
                .then(dataLocalidades => {
                    if(dataLocalidades.activa){
                        localidadesDataXPartido.value.push(dataLocalidades);
                    }
                })
                .catch(error => console.log(error+" "+localidad))
                .finally(()=>loadingLocalidades.value =false)
            });
        })
        .catch(error => console.log(error))
        
    }

    return {
        getLocalidades,
        localidadesData,
        getLocalidadesPorPartido,
        localidadesDataXPartido,
        loadingLocalidades
    }
}