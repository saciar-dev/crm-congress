<template>
    <label for="paises" class="mb-3">Pais</label>
    <Dropdown id="paises" v-model="prop.model.pais" @change="emit('onPaisChange',prop.model.pais.id)" :options="paisesData" optionLabel="nombre" placeholder="Selecciona un pais">
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
    import { onMounted } from 'vue';
    import { usePaisesService } from '@/service/PaisService';

    onMounted(() => {       
        getPaises();
    });

    const { getPaises, paisesData} = usePaisesService();
    const prop = defineProps(["model"]);

    const emit = defineEmits(["onPaisChange"])
</script>