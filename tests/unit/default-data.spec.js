import { mount } from '@vue/test-utils'
import Test from '@/test'

const wrapper = mount(Test, {
  data () {
    return {
      test: '$\\begin{array}{cc}f(x) = a(x - 1)(x - 2) \\\\\\Rightarrow f(0) = a( - 1)( - 2) = 4\\\\\\\\\\Rightarrow 2a = 4 \\\\\\Rightarrow a = 2\\\\\\\\f(x) = 2(x - 1)(x - 2) \\\\\\Rightarrow f(3) = 2(2)(1) = 4\\end{array}$'
    }
  }
})
wrapper.vm.setContent()
wrapper.vm.getContent()

describe('Default input', () => {
  test('Plain', () => {
    expect(wrapper.vm.test).toBe('<p dir="auto"> $\\begin{array}{cc}f(x) = a(x - 1)(x - 2) \\\\\\Rightarrow f(0) = a( - 1)( - 2) = 4\\\\\\\\\\Rightarrow 2a = 4 \\\\\\Rightarrow a = 2\\\\\\\\f(x) = 2(x - 1)(x - 2) \\\\\\Rightarrow f(3) = 2(2)(1) = 4\\end{array}$ </p>')
  })
  test('Rendered', () => {
    expect(wrapper.vm.computedKatex).toBe('<p dir="auto"> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mtable rowspacing="0.16em" columnalign="center center" columnspacing="1em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mi>a</mi><mo stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mo>⇒</mo><mi>f</mi><mo stretchy="false">(</mo><mn>0</mn><mo stretchy="false">)</mo><mo>=</mo><mi>a</mi><mo stretchy="false">(</mo><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mo>−</mo><mn>2</mn><mo stretchy="false">)</mo><mo>=</mo><mn>4</mn></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mo>⇒</mo><mn>2</mn><mi>a</mi><mo>=</mo><mn>4</mn></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mo>⇒</mo><mi>a</mi><mo>=</mo><mn>2</mn></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mn>2</mn><mo stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mo>⇒</mo><mi>f</mi><mo stretchy="false">(</mo><mn>3</mn><mo stretchy="false">)</mo><mo>=</mo><mn>2</mn><mo stretchy="false">(</mo><mn>2</mn><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo><mo>=</mo><mn>4</mn></mrow></mstyle></mtd></mtr></mtable><annotation encoding="application/x-tex">\\begin{array}{cc}f(x) = a(x - 1)(x - 2) \\\\\\Rightarrow f(0) = a( - 1)( - 2) = 4\\\\\\\\\\Rightarrow 2a = 4 \\\\\\Rightarrow a = 2\\\\\\\\f(x) = 2(x - 1)(x - 2) \\\\\\Rightarrow f(3) = 2(2)(1) = 4\\end{array}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:9.6em;vertical-align:-4.55em;"></span><span class="mord"><span class="mtable"><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:5.05em;"><span style="top:-7.21em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">a</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">2</span><span class="mclose">)</span></span></span><span style="top:-6.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mrel">⇒</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord">0</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">a</span><span class="mopen">(</span><span class="mord">−</span><span class="mord">1</span><span class="mclose">)</span><span class="mopen">(</span><span class="mord">−</span><span class="mord">2</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">4</span></span></span><span style="top:-4.81em;"><span class="pstrut" style="height:3em;"></span><span class="mord"></span></span><span style="top:-3.61em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mrel">⇒</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">2</span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">4</span></span></span><span style="top:-2.41em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mrel">⇒</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">2</span></span></span><span style="top:-1.21em;"><span class="pstrut" style="height:3em;"></span><span class="mord"></span></span><span style="top:-0.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">2</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">2</span><span class="mclose">)</span></span></span><span style="top:1.19em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mrel">⇒</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord">3</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">2</span><span class="mopen">(</span><span class="mord">2</span><span class="mclose">)</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">4</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:4.55em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span></span></span></span></span></span> </p>')
  })
})


