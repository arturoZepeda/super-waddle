<script setup>
import { ref } from 'vue';

const monedas = ref([
  { codigo: 'USD', nombre: 'Dolar Estadounidense' },
  { codigo: 'MXN', nombre: 'Peso Mexicano' },
  { codigo: 'GBP', nombre: 'Libras' },
  { codigo: 'EUR', nombre: 'Euros'}
]);
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
            <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.nombre }}</option>
          </select>
        </div>
        <div class="campo">
          <label for="criptomoneda">CriptoMoneda:</label>
          <select id="criptomoneda">
            <option value="" disabled selected>Elige tu criptoMoneda</option>
            
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
