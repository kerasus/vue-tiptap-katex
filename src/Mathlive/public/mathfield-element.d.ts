/* 0.69.9 */import { MathfieldOptions } from './options';
import { Selector } from './commands';
import { Mathfield, InsertOptions, OutputFormat, Offset, Range, Selection, FindOptions, ReplacementFunction } from './mathfield';
import { MathfieldErrorCode, ParseMode, ParserErrorCode, Style } from './core';
/**
 * The `math-error` custom event signals an error while parsing an expression.
 *
 * ```javascript
 * document.getElementById('mf').addEventListener('math-error', (ev) => {
 *  const err = ev.detail;
 *  console.warn(err.code + (err.arg ? ': ' + err.arg : '') +
 *         '\n%c|  ' + err.before + '%c' + err.after +
 *         '\n%c|  ' + String(' ').repeat(err.before.length) +
 *         '▲',
 *         'font-weight: bold',
 *         'font-weight: normal; color: rgba(160, 160, 160)',
 *         'font-weight: bold; color: hsl(4deg, 90%, 50%)'
 *     );
 * });
 * ```
 */
export declare type MathErrorEvent = {
    code: ParserErrorCode | MathfieldErrorCode;
    arg?: string;
    latex?: string;
    before?: string;
    after?: string;
};
/**
 * The `keystroke` event is fired when a keystroke is about to be procesed.
 * The event is cancellable, which wills suprress further handling of the event.
 *
 */
export declare type KeystrokeEvent = {
    /** A string descring the keystroke, for example `"Alt-KeyU". See [W3C UIEvents](https://www.w3.org/TR/uievents/#keys-keyvalues)
     * for more information on the format of the descriptor.
     *
     */
    keystroke: string;
    /** The native keyboard event */
    event?: KeyboardEvent;
};
/**
 * The `focus-out` event signals that the mathfield has lost focus through keyboard
 * navigation with the **tab** key.
 *
 * The event `detail.direction` property indicates if **tab**
 * (`direction === "forward"`) or **shift+tab** (`direction === "backward") was
 * pressed which can be useful to decide which element to focus next.
 *
 * If the event is canceled by calling `ev.preventDefault()`, no change of
 * focus will occur (but you can manually change the focus in your event
 * handler: this gives you an opportunity to override the default behavior
 * and selects which element should get the focus, or to prevent from a change
 * of focus altogether).
 *
 * If the event is not canceled, the default behavior will take place, which is
 * to change the focus to the next/previous focusable element.
 *
 * ```javascript
 * mfe.addEventListener('focus-out', (ev) => {
 *  console.log("Losing focus ", ev.detail.direction);
 * });
 * ```
 */
export declare type FocusOutEvent = {
    direction: 'forward' | 'backward';
};
/**
 * The `move-out` event signals that the user pressed an **arrow** key but
 * there was no navigation possible inside the mathfield.
 *
 * This event provides an opportunity to handle this situation, for example
 * by focusing an element adjacent to the mathfield.
 *
 * If the event is canceled (i.e. `evt.preventDefault()` is called inside your
 * event handler), the default behavior is to play a "plonk" sound.
 *
 */
export declare type MoveOutEvent = {
    direction: 'forward' | 'backward' | 'upward' | 'downward';
};
declare global {
    /**
     * Map the custom event names to types
     * @internal
     */
    interface HTMLElementEventMap {
        'focus-out': CustomEvent<FocusOutEvent>;
        'keystroke': CustomEvent<KeystrokeEvent>;
        'math-error': CustomEvent<MathErrorEvent>;
        'mode-change': Event;
        'mount': Event;
        'move-out': CustomEvent<MoveOutEvent>;
        'unmount': Event;
        'read-aloud-status-change': Event;
        'selection-change': Event;
        'undo-state-change': Event;
        'virtual-keyboard-toggle': Event;
    }
}
/**
 * These attributes of the `<math-field>` element correspond to the
 * [MathfieldOptions] properties.
 */
