<template>
  <div class="edit-table-modal">
    <custom-modal
      v-model="modal"
      wrapper-class="edit-table-modal-wrapper"
    >
      <div class="edit-cell-panel">
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
        <div class="edit-box">
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
          <div
            v-if="selected && selected !== 'backgroundColor'"
            class="none-background"
          >
            <div class="type-width">
              <div
                class="cell-border-type selector-dropdown "
              >
                <div class="border-types-title">
                  border types :
                </div>
                <div
                  class="select"
                  style="width: 200px;"
                >
                  <select v-model="currentOptions[selected].cellBorderType">
                    <option
                      disabled
                      value=""
                    >
                      Please select a type
                    </option>
                    <option>none</option>
                    <option>dotted</option>
                    <option>dashed</option>
                    <option>solid</option>
                    <option>double</option>
                    <option>groove</option>
                    <option>ridge</option>
                    <option>inset</option>
                    <option>outset</option>
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
              <div class="cell-border-width">
                <input
                  v-model="currentOptions[selected].cellBorderWidth"
                  type="number"
                >
              </div>
            </div>
            <div
              class="border-color-picker"
            >
              <sketch-picker v-model="computedBackgroundColor" />
            </div>
          </div>
          <div
            v-else-if="selected"
          >
            <div
              class="background-color-picker"
            >
              <sketch-picker v-model="computedBackgroundColor" />
            </div>
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
          cellBorderColor:'rgba(114, 114, 114, 1)'
        },
        rightBorder: {
          cellBorderWidth: '2',
          cellBorderType:'solid',
          cellBorderColor:'rgba(114, 114, 114, 1)'
        },
        leftBorder: {
          cellBorderWidth: '2',
          cellBorderType:'solid',
          cellBorderColor:'rgba(114, 114, 114, 1)'
        },
        bottomBorder: {
          cellBorderWidth: '2',
          cellBorderType:'solid',
          cellBorderColor:'rgba(114, 114, 114, 1)'
        },
        backgroundColor: 'rgba(255, 255, 255, 1)'
      },
      selected: '',
      options: [
        {
          label: 'Please select a field',
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
      return 'none'
    },
    getBorderTopStyle () {
      if (!this.currentOptions.topBorder.none) {
        const border = this.currentOptions.topBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return 'none'
    },
    getBorderRightStyle () {
      if (!this.currentOptions.rightBorder.none) {
        const border = this.currentOptions.rightBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return 'none'
    },
    getBorderBottomStyle () {
      if (!this.currentOptions.bottomBorder.none) {
        const border = this.currentOptions.bottomBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return 'none'
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
      this.modal = false
    },

  },
  // watch:{
  //   selected(newVal) {
  //     // console.log('newVal', newVal)
  //   }
  // }
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
  flex-direction: column;
  .edit-box {
    width: 100%;
    padding-right: 16px;
    padding-left: 16px;
    padding-bottom: 10px;
    .background-color-picker {
      display: flex;
      justify-content: center;
    }
    .none-background {
      display: flex;
      justify-content: space-between;
      padding-right: 14px;
      padding-left: 14px;
      //align-items: center;
      //
    }
    .current-options {
      margin-bottom: 14px;
      display: flex;
      justify-content: center;
    }
    .cell-border-type {
      .border-types-title {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 28px;
      }
      margin-bottom: 14px;
    }
    .cell-border-width {
      input[type="number"] {
        background-color: #f2f2f2;
        border: none;
        height: 30px;
        border-radius: 10px;
        padding-left: 12px;
        width: 100px;
      }
    }
  }
  .cell-demo-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 168px;
    scroll-behavior: auto;
    overflow: scroll;
    background-color: #F4F5F6;
    margin-bottom: 14px;
    border-radius: 10px;
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
    border: none;
    font-size: 14px;
    color: inherit;
    background: none;
    cursor: pointer;
    padding: 25px 80px;
    display: inline-block;
    margin: 15px 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }
  .Update-btn {
    background:  #3AB549;
    color: #fff;
    margin: 0;
    border-radius: 10px;
    padding: 8px 10px;
  }

  .Update-btn:hover {
    background: #27ae60;
  }

  .Update-btn:active {
    background: #27ae60;
    top: 2px;
  }

  .Update-btn:before {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    line-height: 3;
    font-size: 140%;
    width: 60px;
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
@media only screen and (max-width: 520px) {
  .none-background {
    flex-direction: column;
    align-items: center;
  }
  .cell-border-width {
    margin-bottom: 14px;
  }
}
</style>
