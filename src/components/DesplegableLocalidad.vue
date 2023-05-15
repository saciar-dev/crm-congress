<template>
    <label for="localidades" class="mb-3">Localidad</label>
    <Dropdown id="localidades" :disabled="loadingLocalidades" v-model="prop.model.localidad" :options="localidadesDataXPartido" optionLabel="nombre" placeholder="Selecciona una localidad">
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
    import { useLocalidadesService } from '@/service/LocalidadesService';

    const { localidadesDataXPartido, loadingLocalidades}  = useLocalidadesService();

    const prop = defineProps(["model"]);

    // const emit = defineEmits(["onProvinciaChange"])

</script>