export interface MathfieldElementAttributes {
    [key: string]: unknown;
    'default-mode': string;
    'fonts-directory': string;
    /**
     * Scaling factor to be applied to horizontal spacing between elements of
     * the formula. A value greater than 1.0 can be used to improve the
     * legibility.
     *
     * @deprecated Use registers `\thinmuskip`, `\medmuskip` and `\thickmuskip`
     *
     */
    'horizontal-spacing-scale': string;
    /**
     * Maximum time, in milliseconds, between consecutive characters for them to be
     * considered part of the same shortcut sequence.
     *
     * A value of 0 is the same as infinity: any consecutive character will be
     * candidate for an inline shortcut, regardless of the interval between this
     * character and the previous one.
     *
     * A value of 750 will indicate that the maximum interval between two
     * characters to be considered part of the same inline shortcut sequence is
     * 3/4 of a second.
     *
     * This is useful to enter "+-" as a sequence of two characters, while also
     * supporting the "±" shortcut with the same sequence.
     *
     * The first result can be entered by pausing slightly between the first and
     * second character if this option is set to a value of 250 or so.
     *
     * Note that some operations, such as clicking to change the selection, or
     * losing the focus on the mathfield, will automatically timeout the
     * shortcuts.
     */
    'inline-shortcut-timeout': string;
    'keypress-vibration': boolean;
    /**
     * When a key on the virtual keyboard is pressed, produce a short audio
     * feedback.
     *
     * The value of the properties should a string, the name of an audio file in
     * the `soundsDirectory` directory or 'none' to supress the sound.
     */
    'keypress-sound': string;
    /**
     * Sound played to provide feedback when a command has no effect, for example
     * when pressing the spacebar at the root level.
     *
     * The property is either:
     * - a string, the name of an audio file in the `soundsDirectory` directory
     * - 'none' to turn off the sound
     */
    'plonk-sound': string;
    'letter-shape-style': string;
    /**
     * The locale (language + region) to use for string localization.
     *
     * If none is provided, the locale of the browser is used.
     *
     */
    'locale': string;
    /** When true, the user cannot edit the mathfield. */
    'read-only': boolean;
    'remove-extraneous-parentheses': boolean;
    /**
     * When `true` and an open fence is entered via `typedText()` it will
     * generate a contextually appropriate markup, for example using
     * `\left...\right` if applicable.
     *
     * When `false`, the literal value of the character will be inserted instead.
     */
    'smart-fence': boolean;
    /**
     * When true, during text input the field will switch automatically between
     * 'math' and 'text' mode depending on what is typed and the context of the
     * formula. If necessary, what was previously typed will be 'fixed' to
     * account for the new info.
     *
     * For example, when typing "if x >0":
     *
     * | Type  | Interpretation |
     * |---:|:---|
     * | "i" | math mode, imaginary unit |
     * | "if" | text mode, english word "if" |
     * | "if x" | all in text mode, maybe the next word is xylophone? |
     * | "if x >" | "if" stays in text mode, but now "x >" is in math mode |
     * | "if x > 0" | "if" in text mode, "x > 0" in math mode |
     *
     * Smart Mode is off by default.
     *
     * Manually switching mode (by typing `alt/option+=`) will temporarily turn
     * off smart mode.
     *
     *
     * **Examples**
     *
     * -   slope = rise/run
     * -   If x > 0, then f(x) = sin(x)
     * -   x^2 + sin (x) when x > 0
     * -   When x<0, x^{2n+1}<0
     * -   Graph x^2 -x+3 =0 for 0<=x<=5
     * -   Divide by x-3 and then add x^2-1 to both sides
     * -   Given g(x) = 4x – 3, when does g(x)=0?
     * -   Let D be the set {(x,y)|0<=x<=1 and 0<=y<=x}
     * -   \int\_{the unit square} f(x,y) dx dy
     * -   For all n in NN
     *
     */
    'smart-mode': boolean;
    /**
     * When `true`, when a digit is entered in an empty superscript, the cursor
     * leaps automatically out of the superscript. This makes entry of common
     * polynomials easier and faster. If entering other characters (for example
     * "n+1") the navigation out of the superscript must be done manually (by
     * using the cursor keys or the spacebar to leap to the next insertion
     * point).
     *
     * When `false`, the navigation out of the superscript must always be done
     * manually.
     *
     */
    'smart-superscript': boolean;
    'speech-engine': string;
    'speech-engine-rate': string;
    'speech-engine-voice': string;
    'text-to-speech-markup': string;
    'text-to-speech-rules': string;
    'virtual-keyboard-layout': string;
    /**
     * -   `'manual'`: pressing the virtual keyboard toggle button will show or hide
     *     the virtual keyboard. If hidden, the virtual keyboard is not shown when
     *     the field is focused until the toggle button is pressed.
     * -   `'onfocus'`: the virtual keyboard will be displayed whenever the field is
     *     focused and hidden when the field loses focus. In that case, the virtual
     *     keyboard toggle button is not displayed.
     * -   `'off'`: the virtual keyboard toggle button is not displayed, and the
     *     virtual keyboard is never triggered.
     *
     * If the setting is empty, it will default to `'onfocus'` on touch-capable
     * devices and to `'off'` otherwise.
     *
     */
    'virtual-keyboard-mode': 'auto' | 'manual' | 'onfocus' | 'off';
    /**
     * The visual theme used for the virtual keyboard.
     *
     * If empty, the theme will switch automatically based on the device it's
     * running on. The two supported themes are 'material' and 'apple' (the
     * default).
     */
    'virtual-keyboard-theme': string;
    /**
     * A space separated list of the keyboards that should be available. The
     * keyboard `'all'` is synonym with `'numeric'`, `'functions'``, `'symbols'``
     * `'roman'` and `'greek'`,
     *
     * The keyboards will be displayed in the order indicated.
     */
    'virtual-keyboards': 'all' | 'numeric' | 'roman' | 'greek' | 'functions' | 'symbols' | 'latex' | string;
    /**
     * When true, use a shared virtual keyboard for all the mathfield
     * elements in the page, even across iframes.
     *
     * When setting this option to true, you must create the shared
     * virtual keyboard in the the parent document:
     *
     * ```javascript
     * import { makeSharedVirtualKeyboard } from 'mathlive';
     *
     *     makeSharedVirtualKeyboard({
     *         virtualKeyboardToolbar: 'none',
     *     });
     * ```
     *
     * **Default**: `false`
     */
    'use-shared-virtual-keyboard': boolean;
    /**
     * Specify the `targetOrigin` parameter for
     * [postMessage](https://developer.mozilla.org/en/docs/Web/API/Window/postMessage)
     * to send control messages from child to parent frame to remote control
     * of mathfield component.
     *
     * **Default**: `window.origin`
     */
    'shared-virtual-keyboard-target-origin': string;
    /**
     * The Latex string to insert when the spacebar is pressed (on the physical or
     * virtual keyboard). Empty by default. Use `\;` for a thick space, `\:` for
     * a medium space, `\,` for a thin space.
     */
    'math-mode-space': string;
}
/**
 * The `MathfieldElement` class provides special properties and
 * methods to control the display and behavior of `<math-field>`
 * elements.
 *
 * It inherits many useful properties and methods from [[`HTMLElement`]] such
 * as `style`, `tabIndex`, `addEventListener()`, `getAttribute()`,  etc...
 *
 * To create a new `MathfieldElement`:
 *
 * ```javascript
 * // 1. Create a new MathfieldElement
 * const mfe = new MathfieldElement();
 * // 2. Attach it to the DOM
 * document.body.appendChild(mfe);
 * ```
 *
 * The `MathfieldElement` constructor has an optional argument of
 * [[`MathfieldOptions`]] to configure the element. The options can also
 * be modified later:
 *
 * ```javascript
 * // Setting options during construction
 * const mfe = new MathfieldElement({smartFence: false});
 * // Modifying options after construction
 * mfe.setOptions({smartFence: true});
 * ```
 *
 * ### CSS Variables
 *
 * To customize the appearance of the mathfield, declare the following CSS
 * variables (custom properties) in a ruleset that applied to the mathfield.
 * ```css
 * math-field {
 *  --hue: 10       // Set the highlight color and caret to a reddish hue
 * }
 * ```
 *
 * | CSS Variable | Usage |
 * |:---|:---|
 * | `--hue` | Hue of the highlight color and the caret |
 * | `--highlight` | Color of the selection |
 * | `--contains-highlight` | Backround property for items that contain the caret |
 * | `--highlight-inactive` | Color of the selection, when the mathfield is not focused |
 * | `--caret` | Color of the caret/insertion point |
 * | `--primary` | Primary accent color, used for example in the virtual keyboard |
 * | `--text-font-family` | The font stack used in text mode |
 * | `--keyboard-zindex` | The z-index attribute of the virtual keyboard panel |
 * | `--smart-fence-opacity` | Opacity of a smart gence (default is 50%) |
 * | `--smart-fence-color` | Color of a smart fence (default is current color) |
 *
 * ### CSS Parts
 *
 * To style the virtual keyboard toggle, use the `virtual-keyboard-toggle` CSS
 * part. To use it, define a CSS rule with a `::part()` selector
 * for example:
 * ```css
 * math-field::part(virtual-keyboard-toggle) {
 *  color: red;
 * }
 * ```
 *
 *
 * ### Attributes
 *
 * An attribute is a key-value pair set as part of the tag:
 *
 * ```html
 * <math-field locale="fr"></math-field>
 * ```
 *
 * The supported attributes are listed in the table below with their correspnding
 * property.
 *
 * The property can be changed either directly on the
 * `MathfieldElement` object, or using `setOptions()` if it is prefixed with
 * `options.`, for example
 * ```javascript
 *  getElementById('mf').value = '\\sin x';
 *  getElementById('mf').setOptions({horizontalSpacingScale: 1.1});
 * ```
 *
 * The values of attributes and properties are reflected, which means you can change one or the
 * other, for example:
 * ```javascript
 * getElementById('mf').setAttribute('virtual-keyboard-mode',  'manual');
 * console.log(getElementById('mf').getOption('virtualKeyboardMode'));
 * // Result: "manual"
 * getElementById('mf').setOptions({virtualKeyboardMode: 'onfocus');
 * console.log(getElementById('mf').getAttribute('virtual-keyboard-mode');
 * // Result: 'onfocus'
 * ```
 *
 * An exception is the `value` property, which is not reflected on the `value`
 * attribute: the `value` attribute remains at its initial value.
 *
 *
 * | Attribute | Property |
 * |:---|:---|
 * | `disabled` | `disabled` |
 * | `default-mode` | `options.defaultMode` |
 * | `fonts-directory` | `options.fontsDirectory` |
 * | `sounds-directory` | `options.soundsDirectory` |
 * | `horizontal-spacing-scale` | `options.horizontalSpacingScale` |
 * | `inline-shortcut-timeout` | `options.inlineShortcutTimeout` |
 * | `keypress-vibration` | `options.keypressVibration` |
 * | `keypress-sound` | `options.keypressSound` |
 * | `plonk-sound` | `options.plonkSound` |
 * | `letter-shape-style` | `options.letterShapeStyle` |
 * | `locale` | `options.locale` |
 * | `math-mode-space` | `options.mathModeSpace` |
 * | `read-only` | `options.readOnly` |
 * | `remove-extraneous-parentheses` | `options.removeExtraneousParentheses` |
 * | `smart-fence` | `options.smartFence` |
 * | `smart-mode` | `options.smartMode` |
 * | `smart-superscript` | `options.superscript` |
 * | `speech-engine` | `options.speechEngine` |
 * | `speech-engine-rate` | `options.speechEngineRate` |
 * | `speech-engine-voice` | `options.speechEngineVoice` |
 * | `text-to-speech-markup` | `options.textToSpeechMarkup` |
 * | `text-to-speech-rules` | `options.textToSpeechRules` |
 * | `value` | value |
 * | `virtual-keyboard-layout` | `options.keyboardLayout` |
 * | `virtual-keyboard-mode` | `options.keyboardMode` |
 * | `virtual-keyboard-theme` | `options.keyboardTheme` |
 * | `virtual-keyboards` | `options.keyboards` |
 *
 * See [[`MathfieldOptions`]] for more details about these options.
 *
 * In addition, the following [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)
 * can also be used:
 * - `class`
 * - `data-*`
 * - `hidden`
 * - `id`
 * - `item*`
 * - `style`
 * - `tabindex`
 *
 *
 * ### Events
 *
 * Listen to these events by using `addEventListener()`. For events with additional
 * arguments, the arguments are availble in `event.detail`.
 *
 * | Event Name  | Description |
 * |:---|:---|
 * | `input` | The value of the mathfield has been modified. This happens on almost every keystroke in the mathfield.  |
 * | `change` | The user has commited the value of the mathfield. This happens when the user presses **Return** or leaves the mathfield. |
 * | `selection-change` | The selection (or caret position) in the mathfield has changed |
 * | `mode-change` | The mode (`math`, `text`) of the mathfield has changed |
 * | `undo-state-change` |  The state of the undo stack has changed |
 * | `read-aloud-status-change` | The status of a read aloud operation has changed |
 * | `virtual-keyboard-toggle` | The visibility of the virtual keyboard panel has changed |
 * | `blur` | The mathfield is losing focus |
 * | `focus` | The mathfield is gaining focus |
 * | `focus-out` | The user is navigating out of the mathfield, typically using the **tab** key<br> `detail: {direction: 'forward' | 'backward' | 'upward' | 'downward'}` **cancellable**|
 * | `move-out` | The user has pressed an **arrow** key, but there is nowhere to go. This is an opportunity to change the focus to another element if desired. <br> `detail: {direction: 'forward' | 'backward' | 'upward' | 'downward'}` **cancellable**|
 * | `math-error` | A parsing or configuration error happened <br> `detail: ErrorListener<ParserErrorCode | MathfieldErrorCode>` |
 * | `keystroke` | The user typed a keystroke with a physical keyboard <br> `detail: {keystroke: string, event: KeyboardEvent}` |
 * | `mount` | The element has been attached to the DOM |
 * | `unmount` | The element is about to be removed from the DOM |
 *
 */
