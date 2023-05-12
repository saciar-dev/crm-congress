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
        fetch(useGlobales.urlBase+'/pais/'+idPais)
        .then(response => response.json())
        .then(data => {            
            data.provincias.forEach(prov => {                
                fetch('https://crm.votame.info'+prov)
                .then(response => response.json())
                .then(dataProv => {
                    if(dataProv.activa){
                        provinciasDataXPais.value.push(dataProv);
                    }
                })
                .catch(error => console.log(error))
                .finally(()=>loadingProvincias.value =false)
            });
        })
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