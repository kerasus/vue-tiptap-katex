<template>
  <div class="edit-table-modal">
    <custom-modal
      v-model="modal"
      wrapper-class="edit-table-modal-wrapper"
    >
      <div class="edit-cell-panel">
        <div class="edit-box">
<!--          <div-->
<!--            v-if="selected"-->
<!--          >-->
<!--            <div-->
<!--              v-if="selected && selected !== 'backgroundColor'"-->
<!--            >-->
<!--              <div>currentOptions[selected].cellBorderColor {{ currentOptions[selected].cellBorderColor }}</div>-->
<!--              <div>currentOptions[selected].cellBorderWidth {{ currentOptions[selected].cellBorderWidth }}</div>-->
<!--              <div>currentOptions[selected].cellBorderType {{ currentOptions[selected].cellBorderType }}</div>-->
<!--              <div>currentOptions[selected].none {{ currentOptions[selected].none }}</div>-->
<!--            </div>-->
<!--            <div v-else>-->
<!--              currentOptions.backgroundColor {{ currentOptions.backgroundColor }}-->
<!--            </div>-->
<!--          </div>-->
          <div
            v-if="selected && selected !== 'backgroundColor'"
            class="border-color-picker"
          >
            <sketch-picker v-model="computedBackgroundColor" />
            <div>{{ currentOptions[selected].cellBorderColor }}</div>
          </div>
          <div
            v-else
            class="background-color-picker"
          >
            <sketch-picker v-model="computedBackgroundColor" />
            <div>{{ currentOptions.backgroundColor }}</div>
          </div>
          <div
            v-if="selected && selected !== 'backgroundColor'"
          >
            <input
              v-model="currentOptions[selected].cellBorderWidth"
              type="number"
            >
            <span v-text="currentOptions[selected].cellBorderWidth" />
          </div>
          <div
            v-if="selected && selected !== 'backgroundColor'"
          >
            <input
              id="checkbox"
              v-model="currentOptions[selected].none"
              type="checkbox"
            >
            <label for="checkbox">{{ currentOptions[selected].none }}</label>
          </div>
          <div
            v-if="selected && selected !== 'backgroundColor'"
            class="selector-dropdown cell-border-type"
          >
            <div
              class="select"
              style="width: 200px;"
            >
              <select v-model="currentOptions[selected].cellBorderType">
                <option
                  disabled
                  value=""
                >
                  Please select one
                </option>
                <option>dotted</option>
                <option>dashed</option>
                <option>solid</option>
                <option>double</option>
                <option>groove</option>
                <option>ridge</option>
                <option>inset</option>
                <option>outset</option>
                <option>hidden</option>
                <option>mix</option>
              </select>
              <svg viewBox="0 0 24 24">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M10 12.458Q9.833 12.458 9.677 12.396Q9.521 12.333 9.375 12.188L5.604 8.417Q5.354 8.167 5.375 7.792Q5.396 7.417 5.625 7.188Q5.896 6.917 6.25 6.927Q6.604 6.938 6.854 7.188L10 10.354L13.167 7.188Q13.417 6.938 13.76 6.938Q14.104 6.938 14.375 7.208Q14.625 7.458 14.625 7.823Q14.625 8.188 14.375 8.438L10.625 12.188Q10.479 12.333 10.323 12.396Q10.167 12.458 10 12.458Z"
                />
              </svg>
            </div>
          </div>
          <div class="selector-dropdown current-options">
            <div
              class="select"
              style="width: 200px;"
            >
              <select v-model="selected">
                <option
                  v-for="(item, index) in options"
                  :key="index"
                  :disabled="item.disabled"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
              <svg viewBox="0 0 24 24">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M10 12.458Q9.833 12.458 9.677 12.396Q9.521 12.333 9.375 12.188L5.604 8.417Q5.354 8.167 5.375 7.792Q5.396 7.417 5.625 7.188Q5.896 6.917 6.25 6.927Q6.604 6.938 6.854 7.188L10 10.354L13.167 7.188Q13.417 6.938 13.76 6.938Q14.104 6.938 14.375 7.208Q14.625 7.458 14.625 7.823Q14.625 8.188 14.375 8.438L10.625 12.188Q10.479 12.333 10.323 12.396Q10.167 12.458 10 12.458Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="cell-demo-panel">
          <div
            class="cell-box"
            :style="{
              'border-top': getBorderTopStyle,
              'border-left': getBorderLeftStyle,
              'border-bottom': getBorderBottomStyle,
              'border-right': getBorderRightStyle,
              'background-color': computedBackgroundColor
            }"
          >
            your cell
          </div>
        </div>
      </div>
      <button
        class="Update-btn"
        @click="setTableNewStyles"
      >
        Update
      </button>
    </custom-modal>
  </div>
</template>

