<script setup>
import { ref, computed, reactive } from 'vue';
import Alerta from './components/Alerta.vue';
import Loading from './components/Loading.vue';
import useCripto from './composables/useCripto.js';
const cotizacion = ref({});
const { monedas, criptomonedas, obtenCotizacion, cargando } = useCripto();

const error = ref(false);
const cotizar = reactive({
        moneda: '',
        criptomoneda: ''
      });

const existenDatos = computed(() => {
  return Object.values(cotizacion.value).length > 0;
});

const cotizarMoneda = () => {
  if (Object.values(cotizar).includes('')) {
    error.value = true;
    return;
  }
  obtenCotizacion(cotizar);
  error.value = false;
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
      <Loading v-if="cargando" />
      <div v-if="existenDatos" class="contendor-resultado">
        <h2>Cotizacion</h2>
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
