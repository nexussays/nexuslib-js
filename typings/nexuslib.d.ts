declare module "nexus"
{
   export = nexus;

   module nexus
   {
      module array
      {
         function enhancePrototype(): void;

         module enhancePrototype
         {
            interface Array<T>
            {
               first(defaultValue?: any): T;
               last(defaultValue?: any): T;
               flatten(): Array<T>;
               map$(mapFunc: (item: T, index: number, array: Array<T>) => any, scope: Array<T>): void;
            }
         }

         function first<T>(source: T[], defaultValue?: any): T;

         function flatten(source: any[]): any[];

         function isArrayLike(source: any): boolean;

         function last<T>(source: T[], defaultValue?: any): T;

         function makeRange(from: any, to: any, step: any): any[];

         function map$<T>(source: T[], mapFunc: (item: T, index: number, array: T[]) => any, scope?: T[]): void;

         function shuffle(source: any): any;

         function toArray<T>(collection: any): T[];
      }

      module browser
      {
         class Cookie
         {
            key: string;
            data: any;
            path: string;
            domain: string;
            isSecure: boolean;
            expiresOn: Date;

            constructor(key: string, data: any, expiration?: Date, path?: string, domain?: string, isSecure?: boolean);

            constructor(key: string, data: any, expiration?: number, path?: string, domain?: string, isSecure?: boolean);

            expireIn(milliseconds: number): Cookie;

            expire(): Cookie;

            save(): void;

            refreshData(): Cookie;

            toString(): string;
         }

         module Cookie
         {
            function retrieveOrCreate(key: any, reload?: boolean): Cookie;

            function retrieve(key: any, reload?: boolean): Cookie;

            function save(cookie: Cookie): void;

            function write(key: string, value: any, expiration?: number, path?: string, domain?: string, secure?: boolean): Cookie;

            function write(key: string, value: any, expiration?: Date, path?: string, domain?: string, secure?: boolean): Cookie;
         }

         module window
         {
            function getSize(): {
               "viewportHeight": number;
               "viewportWidth": number;
               "contentHeight": number;
               "contentWidth": number;
               "scrollYOffset": number;
               "scrollXOffset": number;
            };

            function jump(anchor: any): void;

            function origin(): string;

            function parseQueryString(): {};

            function replaceQueryString(hash: Object): void;
         }
      }

      module dom
      {
         class ElementGroup
         {
            constructor(sourceArray: nexus.dom.EnhancedHTMLElement[]);

            items: nexus.dom.EnhancedHTMLElement[];
            length: number;

            forEach(callbackfn: (value: nexus.dom.EnhancedHTMLElement, index: number, array: nexus.dom.EnhancedHTMLElement[]) => void): ElementGroup;

            some(callbackfn: (value: nexus.dom.EnhancedHTMLElement, index: number, array: nexus.dom.EnhancedHTMLElement[]) => boolean): boolean;

            every(callbackfn: (value: nexus.dom.EnhancedHTMLElement, index: number, array: nexus.dom.EnhancedHTMLElement[]) => boolean): boolean;

            filter$(callbackfn: (value: nexus.dom.EnhancedHTMLElement, index: number, array: nexus.dom.EnhancedHTMLElement[]) => boolean): ElementGroup;

            bind(eventName: string, func: (e: nexus.event.EnhancedEvent) => void): ElementGroup;

            unbind(eventName: string, func: (e: nexus.event.EnhancedEvent) => void): ElementGroup;

            addClass(name: string, checkExistence?: boolean): ElementGroup;

            removeClass(name: string): ElementGroup;

            toggleClass(name: string): ElementGroup;

            hasClass(name: string): boolean;

            find(query: string): ElementGroup;

            first(): nexus.dom.EnhancedHTMLElement;

            last(): nexus.dom.EnhancedHTMLElement;
         }

         interface EnhancedHTMLElement extends HTMLElement, EnhancedHTMLElement.Impl
         {
         }

         module EnhancedHTMLElement
         {
            interface Anchor extends HTMLAnchorElement, Impl
            {
            }

            interface Audio extends HTMLAudioElement, Impl
            {
            }

            interface Base extends HTMLBaseElement, Impl
            {
            }

            interface BR extends HTMLBRElement, Impl
            {
            }

            interface Block extends HTMLBlockElement, Impl
            {
            }

            interface Button extends HTMLButtonElement, Impl
            {
            }

            interface Canvas extends HTMLCanvasElement, Impl
            {
            }

            interface TableCaption extends HTMLTableCaptionElement, Impl
            {
            }

            interface TableCol extends HTMLTableColElement, Impl
            {
            }

            interface DD extends HTMLDDElement, Impl
            {
            }

            interface Div extends HTMLDivElement, Impl
            {
            }

            interface DList extends HTMLDListElement, Impl
            {
            }

            interface DT extends HTMLDTElement, Impl
            {
            }

            interface Embed extends HTMLEmbedElement, Impl
            {
            }

            interface FieldSet extends HTMLFieldSetElement, Impl
            {
            }

            interface Form extends HTMLFormElement, Impl
            {
            }

            interface Heading extends HTMLHeadingElement, Impl
            {
            }

            interface HR extends HTMLHRElement, Impl
            {
            }

            interface IFrame extends HTMLIFrameElement, Impl
            {
            }

            interface Image extends HTMLImageElement, Impl
            {
            }

            interface Input extends HTMLInputElement, Impl
            {
            }

            interface Label extends HTMLLabelElement, Impl
            {
            }

            interface Legend extends HTMLLegendElement, Impl
            {
            }

            interface LI extends HTMLLIElement, Impl
            {
            }

            interface Link extends HTMLLinkElement, Impl
            {
            }

            interface Object extends HTMLObjectElement, Impl
            {
            }

            interface OList extends HTMLOListElement, Impl
            {
            }

            interface OptGroup extends HTMLOptGroupElement, Impl
            {
            }

            interface Paragraph extends HTMLParagraphElement, Impl
            {
            }

            interface Param extends HTMLParamElement, Impl
            {
            }

            interface Option extends HTMLOptionElement, Impl
            {
            }

            interface Pre extends HTMLPreElement, Impl
            {
            }

            interface Progress extends HTMLProgressElement, Impl
            {
            }

            interface Quote extends HTMLQuoteElement, Impl
            {
            }

            interface Script extends HTMLScriptElement, Impl
            {
            }

            interface Select extends HTMLSelectElement, Impl
            {
            }

            interface Source extends HTMLSourceElement, Impl
            {
            }

            interface Span extends HTMLSpanElement, Impl
            {
            }

            interface Table extends HTMLTableElement, Impl
            {
            }

            interface TableSection extends HTMLTableSectionElement, Impl
            {
            }

            interface TableDataCell extends HTMLTableDataCellElement, Impl
            {
            }

            interface TextArea extends HTMLTextAreaElement, Impl
            {
            }

            interface TableHeaderCell extends HTMLTableHeaderCellElement, Impl
            {
            }

            interface TableSection extends HTMLTableSectionElement, Impl
            {
            }

            interface Title extends HTMLTitleElement, Impl
            {
            }

            interface TableRow extends HTMLTableRowElement, Impl
            {
            }

            interface Track extends HTMLTrackElement, Impl
            {
            }

            interface UList extends HTMLUListElement, Impl
            {
            }

            interface Video extends HTMLVideoElement, Impl
            {
            }
         }

         module EnhancedHTMLElement
         {
            class Impl
            {
               isAncestor(ancestor: Node): boolean;

               getOuterHTML(includeChildren?: boolean, escapeHtml?: boolean): string;

               append(...params: any[][]): EnhancedHTMLElement;

               append(...params: Node[]): EnhancedHTMLElement;

               append(...params: any[]): EnhancedHTMLElement;

               getBooleanAttribute(name: string): boolean;

               setBooleanAttribute(name: string, value: boolean): void;

               bind(eventName: string, func: nexus.event.EventHandler): void;

               unbind(event: string, func: nexus.event.EventHandler): void;

               trigger(eventName: string): void;

               getAncestors(query: string): nexus.dom.ElementGroup;

               addClass(name: string, checkExistence?: boolean): boolean;

               removeClass(name: string): boolean;

               toggleClass(name: string): void;

               hasClass(name: string): boolean;

               css(value: any): string;

               find(query: string): nexus.dom.ElementGroup;
            }
         }

         module HTML
         {
            function text(...params: any[]): Node;

            function a(...params: any[]): EnhancedHTMLElement.Anchor;

            function abbr(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function acronym(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function address(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function audio(...params: any[]): EnhancedHTMLElement.Audio;

            function base(...params: any[]): EnhancedHTMLElement.Base;

            function blockquote(...params: any[]): EnhancedHTMLElement.Block;

            function br(...params: any[]): EnhancedHTMLElement.BR;

            function button(...params: any[]): EnhancedHTMLElement.Button;

            function canvas(...params: any[]): EnhancedHTMLElement.Canvas;

            function caption(...params: any[]): EnhancedHTMLElement.TableCaption;

            function cite(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function code(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function col(...params: any[]): EnhancedHTMLElement.TableCol;

            function colgroup(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function dd(...params: any[]): EnhancedHTMLElement.DD;

            function del(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function details(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function dfn(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function div(...params: any[]): EnhancedHTMLElement.Div;

            function dl(...params: any[]): EnhancedHTMLElement.DList;

            function dt(...params: any[]): EnhancedHTMLElement.DT;

            function em(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function embed(...params: any[]): EnhancedHTMLElement.Embed;

            function fieldset(...params: any[]): EnhancedHTMLElement.FieldSet;

            function figure(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function form(...params: any[]): EnhancedHTMLElement.Form;

            function h1(...params: any[]): EnhancedHTMLElement.Heading;

            function h2(...params: any[]): EnhancedHTMLElement.Heading;

            function h3(...params: any[]): EnhancedHTMLElement.Heading;

            function h4(...params: any[]): EnhancedHTMLElement.Heading;

            function h5(...params: any[]): EnhancedHTMLElement.Heading;

            function h6(...params: any[]): EnhancedHTMLElement.Heading;

            function hr(...params: any[]): EnhancedHTMLElement.HR;

            function iframe(...params: any[]): EnhancedHTMLElement.IFrame;

            function img(...params: any[]): EnhancedHTMLElement.Image;

            function input(...params: any[]): EnhancedHTMLElement.Input;

            function ins(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function kbd(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function label(...params: any[]): EnhancedHTMLElement.Label;

            function legend(...params: any[]): EnhancedHTMLElement.Legend;

            function li(...params: any[]): EnhancedHTMLElement.LI;

            function link(...params: any[]): EnhancedHTMLElement.Link;

            function math(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function object(...params: any[]): EnhancedHTMLElement.Object;

            function ol(...params: any[]): EnhancedHTMLElement.OList;

            function optgroup(...params: any[]): EnhancedHTMLElement.OptGroup;

            function option(...params: any[]): EnhancedHTMLElement.Option;

            function p(...params: any[]): EnhancedHTMLElement.Paragraph;

            function param(...params: any[]): EnhancedHTMLElement.Param;

            function pre(...params: any[]): EnhancedHTMLElement.Pre;

            function progress(...params: any[]): EnhancedHTMLElement.Progress;

            function q(...params: any[]): EnhancedHTMLElement.Quote;

            function s(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function samp(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function script(...params: any[]): EnhancedHTMLElement.Script;

            function select(...params: any[]): EnhancedHTMLElement.Select;

            function source(...params: any[]): EnhancedHTMLElement.Source;

            function span(...params: any[]): EnhancedHTMLElement.Span;

            function strong(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function sub(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function summary(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function sup(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function svg(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function table(...params: any[]): EnhancedHTMLElement.Table;

            function tbody(...params: any[]): EnhancedHTMLElement.TableSection;

            function td(...params: any[]): EnhancedHTMLElement.TableDataCell;

            function textarea(...params: any[]): EnhancedHTMLElement.TextArea;

            function tfoot(...params: any[]): EnhancedHTMLElement.TableSection;

            function th(...params: any[]): EnhancedHTMLElement.TableHeaderCell;

            function thead(...params: any[]): EnhancedHTMLElement.TableSection;

            function time(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function title(...params: any[]): EnhancedHTMLElement.Title;

            function tr(...params: any[]): EnhancedHTMLElement.TableRow;

            function track(...params: any[]): EnhancedHTMLElement.Track;

            function u(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function ul(...params: any[]): EnhancedHTMLElement.UList;

            function var$(...params: any[]): nexus.dom.EnhancedHTMLElement;

            function video(...params: any[]): EnhancedHTMLElement.Video;
         }

         module form
         {
            class RadioCollection
            {
               value: any;
               items: any[];
               length: number;
               selectedIndex: any;

               constructor(name: any);

               uncheckAll(): void;

               checkValue(value: any, executeOnclickFunc: any): void;

               refresh(): void;
            }

            function fieldChanged(elem: any): boolean;

            function getDefaultValue(elem: HTMLElement): string;
         }

         module selector
         {
            function filterByAttribute(elements: any, attr: string, val?: string, type?: string): any[];

            function filterByNodeName(elements: any, name: any): any[];

            function selectorClassName(name: string, tag?: string): Node[];

            function selectorQueryAll(getEl: find.Interface): Element[];

            function selectorQueryAll(getEl: find.Interface, query: string): Element[];

            function selectorQueryAll(getEl: find.Interface, query: string[]): Element[];

            function selectorQueryAll(getEl: find.Interface, ...query: string[]): Element[];

            function selectorQueryAll(getEl: find.Interface, el: HTMLElement): Element;

            function selectorQueryAll(getEl: find.Interface, query: any): any;
         }

         function enhanceHTMLElement(element: HTMLElement, force?: boolean): nexus.dom.EnhancedHTMLElement;

         module enhanceHTMLElement
         {
            var enabled: boolean;
         }

         function enhancePrototype(): void;

         function find(query: Node, root?: Element): nexus.dom.ElementGroup;

         function find(query: Element, root?: Element): nexus.dom.ElementGroup;

         function find(query: string, root?: Element): nexus.dom.ElementGroup;

         module find
         {
            function id(id: Node): nexus.dom.EnhancedHTMLElement;

            function id(id: string): nexus.dom.EnhancedHTMLElement;

            function id<T extends EnhancedHTMLElement>(id: string): T;

            function name(name: string, tag?: string, root?: Element): nexus.dom.ElementGroup;

            function className(name: string, tag?: string, root?: Element): nexus.dom.ElementGroup;

            function tagName(name: string, root?: Element): nexus.dom.ElementGroup;

            interface Interface
            {
               (query: Node, root?: Element): HTMLElement[];
               (query: Element, root?: Element): HTMLElement[];
               (query: string, root?: Element): HTMLElement[];
               id(id: Node): HTMLElement;
               id(id: string): HTMLElement;
               name(name: string, tag?: string, root?: Element): HTMLElement[];
               className(name: string, tag?: string, root?: Element): HTMLElement[];
               tagName(name: string, root?: Element): HTMLElement[];
            }

            function native(query: Node, root?: Element): HTMLElement[];

            function native(query: Element, root?: Element): HTMLElement[];

            function native(query: string, root?: Element): HTMLElement[];

            module native
            {
               function id(id: Node): HTMLElement;

               function id(id: string): HTMLElement;

               function name(name: string, tag?: string, root?: Element): HTMLElement[];

               function className(name: string, tag?: string, root?: Element): HTMLElement[];

               function tagName(name: string, root?: Element): HTMLElement[];
            }
         }

         function getOuterHTML(node: Node, includeChildren?: boolean, escapeHtml?: boolean): string;

         function isAncestor(node: Node, ancestor: Node): boolean;

         function nodeTypeToString(el: Node): string;

         function onInteractive(callback: (e?: nexus.event.EnhancedEvent) => void): void;

         function onLoaded(callback: (e?: nexus.event.EnhancedEvent) => void): void;
      }

      module event
      {
         interface EnhancedEvent extends Event, KeyboardEvent, MouseEvent
         {
            type: string;
            isMouseEvent(): boolean;
            isKeyboardEvent(): boolean;
            isTouchEvent(): boolean;
            mouseInfo: {
               left: boolean;
               right: boolean;
               middle: boolean;
            };
            keyInfo: {
               code: nexus.util.Key;
               char: string;
               shift: boolean;
               ctrl: boolean;
               alt: boolean;
               capsLock: boolean;
               meta: boolean;
            };
            pageX: number;
            pageY: number;
            clientX: number;
            clientY: number;
            screenX: number;
            screenY: number;
            target: HTMLElement;
            relatedTarget: HTMLElement;
            kill(): void;
            preventDefault(): void;
            stopPropagation(): void;
            stopImmediatePropagation(): void;
         }

         interface EventHandler
         {
            (e: nexus.event.EnhancedEvent, context: nexus.dom.EnhancedHTMLElement): void;
         }

         function enhanceEvent(evt: Event, origin?: HTMLElement): nexus.event.EnhancedEvent;
      }

      module graphics
      {
         class Color
         {
            red: number;
            green: number;
            blue: number;
            alpha: number;
            static LUM_R: number;
            static LUM_G: number;
            static LUM_B: number;

            constructor(red?: number, green?: number, blue?: number, alpha?: number);

            matches(other: Color): boolean;

            setSaturation(n: number): Color;

            greyscale(): Color;

            toNumber(): number;

            toString(): string;

            static fromHex(color: string): Color;

            static fromHex(color: number): Color;

            static fromArgb(color: number): Color;
         }
      }

      module math
      {
         interface IPRNG
         {
            currentState: number;
            period: number;
            next(): number;
         }

         class NativeRandomGenerator implements nexus.math.IPRNG
         {
            period: number;
            currentState: number;

            next(): number;
         }

         class Random
         {
            generator: nexus.math.IPRNG;
            static instance: Random;

            constructor(generator: nexus.math.IPRNG);

            float(min?: number, max?: number): number;

            integer(min?: number, max?: number): number;

            unsignedInteger(min?: number, max?: number): number;

            boolean(): boolean;

            weightedRound(value: number): number;

            choice(...items: any[]): any;

            toString(): string;
         }

         function asUnsigned(value: number): number;

         function clamp(value: number, min: number, max: number): number;

         function distance(value1: number, value2: number): number;

         function matchSign(source: number, compareTo: number): number;

         function mean(...args: number[]): number;

         function sign(value: number): number;

         function toDegrees(radians: number): number;

         function toRadians(degrees: number): number;

         function wrapAngleDegrees(angle: number): number;

         function wrapAngleRadians(angle: number): number;
      }

      module net
      {
         class HttpRequest
         {
            url: string;
            method: HttpRequest.Method;
            data: any;
            headers: any;

            constructor(url?: string, method?: HttpRequest.Method, data?: any);

            cancel(): void;

            send(completeCallback: (response: nexus.net.HttpResponse) => void): boolean;
         }

         module HttpRequest
         {
            enum Method
            {
               GET = 0,
               POST = 1,
               PUT = 2,
               DELETE = 3,
               HEAD = 4,
               OPTIONS = 5,
            }
         }

         class HttpResponse
         {
            url: string;
            body: any;
            time: number;
            status: number;
            headers: any;
            isSuccess: boolean;

            constructor();
         }

         function generateQueryString(hash: any): string;
      }

      module object
      {
         function clone<T>(obj: T): T;

         function extendPrototype(derived: any, parents: any[]): void;

         function forEach<T>(obj: T, func: (key: any, value: any, obj: T) => void): void;

         function join(obj: any, join?: string): string[];

         function keys(obj: any): string[];

         function map<T>(obj: T, keyFunc?: (any: any) => any, valFunc?: (any: any) => any): T;
      }

      module serialization
      {
         module JsonSerializer
         {
            var deserialize: (text: string, reviver?: (key: any, value: any) => any) => any;

            function serialize(value: any, replacer?: (key: string, value: any) => any, space?: any): string;

            function serialize(value: any, replacer?: any[], space?: any): string;
         }
      }

      module stringutil
      {
         function camelCase(str: string): string;

         function charTimes(char: string, times: number): string;

         function contains(source: string, value: string, boundary?: string, caseInsensitive?: boolean): boolean;

         function escapeHTML(str: string): string;

         function escapeRegExp(str: string): string;

         function hyphenate(str: string): string;

         function stripTags(str: string): string;

         function trim(str: string): string;

         function trimChars(str: string, ...chars: string[]): string;

         function unescapeHTML(str: string): string;
      }

      module util
      {
         enum Key
         {
            A = 65,
            Alternate = 18,
            B = 66,
            Backquote = 192,
            Backslash = 220,
            Backspace = 8,
            C = 67,
            CapsLock = 20,
            Comma = 188,
            Command = 15,
            Control = 17,
            D = 68,
            Delete = 46,
            Down = 40,
            E = 69,
            End = 35,
            Enter = 13,
            Equal = 187,
            Escape = 27,
            F = 70,
            F1 = 112,
            F10 = 121,
            F11 = 122,
            F12 = 123,
            F13 = 124,
            F14 = 125,
            F15 = 126,
            F2 = 113,
            F3 = 114,
            F4 = 115,
            F5 = 116,
            F6 = 117,
            F7 = 118,
            F8 = 119,
            F9 = 120,
            G = 71,
            H = 72,
            Home = 36,
            I = 73,
            Insert = 45,
            J = 74,
            K = 75,
            L = 76,
            Left = 37,
            Leftbracket = 219,
            M = 77,
            Minus = 189,
            N = 78,
            Number0 = 48,
            Number1 = 49,
            Number2 = 50,
            Number3 = 51,
            Number4 = 52,
            Number5 = 53,
            Number6 = 54,
            Number7 = 55,
            Number8 = 56,
            Number9 = 57,
            Numpad = 21,
            Numpad0 = 96,
            Numpad1 = 97,
            Numpad2 = 98,
            Numpad3 = 99,
            Numpad4 = 100,
            Numpad5 = 101,
            Numpad6 = 102,
            Numpad7 = 103,
            Numpad8 = 104,
            Numpad9 = 105,
            NumpadAdd = 107,
            NumpadDecimal = 110,
            NumpadDivide = 111,
            NumpadEnter = 108,
            NumpadMultiply = 106,
            NumpadSubtract = 109,
            O = 79,
            P = 80,
            PageDown = 34,
            PageUp = 33,
            Period = 190,
            Q = 81,
            Quote = 222,
            R = 82,
            Right = 39,
            Rightbracket = 221,
            S = 83,
            Semicolon = 186,
            Shift = 16,
            Slash = 191,
            Space = 32,
            T = 84,
            Tab = 9,
            U = 85,
            Up = 38,
            V = 86,
            W = 87,
            X = 88,
            Y = 89,
            Z = 90,
         }

         module Milliseconds
         {
            function days(num: number): number;

            function hours(num: number): number;

            function minutes(num: number): number;

            function seconds(num: number): number;
         }

         module Sort
         {
            function defaultSort(a: any, b: any): number;

            function alphanum(a: any, b: any): number;

            function alphanumCaseInsensitive(a: any, b: any): number;

            function length(a: any, b: any): number;

            function property(prop: string, sortFunc?: (a: any, b: any) => number): (a: any, b: any) => number;

            function multi(...items: any[]): (a: any, b: any) => number;
         }

         function isLeapYear(year: number): boolean;
      }

      function parseBool(value: any): boolean;

      enum type
      {
         "undefined" = 0,
         "null" = 1,
         "object" = 2,
         "array" = 3,
         "boolean" = 4,
         "node" = 5,
         "window" = 6,
         "date" = 7,
         "string" = 8,
         "function" = 9,
         "number" = 10,
         "regexp" = 11,
      }

      module type
      {
         function of(obj: any): type;
      }
   }
}