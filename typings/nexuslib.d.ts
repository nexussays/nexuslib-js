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
               first(searchFunc?: (item: T, index: number, array: Array<T>) => boolean, defaultValue?: T): T;
               last(defaultValue?: any): T;
               flatten(): Array<T>;
               map$(mapFunc?: (item: T, index: number, array: Array<T>) => T, scope?: Array<T>): void;
            }
         }

         function first<T>(source: T[], searchFunc?: (item: T, index: number, array: T[]) => boolean, defaultValue?: T): T;

         function flatten(source: any[]): any[];

         function isArrayLike(source: any): boolean;

         function last<T>(source: T[], searchFunc?: (item: T, index: number, array: T[]) => boolean, defaultValue?: T): T;

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

         module storage
         {
            function retrieve(key: string, defaultValue?: any): any;

            function retrieveInto<T>(key: string, object: T): T;

            function save(key: string, data: any): void;

            function modify(key: string, func: (value: any) => any): void;

            function forEach(func: (item: any, key: string, index: number) => void): void;

            function remove(key: string): void;

            function clear(): void;
         }
      }

      module dom
      {
         class BoundingBox
         {
            top: number;
            right: number;
            bottom: number;
            left: number;

            constructor(top: string, right: string, bottom: string, left: string);

            constructor(top: number, right: number, bottom: number, left: number);

            vertical: number;
            horizontal: number;
         }

         class ElementBox
         {
            margin: nexus.dom.BoundingBox;
            border: nexus.dom.BoundingBox;
            padding: nexus.dom.BoundingBox;
            innerWidth: number;
            innerHeight: number;
            scrollbarWidth: number;
            scrollbarHeight: number;

            constructor(margin: nexus.dom.BoundingBox, border: nexus.dom.BoundingBox, padding: nexus.dom.BoundingBox, innerWidth: number, innerHeight: number, scrollbarWidth: number, scrollbarHeight: number);

            completeHeight(): number;

            completeWidth(): number;

            static calculate(element: Element): ElementBox;
         }

         class ElementGroup
         {
            constructor(sourceArray: nexus.dom.EnhancedElement[]);

            items: nexus.dom.EnhancedElement[];
            length: number;

            forEach(callbackfn: (value: nexus.dom.EnhancedElement, index: number, array: nexus.dom.EnhancedElement[]) => void): ElementGroup;

            some(callbackfn: (value: nexus.dom.EnhancedElement, index: number, array: nexus.dom.EnhancedElement[]) => boolean): boolean;

            every(callbackfn: (value: nexus.dom.EnhancedElement, index: number, array: nexus.dom.EnhancedElement[]) => boolean): boolean;

            filter(callbackfn: (value: nexus.dom.EnhancedElement, index: number, array: nexus.dom.EnhancedElement[]) => boolean): nexus.dom.EnhancedElement[];

            filter$(callbackfn: (value: nexus.dom.EnhancedElement, index: number, array: nexus.dom.EnhancedElement[]) => boolean): ElementGroup;

            bind(eventName: string, func: nexus.event.EventHandler): ElementGroup;

            unbind(eventName: string, func: nexus.event.EventHandler): ElementGroup;

            addClass(name: string, checkExistence?: boolean): ElementGroup;

            removeClass(name: string): ElementGroup;

            toggleClass(name: string): ElementGroup;

            hasClass(name: string): boolean;

            css(value: any): ElementGroup;

            find(query: string): ElementGroup;

            first(): nexus.dom.EnhancedElement;

            last(): nexus.dom.EnhancedElement;
         }

         interface EnhancedElement extends HTMLElement, EnhancedElement.Enhancements
         {
         }

         module EnhancedElement
         {
            function enhance(element: HTMLElement): EnhancedElement;

            interface Enhancements
            {
               getOuterHTML(includeChildren?: boolean, escapeHtml?: boolean): string;
               append(...params: any[][]): EnhancedElement;
               append(...params: Node[]): EnhancedElement;
               append(...params: any[]): EnhancedElement;
               getBooleanAttribute(name: string): boolean;
               setBooleanAttribute(name: string, value: boolean): void;
               bind(eventName: string, func: nexus.event.EventHandler): void;
               unbind(event: string, func: nexus.event.EventHandler): void;
               trigger(eventName: string): void;
               parent(): EnhancedElement;
               isAncestor(ancestor: Node): boolean;
               ancestors(query: string): nexus.dom.ElementGroup;
               addClass(name: string, checkExistence?: boolean): boolean;
               removeClass(name: string): boolean;
               toggleClass(name: string): void;
               hasClass(name: string): boolean;
               css(): CSSStyleDeclaration;
               css(value: any): CSSStyleDeclaration;
               bounds(): nexus.dom.ElementBox;
               find(query: string): nexus.dom.ElementGroup;
            }

            interface Anchor extends HTMLAnchorElement, Enhancements
            {
            }

            interface Audio extends HTMLAudioElement, Enhancements
            {
            }

            interface Base extends HTMLBaseElement, Enhancements
            {
            }

            interface BR extends HTMLBRElement, Enhancements
            {
            }

            interface Block extends HTMLBlockElement, Enhancements
            {
            }

            interface Button extends HTMLButtonElement, Enhancements
            {
            }

            interface Canvas extends HTMLCanvasElement, Enhancements
            {
            }

            interface TableCaption extends HTMLTableCaptionElement, Enhancements
            {
            }

            interface TableCol extends HTMLTableColElement, Enhancements
            {
            }

            interface DD extends HTMLDDElement, Enhancements
            {
            }

            interface Div extends HTMLDivElement, Enhancements
            {
            }

            interface DList extends HTMLDListElement, Enhancements
            {
            }

            interface DT extends HTMLDTElement, Enhancements
            {
            }

            interface Embed extends HTMLEmbedElement, Enhancements
            {
            }

            interface FieldSet extends HTMLFieldSetElement, Enhancements
            {
            }

            interface Form extends HTMLFormElement, Enhancements
            {
            }

            interface Heading extends HTMLHeadingElement, Enhancements
            {
            }

            interface HR extends HTMLHRElement, Enhancements
            {
            }

            interface IFrame extends HTMLIFrameElement, Enhancements
            {
            }

            interface Image extends HTMLImageElement, Enhancements
            {
            }

            interface Input extends HTMLInputElement, Enhancements
            {
            }

            interface Label extends HTMLLabelElement, Enhancements
            {
            }

            interface Legend extends HTMLLegendElement, Enhancements
            {
            }

            interface LI extends HTMLLIElement, Enhancements
            {
            }

            interface Link extends HTMLLinkElement, Enhancements
            {
            }

            interface Object extends HTMLObjectElement, Enhancements
            {
            }

            interface OList extends HTMLOListElement, Enhancements
            {
            }

            interface OptGroup extends HTMLOptGroupElement, Enhancements
            {
            }

            interface Paragraph extends HTMLParagraphElement, Enhancements
            {
            }

            interface Param extends HTMLParamElement, Enhancements
            {
            }

            interface Option extends HTMLOptionElement, Enhancements
            {
            }

            interface Pre extends HTMLPreElement, Enhancements
            {
            }

            interface Progress extends HTMLProgressElement, Enhancements
            {
            }

            interface Quote extends HTMLQuoteElement, Enhancements
            {
            }

            interface Script extends HTMLScriptElement, Enhancements
            {
            }

            interface Select extends HTMLSelectElement, Enhancements
            {
            }

            interface Source extends HTMLSourceElement, Enhancements
            {
            }

            interface Span extends HTMLSpanElement, Enhancements
            {
            }

            interface Table extends HTMLTableElement, Enhancements
            {
            }

            interface TableSection extends HTMLTableSectionElement, Enhancements
            {
            }

            interface TableDataCell extends HTMLTableDataCellElement, Enhancements
            {
            }

            interface TextArea extends HTMLTextAreaElement, Enhancements
            {
            }

            interface TableHeaderCell extends HTMLTableHeaderCellElement, Enhancements
            {
            }

            interface TableSection extends HTMLTableSectionElement, Enhancements
            {
            }

            interface Title extends HTMLTitleElement, Enhancements
            {
            }

            interface TableRow extends HTMLTableRowElement, Enhancements
            {
            }

            interface Track extends HTMLTrackElement, Enhancements
            {
            }

            interface UList extends HTMLUListElement, Enhancements
            {
            }

            interface Video extends HTMLVideoElement, Enhancements
            {
            }
         }

         module HTML
         {
            function text(...params: any[]): Text;

            function a(...params: any[]): EnhancedElement.Anchor;

            function abbr(...params: any[]): nexus.dom.EnhancedElement;

            function acronym(...params: any[]): nexus.dom.EnhancedElement;

            function address(...params: any[]): nexus.dom.EnhancedElement;

            function audio(...params: any[]): EnhancedElement.Audio;

            function base(...params: any[]): EnhancedElement.Base;

            function blockquote(...params: any[]): EnhancedElement.Block;

            function br(...params: any[]): EnhancedElement.BR;

            function button(...params: any[]): EnhancedElement.Button;

            function canvas(...params: any[]): EnhancedElement.Canvas;

            function caption(...params: any[]): EnhancedElement.TableCaption;

            function cite(...params: any[]): nexus.dom.EnhancedElement;

            function code(...params: any[]): nexus.dom.EnhancedElement;

            function col(...params: any[]): EnhancedElement.TableCol;

            function colgroup(...params: any[]): nexus.dom.EnhancedElement;

            function dd(...params: any[]): EnhancedElement.DD;

            function del(...params: any[]): nexus.dom.EnhancedElement;

            function details(...params: any[]): nexus.dom.EnhancedElement;

            function dfn(...params: any[]): nexus.dom.EnhancedElement;

            function div(...params: any[]): EnhancedElement.Div;

            function dl(...params: any[]): EnhancedElement.DList;

            function dt(...params: any[]): EnhancedElement.DT;

            function em(...params: any[]): nexus.dom.EnhancedElement;

            function embed(...params: any[]): EnhancedElement.Embed;

            function fieldset(...params: any[]): EnhancedElement.FieldSet;

            function figure(...params: any[]): nexus.dom.EnhancedElement;

            function form(...params: any[]): EnhancedElement.Form;

            function h1(...params: any[]): EnhancedElement.Heading;

            function h2(...params: any[]): EnhancedElement.Heading;

            function h3(...params: any[]): EnhancedElement.Heading;

            function h4(...params: any[]): EnhancedElement.Heading;

            function h5(...params: any[]): EnhancedElement.Heading;

            function h6(...params: any[]): EnhancedElement.Heading;

            function hr(...params: any[]): EnhancedElement.HR;

            function iframe(...params: any[]): EnhancedElement.IFrame;

            function img(...params: any[]): EnhancedElement.Image;

            function input(...params: any[]): EnhancedElement.Input;

            function ins(...params: any[]): nexus.dom.EnhancedElement;

            function kbd(...params: any[]): nexus.dom.EnhancedElement;

            function label(...params: any[]): EnhancedElement.Label;

            function legend(...params: any[]): EnhancedElement.Legend;

            function li(...params: any[]): EnhancedElement.LI;

            function link(...params: any[]): EnhancedElement.Link;

            function math(...params: any[]): nexus.dom.EnhancedElement;

            function object(...params: any[]): EnhancedElement.Object;

            function ol(...params: any[]): EnhancedElement.OList;

            function optgroup(...params: any[]): EnhancedElement.OptGroup;

            function option(...params: any[]): EnhancedElement.Option;

            function p(...params: any[]): EnhancedElement.Paragraph;

            function param(...params: any[]): EnhancedElement.Param;

            function pre(...params: any[]): EnhancedElement.Pre;

            function progress(...params: any[]): EnhancedElement.Progress;

            function q(...params: any[]): EnhancedElement.Quote;

            function s(...params: any[]): nexus.dom.EnhancedElement;

            function samp(...params: any[]): nexus.dom.EnhancedElement;

            function script(...params: any[]): EnhancedElement.Script;

            function select(...params: any[]): EnhancedElement.Select;

            function source(...params: any[]): EnhancedElement.Source;

            function span(...params: any[]): EnhancedElement.Span;

            function strong(...params: any[]): nexus.dom.EnhancedElement;

            function sub(...params: any[]): nexus.dom.EnhancedElement;

            function summary(...params: any[]): nexus.dom.EnhancedElement;

            function sup(...params: any[]): nexus.dom.EnhancedElement;

            function svg(...params: any[]): nexus.dom.EnhancedElement;

            function table(...params: any[]): EnhancedElement.Table;

            function tbody(...params: any[]): EnhancedElement.TableSection;

            function td(...params: any[]): EnhancedElement.TableDataCell;

            function textarea(...params: any[]): EnhancedElement.TextArea;

            function tfoot(...params: any[]): EnhancedElement.TableSection;

            function th(...params: any[]): EnhancedElement.TableHeaderCell;

            function thead(...params: any[]): EnhancedElement.TableSection;

            function time(...params: any[]): nexus.dom.EnhancedElement;

            function title(...params: any[]): EnhancedElement.Title;

            function tr(...params: any[]): EnhancedElement.TableRow;

            function track(...params: any[]): EnhancedElement.Track;

            function u(...params: any[]): nexus.dom.EnhancedElement;

            function ul(...params: any[]): EnhancedElement.UList;

            function var$(...params: any[]): nexus.dom.EnhancedElement;

            function video(...params: any[]): EnhancedElement.Video;
         }

         module form
         {
            class RadioCollection
            {
               constructor(elements: nexus.dom.ElementGroup);

               value: string;
               name: string;

               uncheckAll(): void;

               check(index: number, triggerClick: boolean): boolean;

               check(value: string, triggerClick: boolean): boolean;

               refresh(): void;
            }

            function fieldChanged(el: HTMLElement): boolean;

            function getDefaultValue(el: HTMLElement): string;
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

         function enhancePrototype(): void;

         function find(query: Node, root?: Element): nexus.dom.ElementGroup;

         function find(query: Element, root?: Element): nexus.dom.ElementGroup;

         function find(query: string, root?: Element): nexus.dom.ElementGroup;

         module find
         {
            function id(id: Node): nexus.dom.EnhancedElement;

            function id(id: string): nexus.dom.EnhancedElement;

            function id<T extends EnhancedElement>(id: string): T;

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
            (e: nexus.event.EnhancedEvent, context: nexus.dom.EnhancedElement): void;
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

         function scaleToFill(width: number, height: number, toWidth: number, toHeight?: number, scaleUp?: boolean): number;

         function scaleToFit(width: number, height: number, toWidth: number, toHeight?: number, scaleUp?: boolean): number;

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
            content: any;
            headers: any;
            url: string;
            method: HttpRequest.Method;

            constructor(obj: HttpRequest.RequestArgsWithMethod);

            constructor(url?: string, method?: HttpRequest.Method, data?: any);

            setContentType(type: HttpRequest.ContentType): void;

            setAcceptType(type: HttpRequest.Accept): void;

            cancel(): void;

            complete(callback: (response: nexus.net.HttpResponse, request: HttpRequest.RequestData) => void): HttpRequest.Promise;

            send(completeCallback?: (response: nexus.net.HttpResponse) => void): HttpRequest.Promise;
         }

         module HttpRequest
         {
            function get(obj: RequestArgs): Promise;

            function get(url: string): Promise;

            function put(obj: RequestArgs): Promise;

            function put(url: string, data?: any): Promise;

            function post(obj: RequestArgs): Promise;

            function post(url: string, data?: any): Promise;

            function del(obj: RequestArgs): Promise;

            function del(url: string): Promise;

            enum Method
            {
               GET = 0,
               POST = 1,
               PUT = 2,
               DELETE = 3,
               HEAD = 4,
               OPTIONS = 5,
            }

            enum Accept
            {
               Text = 0,
               Json = 1,
               Html = 2,
               Xml = 3,
               Any = 4,
            }

            enum ContentType
            {
               Form = 0,
               Text = 1,
               Json = 2,
               Xml = 3,
               Binary = 4,
            }

            interface Promise
            {
               cancel(): void;
               complete(callback: (response: nexus.net.HttpResponse, request: RequestData) => void): Promise;
            }

            interface RequestData
            {
               content: any;
               contentSent?: string;
               headers: any;
               url: string;
               method: string;
            }

            interface RequestArgs
            {
               url: string;
               content?: any;
               contentType?: ContentType;
               accept?: Accept;
            }

            interface RequestArgsWithMethod extends RequestArgs
            {
               method?: Method;
            }
         }

         class HttpResponse
         {
            url: string;
            time: number;
            status: number;
            statusText: string;
            body: any;
            headers: any;

            constructor(url: string, headers: string, responseText: string, responseXml: XMLDocument, time: number, status: number, statusText: string);

            isSuccess(): boolean;

            bodyAsJson(): any;

            bodyAsXml(): XMLDocument;

            bodyAsText(): string;
         }

         function generateQueryString(hash: any): string;
      }

      module object
      {
         function clone(obj: any): any;

         function clone(obj: any, into?: any): void;

         function extendPrototype(derived: any, parents: any[]): void;

         function filter<T>(obj: T, callback: (value: any, key: any, obj: T) => boolean, thisArg?: any): T;

         function forEach<T>(obj: T, func: (value: any, key: any, obj: T) => void, thisArg?: any): void;

         function forEach(obj: any[], func: (value: any, key: any, obj: any[]) => void, thisArg?: any): void;

         function join<T>(obj: T, join?: string): string[];

         function keys(obj: any): string[];

         function map<T>(obj: T, keyFunc?: (any: any) => any, valFunc?: (any: any) => any, thisArg?: any): any;
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

         module ms
         {
            function days(num: number): number;

            function hours(num: number): number;

            function minutes(num: number): number;

            function seconds(num: number): number;
         }

         function parseNumber(source: string, defaultValue?: number): number;

         module parseNumber
         {
            function finite(source: string, defaultValue?: number): number;
         }
      }

      function parseBool(value: any): boolean;

      enum type
      {
         "undefined" = 0,
         "object" = 1,
         "array" = 2,
         "boolean" = 3,
         "node" = 4,
         "date" = 5,
         "string" = 6,
         "function" = 7,
         "number" = 8,
         "regexp" = 9,
      }

      module type
      {
         function of(obj: any): type;
      }
   }
}