<script>
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import { Sketch } from 'vue-color'
export default {
  name: 'EditTableModal',
  components: {
    'CustomModal': VueModal,
    'sketch-picker': Sketch,
  },
  props: {
    showModal: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  emits: [
    'update:showDialog'
  ],
  data(){
    return {
      colors: '',
      currentOptions : {
        topBorder: {
          cellBorderWidth: '2',
          cellBorderType:'solid',
          cellBorderColor:'rgba(114, 114, 114, 1)',
          none: false
        },
        rightBorder: {
          cellBorderWidth: '2',
          cellBorderType:'solid',
          cellBorderColor:'rgba(114, 114, 114, 1)',
          none: false
        },
        leftBorder: {
          cellBorderWidth: '2',
          cellBorderType:'solid',
          cellBorderColor:'rgba(114, 114, 114, 1)',
          none: false
        },
        bottomBorder: {
          cellBorderWidth: '2',
          cellBorderType:'solid',
          cellBorderColor:'rgba(114, 114, 114, 1)',
          none: false
        },
        backgroundColor: 'rgba(255, 255, 255, 1)'
      },
      selected: '',
      options: [
        {
          label: 'Please select one',
          value: '',
          disabled: true,
          selected: false
        },
        {
          label: 'BackgroundColor',
          value: 'backgroundColor',
          disabled: false,
          selected: false
        },
        {
          label: 'BorderTop',
          value: 'topBorder',
          disabled: false,
          selected: false
        },
        {
          label: 'BorderLeft',
          value: 'leftBorder',
          disabled: false,
          selected: false
        },
        {
          label: 'BorderBottom',
          value: 'bottomBorder',
          disabled: false,
          selected: false
        },
        {
          label: 'BorderRight',
          value: 'rightBorder',
          disabled: false,
          selected: false
        }
      ],
      borderStyle: '',
      checked:false
    }
  },
  computed: {
    modal: {
      get() {
        return this.showModal
      },
      set(value) {
        this.$emit('update:showDialog', value)
      }
    },
    getBorderLeftStyle () {
      if (!this.currentOptions.leftBorder.none) {
        const border = this.currentOptions.leftBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return ''
    },
    getBorderTopStyle () {
      if (!this.currentOptions.topBorder.none) {
        const border = this.currentOptions.topBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return ''
    },
    getBorderRightStyle () {
      if (!this.currentOptions.rightBorder.none) {
        const border = this.currentOptions.rightBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return ''
    },
    getBorderBottomStyle () {
      if (!this.currentOptions.bottomBorder.none) {
        const border = this.currentOptions.bottomBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return ''
    },
    computedBackgroundColor: {
      get () {
        return (this.currentOptions.backgroundColor)? this.currentOptions.backgroundColor : 'none'
      },
      set (value) {
        const computedVal = 'rgba(' + value.rgba.r+', '+ value.rgba.g+', '+  value.rgba.b+', '+  value.rgba.a+')'
        if (this.selected && this.selected !== 'backgroundColor') {
          this.currentOptions[this.selected].cellBorderColor = computedVal
          return
        }
        this.currentOptions.backgroundColor = computedVal
      }
    },
  },
  methods: {
    setTableNewStyles () {
      console.log('cellBordersUpdated', this.currentOptions)
      this.$emit('cellBordersUpdated', this.currentOptions)
    },

  },
  watch:{
    selected(newVal) {
      // console.log('newVal', newVal)
    }
  }
}
</script>

<style lang="scss">
  .edit-table-modal-wrapper {
    display: flex;
    align-items: center;
    .vm {
      top: auto;
      border-radius: 20px;
    }
    .vm-titlebar {
      border-bottom: none;
    }
  }

</style>
<style scoped lang="scss">
.edit-cell-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .edit-box {

  }
  .cell-demo-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 374px;
    height: 412px;
    background-color: #F4F5F6;
    .cell-box {
      width: 120px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
  }
}
  .Update-btn {
    display: inline-block;
    outline: 0;
    cursor: pointer;
    padding: 5px 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    vertical-align: middle;
    border: 1px solid;
    border-radius: 6px;
    color: #ffffff;
    background-color: #2ea44f;
    border-color: #1b1f2326;
    box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
    transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color, border-color;
  }
  .Update-btn:hover {
    background-color: #2c974b;
    border-color: #1b1f2326;
    transition-duration: 0.1s;
  }
  .selector-dropdown {
    .select {
      position: relative;
      select {
        -webkit-appearance: none;
        outline: 0;
        border: 0;
        display: block;
        width: 100%;
        padding: 0px 15px;
        height: 3rem;
        font-size: 1rem;
        font-weight: 400;
        background: #F2F2F2;
        border-radius: 16px;
      }

      svg {
        position: absolute;
        right: 5px;
        top: 5px;
        bottom: 0;
        margin: auto;
        height: 1.5rem;
        width: 1.5rem;
        fill: #757577;
        pointer-events: none;
      }
    }
  }
</style>
