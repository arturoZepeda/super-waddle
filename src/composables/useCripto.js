import { ref, onMounted } from 'vue';

export default function useCripto() {
    const cotizacion = ref({});
    const cargando = ref(false);
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
    const obtenCotizacion = async(cotizar)=>{
        
        cargando.value = true;
        cotizacion.value = {};
        try{
          const { moneda, criptomoneda } = cotizar;
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          cotizacion.value = resultado.DISPLAY[criptomoneda][moneda];
        }catch(error){
            console.log(error);
        }finally{
            cargando.value = false;
        }
    }
    return {
        monedas,
        cotizacion,
        cargando,
        criptomonedas,
        obtenCotizacion,
    }
}   