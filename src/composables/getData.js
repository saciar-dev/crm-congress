import axios from "axios"
import { ref } from "vue";

export const useGetData = () => {

    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const getData = async (endpoint) => {
        loading.value = true;
        try{
            const res = await axios.get(endpoint);
            data.value = res.data['hydra:member'];
            
        }
        catch (error) {
            error.value = "Error de servidor";
        }
        finally{
            loading.value = false;
        }
    }

    return {
        getData,
        data,
        loading,
        error
    }
}
    