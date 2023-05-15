<template>
    <label for="partidos" class="mb-3">Partido</label>
    <Dropdown id="partidos" :disabled="loadingPartidos" @change="emit('onPartidoChange', prop.model.partido.id)" v-model="prop.model.partido" :options="partidosDataXProvincia" optionLabel="nombre" placeholder="Selecciona un partido">
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
    import { usePartidosService } from '@/service/PartidosService';

    const { partidosDataXProvincia, loadingPartidos}  = usePartidosService();

    const prop = defineProps(["model"]);

    const emit = defineEmits(["onPartidoChange"])

</script>