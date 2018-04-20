// Copyright M Griffie <nexus@nexussays.com>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export enum Key
{
   /**
     * Key code value for the A key (65).
     */
   A = 65,
   /**
    * Key code value for the Alternate (Option) key (18).
    */
   Alternate = 18,
   /**
    * Key code value for the B key (66).
    */
   B = 66,
   /**
    * Key code value for the ` key (192).
    */
   Backquote = 192,
   /**
    * Key code value for the  key (220).
    */
   Backslash = 220,
   /**
    * Key code value for the Backspace key (8).
    */
   Backspace = 8,
   /**
    * Key code value for the C key (67).
    */
   C = 67,
   /**
    * Key code value for the Caps Lock key (20).
    */
   CapsLock = 20,
   /**
    * Key code value for the , key (188).
    */
   Comma = 188,
   /**
    * Key code for the Mac command key (15). This constant is currently only used for setting menu key equivalents.
    */
   Command = 15,
   /**
    * Key code value for the Control key (17).
    */
   Control = 17,
   /**
    * Key code value for the D key (68).
    */
   D = 68,
   /**
    * Key code value for the Delete key (46).
    */
   Delete = 46,
   /**
    * Key code value for the Down Arrow key (40).
    */
   Down = 40,
   /**
    * Key code value for the E key (69).
    */
   E = 69,
   /**
    * Key code value for the End key (35).
    */
   End = 35,
   /**
    * Key code value for the Enter key (13).
    */
   Enter = 13,
   /**
    * Key code value for the = key (187).
    */
   Equal = 187,
   /**
    * Key code value for the Escape key (27).
    */
   Escape = 27,
   /**
    * Key code value for the F key (70).
    */
   F = 70,
   /**
    * Key code value for the F1 key (112).
    */
   F1 = 112,
   /**
    * Key code value for the F10 key (121).
    */
   F10 = 121,
   /**
    * Key code value for the F11 key (122).
    */
   F11 = 122,
   /**
    * Key code value for the F12 key (123).
    */
   F12 = 123,
   /**
    * Key code value for the F13 key (124).
    */
   F13 = 124,
   /**
    * Key code value for the F14 key (125).
    */
   F14 = 125,
   /**
    * Key code value for the F15 key (126).
    */
   F15 = 126,
   /**
    * Key code value for the F2 key (113).
    */
   F2 = 113,
   /**
    * Key code value for the F3 key (114).
    */
   F3 = 114,
   /**
    * Key code value for the F4 key (115).
    */
   F4 = 115,
   /**
    * Key code value for the F5 key (116).
    */
   F5 = 116,
   /**
    * Key code value for the F6 key (117).
    */
   F6 = 117,
   /**
    * Key code value for the F7 key (118).
    */
   F7 = 118,
   /**
    * Key code value for the F8 key (119).
    */
   F8 = 119,
   /**
    * Key code value for the F9 key (120).
    */
   F9 = 120,
   /**
    * Key code value for the G key (71).
    */
   G = 71,
   /**
    * Key code value for the H key (72).
    */
   H = 72,
   /**
    * Key code value for the Home key (36).
    */
   Home = 36,
   /**
    * Key code value for the I key (73).
    */
   I = 73,
   /**
    * Key code value for the Insert key (45).
    */
   Insert = 45,
   /**
    * Key code value for the J key (74).
    */
   J = 74,
   /**
    * Key code value for the K key (75).
    */
   K = 75,
   /**
    * Key code value for the L key (76).
    */
   L = 76,
   /**
    * Key code value for the Left Arrow key (37).
    */
   Left = 37,
   /**
    * Key code value for the [ key (219).
    */
   Leftbracket = 219,
   /**
    * Key code value for the M key (77).
    */
   M = 77,
   /**
    * Key code value for the - key (189).
    */
   Minus = 189,
   /**
    * Key code value for the N key (78).
    */
   N = 78,
   /**
    * Key code value for the 0 key (48).
    */
   Number0 = 48,
   /**
    * Key code value for the 1 key (49).
    */
   Number1 = 49,
   /**
    * Key code value for the 2 key (50).
    */
   Number2 = 50,
   /**
    * Key code value for the 3 key (51).
    */
   Number3 = 51,
   /**
    * Key code value for the 4 key (52).
    */
   Number4 = 52,
   /**
    * Key code value for the 5 key (53).
    */
   Number5 = 53,
   /**
    * Key code value for the 6 key (54).
    */
   Number6 = 54,
   /**
    * Key code value for the 7 key (55).
    */
   Number7 = 55,
   /**
    * Key code value for the 8 key (56).
    */
   Number8 = 56,
   /**
    * Key code value for the 9 key (57).
    */
   Number9 = 57,
   /**
    * The pseudo-key code for the the number pad (21). Use to set numpad modifier on key equivalents
    */
   Numpad = 21,
   /**
    * Key code value for the number 0 key on the number pad (96).
    */
   Numpad0 = 96,
   /**
    * Key code value for the number 1 key on the number pad (97).
    */
   Numpad1 = 97,
   /**
    * Key code value for the number 2 key on the number pad (98).
    */
   Numpad2 = 98,
   /**
    * Key code value for the number 3 key on the number pad (99).
    */
   Numpad3 = 99,
   /**
    * Key code value for the number 4 key on the number pad (100).
    */
   Numpad4 = 100,
   /**
    * Key code value for the number 5 key on the number pad (101).
    */
   Numpad5 = 101,
   /**
    * Key code value for the number 6 key on the number pad (102).
    */
   Numpad6 = 102,
   /**
    * Key code value for the number 7 key on the number pad (103).
    */
   Numpad7 = 103,
   /**
    * Key code value for the number 8 key on the number pad (104).
    */
   Numpad8 = 104,
   /**
    * Key code value for the number 9 key on the number pad (105).
    */
   Numpad9 = 105,
   /**
    * Key code value for the addition key on the number pad (107).
    */
   NumpadAdd = 107,
   /**
    * Key code value for the decimal key on the number pad (110).
    */
   NumpadDecimal = 110,
   /**
    * Key code value for the division key on the number pad (111).
    */
   NumpadDivide = 111,
   /**
    * Key code value for the Enter key on the number pad (108).
    */
   NumpadEnter = 108,
   /**
    * Key code value for the multiplication key on the number pad (106).
    */
   NumpadMultiply = 106,
   /**
    * Key code value for the subtraction key on the number pad (109).
    */
   NumpadSubtract = 109,
   /**
    * Key code value for the O key (79).
    */
   O = 79,
   /**
    * Key code value for the P key (80).
    */
   P = 80,
   /**
    * Key code value for the Page Down key (34).
    */
   PageDown = 34,
   /**
    * Key code value for the Page Up key (33).
    */
   PageUp = 33,
   /**
    * Key code value for the . key (190).
    */
   Period = 190,
   /**
    * Key code value for the Q key (81).
    */
   Q = 81,
   /**
    * Key code value for the ' key (222).
    */
   Quote = 222,
   /**
    * Key code value for the R key (82).
    */
   R = 82,
   /**
    * Key code value for the Right Arrow key (39).
    */
   Right = 39,
   /**
    * Key code value for the ] key (221).
    */
   Rightbracket = 221,
   /**
    * Key code value for the S key (83).
    */
   S = 83,
   /**
    * Key code value for the , key (186).
    */
   Semicolon = 186,
   /**
    * Key code value for the Shift key (16).
    */
   Shift = 16,
   /**
    * Key code value for the / key (191).
    */
   Slash = 191,
   /**
    * Key code value for the Spacebar (32).
    */
   Space = 32,
   /**
    * Key code value for the T key (84).
    */
   T = 84,
   /**
    * Key code value for the Tab key (9).
    */
   Tab = 9,
   /**
    * Key code value for the U key (85).
    */
   U = 85,
   /**
    * Key code value for the Up Arrow key (38).
    */
   Up = 38,
   /**
    * Key code value for the V key (86).
    */
   V = 86,
   /**
    * Key code value for the W key (87).
    */
   W = 87,
   /**
    * Key code value for the X key (88).
    */
   X = 88,
   /**
    * Key code value for the Y key (89).
    */
   Y = 89,
   /**
    * Key code value for the Z key (90).
    */
   Z = 90,
}
