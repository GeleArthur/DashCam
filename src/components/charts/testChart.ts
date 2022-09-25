import { defineComponent, h, PropType } from 'vue';
// import Layout from "./components/Layout.vue";
import { Scatter } from 'vue-chartjs';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
//   Layout,
)



export default defineComponent({
    name: 'ScatterChart',
    components: {
        Scatter,
        DataVal: [] as ( number ) [],
    },
    state: {
        plotPayloadTrackBlueTime: [] as ( number )[],
        plotPayloadTrackRedTime: [] as ( number )[],
        plotPayloadTrackBlueProgress: [] as ( number )[],
        plotPayloadTrackRedProgress: [] as ( number )[]
    },
    mutations: {    
      plotDataBlueTime(state: { plotPayloadTrackBlueTime: number[]; }){
          state.plotPayloadTrackBlueTime = this.$store.state.payloadTrackBlueTime;
      },
      plotDataBlueProgress(state: { plotPayloadTrackBlueProgress: number[]; }){
          state.plotPayloadTrackBlueProgress = this.$store.state.payloadTrackBlueProgress;
      },
      plotDataRedTime(state: { plotPayloadTrackRedTime: number[]; }){
          state.plotPayloadTrackRedTime = this.$store.state.payloadTrackRedTime;
      },
      plotDataRedProgress(state: { plotPayloadTrackRedProgress: number[]; }){
          state.plotPayloadTrackRedProgress = this.$store.state.payloadTrackRedProgress;
      },
    },

  mounted() {
    this.$store.commit("init");
  },

  props: {
    chartId: {
      type: String,
      default: 'scatter-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'scatter'>[]>,
      default: () => []
    }
  },
  setup(props) {
    const chartData = {
      datasets: [
        {
          plotDataBlueT: [] as ( number )[],
          label: 'Scatter Dataset 1',
          fill: false,
          borderColor: '#f87979',
          backgroundColor: '#f87979',
          
          data: [
            {
              x: -2,
              y: 4
            },
            {
              x: -1,
              y: 1
            },
            {
              x: 0,
              y: 0
            },
            {
              x: 1,
              y: 1
            },
            {
              x: 2,
              y: 4
            }
          ]
        },
        {
          label: 'Scatter Dataset 2',
          fill: false,
          borderColor: '#7acbf9',
          backgroundColor: '#7acbf9',
          data: [
            {
              x: -2,
              y: -4
            },
            {
              x: -1,
              y: -1
            },
            {
              x: 0,
              y: 1
            },
            {
              x: 1,
              y: -1
            },
            {
              x: 2,
              y: -4
            }
          ]
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Scatter, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
