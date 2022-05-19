<template>
  <div class="edit-table-modal">
    <custom-modal
      v-model="modal"
      wrapper-class="edit-table-modal-wrapper"
    >
      <button @click="showSecondModal=true">showSecondModal</button>
      <sketch-picker v-model="colors" />
      <div
        class="cell-box"
        :style="{
          'border-top': getBorderTopStyle,
          'border-left': getBorderLeftStyle,
          'border-bottom': getBorderBottomStyle,
          'border-right': getBorderRightStyle,
          // 'background-color': getBackgroundColor,
          'width': totalWidth
        }"
      >
        your cell
      </div>
      <button class="Update-btn">
        Update
      </button>
      <input
        v-model="width"
        type="number"
      >
      <span v-text="width" />
      <input type="checkbox" id="checkbox" v-model="checked">
      <label for="checkbox">{{ checked }}</label>
      <div class="selector-dropdown">
        <div class="select" style="width: 200px;">
          <select v-model="borderStyle">
            <option disabled value="">Please select one</option>
            <option>dotted</option>
            <option>dashed</option>
            <option>solid</option>
            <option>double</option>
            <option>groove</option>
            <option>ridge</option>
            <option>inset</option>
            <option>outset</option>
<!--            <option>none</option>-->
            <option>hidden</option>
            <option>mix</option>
          </select>
          <svg viewBox="0 0 24 24">
            <path xmlns="http://www.w3.org/2000/svg" d="M10 12.458Q9.833 12.458 9.677 12.396Q9.521 12.333 9.375 12.188L5.604 8.417Q5.354 8.167 5.375 7.792Q5.396 7.417 5.625 7.188Q5.896 6.917 6.25 6.927Q6.604 6.938 6.854 7.188L10 10.354L13.167 7.188Q13.417 6.938 13.76 6.938Q14.104 6.938 14.375 7.208Q14.625 7.458 14.625 7.823Q14.625 8.188 14.375 8.438L10.625 12.188Q10.479 12.333 10.323 12.396Q10.167 12.458 10 12.458Z"/>
          </svg>
        </div>
      </div>
      <div class="selector-dropdown">
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
      <div>
        {{ selected }}
      </div>
    </custom-modal>
    <custom-modal v-model="showSecondModal" title="Second modal" wrapper-class="edit-table-modal-wrapper">
      <form novalidate>
        <div class="form-group">
          <label for="formField1">Field 1</label>
          <input id="formField1" type="text" class="form-control" placeholder="" />
        </div>
        <div class="form-group">
          <label for="formField2">Field 2</label>
          <input id="formField2" type="text" class="form-control" placeholder="" />
        </div>
        <div class="row modal-footer">
          <div class="col-sm-12">
            <div class="float-right">
              <button class="btn btn-primary" type="button" @click="showSecondModal = false">Ok</button>
              <button class="btn btn-secondary ml-2" type="button" @click="showSecondModal = false">Cancel</button>
            </div>
          </div>
        </div>
      </form>
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
      topBorder: {
        cellBorderWidth: '8',
        cellBorderType:'dotted',
        cellBorderColor:'red'
      },
      rightBorder: {
        cellBorderWidth: '8',
        cellBorderType:'dotted',
        cellBorderColor:'yellow'
      },
      leftBorder: {
        cellBorderWidth: '8',
        cellBorderType:'dotted',
        cellBorderColor:'blue'
      },
      bottomBorder: {
        cellBorderWidth: '8',
        cellBorderType:'dotted',
        cellBorderColor:'pink'
      },
      width: 50,
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
          value: 'borderTop',
          disabled: false,
          selected: false
        },
        {
          label: 'BorderLeft',
          value: 'borderLeft',
          disabled: false,
          selected: false
        },
        {
          label: 'BorderBottom',
          value: 'borderBottom',
          disabled: false,
          selected: false
        },
        {
          label: 'BorderRight',
          value: 'borderRight',
          disabled: false,
          selected: false
        },
        {
          label: 'Width',
          value: 'widthOption',
          disabled: false,
          selected: false
        }
      ],
      borderStyle: '',
      showSecondModal: false,
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
      if (this.leftBorder) {
        const border = this.leftBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return ''
    },
    getBorderTopStyle () {
      if (this.topBorder && !this.colors.rgba) {
        const border = this.topBorder
        return 'dotted' + 'px ' + this.getBackgroundColor + ' ' + border.cellBorderColor
      }
      return ''
    },
    getBorderRightStyle () {
      if (this.rightBorder) {
        const border = this.rightBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return ''
    },
    getBorderBottomStyle () {
      if (this.bottomBorder) {
        const border = this.bottomBorder
        return border.cellBorderWidth + 'px ' + border.cellBorderType + ' ' + border.cellBorderColor
      }
      return ''
    },
    getBackgroundColor() {
      if (!this.colors.rgba){
        return 'none'
      }
      return 'rgba(' + this.colors.rgba.r+', '+ this.colors.rgba.g+', '+  this.colors.rgba.b+', '+  this.colors.rgba.a+')'
    },
    totalWidth() {
      return this.width+ 'px'
    }
  },
  methods: {
    setTableNewStyles () {},

  },
  watch:{
    selected(newVal) {
      console.log('newVal', newVal)
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
  .cell-box {}
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
