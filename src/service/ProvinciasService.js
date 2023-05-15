import { ref } from 'vue';
import { useGlobalesStore } from '../store/globales';

const useGlobales = useGlobalesStore();

const provinciasData = ref(null);
let provinciasDataXPais = ref([]);
let loadingProvincias = ref(true);

export const useProvinciasService =()=>{

    const getProvincias = () => {

        fetch(useGlobales.urlBase+'/provincias')
        .then(response => response.json())
        .then(data => provinciasData.value = data["hydra:member"])
        .catch(error => console.log(error))
    } 

    const getProvinciaPorPais = (idPais) =>{
        loadingProvincias.value =true;
        provinciasDataXPais.value =[];
        fetch(useGlobales.urlBase+'/provincias/pais/'+idPais)
        .then(response => response.json())
        .then(data => {data["hydra:member"].forEach(prov => {                
                if(prov.activa)
                    provinciasDataXPais.value.push(prov);
            })
        })
        .finally(()=>loadingProvincias.value =false)
        .catch(error => console.log(error))
        
    }

    return {
        getProvincias,
        getProvinciaPorPais,
        provinciasData,
        provinciasDataXPais,
        loadingProvincias
    }
}