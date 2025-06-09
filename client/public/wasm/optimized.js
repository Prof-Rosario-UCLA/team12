import { abort } from 'env';

  var bufferView;
  var base64ReverseLookup = new Uint8Array(123/*'z'+1*/);
  for (var i = 25; i >= 0; --i) {
    base64ReverseLookup[48+i] = 52+i; // '0-9'
    base64ReverseLookup[65+i] = i; // 'A-Z'
    base64ReverseLookup[97+i] = 26+i; // 'a-z'
  }
  base64ReverseLookup[43] = 62; // '+'
  base64ReverseLookup[47] = 63; // '/'
  /** @noinline Inlining this function would mean expanding the base64 string 4x times in the source code, which Closure seems to be happy to do. */
  function base64DecodeToExistingUint8Array(uint8Array, offset, b64) {
    var b1, b2, i = 0, j = offset, bLength = b64.length, end = offset + (bLength*3>>2) - (b64[bLength-2] == '=') - (b64[bLength-1] == '=');
    for (; i < bLength; i += 4) {
      b1 = base64ReverseLookup[b64.charCodeAt(i+1)];
      b2 = base64ReverseLookup[b64.charCodeAt(i+2)];
      uint8Array[j++] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
      if (j < end) uint8Array[j++] = b1 << 4 | b2 >> 2;
      if (j < end) uint8Array[j++] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i+3)];
    }
  }
