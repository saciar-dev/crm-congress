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
                    <InputNumber inputId="cuit" v-model.trim="cliente.cuit" :useGrouping="false"/>
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
                        <DespleagablePais :model="cliente" @onPaisChange="onPaisChange"></DespleagablePais>
                    </div>
                    <div class="field col">
                        <DesplegableProvincia :model="cliente" @onProvinciaChange = "onProvinciaChange"></DesplegableProvincia>
                    </div>                    
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <DesplegablePartido :model="cliente" @onPartidoChange = "onPartidoChange"></DesplegablePartido>
                    </div>
                    <div class="field col">
                        <DesplegableLocalidad :model="cliente"></DesplegableLocalidad>
                    </div>
                </div>
                <div class="field">
                    <DespleagableCondicionIva :model="cliente"/>
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
    // import { useCondicionIvaService } from '@/service/CondicionesIvaService';
    // import { usePaisesService } from '@/service/PaisService';
    import { useClienteServicio } from '../../service/ClienteService';
    import { useProvinciasService } from '../../service/ProvinciasService';
    import { usePartidosService } from '../../service/PartidosService';
    import { useLocalidadesService } from '../../service/LocalidadesService';

    import DespleagableCondicionIva from '../../components/DespleagableCondicionIva.vue';
    import DespleagablePais from '../../components/DesplegablePais.vue';
    import DesplegableProvincia from '../../components/DesplegableProvincia.vue';
    import DesplegablePartido from '../../components/DesplegablePartido.vue';
    import DesplegableLocalidad from '../../components/DesplegableLocalidad.vue';
    
    onMounted(() => {

        getAllClientes();
        // getCondiciones();        
        // getPaises();
        
    });

    const { getAllClientes, clientesData, addCliente, updateCliente } = useClienteServicio();
    // const { getCondiciones, condicionData} = useCondicionIvaService();
   //  const { getPaises, paisesData} = usePaisesService();
    const { getProvinciaPorPais } =  useProvinciasService();
    const { getPartidosPorProvincia }  = usePartidosService();
    const {getLocalidadesPorPartido } = useLocalidadesService();
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

    const onPaisChange = (id) =>{
        cliente.value.provincia = null;
        cliente.value.partido = null;
        cliente.value.localidad = null;
        getProvinciaPorPais(id);
    }

    const onProvinciaChange = (id) =>{
        cliente.value.partido = null;
        cliente.value.localidad = null;
        getPartidosPorProvincia(id);
    }

    const onPartidoChange = (id) =>{
        cliente.value.localidad = null;
        getLocalidadesPorPartido(id);
    }

</script>
