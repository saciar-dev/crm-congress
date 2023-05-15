<template>
        <label for="condIVA" class="mb-3">Condicion de IVA</label>
        <Dropdown id="condIVA" v-model="prop.model.condicionIva" :options="condicionData" optionLabel="descripcion" placeholder="Seleccione la Condicion de Iva">
            <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.descripcion">
                    <div>{{ slotProps.value.descripcion }}</div>
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.descripcion">
                    <div>{{ slotProps.value }}</div>
                </div>
                <span v-else>
                    {{slotProps.placeholder}} 
                </span>
            </template>
        </Dropdown>
</template>

<script setup>

    import { onMounted } from 'vue';
    import { useCondicionIvaService } from '@/service/CondicionesIvaService';    

    onMounted(() => {
        getCondiciones();        
    });

    const { getCondiciones, condicionData} = useCondicionIvaService();
    const prop = defineProps([ "model"] )


</script>