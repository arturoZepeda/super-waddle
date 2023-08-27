<script setup>
import { ref, onMounted, reactive } from 'vue';
import Alerta from './components/Alerta.vue';

const criptomonedas = ref([]);
const error = ref(false);
const cotizacion = ref({});
const cotizar = reactive({
  moneda: '',
  criptomoneda: ''
});

const monedas = ref([
  { codigo: 'USD', nombre: 'Dolar Estadounidense' },
  { codigo: 'MXN', nombre: 'Peso Mexicano' },
  { codigo: 'GBP', nombre: 'Libras' },
  { codigo: 'EUR', nombre: 'Euros'}
]);

onMounted(async () => {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  criptomonedas.value = resultado.Data;
});

const cotizarMoneda = () => {
  if (Object.values(cotizar).includes('')) {
    error.value = true;
    return;
  }
  error.value = false;
  obtenCotizacion();
}

const obtenCotizacion = async()=>{
  
    const { moneda, criptomoneda } = cotizar;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    cotizacion.value = resultado.DISPLAY[criptomoneda][moneda];
}


</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>CriptoMonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">
        <p>"Los campos de moneda y criptomoneda son obligatorios"</p>
      </Alerta>
      <form class="formulario"
        @submit.prevent="cotizarMoneda"
      >
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="" disabled selected>Elige tu moneda</option>
            <option 
              v-for="moneda in monedas" 
              :key="moneda.codigo" 
              :value="moneda.codigo">
              {{ moneda.nombre }}
            </option>
          </select>
        </div>
        <div class="campo">
          <label for="criptomoneda">CriptoMoneda:</label>
          <select id="criptomoneda" v-model="cotizar.criptomoneda">
            <option value="" disabled selected>Elige tu criptomoneda</option>
            <option 
              v-for="criptomoneda in criptomonedas"
              :key="criptomoneda.CoinInfo.Id"
              :value="criptomoneda.CoinInfo.Name">
                {{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <div class="boton">
          <input type="submit" class="btn btn-primario" value="Cotizar">
        </div>
      </form>
      <div v-if="cotizacion" class="contendor-resultado">
        <h2>cotizacion</h2>
        <div class="resultado">
          <img :src="'https://cryptocompare.com/'+ cotizacion.IMAGEURL" alt="imagen cripto">
        <div>
          <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
          <p>El precio mas alto del dia: <span>{{ cotizacion.HIGHDAY }}</span></p>
          <p>El precio mas bajo del dia: <span>{{ cotizacion.LOWDAY }}</span></p>
          <p>Variacion ultimas 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR }}</span></p>
          <p>Ultima actualizacion: <span>{{ cotizacion.LASTUPDATE }}</span></p>
          
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
