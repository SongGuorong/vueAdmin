<template>
  <el-card class="echart-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <div class="card-header-title">
          <component class="icon" :is="headerIcon" theme="filled" size="16" :strokeWidth="3" fill="#333"/>
        </div>
        <span class="title">{{title}}</span>
      </div>
      <div class="card-header-right">
        <slot name="header-right"></slot>
      </div>
    </template>
    <div class="echarts" :id="`echarts${index}`" :style="style"></div>
  </el-card>
</template>

<script setup>
// 防抖
import debounce from 'lodash/debounce';
// 导入echarts核心模块，核心模块提供了必要的接口
import * as echarts from 'echarts/core';
import {BarChart, CandlestickChart, FunnelChart, GaugeChart, LineChart, PieChart, RadarChart, ScatterChart} from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {TitleComponent, TooltipComponent, GridComponent, LegendComponent, ToolboxComponent, MarkPointComponent, MarkLineComponent} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import {LabelLayout, UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers';
// store
import {useStore} from 'vuex';
import {computed, onBeforeMount, onMounted, reactive, ref, watch} from "vue";

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent,
    MarkPointComponent,
    MarkLineComponent,
    BarChart,
    CandlestickChart,
    FunnelChart,
    GaugeChart,
    LineChart,
    PieChart,
    RadarChart,
    ScatterChart,
]);

// 自定义组件属性
const props = defineProps( {
  // 图表下标，同个页面有多个图表时，必填
  index: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: '标题',
  },
  headerIcon: {
    type: String,
    default: 'icon-full-screen',
  },
  style: {
    type: Object,
    default: {
      width: '100%',
      height: '380px',
    },
  },
  options: {
    type: Object,
    default: {},
  },
  grid: {
    type: Object,
    default: {
      top: '10px',
      left: 0,
      right: '1px',
      bottom: 0,
      containLabel: true,
    },
  }
});

const store = useStore();

const isCollapse = computed(() => {
  return store.getters.collapse;
});

let chart = reactive({});
let timer = ref(null);

// 监听状态变化
watch(
    () => isCollapse,
    () => {
      timer = setTimeout(() => {
        chart.resize();  // 页面大小变化后Echarts也更改大小
        clearTimeout(timer);
        timer = null;
      }, 3000);
    },
    {
      deep: true,
    }
);

// 注册一个回调函数，在组件挂载完成后执行。
onMounted(() => {
  initChart();
  window.addEventListener(
      'resize',
      debounce(() => {
        chart.resize();
      }, 200)
  )
});

// 注册一个钩子，在组件实例被卸载之前调用
onBeforeMount(() => {
  clearTimeout(timer);
  timer = null;
});

const initChart = () => {
  chart = echarts.init(document.getElementById('echarts' + props.index));
  // 绘制图表
  chart.setOption({
    grid: props.grid,
    ...props.options,
  });
};
</script>

<style lang="scss" scoped>
.echart-card {
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-title {
      display: flex;
      align-content: center;
      align-items: center;
      color: $base-font-color;

      .icon {
        display: flex;
        padding-right: 5px;
      }
    }
  }

  .echarts {
    margin: 0 auto;
    background-color: $base-color-white;
  }
}
</style>