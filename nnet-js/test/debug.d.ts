declare module 'debug'
{
   export function clear(): void;

   export function write(text: string, escapeHTML: boolean);

   export function Event(obj: any, properties?: Array<string>);

   export function Element(obj: any, properties: Array<string>);

   export function Error(obj: any, properties: boolean);
   export function Error(obj: any, properties: Array<string>);

   export function Object(obj: any, properties: Array<string>);

   export function Simple(obj: any, properties: Array<string>);

   export var outputSource: Element;

   export var allowMultiple: boolean;

   export var showAllMembers: boolean;
}