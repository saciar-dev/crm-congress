<template>
    <Card class="mt-2 ">        
        <template #title>
            <h1>Clientes</h1>
        </template>
        <template #content>            
            <Toolbar class="bg-white mb-4">
                <template #start>
                    <Button label="Nuevo" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew"></Button>
                    <Button label="Eliminar" icon="pi pi-trash" @click="confirmDeleteSelected" :disabled="!selectedClientes || !selectedClientes.length"></Button>
                </template>                
            </Toolbar>

            <DataTable ref="dt" :value="clientesData" v-model:selection="selectedClientes" data-key="codcliente"
                :rows="10" 
                :filters="filtro" 
                :paginator="true" paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]" currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} clientes">
                    
                <template #header>
                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                            <h4 class="m-0" style="color: var(--text-color)">Administración de clientes</h4>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search"></i>
                                <InputText v-model="filtro['global'].value" placeholder="Buscar..."></InputText>
                            </span>
                        </div>
                    </template>

                <div v-if="clientesData">
                    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                    <Column field="id" header="Codigo" sortable style="min-width:4rem"></Column>
                    <Column field="nombreFantasia" header="Nombre de fantasia" sortable style="min-width:16rem"></Column>
                    <Column field="razonSocial" header="Razón Social" sortable style="min-width:16rem"></Column>
                    <Column field="cuit" header="CUIT" sortable style="min-width:16rem"></Column>
                    <Column field="condicionIva.descripcion" header="Cond. IVA" sortable style="min-width:16rem"></Column>
                    <Column header="Domicilio">
                        <template #body="slotProps">
                            <p>{{ slotProps.data.calle}} {{ slotProps.data.nro }}</p>
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">                            
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editClient(slotProps.data)"> </Button>
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteClient(slotProps.data)" > </Button>
                        </template>
                    </Column>
                </div>
                <div v-else class=" flex align-self-center mb-2">
                <ProgressSpinner z style="width: 50px; height: 50px" strokeWidth="5" fill="var(--surface-ground)"
                    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                </div>
            </DataTable>
        
            <Toast/>
            <Dialog v-model:visible="clienteDialog" :style="{width: '60%'}" header="Cliente" :modal="true" class="p-fluid">
                <div class="field">
                    <label for="name">Nombre de fantasia</label>
                    <InputText id="name" v-model.trim="cliente.nombreFantasia" required="true" autofocus :class="{'p-invalid':submitted && !cliente.nombreFantasia}"/>
                    <small class="p-error" v-if="submitted && !cliente.nombreFantasia">El Nombre de fantasia es obligatorio</small>
                </div>
                <div class="field">
                    <label for="razon">Razon Social</label>
                    <InputText id="razon" v-model.trim="cliente.razonSocial" required="true" :class="{'p-invalid':submitted && !cliente.razonSocial}" />
                    <small class="p-error" v-if="submitted && !cliente.razonSocial">La Razon Social es obligatoria</small>
                </div>
                <div class="field">
                    <label for="cuit">CUIT</label>
                    <InputNumber id="cuit" v-model.trim="cliente.cuit" :useGrouping="false"/>
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="calle">Dirección</label>
                        <InputText id="calle" v-model.trim="cliente.calle" />
                    </div>
                    <div class="field col">
                        <label for="numero">Numero</label>
                        <InputText id="numero" v-model.trim="cliente.nro" />
                    </div>
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="paises" class="mb-3">Pais</label>
                        <Dropdown id="paises" v-model="cliente.pais" @change="onPaisChange" :options="paisesData" optionLabel="nombre" placeholder="Selecciona un pais">
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
                    </div>
                    <div class="field col">
                        <label for="provincias" class="mb-3">Provincia</label>
                        <Dropdown id="provincias" :disabled="loadingProvincias" @change="onProvinciaChange" v-model="cliente.provincia" :options="provinciasDataXPais" optionLabel="nombre" placeholder="Selecciona una provincia">
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
                    </div>                    
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="partidos" class="mb-3">Partido</label>
                        <Dropdown id="partidos" :disabled="loadingPartidos" v-model="cliente.partido" :options="partidosDataXProvincia" optionLabel="nombre" placeholder="Selecciona un partido">
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
                    </div>
                </div>
                <div class="field">
                    <label for="condiciones_iva" class="mb-3">Condiciones de IVA</label>
                    <Dropdown id="condiciones_iva" v-model="cliente.condicionIva" :options="condicionData" optionLabel="descripcion" placeholder="Selecciona una condición">
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
			    </div>
                
                <template #footer>                    
                    <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"> </Button>
                    <Button label="Save" icon="pi pi-check" text @click="saveClient"> </Button>
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteClientDialog" :style="{width: '60%'}" header="Confirmar" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" > </i>
                    <span v-if="cliente">¿Estas seguro de eliminar a <b>{{cliente.nombre_fantasia}}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteClientDialog = false"> </Button>
                    <Button label="Si" icon="pi pi-check" text @click="deleteClient"> </Button>
                </template>
            </Dialog>
        </template>       

    </Card>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { FilterMatchMode } from 'primevue/api';
    import { useToast } from 'primevue/usetoast';
    import { useCondicionIvaService } from '@/service/CondicionesIvaService';
    import { usePaisesService } from '@/service/PaisService';
    import { useClienteService } from '../../service/ClienteService';
    import { useProvinciasService } from '../../service/ProvinciasService';
    import { usePartidosService } from '../../service/PartidosService';
    
    onMounted(() => {

        getAllClientes();
        getCondiciones();        
        getPaises();
        
    });

    const { getAllClientes, clientesData, addCliente, updateCliente } = useClienteService();
    const { getCondiciones, condicionData,} = useCondicionIvaService();
    const { getPaises, paisesData} = usePaisesService();
    const { getProvinciaPorPais, provinciasDataXPais, loadingProvincias} =  useProvinciasService();
    const { getPartidosPorProvincia, partidosDataXProvincia, loadingPartidos}  = usePartidosService();
    const toast = useToast();
    const dt = ref();
    const clientes = ref();
    const clienteDialog = ref(false);
    const deleteClientDialog = ref(false);
    const deleteClientsDialog = ref(false);
    const cliente = ref({});
    const selectedClientes = ref();
    const filtro = ref({
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    });
    const submitted = ref(false);

    const openNew = () => {
        cliente.value = {};
        submitted.value = false;
        clienteDialog.value = true;
    };
    const hideDialog = () => {
        clienteDialog.value = false;
        submitted.value = false;
    };
    const saveClient = () => {
        submitted.value = true;
        console.log(cliente.value);
         if (cliente.value.nombreFantasia.trim()) {
             if (cliente.value.id) {
        //         // aca hay que guardar el cliente con codCliente
                //  cliente.value.condicionIva = cliente.value.condicionIva.descripcion ? cliente.value.condicionIva.descripcion : cliente.value.condicionIva;
                //  clientes.value[findIndexById(cliente.value.id)] = cliente.value;
                updateCliente(cliente);
                toast.add({severity:'success', summary: 'Successful', detail: 'Cliente modificado', life: 3000});
             }
             else {              
                 // aca hay que grabar el nuevo cliente
                //  cliente.value.codcliente = createNewCodCliente();
                //  cliente.value.condicionIva = cliente.value.condicionIva ? cliente.value.condicionIva.descripcion : 'Consumidor final';
                //  clientes.value.push(cliente.value);
                addCliente(cliente);
                 toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
             }

             clienteDialog.value = false;
             cliente.value = {};
         }
    };
    const editClient = (prod) => {        
        cliente.value = {...prod};
        getProvinciaPorPais(prod.pais.id);
        clienteDialog.value = true;
    };
    const confirmDeleteClient = (prod) => {
        cliente.value = prod;
        deleteClientDialog.value = true;
    };
    const deleteClient = () => {
        // aca hay que borrar el cliente
        clientes.value = clientes.value.filter(val => val.codcliente !== cliente.value.codcliente);
        deleteClientDialog.value = false;
        cliente.value = {};
        toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    };
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < clientes.value.length; i++) {
            if (clientes.value[i].codcliente === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createNewCodCliente = () =>{
        const nuevoId = clientes.value.reduce(function(a, b){ 
            if (a.codcliente >= b.codcliente)
                return a.codcliente; 
            else (b.codcliente > a.codcliente)
                return b.codcliente;
        });
        return nuevoId+1;
    }

    const exportCSV = () => {
        dt.value.exportCSV();
    };
    const confirmDeleteSelected = () => {
        deleteClientsDialog.value = true;
    };
    const deleteSelectedProducts = () => {
        clientes.value = clientes.value.filter(val => !selectedClientes.value.includes(val));
        deleteClientsDialog.value = false;
        selectedClientes.value = null;
        toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    };

    const onPaisChange = (evt) =>{
        cliente.value.provincia = null;
        cliente.value.partido = null;
        getProvinciaPorPais(evt.value.id);
    }

    const onProvinciaChange = (evt) =>{
        cliente.value.partido = null;
        getPartidosPorProvincia(evt.value.id)
    }

</script>
