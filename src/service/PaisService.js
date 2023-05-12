import { ref } from 'vue';
import { useGlobalesStore } from '../store/globales';

const useGlobales = useGlobalesStore();
const paisesData = ref(null);

export const usePaisesService =()=>{

    const getPaises = () => {

        fetch(useGlobales.urlBase+'/pais')
        .then(response => response.json())
        .then(data => paisesData.value = data["hydra:member"])
        .catch(error => console.log(error))
    } 

    return {
        getPaises,
        paisesData,

    }
}