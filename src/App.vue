<script setup>
import { ref, onMounted } from 'vue';

const criptomonedas = ref([]);
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



</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>CriptoMonedas</span></h1>
    <div class="contenido">
      <form class="formulario">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda">
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
          <select id="criptomoneda">
            <option value="" disabled selected>Elige tu criptoMoneda</option>
            <option 
              v-for="criptomoneda in criptomonedas"
              :key="criptomoneda.CoinInfo.Id"
              :value="criptomoneda.CoinInfo.Name">
                {{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
