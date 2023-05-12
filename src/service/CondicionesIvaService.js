import { ref } from 'vue';

const condicionData = ref(null);

export const useCondicionIvaService =()=>{

    const getCondiciones = () => {

        fetch('https://crm.votame.info/api/condicion_ivas')
        .then(response => response.json())
        .then(data => condicionData.value = data["hydra:member"])
        .catch(error => console.log(error))
    } 

    return {
        getCondiciones,
        condicionData,
    }
}