function initActiveSegments(imports) {
  base64DecodeToExistingUint8Array(bufferView, 1036, "HA==");
  base64DecodeToExistingUint8Array(bufferView, 1068, "PA==");
  base64DecodeToExistingUint8Array(bufferView, 1080, "AQAAACgAAABBAGwAbABvAGMAYQB0AGkAbwBuACAAdABvAG8AIABsAGEAcgBnAGU=");
  base64DecodeToExistingUint8Array(bufferView, 1132, "PA==");
  base64DecodeToExistingUint8Array(bufferView, 1144, "AQAAACAAAAB+AGwAaQBiAC8AcgB0AC8AaQB0AGMAbQBzAC4AdABz");
  base64DecodeToExistingUint8Array(bufferView, 1260, "PA==");
  base64DecodeToExistingUint8Array(bufferView, 1272, "AQAAACQAAABJAG4AZABlAHgAIABvAHUAdAAgAG8AZgAgAHIAYQBuAGcAZQ==");
  base64DecodeToExistingUint8Array(bufferView, 1324, "LA==");
  base64DecodeToExistingUint8Array(bufferView, 1336, "AQAAABQAAAB+AGwAaQBiAC8AcgB0AC4AdABz");
  base64DecodeToExistingUint8Array(bufferView, 1404, "PA==");
  base64DecodeToExistingUint8Array(bufferView, 1416, "AQAAAB4AAAB+AGwAaQBiAC8AcgB0AC8AdABsAHMAZgAuAHQAcw==");
  base64DecodeToExistingUint8Array(bufferView, 1468, "LA==");
  base64DecodeToExistingUint8Array(bufferView, 1480, "AQAAABoAAAB+AGwAaQBiAC8AYQByAHIAYQB5AC4AdABz");
  base64DecodeToExistingUint8Array(bufferView, 1516, "fA==");
  base64DecodeToExistingUint8Array(bufferView, 1528, "AQAAAF4AAABFAGwAZQBtAGUAbgB0ACAAdAB5AHAAZQAgAG0AdQBzAHQAIABiAGUAIABuAHUAbABsAGEAYgBsAGUAIABpAGYAIABhAHIAcgBhAHkAIABpAHMAIABoAG8AbABlAHk=");
  base64DecodeToExistingUint8Array(bufferView, 1645, "AQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6W1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+fw==");
  base64DecodeToExistingUint8Array(bufferView, 1772, "EhATFBUWFxgZGhscHR4fICEQECIQEBAjJCUmJygpECorEBAQEBAQEBAQEBAsLS4QLxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAQEBAxEDIzNDU2NxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA4EBA5OhA7PD0QEBAQEBA+EBA/QEFCQ0RFRkdISUpLTBBNTk8QEBAQEBAQEBAQEBAQEBAQEBAQEBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBRUhAQEFMQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQVBAQEBAQEBAQEBAQEBAQEBAQEBAQVVYQEBAQEBAQVxAQEBAQWFlaEBAQEBBbXBAQEBAQEBAQEF0QEBAQEBAQEBAQEBA=");
  base64DecodeToExistingUint8Array(bufferView, 2316, "//////////////////////////////////////////8AAAAAgEAABAAAAEABAAAAAAAAAAChkAE=");
  base64DecodeToExistingUint8Array(bufferView, 2402, "////////////////////////////////MASw");
  base64DecodeToExistingUint8Array(bufferView, 2460, "+AM=");
  base64DecodeToExistingUint8Array(bufferView, 2487, "ggAAAAAAAP7/////v7YAAAAAABAAPwD/FwAAAAAB+P//AAAB");
  base64DecodeToExistingUint8Array(bufferView, 2534, "wL//PQAAAIACAAAA////Bw==");
  base64DecodeToExistingUint8Array(bufferView, 2560, "wP8BAAAAAAAA+D8kAADA//8/AAAAAAAO");
  base64DecodeToExistingUint8Array(bufferView, 2598, "+P//////BwAAAAAAABT+If4ADAACAAIAAAAAAAAQHiAAAAwAAEAGAAAAAAAAEIY5AgAAACMABgAAAAAAABC+IQAADAAA/AIAAAAAAACQHiBgAAwAAAAEAAAAAAAAAAEgAAAAAAAAEQAAAAAAAMDBPWAADAAAAAIAAAAAAACQQDAAAAwAAAADAAAAAAAAGB4gAAAMAAAAAgAAAAAAAAAABFw=");
  base64DecodeToExistingUint8Array(bufferView, 2770, "8gfAfw==");
  base64DecodeToExistingUint8Array(bufferView, 2786, "8h9APw==");
  base64DecodeToExistingUint8Array(bufferView, 2799, "AwAAoAIAAAAAAAD+f9/g//7///8fQA==");
  base64DecodeToExistingUint8Array(bufferView, 2833, "4P1mAAAAwwEAHgBkIAAg");
  base64DecodeToExistingUint8Array(bufferView, 2859, "EA==");
  base64DecodeToExistingUint8Array(bufferView, 2871, "4A==");
  base64DecodeToExistingUint8Array(bufferView, 2894, "HAAAABwAAAAMAAAADAAAAAAAAACwP0D+jyAAAAAAAHgAAAAAAAAIAAAAAAAAAGAAAAAAAg==");
  base64DecodeToExistingUint8Array(bufferView, 2960, "hwEEDg==");
  base64DecodeToExistingUint8Array(bufferView, 2990, "gAkAAAAAAABAf+Uf+J8AAAAAgAD//wEAAAAAAAAADwAAAAAA0BcEAAAAAPgPAAMAAAA8OwAAAAAAAECjAwAAAAAAAPDPAAAAAAAAAAA/");
  base64DecodeToExistingUint8Array(bufferView, 3078, "9//9IRADAAAAAADw/////////wcAAQAAAPj///////////////s=");
  base64DecodeToExistingUint8Array(bufferView, 3139, "oAPgAOAA4ABgAPgAA5B8AAAAAAAA3/8CgAAA/x8AAAAAAAD/////AQ==");
  base64DecodeToExistingUint8Array(bufferView, 3195, "MA==");
  base64DecodeToExistingUint8Array(bufferView, 3209, "gAM=");
  base64DecodeToExistingUint8Array(bufferView, 3225, "gACA");
  base64DecodeToExistingUint8Array(bufferView, 3240, "/////wAAAAAAgA==");
  base64DecodeToExistingUint8Array(bufferView, 3276, "IAAAAAA8Pgg=");
  base64DecodeToExistingUint8Array(bufferView, 3295, "fg==");
  base64DecodeToExistingUint8Array(bufferView, 3307, "cAAAIA==");
  base64DecodeToExistingUint8Array(bufferView, 3371, "PwAQ");
  base64DecodeToExistingUint8Array(bufferView, 3385, "gPe/AAAA8A==");
  base64DecodeToExistingUint8Array(bufferView, 3402, "AwD/////Aw==");
  base64DecodeToExistingUint8Array(bufferView, 3418, "AQAABw==");
  base64DecodeToExistingUint8Array(bufferView, 3435, "A0QIAABgEA==");
  base64DecodeToExistingUint8Array(bufferView, 3460, "MAAAAP//A4AAAAAAwD8AAID/AwAAAAAABwAAAAAAyDMAgAAAYAAAAAAAAAAAfmYACBAAAAAAARAAAAAAAACdwQIAACAAMFg=");
  base64DecodeToExistingUint8Array(bufferView, 3543, "+AAO");
  base64DecodeToExistingUint8Array(bufferView, 3560, "ICEAAAAAAEA=");
  base64DecodeToExistingUint8Array(bufferView, 3586, "/P8DAAAAAAAAAP//CAD//wAAAAAk");
  base64DecodeToExistingUint8Array(bufferView, 3627, "gIBAAAQAAABAAQAAAAAAAQAAAADAAAAAAAAAAAAIAAAO");
  base64DecodeToExistingUint8Array(bufferView, 3691, "IA==");
  base64DecodeToExistingUint8Array(bufferView, 3720, "AQ==");
  base64DecodeToExistingUint8Array(bufferView, 3738, "wAc=");
  base64DecodeToExistingUint8Array(bufferView, 3756, "bvAAAAAAAIc=");
  base64DecodeToExistingUint8Array(bufferView, 3784, "YAAAAAAAAADw");
  base64DecodeToExistingUint8Array(bufferView, 3841, "GA==");
  base64DecodeToExistingUint8Array(bufferView, 3860, "wP8B");
  base64DecodeToExistingUint8Array(bufferView, 3884, "AgAAAAAAAP9/AAAAAAAAgAMAAAAAAHgmACAAAAAAAAAHAAAAgO8fAAAAAAAAAAgAAwAAAAAAwH8Ang==");
  base64DecodeToExistingUint8Array(bufferView, 3953, "gNNA");
  base64DecodeToExistingUint8Array(bufferView, 3975, "gPgHAAADAAAAAAAAGAEAAADAHx8=");
  base64DecodeToExistingUint8Array(bufferView, 4019, "/1wAAEA=");
  base64DecodeToExistingUint8Array(bufferView, 4034, "+IUN");
  base64DecodeToExistingUint8Array(bufferView, 4066, "PLABAAAw");
  base64DecodeToExistingUint8Array(bufferView, 4082, "+KcB");
  base64DecodeToExistingUint8Array(bufferView, 4097, "KL8=");
  base64DecodeToExistingUint8Array(bufferView, 4111, "4LwP");
  base64DecodeToExistingUint8Array(bufferView, 4145, "gP8G");
  base64DecodeToExistingUint8Array(bufferView, 4179, "WAg=");
  base64DecodeToExistingUint8Array(bufferView, 4198, "8AwBAAAA/gcAAAAA+HmAAH4OAAAAAAD8fwM=");
  base64DecodeToExistingUint8Array(bufferView, 4242, "f78=");
  base64DecodeToExistingUint8Array(bufferView, 4254, "/P///G0=");
  base64DecodeToExistingUint8Array(bufferView, 4274, "frS/");
  base64DecodeToExistingUint8Array(bufferView, 4286, "ow==");
  base64DecodeToExistingUint8Array(bufferView, 4330, "GAAAAAAAAAD/AQ==");
  base64DecodeToExistingUint8Array(bufferView, 4394, "HwAAAAAAAAB/AA8=");
  base64DecodeToExistingUint8Array(bufferView, 4437, "gAAAAAAAAACA//8AAAAAAAAAABs=");
  base64DecodeToExistingUint8Array(bufferView, 4479, "YA8=");
  base64DecodeToExistingUint8Array(bufferView, 4504, "gAP4/+cPAAAAPA==");
  base64DecodeToExistingUint8Array(bufferView, 4532, "HA==");
  base64DecodeToExistingUint8Array(bufferView, 4556, "////////f/j//////x8gABAAAPj+/w==");
  base64DecodeToExistingUint8Array(bufferView, 4588, "f///+dsH");
  base64DecodeToExistingUint8Array(bufferView, 4626, "/z8=");
  base64DecodeToExistingUint8Array(bufferView, 4681, "8A==");
  base64DecodeToExistingUint8Array(bufferView, 4710, "fw==");
  base64DecodeToExistingUint8Array(bufferView, 4724, "8A8=");
  base64DecodeToExistingUint8Array(bufferView, 4779, "+A==");
  base64DecodeToExistingUint8Array(bufferView, 4780, "EhMUFRYXEBAQEBAQEBAQEBgQEBkQEBAQEBAQEBobERwdHhAQHxAQEBAQEBAgIRAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECIjEBAQJBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAlEBAQJhAQEBAnEBAQEBAQECgQEBAQEBAQEBAQECkQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKhAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKywtLhAQEBAQEBAQEBAQEBAQEBAQLxAQEBAQEBAwEBAQEBAQEBAQEBAQEBA=");
  base64DecodeToExistingUint8Array(bufferView, 5324, "//////////////////////////////////////////8AAAAAAAAAAP7//wf+//8HAAAAAAAEIAT//3////9/////////////////////////////////9/D/////////////////////////////////7/////8BAwAAAB8=");
  base64DecodeToExistingUint8Array(bufferView, 5460, "IAAAAAAAz7xA1///+////////////7///////////////////////wP8///////////////////////////+////fwD//////wE=");
  base64DecodeToExistingUint8Array(bufferView, 5568, "/////78g///////n");
  base64DecodeToExistingUint8Array(bufferView, 5600, "/////////////z8/");
  base64DecodeToExistingUint8Array(bufferView, 5628, "/wH//////+cAAAAAAAAAAP///////////////////////////////wAAAAAAAAAA//8/P/////8/P/+q////P////////99f3B/PD/8f3B8=");
  base64DecodeToExistingUint8Array(bufferView, 5722, "AoAAAP8f");
  base64DecodeToExistingUint8Array(bufferView, 5740, "hPwvPlC9H/LgQwAA/////xg=");
  base64DecodeToExistingUint8Array(bufferView, 5794, "wP///////wMAAP//////f///////f/////////////////////8feAwA/////78g");
  base64DecodeToExistingUint8Array(bufferView, 5876, "//////8/AAD///8/");
  base64DecodeToExistingUint8Array(bufferView, 5904, "/P///////////////3j////////8BwAAAABgBwAAAAAAAP//////9/8B/////////////wAAAAAAAAAAfwD4");
  base64DecodeToExistingUint8Array(bufferView, 6000, "/v//B/7//wc=");
  base64DecodeToExistingUint8Array(bufferView, 6028, "/////////////w==");
  base64DecodeToExistingUint8Array(bufferView, 6050, "/////w//////Dw==");
  base64DecodeToExistingUint8Array(bufferView, 6076, "////////BwD///////8H");
  base64DecodeToExistingUint8Array(bufferView, 6112, "//////////8=");
  base64DecodeToExistingUint8Array(bufferView, 6132, "//////////8=");
  base64DecodeToExistingUint8Array(bufferView, 6156, "/////////////9///////////99k3v/r7/////////+/59/f////e1/8/f//////////////////////////////////////////////////////P/////3///f////3///f////3///f////3/////9/////f//9w8AAAAAAAD//////////w8=");
  base64DecodeToExistingUint8Array(bufferView, 6322, "////A////wP///8D");
  base64DecodeToExistingUint8Array(bufferView, 6348, "BwgJCgsMBgYGBgYGBgYGBg0GBg4GBgYGBgYGBg8QERIGEwYGBgYGBgYGBgYUFQYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBhYXBgYGGAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGGQYGBgYaBgYGBgYGBhsGBgYGBgYGBgYGBhwGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGHQYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGHgYGBgYGBgYGBgYGBgYGBgYGBgYGBgY=");
  base64DecodeToExistingUint8Array(bufferView, 6971, "JCsrKysrKysrAQBUVlZWVlZWVlY=");
  base64DecodeToExistingUint8Array(bufferView, 7010, "GAAAACsrKysrKysHKytbVlZWVlZWVkpWVgUxUDFQMVAxUDFQMVAxUDFQJFB5MVAxUDE4UDFQMVAxUDFQMVAxUDFQTjECTg0NTgNOACRuAE4xJm5RTiRQTjkUgRsdHVMxUDFQDTFQMVAxUBtTJFAxAlx7XHtce1x7XHsUeVx7XHtcLStJA0gDeFx7FACWCgErKAYGACoGKiorB7u1Kx4AKwcrKysBKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysBKysrKysrKysrKysrKysrKysrKysrKysqKysrKysrKysrKysrK81GzSsAJSsHAQYBVVZWVlZWVVZWAiSBgYGBgRWBgYEAACsAstGy0bLRstEAAM3MAQDX19fX14OBgYGBgYGBgYGBrKysrKysrKysrBwAAAAAADFQMVAxUDFQMVAxAgAAMVAxUDFQMVAxUDFQMVAxUDFQTjFQMVBOMVAxUDFQMVAxUDFQMVAxAoemh6aHpoemh6aHpoemh6YqKysrKysrKysrKysrAAAAVFZWVlZWVlZWVlZWVg==");
  base64DecodeToExistingUint8Array(bufferView, 7519, "VFZWVlZWVlZWVlZWVgwADCorKysrKysrKysrKysrByoB");
  base64DecodeToExistingUint8Array(bufferView, 7605, "KisrKysrKysrKysrKysrKysrKysrKysrKysrVlZsgRUAKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrB2wDQSsrVlZWVlZWVlZWVlZWVlYsVisrKysrKysrKysrKysrKysrKysrKwE=");
  base64DecodeToExistingUint8Array(bufferView, 7764, "DGwAAAAAAAY=");
  base64DecodeToExistingUint8Array(bufferView, 7810, "BiUGJQYlBiUGJQYlBiUGJQYlBiUGJQYlBiUGJQYlBiUGJQYlBiUGJQYlBiUGJQYlBiVWep4mBiUGJQYlBiUGJQYlBiUGJQYlBiUGJQYlBiUGJQYlBgErK09WViwrf1ZWOSsrVVZWKytPVlYsK39WVoE3dVt7XCsrT1ZWAqwEAAA5KytVVlYrK09WViwrK1ZWMhOBVwBvgX7J134tgYEOfjl/b1cAgYF+FQB+AysrKysrKysrKysrKwcrJCuXKysrKysrKysrKisrKysrVlZWVlaAgYGBgTm7KisrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysBgYGBgYGBgYGBgYGBgYGByaysrKysrKysrKysrKysrNANAE4xArTBwdfXJFAxUDFQMVAxUDFQMVAxUDFQMVAxUDFQMVAxUDFQMVAxUNfXU8FH1NfX1wUrKysrKysrKysrKysHAQAB");
  base64DecodeToExistingUint8Array(bufferView, 8261, "TjFQMVAxUDFQMVAxUDFQDQAAAAAAJFAxUDFQMVAxUA==");
  base64DecodeToExistingUint8Array(bufferView, 8326, "KysrKysrKysrKyt5XHtce097XHtce1x7XHtce1x7XHtce1x7XC0rK3kUXHtcLXkqXCdce1x7XHukAAq0XHtce08DeDgrKysrKysrKysrKysrTy0rKwE=");
  base64DecodeToExistingUint8Array(bufferView, 8439, "SA==");
  base64DecodeToExistingUint8Array(bufferView, 8449, "KisrKysrKysrKysrKysrKysrKysrKysrKysr");
  base64DecodeToExistingUint8Array(bufferView, 8509, "KysrKysrKysHAEhWVlZWVlZWVgI=");
  base64DecodeToExistingUint8Array(bufferView, 8584, "KysrKysrKysrKysrK1VWVlZWVlZWVlZWVlYO");
  base64DecodeToExistingUint8Array(bufferView, 8642, "JCsrKysrKysrKysrBwBWVlZWVlZWVlZWVlY=");
  base64DecodeToExistingUint8Array(bufferView, 8712, "JCsrKysrKysrKysrKysrKysHAAAAAFZWVlZWVlZWVlZWVlZWVlZW");
  base64DecodeToExistingUint8Array(bufferView, 8809, "KisrKysrKysrKytWVlZWVlZWVlZWDg==");
  base64DecodeToExistingUint8Array(bufferView, 8863, "KisrKysrKysrKytWVlZWVlZWVlZWDg==");
  base64DecodeToExistingUint8Array(bufferView, 8928, "KysrKysrKysrKytVVlZWVlZWVlZWVg4=");
  base64DecodeToExistingUint8Array(bufferView, 9017, "CAAAVgEAADk=");
  base64DecodeToExistingUint8Array(bufferView, 9032, "ASAAAADg//8Avx0AAOcCAAB5AAACJAAAAQEAAAD///8AAAAAAQIAAAD+//8BOf//ABj//wGH//8A1P7/AMMAAAHSAAABzgAAAc0AAAFPAAABygAAAcsAAAHPAAAAYQAAAdMAAAHRAAAAowAAAdUAAACCAAAB1gAAAdoAAAHZAAAB2wAAADgAAAMAAAAAsf//AZ///wHI//8CKCQAAAAAAAEBAAAA////ADP//wAm//8Bfv//ASsqAAFd//8BKCoAAD8qAAE9//8BRQAAAUcAAAAfKgAAHCoAAB4qAAAu//8AMv//ADb//wA1//8AT6UAAEulAAAx//8AKKUAAESlAAAv//8ALf//APcpAABBpQAA/SkAACv//wAq//8A5ykAAEOlAAAqpQAAu///ACf//wC5//8AJf//ABWlAAASpQACJEwAAAAAAAEgAAAA4P//AQEAAAD///8AVAAAAXQAAAEmAAABJQAAAUAAAAE/AAAA2v//ANv//wDh//8AwP//AMH//wEIAAAAwv//AMf//wDR//8Ayv//APj//wCq//8AsP//AAcAAACM//8BxP//AKD//wH5//8CGnAAAQEAAAD///8BIAAAAOD//wFQAAABDwAAAPH//wAAAAABMAAAAND//wEBAAAA////AAAAAADACwABYBwAAAAAAAHQlwABCAAAAPj//wIFigAAAAAAAUD0/wCe5/8AwokAANvn/wCS5/8Ak+f/AJzn/wCd5/8ApOf/AAAAAAA4igAABIoAAOYOAAEBAAAA////AAAAAADF//8BQeL/Ah2PAAAIAAAB+P//AAAAAABWAAABqv//AEoAAABkAAAAgAAAAHAAAAB+AAAACQAAAbb//wH3//8A2+P/AZz//wGQ//8BgP//AYL//wIFrAAAAAAAARAAAADw//8BHAAAAQEAAAGj4v8BQd//Abrf/wDk//8CC7EAAQEAAAD///8BMAAAAND//wAAAAABCdb/ARrx/wEZ1v8A1dX/ANjV/wHk1f8BA9b/AeHV/wHi1f8BwdX/AAAAAACg4/8AAAAAAQEAAAD///8CDLwAAAAAAAEBAAAA////Abxa/wGgAwAB/HX/Adha/wAwAAABsVr/AbVa/wG/Wv8B7lr/AdZa/wHrWv8B0P//Ab1a/wHIdf8AAAAAADBo/wBg/P8AAAAAASAAAADg//8AAAAAASgAAADY//8AAAAAAUAAAADA//8AAAAAASAAAADg//8AAAAAASAAAADg//8AAAAAASIAAADe//8=");
  base64DecodeToExistingUint8Array(bufferView, 9989, "BidRb3c=");
  base64DecodeToExistingUint8Array(bufferView, 10004, "fAAAfwAAAAAAAAAAg46SlwCq");
  base64DecodeToExistingUint8Array(bufferView, 10032, "tMQ=");
  base64DecodeToExistingUint8Array(bufferView, 10154, "xskAAADb");
  base64DecodeToExistingUint8Array(bufferView, 10243, "3gAAAADhAAAAAAAAAOQ=");
  base64DecodeToExistingUint8Array(bufferView, 10268, "5w==");
  base64DecodeToExistingUint8Array(bufferView, 10354, "6g==");
  base64DecodeToExistingUint8Array(bufferView, 10477, "7Q==");
  base64DecodeToExistingUint8Array(bufferView, 10500, "MAwxDXgOfw+AEIERhhKJE4oTjhSPFZAWkxOUF5UYlhmXGpobnBmdHJ4dnx6mH6kfrh+xILIgtyG/IsUjyCPLI90k8iP2JfcmIC06Lj0vPjA/MUAxQzJEM0U0UDVRNlI3UzhUOVk6WztcPGE9Yz5lP2ZAaEFpQmpAa0NsRG9CcUVyRnVHfUiCSYdKiUuKTItMjE2STp1PnlBFV3sdfB19HX9YhlmIWolailqMW45cj1ysXa1erl6vXsJfzGDNYc5hz2LQY9Fk1WXWZtdn8GjxafJq82v0bPVt+W79Lf4t/y1QaVFpUmlTaVRpVWlWaVdpWGlZaVppW2lcaV1pXmlfaYIAgwCEAIUAhgCHAIgAiQDAdc92gImBioKLhYyGjXCdcZ12nneeeJ95n3qge6B8oX2hs6K6o7ujvKS+pcOizKTaptum5Wrqp+un7G7zovio+aj6qfup/KQmsCqxK7JOs4QIYrpju2S8Zb1mvm2/bsBvwXDCfsN/w33PjdCU0avSrNOt1LDVsday18TYxdnG2g==");
  base64DecodeToExistingUint8Array(bufferView, 10908, "LA==");
  base64DecodeToExistingUint8Array(bufferView, 10920, "AQAAABwAAABJAG4AdgBhAGwAaQBkACAAbABlAG4AZwB0AGg=");
  base64DecodeToExistingUint8Array(bufferView, 10956, "PA==");
  base64DecodeToExistingUint8Array(bufferView, 10968, "AQAAACoAAABPAGIAagBlAGMAdAAgAGEAbAByAGUAYQBkAHkAIABwAGkAbgBuAGUAZA==");
  base64DecodeToExistingUint8Array(bufferView, 11020, "PA==");
  base64DecodeToExistingUint8Array(bufferView, 11032, "AQAAACgAAABPAGIAagBlAGMAdAAgAGkAcwAgAG4AbwB0ACAAcABpAG4AbgBlAGQ=");
  base64DecodeToExistingUint8Array(bufferView, 11088, "BQAAACAAAAAAAAAAIA==");
  base64DecodeToExistingUint8Array(bufferView, 11116, "AkEAAAAAAAACCQ==");
}
function asmFunc(env) {
 var buffer = new ArrayBuffer(131072);
 var HEAP8 = new Int8Array(buffer);
 var HEAP16 = new Int16Array(buffer);
 var HEAP32 = new Int32Array(buffer);
 var HEAPU8 = new Uint8Array(buffer);
 var HEAPU16 = new Uint16Array(buffer);
 var HEAPU32 = new Uint32Array(buffer);
 var HEAPF32 = new Float32Array(buffer);
 var HEAPF64 = new Float64Array(buffer);
 var Math_imul = Math.imul;
 var Math_fround = Math.fround;
 var Math_abs = Math.abs;
 var Math_clz32 = Math.clz32;
 var Math_min = Math.min;
 var Math_max = Math.max;
 var Math_floor = Math.floor;
 var Math_ceil = Math.ceil;
 var Math_trunc = Math.trunc;
 var Math_sqrt = Math.sqrt;
 var abort = env.abort;
 var nan = NaN;
 var infinity = Infinity;
 var $lib_builtins_abort = env.abort;
 var $lib_rt_itcms_total = 0;
 var $lib_rt_itcms_threshold = 0;
 var $lib_rt_itcms_state = 0;
 var $lib_rt_itcms_visitCount = 0;
 var $lib_rt_itcms_pinSpace = 0;
 var $lib_rt_itcms_iter = 0;
 var $lib_rt_itcms_toSpace = 0;
 var $lib_rt_itcms_white = 0;
 var $lib_rt_itcms_fromSpace = 0;
 var $lib_rt_tlsf_ROOT = 0;
 var $lib_rt___rtti_base = 11088;
 var $lib_memory___stack_pointer = 27516;
 var i64toi32_i32$HIGH_BITS = 0;
 function $lib_rt_itcms_visitRoots() {
  var $0 = 0, $1 = 0;
  byn_split_outlined_A$_lib_rt_itcms___visit(1280);
  byn_split_outlined_A$_lib_rt_itcms___visit(10928);
  byn_split_outlined_A$_lib_rt_itcms___visit(1536);
  byn_split_outlined_A$_lib_rt_itcms___visit(1088);
  byn_split_outlined_A$_lib_rt_itcms___visit(10976);
  byn_split_outlined_A$_lib_rt_itcms___visit(11040);
  $1 = $lib_rt_itcms_pinSpace;
  $0 = HEAP32[($1 + 4 | 0) >> 2] & -4 | 0;
  while_continue_0 : while (1) {
   if (($0 | 0) != ($1 | 0)) {
    if ((HEAP32[($0 + 4 | 0) >> 2] & 3 | 0 | 0) != (3 | 0)) {
     $lib_builtins_abort(0 | 0, 1152 | 0, 159 | 0, 16 | 0);
     abort();
    }
    $lib_rt___visit_members($0 + 20 | 0);
    $0 = HEAP32[($0 + 4 | 0) >> 2] & -4 | 0;
    continue while_continue_0;
   }
   break while_continue_0;
  };
 }
 
 function $lib_rt_itcms_Object_unlink($0) {
  var $1 = 0;
  $1 = HEAP32[($0 + 4 | 0) >> 2] & -4 | 0;
  if (!$1) {
   if (!(HEAP32[($0 + 8 | 0) >> 2] ? 0 : $0 >>> 0 < 27516 >>> 0)) {
    $lib_builtins_abort(0 | 0, 1152 | 0, 127 | 0, 18 | 0);
    abort();
   }
   return;
  }
  $0 = HEAP32[($0 + 8 | 0) >> 2];
  if (!$0) {
   $lib_builtins_abort(0 | 0, 1152 | 0, 131 | 0, 16 | 0);
   abort();
  }
  HEAP32[($1 + 8 | 0) >> 2] = $0;
  HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] & 3 | 0 | $1 | 0;
 }
 
 function $lib_rt_itcms_Object_makeGray($0) {
  var $1 = 0, $2 = 0, $3 = 0;
  if (($lib_rt_itcms_iter | 0) == ($0 | 0)) {
   $2 = HEAP32[($0 + 8 | 0) >> 2];
   if (!$2) {
    $lib_builtins_abort(0 | 0, 1152 | 0, 147 | 0, 30 | 0);
    abort();
   }
   $lib_rt_itcms_iter = $2;
  }
  $lib_rt_itcms_Object_unlink($0);
  $2 = $lib_rt_itcms_toSpace;
  $1 = HEAP32[($0 + 12 | 0) >> 2];
  if ($1 >>> 0 <= 1 >>> 0) {
   $3 = 1
  } else {
   if (HEAP32[11088 >> 2] >>> 0 < $1 >>> 0) {
    $lib_builtins_abort(1280 | 0, 1344 | 0, 22 | 0, 28 | 0);
    abort();
   }
   $3 = HEAP32[(($1 << 3 | 0) + 11092 | 0) >> 2] & 32 | 0;
  }
  $1 = HEAP32[($2 + 8 | 0) >> 2];
  HEAP32[($0 + 4 | 0) >> 2] = $2 | ($3 ? !$lib_rt_itcms_white : 2) | 0;
  HEAP32[($0 + 8 | 0) >> 2] = $1;
  HEAP32[($1 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2] & 3 | 0 | $0 | 0;
  HEAP32[($2 + 8 | 0) >> 2] = $0;
 }
 
 function $lib_rt_tlsf_removeBlock($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0, $5 = 0;
  $2 = HEAP32[$1 >> 2];
  if (!($2 & 1 | 0)) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 268 | 0, 14 | 0);
   abort();
  }
  $2 = $2 & -4 | 0;
  if ($2 >>> 0 < 12 >>> 0) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 270 | 0, 14 | 0);
   abort();
  }
  if ($2 >>> 0 < 256 >>> 0) {
   $2 = $2 >>> 4 | 0
  } else {
   $2 = $2 >>> 0 < 1073741820 >>> 0 ? $2 : 1073741820;
   $3 = 31 - Math_clz32($2) | 0;
   $5 = $3 - 7 | 0;
   $2 = ($2 >>> ($3 - 4 | 0) | 0) ^ 16 | 0;
  }
  if (!($2 >>> 0 < 16 >>> 0 & $5 >>> 0 < 23 >>> 0 | 0)) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 284 | 0, 14 | 0);
   abort();
  }
  $3 = HEAP32[($1 + 8 | 0) >> 2];
  $4 = HEAP32[($1 + 4 | 0) >> 2];
  if ($4) {
   HEAP32[($4 + 8 | 0) >> 2] = $3
  }
  if ($3) {
   HEAP32[($3 + 4 | 0) >> 2] = $4
  }
  if ((HEAP32[(((($2 + ($5 << 4 | 0) | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2] | 0) == ($1 | 0)) {
   HEAP32[(((($2 + ($5 << 4 | 0) | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2] = $3;
   if (!$3) {
    $3 = ($5 << 2 | 0) + $0 | 0;
    $1 = $2 & 31 | 0;
    $4 = ((-1 >>> $1 | 0) & -2 | 0) << $1 | 0;
    $1 = (0 - $2 | 0) & 31 | 0;
    $1 = HEAP32[($3 + 4 | 0) >> 2] & ($4 | (((-1 << $1 | 0) & -2 | 0) >>> $1 | 0) | 0) | 0;
    HEAP32[($3 + 4 | 0) >> 2] = $1;
    if (!$1) {
     $1 = $0;
     $4 = HEAP32[$0 >> 2];
     $0 = $5 & 31 | 0;
     $2 = ((-1 >>> $0 | 0) & -2 | 0) << $0 | 0;
     $0 = (0 - $5 | 0) & 31 | 0;
     HEAP32[$1 >> 2] = $4 & ($2 | (((-1 << $0 | 0) & -2 | 0) >>> $0 | 0) | 0) | 0;
    }
   }
  }
 }
 
 function $lib_rt_tlsf_insertBlock($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
  if (!$1) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 201 | 0, 14 | 0);
   abort();
  }
  $2 = HEAP32[$1 >> 2];
  if (!($2 & 1 | 0)) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 203 | 0, 14 | 0);
   abort();
  }
  $3 = ($1 + 4 | 0) + (HEAP32[$1 >> 2] & -4 | 0) | 0;
  $5 = HEAP32[$3 >> 2];
  if ($5 & 1 | 0) {
   $lib_rt_tlsf_removeBlock($0, $3);
   $2 = ($2 + 4 | 0) + ($5 & -4 | 0) | 0;
   HEAP32[$1 >> 2] = $2;
   $3 = ($1 + 4 | 0) + (HEAP32[$1 >> 2] & -4 | 0) | 0;
   $5 = HEAP32[$3 >> 2];
  }
  if ($2 & 2 | 0) {
   $1 = HEAP32[($1 - 4 | 0) >> 2];
   $6 = HEAP32[$1 >> 2];
   if (!($6 & 1 | 0)) {
    $lib_builtins_abort(0 | 0, 1424 | 0, 221 | 0, 16 | 0);
    abort();
   }
   $lib_rt_tlsf_removeBlock($0, $1);
   $2 = ($6 + 4 | 0) + ($2 & -4 | 0) | 0;
   HEAP32[$1 >> 2] = $2;
  }
  HEAP32[$3 >> 2] = $5 | 2 | 0;
  $2 = $2 & -4 | 0;
  if ($2 >>> 0 < 12 >>> 0) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 233 | 0, 14 | 0);
   abort();
  }
  if (($2 + ($1 + 4 | 0) | 0 | 0) != ($3 | 0)) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 234 | 0, 14 | 0);
   abort();
  }
  HEAP32[($3 - 4 | 0) >> 2] = $1;
  if ($2 >>> 0 < 256 >>> 0) {
   $2 = $2 >>> 4 | 0
  } else {
   $2 = $2 >>> 0 < 1073741820 >>> 0 ? $2 : 1073741820;
   $3 = 31 - Math_clz32($2) | 0;
   $4 = $3 - 7 | 0;
   $2 = ($2 >>> ($3 - 4 | 0) | 0) ^ 16 | 0;
  }
  if (!($2 >>> 0 < 16 >>> 0 & $4 >>> 0 < 23 >>> 0 | 0)) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 251 | 0, 14 | 0);
   abort();
  }
  $3 = HEAP32[(((($2 + ($4 << 4 | 0) | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2];
  HEAP32[($1 + 4 | 0) >> 2] = 0;
  HEAP32[($1 + 8 | 0) >> 2] = $3;
  if ($3) {
   HEAP32[($3 + 4 | 0) >> 2] = $1
  }
  HEAP32[(((($2 + ($4 << 4 | 0) | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2] = $1;
  HEAP32[$0 >> 2] = HEAP32[$0 >> 2] | (1 << $4 | 0) | 0;
  $0 = ($4 << 2 | 0) + $0 | 0;
  HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] | (1 << $2 | 0) | 0;
 }
 
 function $lib_rt_tlsf_addMemory($0, $1, $2) {
  var $3 = 0, $4 = 0;
  if ($1 >>> 0 > $2 >>> 0) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 377 | 0, 14 | 0);
   abort();
  }
  $1 = (($1 + 19 | 0) & -16 | 0) - 4 | 0;
  $3 = HEAP32[($0 + 1568 | 0) >> 2];
  if ($3) {
   if ($1 >>> 0 < ($3 + 4 | 0) >>> 0) {
    $lib_builtins_abort(0 | 0, 1424 | 0, 384 | 0, 16 | 0);
    abort();
   }
   if (($3 | 0) == ($1 - 16 | 0 | 0)) {
    $4 = HEAP32[$3 >> 2];
    $1 = $1 - 16 | 0;
   }
  } else {
   if ($1 >>> 0 < ($0 + 1572 | 0) >>> 0) {
    $lib_builtins_abort(0 | 0, 1424 | 0, 397 | 0, 5 | 0);
    abort();
   }
  }
  $2 = ($2 & -16 | 0) - $1 | 0;
  if ($2 >>> 0 < 20 >>> 0) {
   return
  }
  $2 = $2 - 8 | 0;
  HEAP32[$1 >> 2] = $4 & 2 | 0 | ($2 | 1 | 0) | 0;
  HEAP32[($1 + 4 | 0) >> 2] = 0;
  HEAP32[($1 + 8 | 0) >> 2] = 0;
  $2 = $2 + ($1 + 4 | 0) | 0;
  HEAP32[$2 >> 2] = 2;
  HEAP32[($0 + 1568 | 0) >> 2] = $2;
  $lib_rt_tlsf_insertBlock($0, $1);
 }
 
 function $lib_rt_tlsf_initialize() {
  var $0 = 0, $1 = 0;
  $0 = __wasm_memory_size();
  if (($0 | 0) <= (0 | 0)) {
   $0 = (__wasm_memory_grow(1 - $0 | 0 | 0) | 0) < (0 | 0)
  } else {
   $0 = 0
  }
  if ($0) {
   abort()
  }
  HEAP32[27520 >> 2] = 0;
  HEAP32[29088 >> 2] = 0;
  for_loop_0 : while (1) {
   if ($1 >>> 0 < 23 >>> 0) {
    HEAP32[((($1 << 2 | 0) + 27520 | 0) + 4 | 0) >> 2] = 0;
    $0 = 0;
    for_loop_1 : while (1) {
     if ($0 >>> 0 < 16 >>> 0) {
      HEAP32[(((($0 + ($1 << 4 | 0) | 0) << 2 | 0) + 27520 | 0) + 96 | 0) >> 2] = 0;
      $0 = $0 + 1 | 0;
      continue for_loop_1;
     }
     break for_loop_1;
    };
    $1 = $1 + 1 | 0;
    continue for_loop_0;
   }
   break for_loop_0;
  };
  $lib_rt_tlsf_addMemory(27520, 29092, __wasm_memory_size() << 16 | 0);
  $lib_rt_tlsf_ROOT = 27520;
 }
 
 function $lib_rt_itcms_step() {
  var $0 = 0, $1 = 0, $2 = 0;
  break_0 : {
   switch ($lib_rt_itcms_state | 0) {
   case 0:
    $lib_rt_itcms_state = 1;
    $lib_rt_itcms_visitCount = 0;
    $lib_rt_itcms_visitRoots();
    $lib_rt_itcms_iter = $lib_rt_itcms_toSpace;
    return $lib_rt_itcms_visitCount;
   case 1:
    $1 = !$lib_rt_itcms_white;
    $0 = HEAP32[($lib_rt_itcms_iter + 4 | 0) >> 2] & -4 | 0;
    while_continue_1 : while (1) {
     if (($lib_rt_itcms_toSpace | 0) != ($0 | 0)) {
      $lib_rt_itcms_iter = $0;
      if ((HEAP32[($0 + 4 | 0) >> 2] & 3 | 0 | 0) != ($1 | 0)) {
       HEAP32[($0 + 4 | 0) >> 2] = $1 | (HEAP32[($0 + 4 | 0) >> 2] & -4 | 0) | 0;
       $lib_rt_itcms_visitCount = 0;
       $lib_rt___visit_members($0 + 20 | 0);
       return $lib_rt_itcms_visitCount;
      }
      $0 = HEAP32[($0 + 4 | 0) >> 2] & -4 | 0;
      continue while_continue_1;
     }
     break while_continue_1;
    };
    $lib_rt_itcms_visitCount = 0;
    $lib_rt_itcms_visitRoots();
    if (($lib_rt_itcms_toSpace | 0) == (HEAP32[($lib_rt_itcms_iter + 4 | 0) >> 2] & -4 | 0 | 0)) {
     $0 = $lib_memory___stack_pointer;
     while_continue_0 : while (1) {
      if ($0 >>> 0 < 27516 >>> 0) {
       $2 = HEAP32[$0 >> 2];
       if ($2) {
        byn_split_outlined_A$_lib_rt_itcms___visit($2)
       }
       $0 = $0 + 4 | 0;
       continue while_continue_0;
      }
      break while_continue_0;
     };
     $0 = HEAP32[($lib_rt_itcms_iter + 4 | 0) >> 2] & -4 | 0;
     while_continue_2 : while (1) {
      if (($lib_rt_itcms_toSpace | 0) != ($0 | 0)) {
       if ((HEAP32[($0 + 4 | 0) >> 2] & 3 | 0 | 0) != ($1 | 0)) {
        HEAP32[($0 + 4 | 0) >> 2] = $1 | (HEAP32[($0 + 4 | 0) >> 2] & -4 | 0) | 0;
        $lib_rt___visit_members($0 + 20 | 0);
       }
       $0 = HEAP32[($0 + 4 | 0) >> 2] & -4 | 0;
       continue while_continue_2;
      }
      break while_continue_2;
     };
     $0 = $lib_rt_itcms_fromSpace;
     $lib_rt_itcms_fromSpace = $lib_rt_itcms_toSpace;
     $lib_rt_itcms_toSpace = $0;
     $lib_rt_itcms_white = $1;
     $lib_rt_itcms_iter = HEAP32[($0 + 4 | 0) >> 2] & -4 | 0;
     $lib_rt_itcms_state = 2;
    }
    return $lib_rt_itcms_visitCount;
   case 2:
    $0 = $lib_rt_itcms_iter;
    if (($0 | 0) != ($lib_rt_itcms_toSpace | 0)) {
     $1 = HEAP32[($0 + 4 | 0) >> 2];
     $lib_rt_itcms_iter = $1 & -4 | 0;
     if ((!$lib_rt_itcms_white | 0) != ($1 & 3 | 0 | 0)) {
      $lib_builtins_abort(0 | 0, 1152 | 0, 228 | 0, 20 | 0);
      abort();
     }
     if ($0 >>> 0 < 27516 >>> 0) {
      HEAP32[($0 + 4 | 0) >> 2] = 0;
      HEAP32[($0 + 8 | 0) >> 2] = 0;
     } else {
      $lib_rt_itcms_total = $lib_rt_itcms_total - ((HEAP32[$0 >> 2] & -4 | 0) + 4 | 0) | 0;
      $1 = $0 + 4 | 0;
      if ($1 >>> 0 >= 27516 >>> 0) {
       if (!$lib_rt_tlsf_ROOT) {
        $lib_rt_tlsf_initialize()
       }
       $2 = $lib_rt_tlsf_ROOT;
       $0 = $1 - 4 | 0;
       if (($1 ? $1 & 15 | 0 : 1) ? 1 : HEAP32[$0 >> 2] & 1 | 0) {
        $lib_builtins_abort(0 | 0, 1424 | 0, 559 | 0, 3 | 0);
        abort();
       }
       HEAP32[$0 >> 2] = HEAP32[$0 >> 2] | 1 | 0;
       $lib_rt_tlsf_insertBlock($2, $0);
      }
     }
     return 10;
    }
    $0 = $lib_rt_itcms_toSpace;
    HEAP32[($0 + 4 | 0) >> 2] = $0;
    HEAP32[($0 + 8 | 0) >> 2] = $0;
    $lib_rt_itcms_state = 0;
    break;
   default:
    break break_0;
   };
  }
  return 0;
 }
 
 function $lib_rt_tlsf_searchBlock($0, $1) {
  var $2 = 0, $3 = 0;
  if ($1 >>> 0 < 256 >>> 0) {
   $1 = $1 >>> 4 | 0
  } else {
   $2 = $1 >>> 0 < 536870910 >>> 0 ? ((1 << (27 - Math_clz32($1) | 0) | 0) + $1 | 0) - 1 | 0 : $1;
   $1 = 31 - Math_clz32($2) | 0;
   $3 = $1 - 7 | 0;
   $1 = ($2 >>> ($1 - 4 | 0) | 0) ^ 16 | 0;
  }
  if (!($1 >>> 0 < 16 >>> 0 & $3 >>> 0 < 23 >>> 0 | 0)) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 330 | 0, 14 | 0);
   abort();
  }
  $1 = HEAP32[((($3 << 2 | 0) + $0 | 0) + 4 | 0) >> 2] & (-1 << $1 | 0) | 0;
  if ($1) {
   if ($1) {
    $1 = 31 - Math_clz32(($1 - 1 | 0) ^ $1 | 0) | 0
   } else {
    $1 = 32
   }
   $0 = HEAP32[(((($1 + ($3 << 4 | 0) | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2];
  } else {
   $1 = HEAP32[$0 >> 2] & (-1 << ($3 + 1 | 0) | 0) | 0;
   if ($1) {
    if ($1) {
     $2 = 31 - Math_clz32(($1 - 1 | 0) ^ $1 | 0) | 0
    } else {
     $2 = 32
    }
    $1 = HEAP32[((($2 << 2 | 0) + $0 | 0) + 4 | 0) >> 2];
    if (!$1) {
     $lib_builtins_abort(0 | 0, 1424 | 0, 343 | 0, 18 | 0);
     abort();
    }
    if ($1) {
     $1 = 31 - Math_clz32(($1 - 1 | 0) ^ $1 | 0) | 0
    } else {
     $1 = 32
    }
    $0 = HEAP32[(((($1 + ($2 << 4 | 0) | 0) << 2 | 0) + $0 | 0) + 96 | 0) >> 2];
   } else {
    $0 = 0
   }
  }
  return $0;
 }
 
 function $lib_rt_itcms___new($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
  if ($0 >>> 0 >= 1073741804 >>> 0) {
   $lib_builtins_abort(1088 | 0, 1152 | 0, 260 | 0, 31 | 0);
   abort();
  }
  if ($lib_rt_itcms_total >>> 0 >= $lib_rt_itcms_threshold >>> 0) {
   __inlined_func$_lib_rt_itcms_interrupt : {
    $2 = 2048;
    do_loop_0 : while (1) {
     $2 = $2 - $lib_rt_itcms_step() | 0;
     if (!$lib_rt_itcms_state) {
      $3 = $lib_rt_itcms_total;
      $2 = Math_imul($3 & 65535 | 0, 200);
      $4 = Math_imul($3 >>> 16 | 0, 200) + ($2 >>> 16 | 0) | 0;
      $3 = $4 & 65535 | 0;
      i64toi32_i32$HIGH_BITS = ($4 >>> 16 | 0) + ($3 >>> 16 | 0) | 0;
      $lib_rt_itcms_threshold = _ZN17compiler_builtins3int4udiv10divmod_u6417h6026910b5ed08e40E($2 & 65535 | 0 | ($3 << 16 | 0) | 0, i64toi32_i32$HIGH_BITS) + 1024 | 0;
      break __inlined_func$_lib_rt_itcms_interrupt;
     }
     if (($2 | 0) > (0 | 0)) {
      continue do_loop_0
     }
     break do_loop_0;
    };
    $2 = $lib_rt_itcms_total;
    $lib_rt_itcms_threshold = ((($2 - $lib_rt_itcms_threshold | 0) >>> 0 < 1024 >>> 0) << 10 | 0) + $2 | 0;
   }
  }
  if (!$lib_rt_tlsf_ROOT) {
   $lib_rt_tlsf_initialize()
  }
  $4 = $lib_rt_tlsf_ROOT;
  $2 = $0 + 16 | 0;
  if ($2 >>> 0 > 1073741820 >>> 0) {
   $lib_builtins_abort(1088 | 0, 1424 | 0, 458 | 0, 29 | 0);
   abort();
  }
  $3 = $2 >>> 0 <= 12 >>> 0 ? 12 : (($2 + 19 | 0) & -16 | 0) - 4 | 0;
  $2 = $lib_rt_tlsf_searchBlock($4, $3);
  if (!$2) {
   $2 = __wasm_memory_size();
   $5 = ((((4 << ((HEAP32[($4 + 1568 | 0) >> 2] | 0) != (($2 << 16 | 0) - 4 | 0 | 0)) | 0) + ($3 >>> 0 < 536870910 >>> 0 ? ((1 << (27 - Math_clz32($3) | 0) | 0) - 1 | 0) + $3 | 0 : $3) | 0) + 65535 | 0) & -65536 | 0) >>> 16 | 0;
   if ((__wasm_memory_grow((($2 | 0) > ($5 | 0) ? $2 : $5) | 0) | 0) < (0 | 0)) {
    if ((__wasm_memory_grow($5 | 0) | 0) < (0 | 0)) {
     abort()
    }
   }
   $lib_rt_tlsf_addMemory($4, $2 << 16 | 0, __wasm_memory_size() << 16 | 0);
   $2 = $lib_rt_tlsf_searchBlock($4, $3);
   if (!$2) {
    $lib_builtins_abort(0 | 0, 1424 | 0, 496 | 0, 16 | 0);
    abort();
   }
  }
  if ((HEAP32[$2 >> 2] & -4 | 0) >>> 0 < $3 >>> 0) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 498 | 0, 14 | 0);
   abort();
  }
  $lib_rt_tlsf_removeBlock($4, $2);
  $5 = HEAP32[$2 >> 2];
  if (($3 + 4 | 0) & 15 | 0) {
   $lib_builtins_abort(0 | 0, 1424 | 0, 357 | 0, 14 | 0);
   abort();
  }
  $6 = ($5 & -4 | 0) - $3 | 0;
  if ($6 >>> 0 >= 16 >>> 0) {
   HEAP32[$2 >> 2] = $5 & 2 | 0 | $3 | 0;
   $3 = $3 + ($2 + 4 | 0) | 0;
   HEAP32[$3 >> 2] = $6 - 4 | 0 | 1 | 0;
   $lib_rt_tlsf_insertBlock($4, $3);
  } else {
   HEAP32[$2 >> 2] = $5 & -2 | 0;
   $3 = ($2 + 4 | 0) + (HEAP32[$2 >> 2] & -4 | 0) | 0;
   HEAP32[$3 >> 2] = HEAP32[$3 >> 2] & -3 | 0;
  }
  HEAP32[($2 + 12 | 0) >> 2] = $1;
  HEAP32[($2 + 16 | 0) >> 2] = $0;
  $3 = $lib_rt_itcms_fromSpace;
  $1 = HEAP32[($3 + 8 | 0) >> 2];
  HEAP32[($2 + 4 | 0) >> 2] = $lib_rt_itcms_white | $3 | 0;
  HEAP32[($2 + 8 | 0) >> 2] = $1;
  HEAP32[($1 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2] & 3 | 0 | $2 | 0;
  HEAP32[($3 + 8 | 0) >> 2] = $2;
  $lib_rt_itcms_total = $lib_rt_itcms_total + ((HEAP32[$2 >> 2] & -4 | 0) + 4 | 0) | 0;
  $3 = $2 + 20 | 0;
  $1 = $3;
  $lib_util_memory_memset_inlined_0 : {
   if (!$0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP8[$1 >> 0] = 0;
   $2 = $0 + $1 | 0;
   HEAP8[($2 - 1 | 0) >> 0] = 0;
   if ($0 >>> 0 <= 2 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP8[($1 + 1 | 0) >> 0] = 0;
   HEAP8[($1 + 2 | 0) >> 0] = 0;
   HEAP8[($2 - 2 | 0) >> 0] = 0;
   HEAP8[($2 - 3 | 0) >> 0] = 0;
   if ($0 >>> 0 <= 6 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP8[($1 + 3 | 0) >> 0] = 0;
   HEAP8[($2 - 4 | 0) >> 0] = 0;
   if ($0 >>> 0 <= 8 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   $2 = (0 - $1 | 0) & 3 | 0;
   $1 = $2 + $1 | 0;
   HEAP32[$1 >> 2] = 0;
   $2 = ($0 - $2 | 0) & -4 | 0;
   $0 = $2 + $1 | 0;
   HEAP32[($0 - 4 | 0) >> 2] = 0;
   if ($2 >>> 0 <= 8 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP32[($1 + 4 | 0) >> 2] = 0;
   HEAP32[($1 + 8 | 0) >> 2] = 0;
   HEAP32[($0 - 12 | 0) >> 2] = 0;
   HEAP32[($0 - 8 | 0) >> 2] = 0;
   if ($2 >>> 0 <= 24 >>> 0) {
    break $lib_util_memory_memset_inlined_0
   }
   HEAP32[($1 + 12 | 0) >> 2] = 0;
   HEAP32[($1 + 16 | 0) >> 2] = 0;
   HEAP32[($1 + 20 | 0) >> 2] = 0;
   HEAP32[($1 + 24 | 0) >> 2] = 0;
   HEAP32[($0 - 28 | 0) >> 2] = 0;
   HEAP32[($0 - 24 | 0) >> 2] = 0;
   HEAP32[($0 - 20 | 0) >> 2] = 0;
   HEAP32[($0 - 16 | 0) >> 2] = 0;
   $0 = ($1 & 4 | 0) + 24 | 0;
   $1 = $0 + $1 | 0;
   $0 = $2 - $0 | 0;
   while_continue_0 : while (1) {
    if ($0 >>> 0 >= 32 >>> 0) {
     HEAP32[$1 >> 2] = 0;
     HEAP32[($1 + 4 | 0) >> 2] = 0;
     HEAP32[($1 + 8 | 0) >> 2] = 0;
     HEAP32[($1 + 12 | 0) >> 2] = 0;
     HEAP32[($1 + 16 | 0) >> 2] = 0;
     HEAP32[($1 + 20 | 0) >> 2] = 0;
     HEAP32[($1 + 24 | 0) >> 2] = 0;
     HEAP32[($1 + 28 | 0) >> 2] = 0;
     $0 = $0 - 32 | 0;
     $1 = $1 + 32 | 0;
     continue while_continue_0;
    }
    break while_continue_0;
   };
  }
  return $3 | 0;
 }
 
 function $lib_util_memory_memcpy($0, $1, $2) {
  var $3 = 0, $4 = 0, $5 = 0;
  while_continue_0 : while (1) {
   if ($2 ? $1 & 3 | 0 : 0) {
    $3 = $0;
    $0 = $0 + 1 | 0;
    $4 = $1;
    $1 = $1 + 1 | 0;
    HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
    $2 = $2 - 1 | 0;
    continue while_continue_0;
   }
   break while_continue_0;
  };
  if (!($0 & 3 | 0)) {
   while_continue_1 : while (1) {
    if ($2 >>> 0 >= 16 >>> 0) {
     HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
     HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2];
     HEAP32[($0 + 8 | 0) >> 2] = HEAP32[($1 + 8 | 0) >> 2];
     HEAP32[($0 + 12 | 0) >> 2] = HEAP32[($1 + 12 | 0) >> 2];
     $1 = $1 + 16 | 0;
     $0 = $0 + 16 | 0;
     $2 = $2 - 16 | 0;
     continue while_continue_1;
    }
    break while_continue_1;
   };
   if ($2 & 8 | 0) {
    HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
    HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2];
    $1 = $1 + 8 | 0;
    $0 = $0 + 8 | 0;
   }
   if ($2 & 4 | 0) {
    HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
    $1 = $1 + 4 | 0;
    $0 = $0 + 4 | 0;
   }
   if ($2 & 2 | 0) {
    HEAP16[$0 >> 1] = HEAPU16[$1 >> 1];
    $1 = $1 + 2 | 0;
    $0 = $0 + 2 | 0;
   }
   if ($2 & 1 | 0) {
    HEAP8[$0 >> 0] = HEAPU8[$1 >> 0]
   }
   return;
  }
  if ($2 >>> 0 >= 32 >>> 0) {
   break_2 : {
    case2_2 : {
     switch (($0 & 3 | 0) - 1 | 0 | 0) {
     case 0:
      $5 = HEAP32[$1 >> 2];
      HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
      HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
      $3 = $0 + 2 | 0;
      $0 = $3 + 1 | 0;
      $4 = $1 + 2 | 0;
      $1 = $4 + 1 | 0;
      HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
      $2 = $2 - 3 | 0;
      while_continue_3 : while (1) {
       if ($2 >>> 0 >= 17 >>> 0) {
        $3 = HEAP32[($1 + 1 | 0) >> 2];
        HEAP32[$0 >> 2] = $3 << 8 | 0 | ($5 >>> 24 | 0) | 0;
        $4 = HEAP32[($1 + 5 | 0) >> 2];
        HEAP32[($0 + 4 | 0) >> 2] = $4 << 8 | 0 | ($3 >>> 24 | 0) | 0;
        $3 = HEAP32[($1 + 9 | 0) >> 2];
        HEAP32[($0 + 8 | 0) >> 2] = $3 << 8 | 0 | ($4 >>> 24 | 0) | 0;
        $5 = HEAP32[($1 + 13 | 0) >> 2];
        HEAP32[($0 + 12 | 0) >> 2] = $5 << 8 | 0 | ($3 >>> 24 | 0) | 0;
        $1 = $1 + 16 | 0;
        $0 = $0 + 16 | 0;
        $2 = $2 - 16 | 0;
        continue while_continue_3;
       }
       break while_continue_3;
      };
      break break_2;
     case 1:
      $5 = HEAP32[$1 >> 2];
      HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
      $3 = $0;
      $0 = $0 + 2 | 0;
      $4 = $1;
      $1 = $1 + 2 | 0;
      HEAP8[($3 + 1 | 0) >> 0] = HEAPU8[($4 + 1 | 0) >> 0];
      $2 = $2 - 2 | 0;
      while_continue_4 : while (1) {
       if ($2 >>> 0 >= 18 >>> 0) {
        $3 = HEAP32[($1 + 2 | 0) >> 2];
        HEAP32[$0 >> 2] = $3 << 16 | 0 | ($5 >>> 16 | 0) | 0;
        $4 = HEAP32[($1 + 6 | 0) >> 2];
        HEAP32[($0 + 4 | 0) >> 2] = $4 << 16 | 0 | ($3 >>> 16 | 0) | 0;
        $3 = HEAP32[($1 + 10 | 0) >> 2];
        HEAP32[($0 + 8 | 0) >> 2] = $3 << 16 | 0 | ($4 >>> 16 | 0) | 0;
        $5 = HEAP32[($1 + 14 | 0) >> 2];
        HEAP32[($0 + 12 | 0) >> 2] = $5 << 16 | 0 | ($3 >>> 16 | 0) | 0;
        $1 = $1 + 16 | 0;
        $0 = $0 + 16 | 0;
        $2 = $2 - 16 | 0;
        continue while_continue_4;
       }
       break while_continue_4;
      };
      break break_2;
     case 2:
      break case2_2;
     default:
      break break_2;
     };
    }
    $5 = HEAP32[$1 >> 2];
    $3 = $0;
    $0 = $0 + 1 | 0;
    $4 = $1;
    $1 = $1 + 1 | 0;
    HEAP8[$3 >> 0] = HEAPU8[$4 >> 0];
    $2 = $2 - 1 | 0;
    while_continue_5 : while (1) {
     if ($2 >>> 0 >= 19 >>> 0) {
      $3 = HEAP32[($1 + 3 | 0) >> 2];
      HEAP32[$0 >> 2] = $3 << 24 | 0 | ($5 >>> 8 | 0) | 0;
      $4 = HEAP32[($1 + 7 | 0) >> 2];
      HEAP32[($0 + 4 | 0) >> 2] = $4 << 24 | 0 | ($3 >>> 8 | 0) | 0;
      $3 = HEAP32[($1 + 11 | 0) >> 2];
      HEAP32[($0 + 8 | 0) >> 2] = $3 << 24 | 0 | ($4 >>> 8 | 0) | 0;
      $5 = HEAP32[($1 + 15 | 0) >> 2];
      HEAP32[($0 + 12 | 0) >> 2] = $5 << 24 | 0 | ($3 >>> 8 | 0) | 0;
      $1 = $1 + 16 | 0;
      $0 = $0 + 16 | 0;
      $2 = $2 - 16 | 0;
      continue while_continue_5;
     }
     break while_continue_5;
    };
   }
  }
  if ($2 & 16 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $1 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $1 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $1 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $1 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $1 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $1 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $3 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$3 >> 0];
   $1 = $3 + 2 | 0;
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($3 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
  }
  if ($2 & 8 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $1 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $1 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $3 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$3 >> 0];
   $1 = $3 + 2 | 0;
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($3 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
  }
  if ($2 & 4 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($1 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
   $3 = $1 + 2 | 0;
   HEAP8[$0 >> 0] = HEAPU8[$3 >> 0];
   $1 = $3 + 2 | 0;
   HEAP8[($0 + 1 | 0) >> 0] = HEAPU8[($3 + 1 | 0) >> 0];
   $0 = $0 + 2 | 0;
  }
  if ($2 & 2 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0];
   $3 = $0;
   $0 = $0 + 2 | 0;
   $4 = $1;
   $1 = $1 + 2 | 0;
   HEAP8[($3 + 1 | 0) >> 0] = HEAPU8[($4 + 1 | 0) >> 0];
  }
  if ($2 & 1 | 0) {
   HEAP8[$0 >> 0] = HEAPU8[$1 >> 0]
  }
 }
 
 function $lib_memory_memory_copy($0, $1, $2) {
  var $3 = 0, $4 = 0, $5 = 0;
  $lib_util_memory_memmove_inlined_0 : {
   $3 = $2;
   if (($0 | 0) == ($1 | 0)) {
    break $lib_util_memory_memmove_inlined_0
   }
   if ((($1 - $0 | 0) - $3 | 0) >>> 0 <= (0 - ($3 << 1 | 0) | 0) >>> 0) {
    $lib_util_memory_memcpy($0, $1, $3);
    break $lib_util_memory_memmove_inlined_0;
   }
   if ($0 >>> 0 < $1 >>> 0) {
    if (($1 & 7 | 0 | 0) == ($0 & 7 | 0 | 0)) {
     while_continue_0 : while (1) {
      if ($0 & 7 | 0) {
       if (!$3) {
        break $lib_util_memory_memmove_inlined_0
       }
       $3 = $3 - 1 | 0;
       $2 = $0;
       $0 = $0 + 1 | 0;
       $4 = $1;
       $1 = $1 + 1 | 0;
       HEAP8[$2 >> 0] = HEAPU8[$4 >> 0];
       continue while_continue_0;
      }
      break while_continue_0;
     };
     while_continue_1 : while (1) {
      if ($3 >>> 0 >= 8 >>> 0) {
       $2 = HEAP32[($1 + 4 | 0) >> 2];
       HEAP32[$0 >> 2] = HEAP32[$1 >> 2];
       HEAP32[($0 + 4 | 0) >> 2] = $2;
       $3 = $3 - 8 | 0;
       $0 = $0 + 8 | 0;
       $1 = $1 + 8 | 0;
       continue while_continue_1;
      }
      break while_continue_1;
     };
    }
    while_continue_2 : while (1) {
     if ($3) {
      $2 = $0;
      $0 = $0 + 1 | 0;
      $4 = $1;
      $1 = $1 + 1 | 0;
      HEAP8[$2 >> 0] = HEAPU8[$4 >> 0];
      $3 = $3 - 1 | 0;
      continue while_continue_2;
     }
     break while_continue_2;
    };
   } else {
    if (($1 & 7 | 0 | 0) == ($0 & 7 | 0 | 0)) {
     while_continue_3 : while (1) {
      if (($0 + $3 | 0) & 7 | 0) {
       if (!$3) {
        break $lib_util_memory_memmove_inlined_0
       }
       $3 = $3 - 1 | 0;
       HEAP8[($3 + $0 | 0) >> 0] = HEAPU8[($1 + $3 | 0) >> 0];
       continue while_continue_3;
      }
      break while_continue_3;
     };
     while_continue_4 : while (1) {
      if ($3 >>> 0 >= 8 >>> 0) {
       $3 = $3 - 8 | 0;
       $2 = $3 + $1 | 0;
       $4 = HEAP32[($2 + 4 | 0) >> 2];
       $5 = $0 + $3 | 0;
       HEAP32[$5 >> 2] = HEAP32[$2 >> 2];
       HEAP32[($5 + 4 | 0) >> 2] = $4;
       continue while_continue_4;
      }
      break while_continue_4;
     };
    }
    while_continue_5 : while (1) {
     if ($3) {
      $3 = $3 - 1 | 0;
      HEAP8[($3 + $0 | 0) >> 0] = HEAPU8[($1 + $3 | 0) >> 0];
      continue while_continue_5;
     }
     break while_continue_5;
    };
   }
  }
 }
 
 function $lib_rt_itcms___renew($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0;
  $2 = $0 - 20 | 0;
  if (((HEAP32[$2 >> 2] & -4 | 0) - 16 | 0) >>> 0 >= $1 >>> 0) {
   HEAP32[($2 + 16 | 0) >> 2] = $1;
   return $0;
  }
  $3 = $lib_rt_itcms___new($1, HEAP32[($2 + 12 | 0) >> 2]);
  $4 = $0;
  $0 = HEAP32[($2 + 16 | 0) >> 2];
  $lib_memory_memory_copy($3, $4, $0 >>> 0 > $1 >>> 0 ? $1 : $0);
  return $3;
 }
 
 function $lib_string_String_indexOf($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $10 = 0;
  $7 = HEAP32[(($1 - 20 | 0) + 16 | 0) >> 2] >>> 1 | 0;
  if (!$7) {
   return 0
  }
  $2 = HEAP32[(($0 - 20 | 0) + 16 | 0) >> 2] >>> 1 | 0;
  if (!$2) {
   return -1
  }
  $10 = $2 - $7 | 0;
  for_loop_0 : while (1) {
   if (($5 | 0) <= ($10 | 0)) {
    $3 = ($5 << 1 | 0) + $0 | 0;
    $4 = $1;
    $2 = $7;
    if (!($3 & 7 | 0 | ($4 & 7 | 0) | 0) & $2 >>> 0 >= 4 >>> 0 | 0) {
     do_loop_0 : while (1) {
      if ((HEAP32[$3 >> 2] | 0) == (HEAP32[$4 >> 2] | 0) & (HEAP32[($3 + 4 | 0) >> 2] | 0) == (HEAP32[($4 + 4 | 0) >> 2] | 0) | 0) {
       $3 = $3 + 8 | 0;
       $4 = $4 + 8 | 0;
       $2 = $2 - 4 | 0;
       if ($2 >>> 0 >= 4 >>> 0) {
        continue do_loop_0
       }
      }
      break do_loop_0;
     }
    }
    __inlined_func$_lib_util_string_compareImpl : {
     while_continue_1 : while (1) {
      $6 = $2;
      $2 = $2 - 1 | 0;
      if ($6) {
       $8 = HEAPU16[$3 >> 1];
       $9 = HEAPU16[$4 >> 1];
       $6 = $8 - $9 | 0;
       if (($8 | 0) != ($9 | 0)) {
        break __inlined_func$_lib_util_string_compareImpl
       }
       $3 = $3 + 2 | 0;
       $4 = $4 + 2 | 0;
       continue while_continue_1;
      }
      break while_continue_1;
     };
     $6 = 0;
    }
    if (!$6) {
     return $5
    }
    $5 = $5 + 1 | 0;
    continue for_loop_0;
   }
   break for_loop_0;
  };
  return -1;
 }
 
 function $lib_rt_itcms___pin($0) {
  $0 = $0 | 0;
  var $1 = 0, $2 = 0, $3 = 0;
  if ($0) {
   $1 = $0 - 20 | 0;
   if ((HEAP32[($1 + 4 | 0) >> 2] & 3 | 0 | 0) == (3 | 0)) {
    $lib_builtins_abort(10976 | 0, 1152 | 0, 337 | 0, 7 | 0);
    abort();
   }
   $lib_rt_itcms_Object_unlink($1);
   $2 = $lib_rt_itcms_pinSpace;
   $3 = HEAP32[($2 + 8 | 0) >> 2];
   HEAP32[($1 + 4 | 0) >> 2] = $2 | 3 | 0;
   HEAP32[($1 + 8 | 0) >> 2] = $3;
   HEAP32[($3 + 4 | 0) >> 2] = HEAP32[($3 + 4 | 0) >> 2] & 3 | 0 | $1 | 0;
   HEAP32[($2 + 8 | 0) >> 2] = $1;
  }
  return $0 | 0;
 }
 
 function $lib_rt_itcms___unpin($0) {
  $0 = $0 | 0;
  var $1 = 0, $2 = 0;
  if (!$0) {
   return
  }
  $0 = $0 - 20 | 0;
  if ((HEAP32[($0 + 4 | 0) >> 2] & 3 | 0 | 0) != (3 | 0)) {
   $lib_builtins_abort(11040 | 0, 1152 | 0, 351 | 0, 5 | 0);
   abort();
  }
  if (($lib_rt_itcms_state | 0) == (1 | 0)) {
   $lib_rt_itcms_Object_makeGray($0)
  } else {
   $lib_rt_itcms_Object_unlink($0);
   $1 = $lib_rt_itcms_fromSpace;
   $2 = HEAP32[($1 + 8 | 0) >> 2];
   HEAP32[($0 + 4 | 0) >> 2] = $lib_rt_itcms_white | $1 | 0;
   HEAP32[($0 + 8 | 0) >> 2] = $2;
   HEAP32[($2 + 4 | 0) >> 2] = HEAP32[($2 + 4 | 0) >> 2] & 3 | 0 | $0 | 0;
   HEAP32[($1 + 8 | 0) >> 2] = $0;
  }
 }
 
 function $lib_rt_itcms___collect() {
  var $0 = 0, $1 = 0, $2 = 0;
  if (($lib_rt_itcms_state | 0) > (0 | 0)) {
   while_continue_0 : while (1) {
    if ($lib_rt_itcms_state) {
     $lib_rt_itcms_step();
     continue while_continue_0;
    }
    break while_continue_0;
   }
  }
  $lib_rt_itcms_step();
  while_continue_1 : while (1) {
   if ($lib_rt_itcms_state) {
    $lib_rt_itcms_step();
    continue while_continue_1;
   }
   break while_continue_1;
  };
  $0 = $lib_rt_itcms_total;
  $1 = Math_imul($0 & 65535 | 0, 200);
  $2 = Math_imul($0 >>> 16 | 0, 200) + ($1 >>> 16 | 0) | 0;
  $0 = $2 & 65535 | 0;
  i64toi32_i32$HIGH_BITS = ($2 >>> 16 | 0) + ($0 >>> 16 | 0) | 0;
  $lib_rt_itcms_threshold = _ZN17compiler_builtins3int4udiv10divmod_u6417h6026910b5ed08e40E($1 & 65535 | 0 | ($0 << 16 | 0) | 0, i64toi32_i32$HIGH_BITS) + 1024 | 0;
 }
 
 function $lib_rt___visit_members($0) {
  var $1 = 0, $2 = 0, $3 = 0;
  folding_inner0 : {
   invalid : {
    switch (HEAP32[($0 - 8 | 0) >> 2] | 0) {
    case 0:
     return;
    case 1:
     return;
    case 2:
     $0 = HEAP32[$0 >> 2];
     if ($0) {
      byn_split_outlined_A$_lib_rt_itcms___visit($0)
     }
     return;
    case 3:
     $1 = HEAP32[($0 + 4 | 0) >> 2];
     $3 = $1 + (HEAP32[($0 + 12 | 0) >> 2] << 2 | 0) | 0;
     while_continue_0 : while (1) {
      if ($1 >>> 0 < $3 >>> 0) {
       $2 = HEAP32[$1 >> 2];
       if ($2) {
        byn_split_outlined_A$_lib_rt_itcms___visit($2)
       }
       $1 = $1 + 4 | 0;
       continue while_continue_0;
      }
      break while_continue_0;
     };
     break folding_inner0;
    case 4:
     break folding_inner0;
    default:
     break invalid;
    };
   }
   abort();
  }
  $0 = HEAP32[$0 >> 2];
  if ($0) {
   byn_split_outlined_A$_lib_rt_itcms___visit($0)
  }
 }
 
 function $start() {
  $lib_rt_itcms_threshold = ((__wasm_memory_size() << 16 | 0) - 27516 | 0) >>> 1 | 0;
  HEAP32[1204 >> 2] = 1200;
  HEAP32[1208 >> 2] = 1200;
  $lib_rt_itcms_pinSpace = 1200;
  HEAP32[1236 >> 2] = 1232;
  HEAP32[1240 >> 2] = 1232;
  $lib_rt_itcms_toSpace = 1232;
  HEAP32[1380 >> 2] = 1376;
  HEAP32[1384 >> 2] = 1376;
  $lib_rt_itcms_fromSpace = 1376;
 }
 
 function assembly_index_findMatchingIngredients($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
  $lib_memory___stack_pointer = $lib_memory___stack_pointer - 20 | 0;
  folding_inner0 : {
   if (($lib_memory___stack_pointer | 0) < (11132 | 0)) {
    break folding_inner0
   }
   $3 = $lib_memory___stack_pointer;
   HEAP32[$3 >> 2] = 0;
   HEAP32[($3 + 4 | 0) >> 2] = 0;
   HEAP32[($3 + 8 | 0) >> 2] = 0;
   HEAP32[($3 + 12 | 0) >> 2] = 0;
   HEAP32[($3 + 16 | 0) >> 2] = 0;
   $lib_memory___stack_pointer = $3 - 4 | 0;
   if (($lib_memory___stack_pointer | 0) < (11132 | 0)) {
    break folding_inner0
   }
   $4 = $lib_memory___stack_pointer;
   HEAP32[$4 >> 2] = 0;
   $2 = $lib_rt_itcms___new(0, 0);
   $lib_memory_memory_copy($2, 1056, 0);
   HEAP32[$4 >> 2] = $2;
   $4 = $lib_rt_itcms___new(16, 3);
   HEAP32[$4 >> 2] = $2;
   if ($2) {
    byn_split_outlined_A$_lib_rt_itcms___link($4, $2, 0)
   }
   HEAP32[($4 + 4 | 0) >> 2] = $2;
   HEAP32[($4 + 8 | 0) >> 2] = 0;
   HEAP32[($4 + 12 | 0) >> 2] = 0;
   $lib_memory___stack_pointer = $lib_memory___stack_pointer + 4 | 0;
   HEAP32[$3 >> 2] = $4;
   for_loop_0 : while (1) {
    if ((HEAP32[($1 + 12 | 0) >> 2] | 0) > ($9 | 0)) {
     $2 = $lib_memory___stack_pointer;
     $3 = $lib_array_Array__lib_string_String____get($1, $9);
     HEAP32[($lib_memory___stack_pointer + 4 | 0) >> 2] = $3;
     $7 = $lib_string_String_toLowerCase($3);
     HEAP32[($2 + 8 | 0) >> 2] = $7;
     $6 = 0;
     for_loop_1 : while (1) {
      if ((HEAP32[($0 + 12 | 0) >> 2] | 0) > ($6 | 0)) {
       for_break1 : {
        $2 = $lib_memory___stack_pointer;
        $3 = $lib_array_Array__lib_string_String____get($0, $6);
        HEAP32[($lib_memory___stack_pointer + 4 | 0) >> 2] = $3;
        $5 = $2;
        $2 = $lib_string_String_toLowerCase($3);
        HEAP32[($5 + 12 | 0) >> 2] = $2;
        if (($lib_string_String_indexOf($7, $2) | 0) != (-1 | 0)) {
         $5 = 1
        } else {
         $5 = ($lib_string_String_indexOf($2, $7) | 0) != (-1 | 0)
        }
        if ($5) {
         $5 = $lib_array_Array__lib_string_String____get($1, $9);
         HEAP32[($lib_memory___stack_pointer + 16 | 0) >> 2] = $5;
         $6 = HEAP32[($4 + 12 | 0) >> 2];
         $8 = $6 + 1 | 0;
         $2 = HEAP32[($4 + 8 | 0) >> 2];
         if ($8 >>> 0 > ($2 >>> 2 | 0) >>> 0) {
          if ($8 >>> 0 > 268435455 >>> 0) {
           $lib_builtins_abort(10928 | 0, 1488 | 0, 19 | 0, 48 | 0);
           abort();
          }
          $7 = HEAP32[$4 >> 2];
          $2 = $2 << 1 | 0;
          $3 = $2 >>> 0 < 1073741820 >>> 0 ? $2 : 1073741820;
          $2 = ($8 >>> 0 > 8 >>> 0 ? $8 : 8) << 2 | 0;
          $2 = $3 >>> 0 > $2 >>> 0 ? $3 : $2;
          $3 = $lib_rt_itcms___renew($7, $2);
          if (($3 | 0) != ($7 | 0)) {
           HEAP32[$4 >> 2] = $3;
           HEAP32[($4 + 4 | 0) >> 2] = $3;
           if ($3) {
            byn_split_outlined_A$_lib_rt_itcms___link($4, $3, 0)
           }
          }
          HEAP32[($4 + 8 | 0) >> 2] = $2;
         }
         HEAP32[(HEAP32[($4 + 4 | 0) >> 2] + ($6 << 2 | 0) | 0) >> 2] = $5;
         if ($5) {
          byn_split_outlined_A$_lib_rt_itcms___link($4, $5, 1)
         }
         HEAP32[($4 + 12 | 0) >> 2] = $8;
         break for_break1;
        }
        $6 = $6 + 1 | 0;
        continue for_loop_1;
       }
      }
      break for_loop_1;
     };
     $9 = $9 + 1 | 0;
     continue for_loop_0;
    }
    break for_loop_0;
   };
   $lib_memory___stack_pointer = $lib_memory___stack_pointer + 20 | 0;
   return $4;
  }
  $lib_builtins_abort(27536 | 0, 27584 | 0, 1 | 0, 1 | 0);
  abort();
 }
 
 function $lib_array_Array__lib_string_String____get($0, $1) {
  $lib_memory___stack_pointer = $lib_memory___stack_pointer - 4 | 0;
  if (($lib_memory___stack_pointer | 0) < (11132 | 0)) {
   $lib_builtins_abort(27536 | 0, 27584 | 0, 1 | 0, 1 | 0);
   abort();
  }
  HEAP32[$lib_memory___stack_pointer >> 2] = 0;
  if (HEAP32[($0 + 12 | 0) >> 2] >>> 0 <= $1 >>> 0) {
   $lib_builtins_abort(1280 | 0, 1488 | 0, 114 | 0, 42 | 0);
   abort();
  }
  $0 = HEAP32[(HEAP32[($0 + 4 | 0) >> 2] + ($1 << 2 | 0) | 0) >> 2];
  HEAP32[$lib_memory___stack_pointer >> 2] = $0;
  if (!$0) {
   $lib_builtins_abort(1536 | 0, 1488 | 0, 118 | 0, 40 | 0);
   abort();
  }
  $lib_memory___stack_pointer = $lib_memory___stack_pointer + 4 | 0;
  return $0;
 }
 
 function $lib_string_String_toLowerCase($0) {
  var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $10 = 0;
  $lib_memory___stack_pointer = $lib_memory___stack_pointer - 4 | 0;
  if (($lib_memory___stack_pointer | 0) < (11132 | 0)) {
   $lib_builtins_abort(27536 | 0, 27584 | 0, 1 | 0, 1 | 0);
   abort();
  }
  HEAP32[$lib_memory___stack_pointer >> 2] = 0;
  $8 = HEAP32[(($0 - 20 | 0) + 16 | 0) >> 2] >>> 1 | 0;
  if (!$8) {
   $lib_memory___stack_pointer = $lib_memory___stack_pointer + 4 | 0;
   return $0;
  }
  $1 = $lib_memory___stack_pointer;
  $6 = $lib_rt_itcms___new($8 << 2 | 0, 1);
  HEAP32[$1 >> 2] = $6;
  for_loop_0 : while (1) {
   if ($7 >>> 0 < $8 >>> 0) {
    $1 = HEAPU16[(($7 << 1 | 0) + $0 | 0) >> 1];
    if ($1 >>> 7 | 0) {
     for_continue_0 : {
      if (($1 - 55295 | 0) >>> 0 < 1025 >>> 0 & ($8 - 1 | 0) >>> 0 > $7 >>> 0 | 0) {
       $2 = HEAPU16[((($7 << 1 | 0) + $0 | 0) + 2 | 0) >> 1];
       if (($2 - 56319 | 0) >>> 0 < 1025 >>> 0) {
        $7 = $7 + 1 | 0;
        $3 = $1;
        $1 = ($2 & 1023 | 0 | (($1 & 1023 | 0) << 10 | 0) | 0) + 65536 | 0;
        if ($1 >>> 0 >= 131072 >>> 0) {
         HEAP32[(($4 << 1 | 0) + $6 | 0) >> 2] = $2 << 16 | 0 | $3 | 0;
         $4 = $4 + 1 | 0;
         break for_continue_0;
        }
       }
      }
      if (($1 | 0) == (304 | 0)) {
       HEAP32[(($4 << 1 | 0) + $6 | 0) >> 2] = 50790505;
       $4 = $4 + 1 | 0;
      } else {
       if (($1 | 0) == (931 | 0)) {
        $9 = ($4 << 1 | 0) + $6 | 0;
        if ($8 >>> 0 > 1 >>> 0) {
         $5 = 0;
         $3 = $7;
         $1 = $3 - 30 | 0;
         $10 = ($1 | 0) < (0 | 0) ? 0 : $1;
         $lib_util_string_isFinalSigma_inlined_0 : {
          while_continue_1 : while (1) {
           if (($3 | 0) > ($10 | 0)) {
            $1 = -1;
            $lib_util_string_codePointBefore_inlined_0 : {
             if (($3 | 0) <= (0 | 0)) {
              break $lib_util_string_codePointBefore_inlined_0
             }
             $1 = HEAPU16[((($3 - 1 | 0) << 1 | 0) + $0 | 0) >> 1];
             if (($1 & 64512 | 0 | 0) == (56320 | 0) & ($3 - 2 | 0 | 0) >= (0 | 0) | 0) {
              $2 = HEAPU16[((($3 - 2 | 0) << 1 | 0) + $0 | 0) >> 1];
              if (($2 & 64512 | 0 | 0) == (55296 | 0)) {
               $1 = (($1 & 1023 | 0) + (($2 & 1023 | 0) << 10 | 0) | 0) + 65536 | 0;
               break $lib_util_string_codePointBefore_inlined_0;
              }
             }
             $1 = ($1 & 63488 | 0 | 0) == (55296 | 0) ? 65533 : $1;
            }
            if ($1 >>> 0 < 918e3 >>> 0) {
             $2 = (HEAPU8[(((HEAPU8[(($1 >>> 8 | 0) + 1772 | 0) >> 0] << 5 | 0) + 1772 | 0) + (($1 & 255 | 0) >>> 3 | 0) | 0) >> 0] >>> ($1 & 7 | 0) | 0) & 1 | 0
            } else {
             $2 = 0
            }
            if (!$2) {
             if ($1 >>> 0 < 127370 >>> 0) {
              $5 = (HEAPU8[(((HEAPU8[(($1 >>> 8 | 0) + 4780 | 0) >> 0] << 5 | 0) + 4780 | 0) + (($1 & 255 | 0) >>> 3 | 0) | 0) >> 0] >>> ($1 & 7 | 0) | 0) & 1 | 0
             } else {
              $5 = 0
             }
             $2 = 0;
             if (!$5) {
              break $lib_util_string_isFinalSigma_inlined_0
             }
             $5 = 1;
            }
            $3 = $3 - ((($1 | 0) >= (65536 | 0)) + 1 | 0) | 0;
            continue while_continue_1;
           }
           break while_continue_1;
          };
          $2 = 0;
          if (!$5) {
           break $lib_util_string_isFinalSigma_inlined_0
          }
          $3 = $7 + 1 | 0;
          $1 = $3 + 30 | 0;
          $5 = ($1 | 0) < ($8 | 0) ? $1 : $8;
          while_continue_2 : while (1) {
           if (($3 | 0) < ($5 | 0)) {
            $1 = HEAPU16[(($3 << 1 | 0) + $0 | 0) >> 1];
            if (($1 & 64512 | 0 | 0) == (55296 | 0) & ($8 | 0) != ($3 + 1 | 0 | 0) | 0) {
             $2 = HEAPU16[((($3 << 1 | 0) + $0 | 0) + 2 | 0) >> 1];
             if (($2 & 64512 | 0 | 0) == (56320 | 0)) {
              $1 = ($2 + ($1 << 10 | 0) | 0) - 56613888 | 0
             }
            }
            if ($1 >>> 0 < 918e3 >>> 0) {
             $2 = (HEAPU8[(((HEAPU8[(($1 >>> 8 | 0) + 1772 | 0) >> 0] << 5 | 0) + 1772 | 0) + (($1 & 255 | 0) >>> 3 | 0) | 0) >> 0] >>> ($1 & 7 | 0) | 0) & 1 | 0
            } else {
             $2 = 0
            }
            if (!$2) {
             if ($1 >>> 0 < 127370 >>> 0) {
              $1 = (HEAPU8[(((HEAPU8[(($1 >>> 8 | 0) + 4780 | 0) >> 0] << 5 | 0) + 4780 | 0) + (($1 & 255 | 0) >>> 3 | 0) | 0) >> 0] >>> ($1 & 7 | 0) | 0) & 1 | 0
             } else {
              $1 = 0
             }
             $2 = !$1;
             break $lib_util_string_isFinalSigma_inlined_0;
            }
            $3 = (($1 >>> 0 >= 65536 >>> 0) + 1 | 0) + $3 | 0;
            continue while_continue_2;
           }
           break while_continue_2;
          };
          $2 = 1;
         }
        } else {
         $2 = 0
        }
        HEAP16[$9 >> 1] = $2 ? 962 : 963;
       } else {
        if (($1 - 9398 | 0) >>> 0 <= 25 >>> 0) {
         HEAP16[(($4 << 1 | 0) + $6 | 0) >> 1] = $1 + 26 | 0
        } else {
         $3 = $1;
         $1 = $1 >>> 8 | 0;
         $9 = $3 & 255 | 0;
         $1 = HEAP32[(((HEAPU8[($1 + 9988 | 0) >> 0] + (((Math_imul(HEAPU8[((Math_imul(HEAPU8[($1 + 6348 | 0) >> 0], 86) + 6348 | 0) + (($9 >>> 0) / (3 >>> 0) | 0) | 0) >> 0], HEAP32[(((($9 >>> 0) % (3 >>> 0) | 0) << 2 | 0) + 9016 | 0) >> 2]) >>> 11 | 0) >>> 0) % (6 >>> 0) | 0) | 0) << 2 | 0) + 9028 | 0) >> 2];
         $5 = $1 & 255 | 0;
         $2 = $1 >> 8 | 0;
         $1 = $3 + ((0 - $5 | 0) & $2 | 0) | 0;
         __inlined_func$_lib_util_casemap_casemap : {
          if ($5 >>> 0 < 2 >>> 0) {
           break __inlined_func$_lib_util_casemap_casemap
          }
          $1 = $2 & 255 | 0;
          $5 = $2 >>> 8 | 0;
          while_continue_0 : while (1) {
           if ($1) {
            $2 = $1 >>> 1 | 0;
            $10 = HEAPU8[((($2 + $5 | 0) << 1 | 0) + 10500 | 0) >> 0];
            if (($10 | 0) == ($9 | 0)) {
             $1 = HEAP32[((HEAPU8[(((($2 + $5 | 0) << 1 | 0) + 10500 | 0) + 1 | 0) >> 0] << 2 | 0) + 9028 | 0) >> 2];
             $2 = $1 & 255 | 0;
             $1 = ((0 - $2 | 0) & ($1 >> 8 | 0) | 0) + $3 | 0;
             if ($2 >>> 0 < 2 >>> 0) {
              break __inlined_func$_lib_util_casemap_casemap
             }
             $1 = $3 + 1 | 0;
             break __inlined_func$_lib_util_casemap_casemap;
            } else {
             if ($10 >>> 0 > $9 >>> 0) {
              $1 = $2
             } else {
              $5 = $2 + $5 | 0;
              $1 = $1 - $2 | 0;
             }
            }
            continue while_continue_0;
           }
           break while_continue_0;
          };
          $1 = $3;
         }
         $1 = $1 & 2097151 | 0;
         if ($1 >>> 0 < 65536 >>> 0) {
          HEAP16[(($4 << 1 | 0) + $6 | 0) >> 1] = $1
         } else {
          $1 = $1 - 65536 | 0;
          HEAP32[(($4 << 1 | 0) + $6 | 0) >> 2] = $1 >>> 10 | 0 | 55296 | 0 | (($1 & 1023 | 0 | 56320 | 0) << 16 | 0) | 0;
          $4 = $4 + 1 | 0;
         }
        }
       }
      }
     }
    } else {
     HEAP16[(($4 << 1 | 0) + $6 | 0) >> 1] = HEAPU8[($1 + 1644 | 0) >> 0]
    }
    $7 = $7 + 1 | 0;
    $4 = $4 + 1 | 0;
    continue for_loop_0;
   }
   break for_loop_0;
  };
  $0 = $lib_rt_itcms___renew($6, $4 << 1 | 0);
  $lib_memory___stack_pointer = $lib_memory___stack_pointer + 4 | 0;
  return $0;
 }
 
 function export_assembly_index_findMatchingIngredients($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0;
  $lib_memory___stack_pointer = $lib_memory___stack_pointer - 8 | 0;
  if (($lib_memory___stack_pointer | 0) < (11132 | 0)) {
   $lib_builtins_abort(27536 | 0, 27584 | 0, 1 | 0, 1 | 0);
   abort();
  }
  $2 = $lib_memory___stack_pointer;
  HEAP32[$2 >> 2] = $0;
  HEAP32[($2 + 4 | 0) >> 2] = $1;
  $0 = assembly_index_findMatchingIngredients($0, $1);
  $lib_memory___stack_pointer = $lib_memory___stack_pointer + 8 | 0;
  return $0 | 0;
 }
 
 function byn_split_outlined_A$_lib_rt_itcms___visit($0) {
  $0 = $0 - 20 | 0;
  if (($lib_rt_itcms_white | 0) == (HEAP32[($0 + 4 | 0) >> 2] & 3 | 0 | 0)) {
   $lib_rt_itcms_Object_makeGray($0);
   $lib_rt_itcms_visitCount = $lib_rt_itcms_visitCount + 1 | 0;
  }
 }
 
 function byn_split_outlined_A$_lib_rt_itcms___link($0, $1, $2) {
  var $3 = 0;
  if (!$0) {
   $lib_builtins_abort(0 | 0, 1152 | 0, 294 | 0, 14 | 0);
   abort();
  }
  $1 = $1 - 20 | 0;
  if (($lib_rt_itcms_white | 0) == (HEAP32[($1 + 4 | 0) >> 2] & 3 | 0 | 0)) {
   $0 = $0 - 20 | 0;
   $3 = HEAP32[($0 + 4 | 0) >> 2] & 3 | 0;
   if (($3 | 0) == (!$lib_rt_itcms_white | 0)) {
    $lib_rt_itcms_Object_makeGray($2 ? $0 : $1)
   } else {
    if (($lib_rt_itcms_state | 0) == (1 | 0) & ($3 | 0) == (3 | 0) | 0) {
     $lib_rt_itcms_Object_makeGray($1)
    }
   }
  }
 }
 
 function _ZN17compiler_builtins3int4udiv10divmod_u6417h6026910b5ed08e40E($0, $1) {
  var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
  folding_inner0 : {
   if (!$1) {
    $0 = ($0 >>> 0) / (100 >>> 0) | 0;
    break folding_inner0;
   }
   $5 = 58 - Math_clz32($1) | 0;
   $2 = 0 - $5 | 0;
   $4 = $5 & 63 | 0;
   $3 = $4 & 31 | 0;
   if ($4 >>> 0 >= 32 >>> 0) {
    $4 = 0;
    $3 = $1 >>> $3 | 0;
   } else {
    $4 = $1 >>> $3 | 0;
    $3 = (((1 << $3 | 0) - 1 | 0) & $1 | 0) << (32 - $3 | 0) | 0 | ($0 >>> $3 | 0) | 0;
   }
   $6 = $2 & 63 | 0;
   $2 = $6 & 31 | 0;
   if ($6 >>> 0 >= 32 >>> 0) {
    $1 = $0 << $2 | 0;
    $0 = 0;
   } else {
    $1 = ((1 << $2 | 0) - 1 | 0) & ($0 >>> (32 - $2 | 0) | 0) | 0 | ($1 << $2 | 0) | 0;
    $0 = $0 << $2 | 0;
   }
   if ($5) {
    label$15 : while (1) {
     $2 = $0;
     $6 = $4 << 1 | 0 | ($3 >>> 31 | 0) | 0;
     $0 = $3 << 1 | 0 | ($1 >>> 31 | 0) | 0;
     $7 = (0 - ($6 + ($0 >>> 0 > 99 >>> 0) | 0) | 0) >> 31 | 0;
     $4 = $7 & 100 | 0;
     $3 = $0 - $4 | 0;
     $4 = $6 - ($0 >>> 0 < $4 >>> 0) | 0;
     $0 = $2 << 1 | 0 | $8 | 0;
     $1 = $1 << 1 | 0 | ($2 >>> 31 | 0) | 0;
     $7 = $7 & 1 | 0;
     $8 = $7;
     $5 = $5 - 1 | 0;
     if ($5) {
      continue label$15
     }
     break label$15;
    }
   }
   i64toi32_i32$HIGH_BITS = $1 << 1 | 0 | ($0 >>> 31 | 0) | 0;
   return $0 << 1 | 0 | $7 | 0;
  }
  i64toi32_i32$HIGH_BITS = 0;
  return $0;
 }
 
 bufferView = HEAPU8;
 initActiveSegments(env);
 $start();
 function __wasm_memory_size() {
  return buffer.byteLength / 65536 | 0;
 }
 
 function __wasm_memory_grow(pagesToAdd) {
  pagesToAdd = pagesToAdd | 0;
  var oldPages = __wasm_memory_size() | 0;
  var newPages = oldPages + pagesToAdd | 0;
  if ((oldPages < newPages) && (newPages < 65536)) {
   var newBuffer = new ArrayBuffer(Math_imul(newPages, 65536));
   var newHEAP8 = new Int8Array(newBuffer);
   newHEAP8.set(HEAP8);
   HEAP8 = new Int8Array(newBuffer);
   HEAP16 = new Int16Array(newBuffer);
   HEAP32 = new Int32Array(newBuffer);
   HEAPU8 = new Uint8Array(newBuffer);
   HEAPU16 = new Uint16Array(newBuffer);
   HEAPU32 = new Uint32Array(newBuffer);
   HEAPF32 = new Float32Array(newBuffer);
   HEAPF64 = new Float64Array(newBuffer);
   buffer = newBuffer;
   bufferView = HEAPU8;
  }
  return oldPages;
 }
 
 return {
  "__new": $lib_rt_itcms___new, 
  "__pin": $lib_rt_itcms___pin, 
  "__unpin": $lib_rt_itcms___unpin, 
  "__collect": $lib_rt_itcms___collect, 
  "__rtti_base": $lib_rt___rtti_base, 
  "memory": Object.create(Object.prototype, {
   "grow": {
    "value": __wasm_memory_grow
   }, 
   "buffer": {
    "get": function () {
     return buffer;
    }
    
   }
  }), 
  "findMatchingIngredients": export_assembly_index_findMatchingIngredients
 };
}

var retasmFunc = asmFunc(  { abort: function() { throw new Error('abort'); },
    abort
  });
export var __new = retasmFunc.__new;
export var __pin = retasmFunc.__pin;
export var __unpin = retasmFunc.__unpin;
export var __collect = retasmFunc.__collect;
export var memory = retasmFunc.memory;
export var findMatchingIngredients = retasmFunc.findMatchingIngredients;