export declare class MathfieldElement extends HTMLElement implements Mathfield {
    /**
     * Private lifecycle hooks
     * @internal
     */
    static get optionsAttributes(): Record<string, 'number' | 'boolean' | 'string'>;
    /**
     * Custom elements lifecycle hooks
     * @internal
     */
    static get observedAttributes(): string[];
    private _mathfield;
    private _slotValue;
    private _style;
    /**
       * To create programmatically a new mahfield use:
       * ```javascript
      let mfe = new MathfieldElement();
  
      // Set initial value and options
      mfe.value = "\\frac{\\sin(x)}{\\cos(x)}";
  
      // Options can be set either as an attribute (for simple options)...
      mfe.setAttribute('virtual-keyboard-layout', 'dvorak');
  
      // ... or using `setOptions()`
      mfe.setOptions({
          virtualKeyboardMode: 'manual',
      });
  
      // Attach the element to the DOM
      document.body.appendChild(mfe);
      * ```
      */
    constructor(options?: Partial<MathfieldOptions>);
    getPlaceholderField(placeholderId: string): Mathfield | undefined;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: MathfieldElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: MathfieldElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    get mode(): ParseMode;
    set mode(value: ParseMode);
    /**
     *  @category Options
     */
    getOptions<K extends keyof MathfieldOptions>(keys: K[]): Pick<MathfieldOptions, K>;
    getOptions(): MathfieldOptions;
    /**
     *  @category Options
     */
    getOption<K extends keyof MathfieldOptions>(key: K): MathfieldOptions[K];
    /**
     *  @category Options
     */
    setOptions(options: Partial<MathfieldOptions>): void;
    /**
     * Execute a [[`Commands`|command]] defined by a selector.
     * ```javascript
     * mfe.executeCommand('add-column-after');
     * mfe.executeCommand(['switch-mode', 'math']);
     * ```
     *
     * @param command - A selector, or an array whose first element
     * is a selector, and whose subsequent elements are arguments to the selector.
     *
     * Selectors can be passed either in camelCase or kebab-case.
     *
     * ```javascript
     * // Both calls do the same thing
     * mfe.executeCommand('selectAll');
     * mfe.executeCommand('select-all');
     * ```
     */
    executeCommand(command: Selector | [Selector, ...any[]]): boolean;
    /**
     *  @category Accessing and changing the content
     */
    getValue(format?: OutputFormat): string;
    getValue(start: Offset, end: Offset, format?: OutputFormat): string;
    getValue(range: Range, format?: OutputFormat): string;
    getValue(selection: Selection, format?: OutputFormat): string;
    /**
     *  @category Accessing and changing the content
     */
    setValue(value?: string, options?: InsertOptions): void;
    /**
     * Return true if the mathfield is currently focused (responds to keyboard
     * input).
     *
     * @category Focus
     *
     */
    hasFocus(): boolean;
    get virtualKeyboardState(): 'hidden' | 'visible';
    set virtualKeyboardState(value: 'hidden' | 'visible');
    /**
     * Sets the focus to the mathfield (will respond to keyboard input).
     *
     * @category Focus
     *
     */
    focus(): void;
    /**
     * Remove the focus from the mathfield (will no longer respond to keyboard
     * input).
     *
     * @category Focus
     *
     */
    blur(): void;
    /**
     * Select the content of the mathfield.
     * @category Selection
     */
    select(): void;
    /**
     * Inserts a block of text at the current insertion point.
     *
     * This method can be called explicitly or invoked as a selector with
     * `executeCommand("insert")`.
     *
     * After the insertion, the selection will be set according to the
     * `options.selectionMode`.
     *
     *  @category Accessing and changing the content
     */
    insert(s: string, options?: InsertOptions): boolean;
    /**
     * Updates the style (color, bold, italic, etc...) of the selection or sets
     * the style to be applied to future input.
     *
     * If there is no selection and no range is specified, the style will
     * apply to the next character typed.
     *
     * If a range is specified, the style is applied to the range, otherwise,
     * if there is a selection, the style is applied to the selection.
     *
     * If the operation is 'toggle' and the range already has this style,
     * remove it. If the range
     * has the style partially applied (i.e. only some sections), remove it from
     * those sections, and apply it to the entire range.
     *
     * If the operation is 'set', the style is applied to the range,
     * whether it already has the style or not.
     *
     * The default operation is 'set'.
     *
     * @category Accessing and changing the content
     */
    applyStyle(style: Style, options?: Range | {
        range?: Range;
        operation?: 'set' | 'toggle';
    }): void;
    /**
     * The bottom location of the caret (insertion point) in viewport
     * coordinates.
     *
     * See also [[`setCaretPoint`]]
     * @category Selection
     */
    get caretPoint(): null | {
        x: number;
        y: number;
    };
    set caretPoint(point: null | {
        x: number;
        y: number;
    });
    /**
     * `x` and `y` are in viewport coordinates.
     *
     * Return true if the location of the point is a valid caret location.
     *
     * See also [[`caretPoint`]]
     * @category Selection
     */
    setCaretPoint(x: number, y: number): boolean;
    /**
     *  Return an array of ranges matching the argument.
     *
     * An array is always returned, but it has no element if there are no
     * matching items.
     */
    find(pattern: string | RegExp, options?: FindOptions): Range[];
    /**
     * Replace the pattern items matching the **pattern** with the
     * **replacement** value.
     *
     * If **replacement** is a function, the function is called
     * for each match and the function return value will be
     * used as the replacement.
     */
    replace(pattern: string | RegExp, replacement: string | ReplacementFunction, options?: FindOptions): void;
    /**
     * Custom elements lifecycle hooks
     * @internal
     */
    connectedCallback(): void;
    /**
     * Custom elements lifecycle hooks
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Private lifecycle hooks
     * @internal
     */
    upgradeProperty(prop: string): void;
    /**
     * Custom elements lifecycle hooks
     * @internal
     */
    attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown): void;
    get readonly(): boolean;
    set readonly(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * The content of the mathfield as a Latex expression.
     * ```
     * document.querySelector('mf').value = '\\frac{1}{\\pi}'
     * ```
     *  @category Accessing and changing the content
     */
    get value(): string;
    /**
     *  @category Accessing and changing the content
     */
    set value(value: string);
    get defaultMode(): 'inline-math' | 'math' | 'text';
    set defaultMode(value: 'inline-math' | 'math' | 'text');
    get fontsDirectory(): string;
    set fontsDirectory(value: string);
    get mathModeSpace(): string;
    set mathModeSpace(value: string);
    get inlineShortcutTimeout(): number;
    set inlineShortcutTimeout(value: number);
    get keypressVibration(): boolean;
    set keypressVibration(value: boolean);
    get keypressSound(): string | HTMLAudioElement | null | {
        spacebar?: null | string | HTMLAudioElement;
        return?: null | string | HTMLAudioElement;
        delete?: null | string | HTMLAudioElement;
        default: null | string | HTMLAudioElement;
    };
    set keypressSound(value: string | HTMLAudioElement | null | {
        spacebar?: null | string | HTMLAudioElement;
        return?: null | string | HTMLAudioElement;
        delete?: null | string | HTMLAudioElement;
        default: null | string | HTMLAudioElement;
    });
    get plonkSound(): string | HTMLAudioElement | null;
    set plonkSound(value: string | HTMLAudioElement | null);
    get letterShapeStyle(): 'auto' | 'tex' | 'iso' | 'french' | 'upright';
    set letterShapeStyle(value: 'auto' | 'tex' | 'iso' | 'french' | 'upright');
    get locale(): string;
    set locale(value: string);
    get readOnly(): boolean;
    set readOnly(value: boolean);
    get removeExtraneousParentheses(): boolean;
    set removeExtraneousParentheses(value: boolean);
    get smartFence(): boolean;
    set smartFence(value: boolean);
    get smartMode(): boolean;
    set smartMode(value: boolean);
    get smartSuperscript(): boolean;
    set smartSuperscript(value: boolean);
    get speechEngine(): 'local' | 'amazon';
    set speechEngine(value: 'local' | 'amazon');
    get speechEngineRate(): string;
    set speechEngineRate(value: string);
    get speechEngineVoice(): string;
    set speechEngineVoice(value: string);
    get textToSpeechMarkup(): '' | 'ssml' | 'ssml_step' | 'mac';
    set textToSpeechMarkup(value: '' | 'ssml' | 'ssml_step' | 'mac');
    get textToSpeechRules(): 'mathlive' | 'sre';
    set textToSpeechRule(value: 'mathlive' | 'sre');
    get virtualKeyboardLayout(): 'auto' | 'qwerty' | 'azerty' | 'qwertz' | 'dvorak' | 'colemak';
    set virtualKeyboardLayout(value: 'auto' | 'qwerty' | 'azerty' | 'qwertz' | 'dvorak' | 'colemak');
    get virtualKeyboardMode(): 'auto' | 'manual' | 'onfocus' | 'off';
    set virtualKeyboardMode(value: 'auto' | 'manual' | 'onfocus' | 'off');
    get virtualKeyboardTheme(): 'material' | 'apple' | '';
    set virtualKeyboardTheme(value: 'material' | 'apple' | '');
    get virtualKeyboards(): string;
    set virtualKeyboards(value: string);
    get useSharedVirtualKeyboard(): boolean;
    set useSharedVirtualKeyboard(value: boolean);
    get sharedVirtualKeyboardTargetOrigin(): string;
    set sharedVirtualKeyboardTargetOrigin(value: string);
    /**
     * An array of ranges representing the selection.
     *
     * It is guaranteed there will be at least one element. If a discontinuous
     * selection is present, the result will include more than one element.
     *
     * @category Selection
     *
     */
    get selection(): Selection;
    /**
     *
     * @category Selection
     */
    set selection(value: Selection | Offset);
    /**
     * The position of the caret/insertion point, from 0 to `lastOffset`.
     *
     * @category Selection
     *
     */
    get position(): Offset;
    /**
     * @category Selection
     */
    set position(offset: Offset);
    /**
     * The depth of an offset represent the depth in the expression tree.
     */
    getOffsetDepth(offset: Offset): number;
    /**
     * The last valid offset.
     * @category Selection
     */
    get lastOffset(): Offset;
}
export default MathfieldElement;
declare global {
    /** @internal */
    interface Window {
        MathfieldElement: typeof MathfieldElement;
    }
}
