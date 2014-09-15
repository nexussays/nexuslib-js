declare module 'nnet'
{
   export = nnet;

   module nnet
   {
      module array
      {
         function enhancePrototype(): void;

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
            constructor(sourceArray: nnet.dom.EnhancedHTMLElement[]);

            items: nnet.dom.EnhancedHTMLElement[];
            length: number;

            forEach(callbackfn: (value: nnet.dom.EnhancedHTMLElement, index: number, array: nnet.dom.EnhancedHTMLElement[]) => void): ElementGroup;

            some(callbackfn: (value: nnet.dom.EnhancedHTMLElement, index: number, array: nnet.dom.EnhancedHTMLElement[]) => boolean): boolean;

            every(callbackfn: (value: nnet.dom.EnhancedHTMLElement, index: number, array: nnet.dom.EnhancedHTMLElement[]) => boolean): boolean;

            filter$(callbackfn: (value: nnet.dom.EnhancedHTMLElement, index: number, array: nnet.dom.EnhancedHTMLElement[]) => boolean): ElementGroup;

            bind(eventName: string, func: (e: nnet.event.EnhancedEvent) => void): ElementGroup;

            unbind(eventName: string, func: (e: nnet.event.EnhancedEvent) => void): ElementGroup;

            addClass(name: string, checkExistence?: boolean): ElementGroup;

            removeClass(name: string): ElementGroup;

            toggleClass(name: string): ElementGroup;

            hasClass(name: string): boolean;

            find(query: string): ElementGroup;

            first(): nnet.dom.EnhancedHTMLElement;

            last(): nnet.dom.EnhancedHTMLElement;
         }

         interface EnhancedElement extends Element, EnhancedElement.Impl
         {
         }

         module EnhancedElement
         {
            class Impl
            {
               isAncestor(ancestor: Node): boolean;

               getOuterHTML(includeChildren?: boolean, escapeHtml?: boolean): string;

               append(...params: any[][]): nnet.dom.EnhancedElement;

               append(...params: Node[]): nnet.dom.EnhancedElement;

               append(...params: Object[]): nnet.dom.EnhancedElement;

               getBooleanAttribute(name: string): boolean;

               setBooleanAttribute(name: string, value: boolean): void;

               bind(eventName: string, func: (e: nnet.event.EnhancedEvent) => void): void;

               unbind(event: string, func: (e: nnet.event.EnhancedEvent) => void): void;

               trigger(eventName: string): void;
            }
         }

         interface EnhancedHTMLElement extends HTMLElement, EnhancedHTMLElement.Impl
         {
         }

         module EnhancedHTMLElement
         {
            class Impl extends EnhancedElement.Impl
            {
               getAncestors(query: string): ElementGroup;

               addClass(name: string, checkExistence?: boolean): boolean;

               removeClass(name: string): boolean;

               toggleClass(name: string): void;

               hasClass(name: string): boolean;

               find(query: string): ElementGroup;
            }
         }

         module HTML
         {
            function text(...params: any[]): Node;

            function a(...params: any[]): IEnhancedHTMLAnchorElement;

            interface IEnhancedHTMLAnchorElement extends HTMLAnchorElement, EnhancedHTMLElement.Impl
            {
            }

            function abbr(...params: any[]): EnhancedHTMLElement;

            function acronym(...params: any[]): EnhancedHTMLElement;

            function address(...params: any[]): EnhancedHTMLElement;

            function audio(...params: any[]): IEnhancedHTMLAudioElement;

            interface IEnhancedHTMLAudioElement extends HTMLAudioElement, EnhancedHTMLElement.Impl
            {
            }

            function base(...params: any[]): IEnhancedHTMLBaseElement;

            interface IEnhancedHTMLBaseElement extends HTMLBaseElement, EnhancedHTMLElement.Impl
            {
            }

            function blockquote(...params: any[]): IEnhancedHTMLBlockElement;

            interface IEnhancedHTMLBlockElement extends HTMLBlockElement, EnhancedHTMLElement.Impl
            {
            }

            function br(...params: any[]): IEnhancedHTMLBRElement;

            interface IEnhancedHTMLBRElement extends HTMLBRElement, EnhancedHTMLElement.Impl
            {
            }

            function button(...params: any[]): IEnhancedHTMLButtonElement;

            interface IEnhancedHTMLButtonElement extends HTMLButtonElement, EnhancedHTMLElement.Impl
            {
            }

            function canvas(...params: any[]): IEnhancedHTMLCanvasElement;

            interface IEnhancedHTMLCanvasElement extends HTMLCanvasElement, EnhancedHTMLElement.Impl
            {
            }

            function caption(...params: any[]): IEnhancedHTMLTableCaptionElement;

            interface IEnhancedHTMLTableCaptionElement extends HTMLTableCaptionElement, EnhancedHTMLElement.Impl
            {
            }

            function cite(...params: any[]): EnhancedHTMLElement;

            function code(...params: any[]): EnhancedHTMLElement;

            function col(...params: any[]): IEnhancedHTMLTableColElement;

            interface IEnhancedHTMLTableColElement extends HTMLTableColElement, EnhancedHTMLElement.Impl
            {
            }

            function colgroup(...params: any[]): EnhancedHTMLElement;

            function dd(...params: any[]): IEnhancedHTMLDDElement;

            interface IEnhancedHTMLDDElement extends HTMLDDElement, EnhancedHTMLElement.Impl
            {
            }

            function del(...params: any[]): EnhancedHTMLElement;

            function details(...params: any[]): EnhancedHTMLElement;

            function dfn(...params: any[]): EnhancedHTMLElement;

            function div(...params: any[]): IEnhancedHTMLDivElement;

            interface IEnhancedHTMLDivElement extends HTMLDivElement, EnhancedHTMLElement.Impl
            {
            }

            function dl(...params: any[]): IEnhancedHTMLDListElement;

            interface IEnhancedHTMLDListElement extends HTMLDListElement, EnhancedHTMLElement.Impl
            {
            }

            function dt(...params: any[]): IEnhancedHTMLDTElement;

            interface IEnhancedHTMLDTElement extends HTMLDTElement, EnhancedHTMLElement.Impl
            {
            }

            function em(...params: any[]): EnhancedHTMLElement;

            function embed(...params: any[]): IEnhancedHTMLEmbedElement;

            interface IEnhancedHTMLEmbedElement extends HTMLEmbedElement, EnhancedHTMLElement.Impl
            {
            }

            function fieldset(...params: any[]): IEnhancedHTMLFieldSetElement;

            interface IEnhancedHTMLFieldSetElement extends HTMLFieldSetElement, EnhancedHTMLElement.Impl
            {
            }

            function figure(...params: any[]): EnhancedHTMLElement;

            function form(...params: any[]): IEnhancedHTMLFormElement;

            interface IEnhancedHTMLFormElement extends HTMLFormElement, EnhancedHTMLElement.Impl
            {
            }

            function h1(...params: any[]): IEnhancedHTMLHeadingElement;

            function h2(...params: any[]): IEnhancedHTMLHeadingElement;

            function h3(...params: any[]): IEnhancedHTMLHeadingElement;

            function h4(...params: any[]): IEnhancedHTMLHeadingElement;

            function h5(...params: any[]): IEnhancedHTMLHeadingElement;

            function h6(...params: any[]): IEnhancedHTMLHeadingElement;

            interface IEnhancedHTMLHeadingElement extends HTMLHeadingElement, EnhancedHTMLElement.Impl
            {
            }

            function hr(...params: any[]): IEnhancedHTMLHRElement;

            interface IEnhancedHTMLHRElement extends HTMLHRElement, EnhancedHTMLElement.Impl
            {
            }

            function iframe(...params: any[]): IEnhancedHTMLIFrameElement;

            interface IEnhancedHTMLIFrameElement extends HTMLIFrameElement, EnhancedHTMLElement.Impl
            {
            }

            function img(...params: any[]): IEnhancedHTMLImageElement;

            interface IEnhancedHTMLImageElement extends HTMLImageElement, EnhancedHTMLElement.Impl
            {
            }

            function input(...params: any[]): IEnhancedHTMLInputElement;

            interface IEnhancedHTMLInputElement extends HTMLInputElement, EnhancedHTMLElement.Impl
            {
            }

            function ins(...params: any[]): EnhancedHTMLElement;

            function kbd(...params: any[]): EnhancedHTMLElement;

            function label(...params: any[]): IEnhancedHTMLLabelElement;

            interface IEnhancedHTMLLabelElement extends HTMLLabelElement, EnhancedHTMLElement.Impl
            {
            }

            function legend(...params: any[]): IEnhancedHTMLLegendElement;

            interface IEnhancedHTMLLegendElement extends HTMLLegendElement, EnhancedHTMLElement.Impl
            {
            }

            function li(...params: any[]): IEnhancedHTMLLIElement;

            interface IEnhancedHTMLLIElement extends HTMLLIElement, EnhancedHTMLElement.Impl
            {
            }

            function link(...params: any[]): IEnhancedHTMLLinkElement;

            interface IEnhancedHTMLLinkElement extends HTMLLinkElement, EnhancedHTMLElement.Impl
            {
            }

            function math(...params: any[]): EnhancedHTMLElement;

            function object(...params: any[]): IEnhancedHTMLObjectElement;

            interface IEnhancedHTMLObjectElement extends HTMLObjectElement, EnhancedHTMLElement.Impl
            {
            }

            function ol(...params: any[]): IEnhancedHTMLOListElement;

            interface IEnhancedHTMLOListElement extends HTMLOListElement, EnhancedHTMLElement.Impl
            {
            }

            function optgroup(...params: any[]): IEnhancedHTMLOptGroupElement;

            interface IEnhancedHTMLOptGroupElement extends HTMLOptGroupElement, EnhancedHTMLElement.Impl
            {
            }

            function option(...params: any[]): IEnhancedHTMLOptionElement;

            interface IEnhancedHTMLOptionElement extends HTMLOptionElement, EnhancedHTMLElement.Impl
            {
            }

            function p(...params: any[]): IEnhancedHTMLParagraphElement;

            interface IEnhancedHTMLParagraphElement extends HTMLParagraphElement, EnhancedHTMLElement.Impl
            {
            }

            function param(...params: any[]): IEnhancedHTMLParamElement;

            interface IEnhancedHTMLParamElement extends HTMLParamElement, EnhancedHTMLElement.Impl
            {
            }

            function pre(...params: any[]): IEnhancedHTMLPreElement;

            interface IEnhancedHTMLPreElement extends HTMLPreElement, EnhancedHTMLElement.Impl
            {
            }

            function progress(...params: any[]): IEnhancedHTMLProgressElement;

            interface IEnhancedHTMLProgressElement extends HTMLProgressElement, EnhancedHTMLElement.Impl
            {
            }

            function q(...params: any[]): IEnhancedHTMLQuoteElement;

            interface IEnhancedHTMLQuoteElement extends HTMLQuoteElement, EnhancedHTMLElement.Impl
            {
            }

            function s(...params: any[]): EnhancedHTMLElement;

            function samp(...params: any[]): EnhancedHTMLElement;

            function script(...params: any[]): IEnhancedHTMLScriptElement;

            interface IEnhancedHTMLScriptElement extends HTMLScriptElement, EnhancedHTMLElement.Impl
            {
            }

            function select(...params: any[]): IEnhancedHTMLSelectElement;

            interface IEnhancedHTMLSelectElement extends HTMLSelectElement, EnhancedHTMLElement.Impl
            {
            }

            function source(...params: any[]): IEnhancedHTMLSourceElement;

            interface IEnhancedHTMLSourceElement extends HTMLSourceElement, EnhancedHTMLElement.Impl
            {
            }

            function span(...params: any[]): IEnhancedHTMLSpanElement;

            interface IEnhancedHTMLSpanElement extends HTMLSpanElement, EnhancedHTMLElement.Impl
            {
            }

            function strong(...params: any[]): EnhancedHTMLElement;

            function sub(...params: any[]): EnhancedHTMLElement;

            function summary(...params: any[]): EnhancedHTMLElement;

            function sup(...params: any[]): EnhancedHTMLElement;

            function svg(...params: any[]): EnhancedHTMLElement;

            function table(...params: any[]): IEnhancedHTMLTableAlignment;

            interface IEnhancedHTMLTableAlignment extends HTMLTableAlignment, EnhancedHTMLElement.Impl
            {
            }

            function tbody(...params: any[]): IEnhancedHTMLTableSectionElement;

            interface IEnhancedHTMLTableSectionElement extends HTMLTableSectionElement, EnhancedHTMLElement.Impl
            {
            }

            function td(...params: any[]): IEnhancedHTMLTableDataCellElement;

            interface IEnhancedHTMLTableDataCellElement extends HTMLTableDataCellElement, EnhancedHTMLElement.Impl
            {
            }

            function textarea(...params: any[]): IEnhancedHTMLTextAreaElement;

            interface IEnhancedHTMLTextAreaElement extends HTMLTextAreaElement, EnhancedHTMLElement.Impl
            {
            }

            function tfoot(...params: any[]): IEnhancedHTMLTableAlignment;

            interface IEnhancedHTMLTableAlignment extends HTMLTableAlignment, EnhancedHTMLElement.Impl
            {
            }

            function th(...params: any[]): IEnhancedHTMLTableHeaderCellElement;

            interface IEnhancedHTMLTableHeaderCellElement extends HTMLTableHeaderCellElement, EnhancedHTMLElement.Impl
            {
            }

            function thead(...params: any[]): IEnhancedHTMLTableSectionElement;

            interface IEnhancedHTMLTableSectionElement extends HTMLTableSectionElement, EnhancedHTMLElement.Impl
            {
            }

            function time(...params: any[]): EnhancedHTMLElement;

            function title(...params: any[]): IEnhancedHTMLTitleElement;

            interface IEnhancedHTMLTitleElement extends HTMLTitleElement, EnhancedHTMLElement.Impl
            {
            }

            function tr(...params: any[]): IEnhancedHTMLTableRowElement;

            interface IEnhancedHTMLTableRowElement extends HTMLTableRowElement, EnhancedHTMLElement.Impl
            {
            }

            function track(...params: any[]): IEnhancedHTMLTrackElement;

            interface IEnhancedHTMLTrackElement extends HTMLTrackElement, EnhancedHTMLElement.Impl
            {
            }

            function u(...params: any[]): EnhancedHTMLElement;

            function ul(...params: any[]): IEnhancedHTMLUListElement;

            interface IEnhancedHTMLUListElement extends HTMLUListElement, EnhancedHTMLElement.Impl
            {
            }

            function var$(...params: any[]): EnhancedHTMLElement;

            function video(...params: any[]): IEnhancedHTMLVideoElement;

            interface IEnhancedHTMLVideoElement extends HTMLVideoElement, EnhancedHTMLElement.Impl
            {
            }
         }

         function applyEnhancementsToPrototype(): void;

         function enhanceElement(element: Element, force?: boolean): EnhancedElement;

         module enhanceElement
         {
            var enabled: boolean;
         }

         function enhanceHTMLElement(element: HTMLElement, force?: boolean): EnhancedHTMLElement;

         module enhanceHTMLElement
         {
            var enabled: boolean;
         }

         function find(query: Node, root?: Element): ElementGroup;

         function find(query: Element, root?: Element): ElementGroup;

         function find(query: string, root?: Element): ElementGroup;

         module find
         {
            function id(id: Node): EnhancedHTMLElement;

            function id(id: string): EnhancedHTMLElement;

            function name(name: string, tag?: string, root?: Element): ElementGroup;

            function className(name: string, tag?: string, root?: Element): ElementGroup;

            function tagName(name: string, root?: Element): ElementGroup;

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

         function onInteractive(callback: (e?: nnet.event.EnhancedEvent) => void): void;

         function onLoaded(callback: (e?: nnet.event.EnhancedEvent) => void): void;

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
               code: nnet.util.Key;
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

         function enhanceEvent(evt: Event, origin?: HTMLElement): EnhancedEvent;
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

         class NativeRandomGenerator implements IPRNG
         {
            period: number;
            currentState: number;

            next(): number;
         }

         class Random
         {
            generator: IPRNG;
            static instance: Random;

            constructor(generator: IPRNG);

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
            request: XMLHttpRequest;
            params: any;
            body: any;
            headers: any;
            url: string;
            response: IHttpResponse;
            onComplete: (...args: any[]) => void;

            constructor(url: any, params: any);

            sendGet(async: boolean): boolean;

            sendPost(async: boolean): boolean;

            sendPut(async: boolean): boolean;

            sendDelete(async: boolean): boolean;

            sendHead(async: boolean): boolean;

            send(method: HttpRequest.Method, asynchronous: boolean): boolean;
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
            }
         }

         interface IHttpResponse
         {
            text: string;
            xml: XMLDocument;
            time: number;
            status: number;
         }

         function generateQueryString(hash: any): string;
      }

      module object
      {
         function extendPrototype(derived: any, parents: any[]): void;

         function forEach(obj: Object, func: (key: any, value: any, o?: any) => void): void;

         function join(obj: any, join?: string): string[];

         function keys(obj: any): string[];

         function map(obj: any, keyFunc?: (any: any) => any, valFunc?: (any: any) => any): {};
      }

      module serialization
      {
         module JsonParser
         {
            var deserialize: (text: string, reviver?: (key: any, value: any) => any) => any;

            function serialize(value: any, replacer?: (key: string, value: any) => any, space?: any): string;

            function serialize(value: any, replacer?: any[], space?: any): string;
         }
      }

      module stringutil
      {
         function charTimes(char: string, times: number): string;

         function contains(source: string, value: string, boundary?: string, caseInsensitive?: boolean): boolean;

         function escapeHTML(str: string): string;

         function escapeRegExp(str: string): string;

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

      module parseBool
      {
         function parseBool(value: any): boolean;
      }

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