<template>
    <label for="provincias" class="mb-3">Provincia</label>
    <Dropdown id="provincias" :disabled="loadingProvincias" @change="emit('onProvinciaChange', prop.model.provincia.id)" v-model="prop.model.provincia" :options="provinciasDataXPais" optionLabel="nombre" placeholder="Selecciona una provincia">
        <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.nombre">
                <div>{{ slotProps.value.nombre }}</div>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.nombre">
                <div>{{ slotProps.value }}</div>
            </div>
            <span v-else>
                {{slotProps.placeholder}} 
            </span>
        </template>
    </Dropdown>
</template>

<script setup>
    import { useProvinciasService } from '@/service/ProvinciasService';

    const { provinciasDataXPais, loadingProvincias} =  useProvinciasService();
    
    const prop = defineProps(["model"]);

    const emit = defineEmits(["onProvinciaChange"])
</script>